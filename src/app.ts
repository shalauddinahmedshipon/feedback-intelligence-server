import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import router from './app/routes';
import cookieParser from 'cookie-parser';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import notFound from './app/middlewares/notFound';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './app/config/swagger';   


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
app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument, {
    explorer: true,
    customCss: '.swagger-ui .topbar { display: none }',
    customSiteTitle: 'Feedback Intelligence API Docs',
  })
);

app.use(globalErrorHandler);
app.use(notFound);

export default app;
