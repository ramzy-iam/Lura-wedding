import { z } from 'zod';

export const commentSchema = z.object({
  author: z.string().min(1, 'Author is required'),
  comment: z
    .string()
    .min(1, 'Comment is required')
    .max(500, 'Comment must be at most 500 characters'),
  email: z.string().email().optional().nullable(),
});

export const querySchema = z.object({
  page: z.preprocess(
    (val) => Number(val),
    z.number().int().positive().default(1),
  ),
  limit: z.preprocess(
    (val) => Number(val),
    z.number().int().positive().default(10),
  ),
  sort: z.enum(['asc', 'desc']).default('desc'),
});
