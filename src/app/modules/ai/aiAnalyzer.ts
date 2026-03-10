import { ChatGoogleGenerativeAI } from '@langchain/google-genai';
import { StructuredOutputParser } from '@langchain/core/output_parsers';
import {
  FeedbackCategory,
  FeedbackTeam,
  FeedbackSentiment,
  FeedbackPriority,
} from '../feedback/feedback.interface';
import config from '../../config';
import { classificationSchema } from './structuredOutput.validation';
import { prompt } from './prompt.template';

const llm = new ChatGoogleGenerativeAI({
  model: 'gemini-2.5-flash',
  apiKey: config.gemini_api_key,
  temperature: 0,
  maxOutputTokens: 1024,
});

// @ts-expect-error Type instantiation is excessively deep and possibly infinite (LangChain + Zod known issue)
const parser = StructuredOutputParser.fromZodSchema(classificationSchema);

export const analyzeFeedback = async (text: string) => {
  if (!config.gemini_api_key) {
    throw new Error('GEMINI_API_KEY is not set in environment variables');
  }

  try {
    const response = await llm.invoke(prompt(text));

    let rawOutput =
      typeof response.content === 'string'
        ? response.content
        : JSON.stringify(response.content);

    // 1. Remove Markdown code blocks if they exist
    rawOutput = rawOutput.replace(/```json|```/g, '').trim();

    // 2. Extract only the portion between the first { and the last }
    const firstBracket = rawOutput.indexOf('{');
    const lastBracket = rawOutput.lastIndexOf('}');

    if (firstBracket === -1 || lastBracket === -1) {
      throw new Error('No JSON object found in response');
    }

    const cleanJson = rawOutput.substring(firstBracket, lastBracket + 1);

    // 3. Parse using the StructuredOutputParser
    return await parser.parse(cleanJson);
  } catch (err) {
    console.error('LLM classification failed:', err);

    // Fallback – safe defaults
    return {
      category: FeedbackCategory.Other,
      priority: FeedbackPriority.Medium,
      sentiment: FeedbackSentiment.Neutral,
      team: FeedbackTeam.Support,
    };
  }
};
