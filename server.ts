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

app.listen(3001, () => {
    console.log("API running on port 3001");
});