import { API_URL } from "./api";
import type { User } from "../types/user";

export async function getUsers(): Promise<User[]> {
    const res = await fetch(`${API_URL}/users`);
    return res.json();
}

export async function createUser(user: Omit<User, "id">) {
    const res = await fetch(`${API_URL}/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user)
    });

    return res.json();
}

export async function updateUser(id: number, user: Omit<User, "id">) {
    const res = await fetch(`${API_URL}/users/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user)
    });

    return res.json();
}

export async function deleteUser(id: number) {
    const res = await fetch(`${API_URL}/users/${id}`, {
        method: "DELETE"
    });

    return res.json();
}