import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { feedbackService } from './feedback.service';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';

const createFeedback = catchAsync(async (req: Request, res: Response) => {
  const result = await feedbackService.createFeedbackInDB(req.body);

  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    message: 'Feedback created successfully',
    data: result,
  });
});

const getAllFeedbacks = catchAsync(async (req: Request, res: Response) => {
  const result = await feedbackService.getAllFeedbacksFromDB(req.query);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'Feedbacks retrieved successfully',
    data: result,
  });
});

const getFeedbackStats = catchAsync(async (req: Request, res: Response) => {
  const result = await feedbackService.getFeedbackStatsFromDB();

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'Feedbacks retrieved successfully',
    data: result,
  });
});

const getFeedbackById = catchAsync(async (req: Request, res: Response) => {
  const result = await feedbackService.getFeedbackByIdFromDB(req.params.id);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'Feedback retrieved successfully',
    data: result,
  });
});

const deleteFeedback = catchAsync(async (req: Request, res: Response) => {
  const result = await feedbackService.deleteFeedbackFromDB(req.params.id);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'Feedback deleted successfully',
    data: result,
  });
});

export const feedbackController = {
  createFeedback,
  getAllFeedbacks,
  getFeedbackStats,
  deleteFeedback,
  getFeedbackById,
};
