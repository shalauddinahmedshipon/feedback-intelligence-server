import path from 'path';
import yaml from 'yamljs';

const swaggerDocument = {
  openapi: '3.0.3',
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

    // {
    //   url: 'https://your-app-domain.com',
    //   description: 'Production server',
    // },
  ],
  tags: [
    {
      name: 'Feedback',
      description:
        'User feedback operations (create, list, stats, single, delete)',
    },
    // Add more tags here later for other modules
  ],
  paths: {}, // will be filled from feedback.yaml
  components: {}, // will be filled from feedback.yaml
};

// Load the feedback module spec
const feedbackSpec = yaml.load(
  path.join(process.cwd(), 'src/app/modules/feedback/swagger/feedback.yaml'),
);

// Merge the feedback spec into the main document
Object.assign(swaggerDocument.paths, feedbackSpec.paths || {});
Object.assign(swaggerDocument.components, feedbackSpec.components || {});

// ── Add this block for settings ────────────────────────────────────────
const settingsSpec = yaml.load(
  path.join(process.cwd(), 'src/app/modules/settings/swagger/settings.yaml'),
);
Object.assign(swaggerDocument.paths, settingsSpec.paths || {});
Object.assign(swaggerDocument.components, settingsSpec.components || {});

export default swaggerDocument;
