import { z } from 'zod';

export const classificationSchema = z.object({
  category: z.enum([
    'bug',
    'feature',
    'billing',
    'ux',
    'security',
    'performance',
    'other',
  ] as const),

  priority: z.enum(['low', 'medium', 'high', 'urgent'] as const),

  sentiment: z.enum(['positive', 'neutral', 'negative'] as const),

  team: z.enum([
    'engineering',
    'product',
    'support',
    'billing',
    'security',
    'design',
  ] as const),
});
