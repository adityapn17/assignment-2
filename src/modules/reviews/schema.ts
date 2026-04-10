import z from "zod";

export const createReviewSchema = z.object({
  title: z.string().min(4),
  content: z.string().min(4),
});
