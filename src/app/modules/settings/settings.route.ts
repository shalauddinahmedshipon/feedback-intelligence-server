import { Router } from "express";
import { settingsController } from "./settings.controller";
import { settingsValidation } from "./settings.validation";
import validationRequest from "../../middlewares/validateRequest";

/**
 * @swagger
 * tags:
 *   name: Settings
 *   description: Team email configuration
 */

const router = Router();

/**
 * @swagger
 * /api/settings:
 *   get:
 *     summary: Get team email settings
 *     tags: [Settings]
 *     responses:
 *       200:
 *         description: Success
 */
router.get("/", settingsController.getSettings);

/**
 * @swagger
 * /api/settings/update-settings:
 *   patch:
 *     summary: Update team email settings
 *     tags: [Settings]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               teamEmails:
 *                 type: object
 *                 additionalProperties:
 *                   type: string
 *                   format: email
 *                 example:
 *                   engineering: "eng@company.com"
 *                   product: "product@company.com"
 *                   support: "support@company.com"
 *                   billing: "billing@company.com"
 *                   design: "design@company.com"
 *                   security: "security@company.com"
 *     responses:
 *       200:
 *         description: Updated successfully
 */
router.patch(
  "/update-settings",
  validationRequest(settingsValidation.updateSettingsValidationSchema),
  settingsController.updateSettings
);

export const settingsRoutes = router;