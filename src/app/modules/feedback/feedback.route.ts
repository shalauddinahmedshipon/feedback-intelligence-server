import { Router } from 'express';
import { feedbackValidation } from './feedback.validation';
import { feedbackController } from './feedback.controller';
import validationRequest from '../../middlewares/validateRequest';

/**
 * @swagger
 * tags:
 *   - name: Feedback
 */

const router = Router();

/**
 * @swagger
 * /api/feedback/create-feedback:
 *   post:
 *     summary: Create new feedback
 *     tags: [Feedback]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [message]
 *             properties:
 *               message: { type: string, minLength: 10, example: "App is slow" }
 *               userName: { type: string, example: "MD" }
 *     responses:
 *       201:
 *         description: Created
 */
router.post(
  '/create-feedback',
  validationRequest(feedbackValidation.createFeedbackValidationSchema),
  feedbackController.createFeedback
);

/**
 * @swagger
 * /api/feedback:
 *   get:
 *     summary: Get all feedbacks
 *     tags: [Feedback]
 *     responses:
 *       200:
 *         description: List of feedbacks
 */
router.get('/', feedbackController.getAllFeedbacks);

export const feedbackRoutes = router;