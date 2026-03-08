import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import router from './app/routes';
import cookieParser from 'cookie-parser';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import notFound from './app/middlewares/notFound';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import swaggerOptions from './app/config/swagger';

const app: Application = express();

// middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: [''], credentials: true }));
app.use('/api', router);
app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});
// ─── Swagger Setup ────────────────────────────────────────────────────────
const specs = swaggerJsdoc(swaggerOptions);

app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(specs, {
    explorer: true,               // enables search bar
    customCss: '.swagger-ui .topbar { display: none }', // optional hide top bar
    customSiteTitle: 'Feedback API Docs',
  })
);

app.use(globalErrorHandler);
app.use(notFound);

export default app;
