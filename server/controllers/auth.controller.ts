import type { Request, Response } from "express";
import { prisma } from "../prisma";

export async function login(req: Request, res: Response) {
    const { email, password } = req.body;

    const user = await prisma.user.findFirst({
        where: {
            email,
            password
        }
    });

    if (!user) {
        return res.status(401).json({
            message: "Invalid credentials"
        });
    }

    if (user.role !== "ADMIN") {
        return res.status(403).json({
            message: "Access denied: only admins"
        });
    }

    return res.json({
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
    });
}