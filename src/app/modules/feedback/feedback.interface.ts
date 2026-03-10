export enum FeedbackCategory {
  Bug = 'bug',
  Feature = 'feature',
  Billing = 'billing',
  UX = 'ux',
  Performance = 'performance',
  Security = 'security',
  Other = 'other',
}

export enum FeedbackPriority {
  Low = 'low',
  Medium = 'medium',
  High = 'high',
  Urgent = 'urgent',
}

export enum FeedbackSentiment {
  Positive = 'positive',
  Neutral = 'neutral',
  Negative = 'negative',
}

export enum FeedbackTeam {
  Engineering = 'engineering',
  Product = 'product',
  Support = 'support',
  Billing = 'billing',
  Security = 'security',
  Design = 'design',
}

export interface IFeedback extends Document {
  message: string;
  userName?: string;
  category: FeedbackCategory;
  priority: FeedbackPriority;
  sentiment: FeedbackSentiment;
  team: FeedbackTeam;
  createdAt: Date;
}
