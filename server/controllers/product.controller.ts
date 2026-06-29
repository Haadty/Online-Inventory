import type { Request, Response } from "express";
import { prisma } from "../prisma";

export async function getProducts(_req: Request, res: Response) {
    const products = await prisma.product.findMany();
    res.json(products);
}

export async function createProduct(req: Request, res: Response) {
    const { name, code, quantity, description, price, category, location } = req.body;

    const product = await prisma.product.create({
        data: {
            name,
            code,
            quantity,
            description,
            price,
            category,
            location
        }
    });

    res.json(product);
}

export async function updateProduct(req: Request, res: Response) {
    const { id } = req.params;
    const { name, code, quantity, description, price, category, location } = req.body;

    const product = await prisma.product.update({
        where: { id: Number(id) },
        data: {
            name,
            code,
            quantity,
            description,
            price,
            category,
            location
        }
    });

    res.json(product);
}

export async function deleteProduct(req: Request, res: Response) {
    const { id } = req.params;

    await prisma.product.delete({
        where: { id: Number(id) }
    });

    res.json({ message: "Product deleted" });
}