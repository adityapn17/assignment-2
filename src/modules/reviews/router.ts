import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { createReviewSchema } from "./schema.js";
import { prisma } from "../../utils/prisma.js";

export const reviewRouter = new Hono()
  .get("/", async (c) => {
    const reviews = await prisma.review.findMany();
    return c.json(reviews);
  })
  .get("/:id", async (c) => {
    const reviewId = c.req.param("id");
    const review = await prisma.review.findUnique({
      where: {
        id: Number(reviewId),
      },
    });

    if (!review) {
      return c.json({ message: "Review not found" }, 404);
    }
    return c.json(review);
  })
  .post("/", zValidator("json", createReviewSchema), async (c) => {
    const body = c.req.valid("json");
    const newReview = await prisma.todo.create({
      data: {
        title: body.title,
        content: body.content,
      },
    });

    return c.json(newReview, 201);
  });
