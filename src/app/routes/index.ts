import { Router } from 'express';
import { feedbackRoutes } from '../modules/feedback/feedback.route';


const router = Router();

const moduleRoutes = [
 {
  path:"/feedback",
  route:feedbackRoutes
 }
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
