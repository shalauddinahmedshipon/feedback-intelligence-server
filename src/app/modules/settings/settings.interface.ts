import { FeedbackTeam } from "../feedback/feedback.interface";

export interface ITeamEmailSettings {
  teamEmails: Record<FeedbackTeam, string>;
  updatedAt?: Date;
}