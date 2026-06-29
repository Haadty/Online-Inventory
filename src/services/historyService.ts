import { API_URL } from "./api";
import type { HistoryItem } from "../types/history";

export async function getHistory(): Promise<HistoryItem[]> {
    const res = await fetch(`${API_URL}/history`);
    return res.json();
}