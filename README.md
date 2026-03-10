# FeedAI - Feedback Intelligence System (Backend)

**FeedAI** is an intelligent feedback management API that allows users to submit feedback, automatically analyzes it using **Google Gemini AI** (categorization, priority, sentiment, team assignment), stores it in MongoDB, routes tickets to the right team, and sends email notifications to responsible team members.

## Project Overview

- **Purpose**: Collect user feedback → AI-powered classification → Smart routing & notifications
- **Key Features**:
  - Submit feedback (message + optional username)
  - AI analysis (Gemini LLM): category, priority, sentiment, assigned team
  - Paginated listing with filters (category, priority, search)
  - Statistics (counts by category, priority, sentiment, team)
  - Get/delete single feedback
  - Team email notifications (configurable via admin settings)
- **Live Frontend**: [https://feedback-intelligence-client.vercel.app/](https://feedback-intelligence-client.vercel.app/)
- **Live API**: [https://feedback-intelligence-server.vercel.app/](https://feedback-intelligence-server.vercel.app/)
- **API Documentation (Swagger)**: [https://feedback-intelligence-server.vercel.app/api-docs/#/](https://feedback-intelligence-server.vercel.app/api-docs/#/)

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (Mongoose ODM)
- **AI Integration**: LangChain + @langchain/google-genai (Google Gemini 2.5 Flash)
- **Validation**: Zod
- **Email**: Nodemailer
- **API Docs**: swagger-jsdoc + swagger-ui-express
- **Other**: cookie-parser, cors, dotenv, http-status-codes
- **Build & Tooling**: TypeScript, ESLint, Prettier, ts-node-dev

## Installation & Local Development

1. Clone the repository

   ```bash
   git clone <your-repo-url>
   cd feed-back-intelligence-system

2. Install dependencies

    ```bash
    npm install

3. Create and configure the .env file

   ```bash
    NODE_ENV=development
    PORT=5000
    DATA_BASE_URL=*******
    GEMINI_API_KEY=******
    EMAIL_USER=*******
    EMAIL_PASS=********

4. Start the development server
   
   ```bash
    npm run dev

