import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { createProductSchema } from "./schema.js";
import { prisma } from "../../utils/prisma.js";

export const productRouter = new Hono()
  .get("/", async (c) => {
    const products = await prisma.product.findMany();
    return c.json(products);
  })
  .get("/:id", async (c) => {
    const productId = c.req.param("id");
    const product = await prisma.product.findUnique({
      where: {
        id: Number(productId),
      },
    });

    if (!product) {
      return c.json({ message: "Product not found" }, 404);
    }
    return c.json(product);
  })
  .post("/", zValidator("json", createProductSchema), async (c) => {
    const body = c.req.valid("json");
    const newProduct = await prisma.product.create({
      data: {
        name: body.name,
        price: body.price,
      },
    });

    return c.json(newProduct, 201);
  });
