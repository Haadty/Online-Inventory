import { API_URL } from "./api";
import type { Movement } from "../types/movement";

export async function getMovements(): Promise<Movement[]> {
    const res = await fetch(`${API_URL}/movements`);
    return res.json();
}

export async function createMovement(data: Omit<Movement, "id" | "createdAt">) {
    const res = await fetch(`${API_URL}/movements`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });

    return res.json();
}