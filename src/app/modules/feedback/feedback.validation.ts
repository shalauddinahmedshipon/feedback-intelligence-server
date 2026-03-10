import { z } from 'zod';

const createFeedbackValidationSchema = z.object({
  body: z.object({
    message: z
      .string({
        required_error: 'Message is required',
        invalid_type_error: 'Message must be a string',
      })
      .min(10, {
        message: 'Feedback message must be at least 10 characters long',
      })
      .max(2000, { message: 'Feedback message cannot exceed 2000 characters' })
      .trim(),

    userName: z
      .string({
        invalid_type_error: 'User name must be a string',
      })
      .max(100, { message: 'Name cannot exceed 100 characters' })
      .trim()
      .optional(),
  }),
});

export const feedbackValidation = {
  createFeedbackValidationSchema,
};
