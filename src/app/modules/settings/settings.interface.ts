import { FeedbackTeam } from '../feedback/feedback.interface';

export interface ITeamEmailSettings {
  teamEmails: Map<FeedbackTeam, string>;
  updatedAt?: Date;
}
