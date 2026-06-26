import express from "express";
import cors from "cors";

import { PrismaClient } from "../generated/prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";

const app = express();

const adapter = new PrismaBetterSqlite3({
  url: process.env.DATABASE_URL || "file:./dev.db",
});

export const prisma = new PrismaClient({ adapter });

app.use(cors());
app.use(express.json());

app.get("/products", async (req, res) => {
  const products = await prisma.product.findMany();
  res.json(products);
});

app.listen(3001, () => {
  console.log("API running on http://localhost:3001");
});