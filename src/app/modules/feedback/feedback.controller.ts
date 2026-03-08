import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { feedbackService } from './feedback.service';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';

export const createFeedback = catchAsync(
  async (req: Request, res: Response) => {
    const result = await feedbackService.createFeedbackInDB(req.body);

    sendResponse(res, {
      statusCode: StatusCodes.CREATED,
      message: 'Feedback created successfully',
      data: result,
    });
  }
);

export const getAllFeedbacks = catchAsync(
  async (_req: Request, res: Response) => {
    const result = await feedbackService.getAllFeedbacksFromDB();

    sendResponse(res, {
      statusCode: StatusCodes.OK,
      message: 'Feedbacks retrieved successfully',
      data: result,
    });
  }
);

export const feedbackController = {
  createFeedback,
  getAllFeedbacks,
};