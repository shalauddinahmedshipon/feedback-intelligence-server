import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { z } from "zod";
import { StructuredOutputParser } from "@langchain/core/output_parsers";
import { FeedbackCategory,FeedbackTeam,FeedbackSentiment,FeedbackPriority } from "../feedback/feedback.interface";
import config from "../../config";

const llm = new ChatGoogleGenerativeAI({
  model: "gemini-2.5-flash", 
  apiKey: config.gemini_api_key,
  temperature: 0.2,           
  maxOutputTokens: 300,
});

const classificationSchema = z.object({
  category: z.enum([
    "bug",
    "feature",
    "billing",
    "ux",
    "security",
    "performance",
    "other",
  ] as const),

  priority: z.enum([
    "low",
    "medium",
    "high",
    "urgent",
  ] as const),

  sentiment: z.enum([
    "positive",
    "neutral",
    "negative",
  ] as const),

  team: z.enum([
    "engineering",
    "product",
    "support",
    "billing",
    "security",
    "design",
  ] as const),
});


// @ts-expect-error Type instantiation is excessively deep and possibly infinite (LangChain + Zod known issue)
const parser = StructuredOutputParser.fromZodSchema(classificationSchema);

export const analyzeFeedback = async (text: string) => {
  console.log("[Gemini] Model used:", llm.model);           // ← add this
  console.log("[Gemini] API Key length:", config.gemini_api_key?.length || "MISSING");
  if (!config.gemini_api_key) {
    throw new Error("GEMINI_API_KEY is not set in environment variables");
  }

  const prompt = `
You are an expert support ticket classifier for a software product company.

Analyze the following user feedback and classify it into exactly these fields:

${parser.getFormatInstructions()}

Rules:
- Be objective and precise.
- Use ONLY the allowed enum values.
- Respond **ONLY** with valid JSON — no explanations, no markdown, no extra text.

User feedback:
"""
${text}
"""
  `;

  try {
    const response = await llm.invoke(prompt);

    // response.content is usually a string with JSON
    const rawOutput = typeof response.content === "string"
      ? response.content
      : JSON.stringify(response.content);

    const parsed = await parser.parse(rawOutput);

    return parsed; 
  } catch (err) {
    console.error("LLM classification failed:", err);

    // Fallback – safe defaults
    return {
      category: FeedbackCategory.Other,
      priority: FeedbackPriority.Medium,
      sentiment: FeedbackSentiment.Neutral,
      team: FeedbackTeam.Support,
    };
  }
};