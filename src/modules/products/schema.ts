import z from "zod";

export const createProductSchema = z.object({
  name: z.string().min(8),
  price: z.number().min(50000),
});
