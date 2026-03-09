import { Router } from "express";
import { feedbackValidation } from "./feedback.validation";
import { feedbackController } from "./feedback.controller";
import validationRequest from "../../middlewares/validateRequest";

const router = Router();

router.post(
  "/create-feedback",
  validationRequest(feedbackValidation.createFeedbackValidationSchema),
  feedbackController.createFeedback
);

router.get("/", feedbackController.getAllFeedbacks);

router.get("/stats", feedbackController.getFeedbackStats);

router.get("/:id", feedbackController.getFeedbackById);

router.delete("/:id", feedbackController.deleteFeedback);

export const feedbackRoutes = router;



// import { Router } from "express";
// import { feedbackValidation } from "./feedback.validation";
// import { feedbackController } from "./feedback.controller";
// import validationRequest from "../../middlewares/validateRequest";

// /**
//  * @swagger
//  * tags:
//  *   name: Feedback
//  *   description: Feedback management APIs
//  */

// const router = Router();

// /**
//  * @swagger
//  * /api/feedback/create-feedback:
//  *   post:
//  *     summary: Create new feedback
//  *     tags: [Feedback]
//  *     description: Submit a new feedback which will be automatically classified by AI (category, priority, sentiment, team).
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             required:
//  *               - message
//  *             properties:
//  *               message:
//  *                 type: string
//  *                 minLength: 10
//  *                 example: "The payment page crashes when I try to checkout"
//  *               userName:
//  *                 type: string
//  *                 example: "John Doe"
//  *     responses:
//  *       201:
//  *         description: Feedback created successfully
//  */

// router.post(
//   "/create-feedback",
//   validationRequest(feedbackValidation.createFeedbackValidationSchema),
//   feedbackController.createFeedback
// );



// /**
//  * @swagger
//  * /api/feedback:
//  *   get:
//  *     summary: Get all feedbacks with pagination, filtering, and search
//  *     description: |
//  *       Retrieve a paginated list of user feedbacks.
//  *       
//  *       - **Exact filters**: `category` and `priority` support exact matches (recommended for dropdown/select inputs).
//  *       - **Free-text search**: Use the `search` parameter for case-insensitive partial matching across:
//  *         - feedback message
//  *         - user name
//  *         - category
//  *         - priority
//  *       
//  *       Results are sorted by creation date (newest first).
//  *     tags: [Feedback]
//  *     parameters:
//  *       - in: query
//  *         name: page
//  *         schema:
//  *           type: integer
//  *           minimum: 1
//  *         example: 1
//  *         description: Page number (starts at 1)
//  *
//  *       - in: query
//  *         name: limit
//  *         schema:
//  *           type: integer
//  *           minimum: 1
//  *           maximum: 100
//  *         example: 10
//  *         description: Number of items per page (recommended max 50–100)
//  *
//  *       - in: query
//  *         name: category
//  *         schema:
//  *           type: string
//  *           enum: [bug, feature, billing, ux, security, performance, other]
//  *         example: bug
//  *         description: Exact filter by feedback category
//  *
//  *       - in: query
//  *         name: priority
//  *         schema:
//  *           type: string
//  *           enum: [low, medium, high, urgent]
//  *         example: high
//  *         description: Exact filter by feedback priority
//  *
//  *       - in: query
//  *         name: search
//  *         schema:
//  *           type: string
//  *         example: payment crash
//  *         description: |
//  *           Case-insensitive partial text search across:
//  *           - feedback message
//  *           - user name
//  *           - category name
//  *           - priority name
//  *           
//  *           Example: `search=payment` will match "Payment failed", "userName: PaymentGuy", "category: billing", etc.
//  *
//  *     responses:
//  *       200:
//  *         description: Feedback list retrieved successfully
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 meta:
//  *                   type: object
//  *                   properties:
//  *                     page:
//  *                       type: integer
//  *                     limit:
//  *                       type: integer
//  *                     total:
//  *                       type: integer
//  *                     totalPage:
//  *                       type: integer
//  *                 data:
//  *                   type: array
//  *                   items:
//  *                     $ref: '#/components/schemas/Feedback'
//  *       400:
//  *         description: Invalid query parameters
//  *       500:
//  *         description: Server error
//  *
//  * components:
//  *   schemas:
//  *     Feedback:
//  *       type: object
//  *       properties:
//  *         _id:
//  *           type: string
//  *         message:
//  *           type: string
//  *         category:
//  *           type: string
//  *           enum: [bug, feature, billing, ux, security, performance, other]
//  *         priority:
//  *           type: string
//  *           enum: [low, medium, high, urgent]
//  *         sentiment:
//  *           type: string
//  *           enum: [positive, neutral, negative]
//  *         team:
//  *           type: string
//  *           enum: [engineering, product, support, billing, security, design]
//  *         userName:
//  *           type: string
//  *         createdAt:
//  *           type: string
//  *           format: date-time
//  *         # ... other fields as needed
//  */
// router.get("/", feedbackController.getAllFeedbacks);



// /**
//  * @swagger
//  * /api/feedback/stats:
//  *   get:
//  *     summary: Get feedback statistics
//  *     description: Returns aggregated feedback counts grouped by category and priority.
//  *     tags: [Feedback]
//  *     responses:
//  *       200:
//  *         description: Feedback statistics retrieved successfully
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 byCategory:
//  *                   type: array
//  *                   items:
//  *                     type: object
//  *                     properties:
//  *                       _id:
//  *                         type: string
//  *                         example: bug
//  *                       count:
//  *                         type: integer
//  *                         example: 12
//  *                 byPriority:
//  *                   type: array
//  *                   items:
//  *                     type: object
//  *                     properties:
//  *                       _id:
//  *                         type: string
//  *                         example: high
//  *                       count:
//  *                         type: integer
//  *                         example: 5
//  */

// router.get("/stats", feedbackController.getFeedbackStats);






// /**
//  * @swagger
//  * /api/feedback/{id}:
//  *   get:
//  *     summary: Get a single feedback by ID
//  *     description: Retrieve detailed information about a specific feedback entry using its MongoDB ID.
//  *     tags: [Feedback]
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         required: true
//  *         schema:
//  *           type: string
//  *         description: MongoDB ObjectId of the feedback (24-character hex string)
//  *         example: 507f1f77bcf86cd799439011
//  *     responses:
//  *       200:
//  *         description: Feedback retrieved successfully
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 success:
//  *                   type: boolean
//  *                 statusCode:
//  *                   type: integer
//  *                 message:
//  *                   type: string
//  *                 data:
//  *                   $ref: '#/components/schemas/Feedback'
//  *       404:
//  *         description: Feedback not found
//  *       400:
//  *         description: Invalid ID format
//  *       500:
//  *         description: Server error
//  */
// router.get("/:id", feedbackController.getFeedbackById);

// /**
//  * @swagger
//  * /api/feedback/{id}:
//  *   delete:
//  *     summary: Delete a feedback by ID
//  *     description: Permanently remove a feedback entry from the database.
//  *     tags: [Feedback]
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         required: true
//  *         schema:
//  *           type: string
//  *         description: MongoDB ObjectId of the feedback to delete
//  *         example: 507f1f77bcf86cd799439011
//  *     responses:
//  *       404:
//  *         description: Feedback not found
//  *       400:
//  *         description: Invalid ID format
//  *       500:
//  *         description: Server error
//  */
// router.delete("/:id", feedbackController.deleteFeedback);

// export const feedbackRoutes = router;