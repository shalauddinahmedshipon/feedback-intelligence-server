import { Schema, model } from "mongoose";
import { ITeamEmailSettings } from "./settings.interface";
import { FeedbackTeam } from "../feedback/feedback.interface";

const settingsSchema = new Schema<ITeamEmailSettings>(
  {
    teamEmails: {
      type: Map,
      of: String,
      default: {
        [FeedbackTeam.Engineering]: "eng@example.com",
        [FeedbackTeam.Product]: "product@example.com",
        [FeedbackTeam.Support]: "support@example.com",
        [FeedbackTeam.Billing]: "finance@example.com",
        [FeedbackTeam.Design]: "design@example.com",
        [FeedbackTeam.Security]: "security@example.com",
      },
    },
  },
  { timestamps: true }
);

export const Settings = model<ITeamEmailSettings>("Settings", settingsSchema);