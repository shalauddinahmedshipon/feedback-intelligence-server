import { model, Schema } from "mongoose";
import { FeedbackCategory, FeedbackPriority, FeedbackSentiment, FeedbackTeam, IFeedback } from "./feedback.interface";

const feedbackSchema = new Schema<IFeedback>({
  message: { type: String, required: true },

  userName: { type: String },

  category: {
    type: String,
    required: true,
    enum: {
      values: Object.values(FeedbackCategory),
      message: '{VALUE} is not a valid category',
    },
  },

  priority: {
    type: String,
    required: true,
    enum: {
      values: Object.values(FeedbackPriority),
      message: '{VALUE} is not a valid priority',
    },
  },

  sentiment: {
    type: String,
    required: true,
    enum: {
      values: Object.values(FeedbackSentiment),
      message: '{VALUE} is not a valid sentiment',
    },
  },

  team: {
    type: String,
    required: true,
    enum: {
      values: Object.values(FeedbackTeam),
      message: '{VALUE} is not a valid team',
    },
  },

  createdAt: { type: Date, default: Date.now },
});

export const Feedback= model<IFeedback>('Feedback', feedbackSchema);