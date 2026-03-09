import dotenv from 'dotenv';
import path from 'path';

dotenv.config({
  path: path.join((process.cwd(), '.env')),
});

export default {
  port: process.env.PORT,
  database_url: process.env.DATA_BASE_URL,
  node_env: process.env.NODE_ENV,
  gemini_api_key:process.env.GEMINI_API_KEY,
  email_user:process.env.EMAIL_USER,
  email_pass:process.env.EMAIL_PASS
};
