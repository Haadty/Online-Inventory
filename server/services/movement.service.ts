import { API_URL } from "../api";
import type { Movement } from "../../src/types/movement";

export async function getMovements(): Promise<Movement[]> {
    const res = await fetch(`${API_URL}/movements`);
    return res.json();
}

export async function createMovement(movement: Partial<Movement>) {
    const res = await fetch(`${API_URL}/movements`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(movement)
    });

    if (!res.ok) throw new Error("Failed to create movement");

    return res.json();
}

export async function updateMovement(id: number, movement: Partial<Movement>) {
    const res = await fetch(`${API_URL}/movements/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(movement)
    });

    if (!res.ok) throw new Error("Failed to update movement");

    return res.json();
}

export async function deleteMovement(id: number) {
    const res = await fetch(`${API_URL}/movements/${id}`, {
        method: "DELETE"
    });

    if (!res.ok) throw new Error("Failed to delete movement");

    return res.json().catch(() => null);
}