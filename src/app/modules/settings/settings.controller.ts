import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { settingsService } from './settings.service';

const getSettings = catchAsync(async (req: Request, res: Response) => {
  const result = await settingsService.getSettingsFromDB();
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'Settings retrieved successfully',
    data: result,
  });
});

const updateSettings = catchAsync(async (req: Request, res: Response) => {
  const result = await settingsService.updateSettingsInDB(req.body);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'Settings updated successfully',
    data: result,
  });
});

export const settingsController = {
  getSettings,
  updateSettings,
};
