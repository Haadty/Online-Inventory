import type { Request, Response } from "express";
import { prisma } from "../prisma";

export async function getUsers(_req: Request, res: Response) {
    const users = await prisma.user.findMany();
    res.json(users);
}

export async function createUser(req: Request, res: Response) {
    const { name, email, password, role } = req.body;

    const user = await prisma.user.create({
        data: {
            name,
            email,
            password,
            role
        }
    });

    res.json(user);
}

export async function updateUser(req: Request, res: Response) {
    const { id } = req.params;
    const { name, email, password, role } = req.body;

    const user = await prisma.user.update({
        where: { id: Number(id) },
        data: {
            name,
            email,
            password,
            role
        }
    });

    res.json(user);
}

export async function deleteUser(req: Request, res: Response) {
    const { id } = req.params;

    await prisma.user.delete({
        where: { id: Number(id) }
    });

    res.json({ message: "User deleted" });
}