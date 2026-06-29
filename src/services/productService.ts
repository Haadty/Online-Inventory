import { API_URL } from "./api";

import type { Product } from "../types/product";

export async function getProducts(): Promise<Product[]> {
    const res = await fetch(`${API_URL}/products`);
    return res.json();
}

export async function createProduct(data: Omit<Product, "id">) {
    const res = await fetch(`${API_URL}/products`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });

    return res.json();
}

export async function updateProduct(id: number, data: Partial<Product>) {
    const res = await fetch(`${API_URL}/products/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });

    return res.json();
}

export async function deleteProduct(id: number) {
    await fetch(`${API_URL}/products/${id}`, {
        method: "DELETE"
    });
}