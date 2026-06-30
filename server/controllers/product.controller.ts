import type { Request, Response } from "express";
import { prisma } from "../prisma";

export async function getProducts(_req: Request, res: Response) {
    const products = await prisma.product.findMany();
    res.json(products);
}

export async function createProduct(req: Request, res: Response) {
    try {
        const {
            name,
            code,
            quantity,
            description,
            price,
            category,
            location,
            minStock,
            maxStock,
            costPrice,
            status
        } = req.body;

        const product = await prisma.product.create({
            data: {
                name,
                code,
                quantity: quantity ?? 0,
                description: description ?? null,
                price: price ?? null,
                category: category ?? null,
                location: location ?? null,
                minStock: minStock ?? 0,
                maxStock: maxStock ?? null,
                costPrice: costPrice ?? null,
                status: status ?? "ACTIVE"
            }
        });

        return res.status(201).json(product);
    } catch (err) {
        console.error("PRISMA ERROR FULL:", err);
        return res.status(500).json({
            error: err instanceof Error ? err.message : err
        });
    }
}

export async function updateProduct(req: Request, res: Response) {
    try {
        const { id } = req.params;

        const {
            name,
            code,
            quantity,
            description,
            price,
            category,
            location,
            minStock,
            maxStock,
            costPrice,
            status
        } = req.body;

        const product = await prisma.product.update({
            where: { id: Number(id) },
            data: {
                name,
                code,
                quantity,
                description,
                price,
                category,
                location,
                minStock,
                maxStock,
                costPrice,
                status
            }
        });

        return res.json(product);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Failed to update product" });
    }
}

export async function deleteProduct(req: Request, res: Response) {
    const { id } = req.params;

    await prisma.product.delete({
        where: { id: Number(id) }
    });

    res.json({ message: "Product deleted" });
}