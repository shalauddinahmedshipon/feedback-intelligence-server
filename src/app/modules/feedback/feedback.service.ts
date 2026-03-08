import { analyzeFeedback } from "../ai/aiAnalyzer";
import { IFeedback } from "./feedback.interface";
import { Feedback } from "./feedback.model";


type TFeedbackCreatePayload = IFeedback;


const createFeedbackInDB = async (payload: TFeedbackCreatePayload) => {
  const { message, userName } = payload;

  // 1. Analyze feedback with AI (Gemini)
  const aiResult = await analyzeFeedback(message);

  // 2. Prepare document
  const feedbackData = {
    message,
    userName?,
    ...aiResult,
  };

  // 3. Save to MongoDB
  const newFeedback = await Feedback.create(feedbackData);

  // 4. Send email to the assigned team (optional but part of requirement)
//   await sendTeamEmail(newFeedback);

  // 5. Return the saved document
  return newFeedback;
};

const getAllFeedbacksFromDB = async () => {
  const feedbacks = await Feedback.find()
    .sort({ createdAt: -1 })
    .lean(); // lean() → faster, plain JS objects

  return feedbacks;
};

export const feedbackService = {
  createFeedbackInDB,
  getAllFeedbacksFromDB,
};