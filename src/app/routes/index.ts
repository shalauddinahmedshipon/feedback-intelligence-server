import { Router } from 'express';
import { feedbackRoutes } from '../modules/feedback/feedback.route';
import { settingsRoutes } from '../modules/settings/settings.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/feedback',
    route: feedbackRoutes,
  },
  {
    path: '/settings',
    route: settingsRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
