import { API_URL } from "./api";
import type { User } from "../types/user";

export async function getUsers(): Promise<User[]> {
    const res = await fetch(`${API_URL}/users`);
    return res.json();
}