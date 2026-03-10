import { Router } from 'express';
import { feedbackValidation } from './feedback.validation';
import { feedbackController } from './feedback.controller';
import validationRequest from '../../middlewares/validateRequest';

const router = Router();

router.post(
  '/create-feedback',
  validationRequest(feedbackValidation.createFeedbackValidationSchema),
  feedbackController.createFeedback,
);

router.get('/', feedbackController.getAllFeedbacks);

router.get('/stats', feedbackController.getFeedbackStats);

router.get('/:id', feedbackController.getFeedbackById);

router.delete('/:id', feedbackController.deleteFeedback);

export const feedbackRoutes = router;
