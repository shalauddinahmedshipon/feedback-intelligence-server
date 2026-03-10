import AppError from '../../error/AppError';
import { sendEmail } from '../../utils/sendEmail';
import { analyzeFeedback } from '../ai/aiAnalyzer';
import { Settings } from '../settings/settings.model';
import {
  allCategories,
  allTeams,
  allSentiments,
  allPriorities,
} from './feedback.constant';
import { IFeedback } from './feedback.interface';
import { Feedback } from './feedback.model';
import { emailContent } from './utils/email.template';
import { StatusCodes } from 'http-status-codes';

const createFeedbackInDB = async (payload: IFeedback) => {
  const { message, userName } = payload;

  // 1. Analyze feedback with AI (Gemini)
  const aiResult = await analyzeFeedback(message);

  // 2. Prepare document
  const feedbackData = {
    message,
    userName: userName ? `${userName}` : 'Anonymous',
    ...aiResult,
  };

  // 3. Save to MongoDB
  const newFeedback = await Feedback.create(feedbackData);

  // 4. Trigger Email Notification (Asynchronous)
  try {
    const settings = await Settings.findOne();
    const teamEmails = settings?.teamEmails;

    const targetEmail = teamEmails ? teamEmails.get(newFeedback.team) : null;

    if (targetEmail) {
      const content = emailContent(newFeedback);

      await sendEmail(
        targetEmail,
        `[${newFeedback.priority.toUpperCase()}] New Feedback Assigned to ${newFeedback.team}`,
        content,
      );
    }
  } catch (emailError) {
    console.error('Failed to send team email:', emailError);
  }

  // 5. Return the saved document
  return newFeedback;
};

const getAllFeedbacksFromDB = async (query: Record<string, any>) => {
  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || 10;
  const skip = (page - 1) * limit;

  const filter: any = {};

  if (query.category) filter.category = query.category;
  if (query.priority) filter.priority = query.priority;
  if (query.sentiment) filter.sentiment = query.sentiment;
  if (query.team) filter.team = query.team;

  if (query.search) {
    const searchRegex = { $regex: query.search, $options: 'i' };
    filter.$or = [
      { message: searchRegex },
      { userName: searchRegex },
      { category: searchRegex },
      { priority: searchRegex },
      { sentiment: searchRegex },
      { team: searchRegex },
    ];
  }

  const feedbacks = await Feedback.find(filter)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .lean();

  const total = await Feedback.countDocuments(filter);

  return {
    meta: {
      page,
      limit,
      total,
      totalPage: Math.ceil(total / limit),
    },
    data: feedbacks,
  };
};

const getFeedbackStatsFromDB = async () => {
  const rawByCategory = await Feedback.aggregate([
    { $group: { _id: '$category', count: { $sum: 1 } } },
  ]);

  const rawByPriority = await Feedback.aggregate([
    { $group: { _id: '$priority', count: { $sum: 1 } } },
  ]);

  const rawBySentiment = await Feedback.aggregate([
    { $group: { _id: '$sentiment', count: { $sum: 1 } } },
  ]);

  const rawByTeam = await Feedback.aggregate([
    { $group: { _id: '$team', count: { $sum: 1 } } },
  ]);

  const byCategory = allCategories.map(
    (c) => rawByCategory.find((r) => r._id === c) || { _id: c, count: 0 },
  );
  const byPriority = allPriorities.map(
    (p) => rawByPriority.find((r) => r._id === p) || { _id: p, count: 0 },
  );
  const bySentiment = allSentiments.map(
    (s) => rawBySentiment.find((r) => r._id === s) || { _id: s, count: 0 },
  );
  const byTeam = allTeams.map(
    (t) => rawByTeam.find((r) => r._id === t) || { _id: t, count: 0 },
  );

  return { byCategory, byPriority, bySentiment, byTeam };
};

const getFeedbackByIdFromDB = async (id: string) => {
  const feedback = await Feedback.findById(id).lean();

  if (!feedback) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Feedback not found');
  }

  return feedback;
};

const deleteFeedbackFromDB = async (id: string) => {
  const result = await Feedback.deleteOne({ _id: id });

  if (result.deletedCount === 0) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Feedback not found');
  }

  return { success: true };
};

export const feedbackService = {
  createFeedbackInDB,
  getAllFeedbacksFromDB,
  getFeedbackStatsFromDB,
  getFeedbackByIdFromDB,
  deleteFeedbackFromDB,
};
