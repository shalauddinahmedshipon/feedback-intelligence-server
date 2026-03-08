import path from 'path';
import { Options } from 'swagger-jsdoc';

const swaggerOptions: Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'User Feedback Intelligence System API',
      version: '1.0.0',
      description:
        'API for submitting, analyzing (with AI), and managing user feedback. ' +
        'Includes intelligent ticket routing via Gemini LLM and team email notifications.',
      contact: {
        name: 'MD. SHIPON',
        email: 'shalauddinahmedshipon2018@gmail.com',
      },
    },
    servers: [
      {
        url: 'http://localhost:5000', 
        description: 'Development server',
      },
    //   {
    //     url: 'https://your-deployed-app.com',
    //     description: 'Production server',
    //   },
    ],
    components: {
    },
    tags: [
      {
        name: 'Feedback',
        description: 'User feedback operations (create, list, etc.)',
      },
    ],
  },
apis: [
 
    path.join(process.cwd(), 'src/app/modules/**/*.route.ts'),
    path.join(process.cwd(), 'src/app/modules/**/*.controller.ts'),
  ],
};

export default swaggerOptions;