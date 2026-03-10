import { Router } from 'express';
import { settingsController } from './settings.controller';
import { settingsValidation } from './settings.validation';
import validationRequest from '../../middlewares/validateRequest';

const router = Router();

router.get('/', settingsController.getSettings);

router.patch(
  '/update-settings',
  validationRequest(settingsValidation.updateSettingsValidationSchema),
  settingsController.updateSettings,
);

export const settingsRoutes = router;
