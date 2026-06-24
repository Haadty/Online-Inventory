import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

app.get("/products", async (req, res) => {
  const products = await prisma.product.findMany();
  res.json(products);
});

app.post("/products", async (req, res) => {
  const product = await prisma.product.create({
    data: req.body
  });

  res.json(product);
});

app.listen(3001, () => {
  console.log("API running on http://localhost:3001");
});