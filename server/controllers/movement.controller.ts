import type { Request, Response } from "express";
import { prisma } from "../prisma";

export async function getMovements(_req: Request, res: Response) {
    const movements = await prisma.movement.findMany({
        include: {
            admin: true,
            recipient: true,
            product: true
        },
        orderBy: {
            createdAt: "desc"
        }
    });

    return res.json(movements);
}

export async function createMovement(req: Request, res: Response) {
    try {
        const {
            type,
            quantity,
            reason,
            adminId,
            recipientId,
            productId
        } = req.body;

        const movement = await prisma.movement.create({
            data: {
                type,
                quantity,
                reason,

                adminId: Number(adminId),
                recipientId: recipientId ? Number(recipientId) : null,
                productId: Number(productId)
            },
            include: {
                admin: true,
                recipient: true,
                product: true
            }
        });

        return res.status(201).json(movement);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Failed to create movement" });
    }
}

export async function deleteMovement(req: Request, res: Response) {
    try {
        const { id } = req.params;

        await prisma.movement.delete({
            where: { id: Number(id) }
        });

        return res.json({ message: "deleted" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Failed to delete movement" });
    }
}