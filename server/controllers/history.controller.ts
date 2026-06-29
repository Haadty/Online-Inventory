import type { Request, Response } from "express";
import { prisma } from "../prisma";

export async function getHistory(req: Request, res: Response) {
    const movements = await prisma.movement.findMany({
        include: {
            user: true,
            product: true
        },
        orderBy: {
            createdAt: "desc"
        }
    });

    res.json(movements);
}