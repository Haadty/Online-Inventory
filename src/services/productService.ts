import { API_URL } from "./api";
import type { Product, ProductInput } from "../types/product";

export async function getProducts(): Promise<Product[]> {
    const res = await fetch(`${API_URL}/products`);
    return res.json();
}

export async function createProduct(data: ProductInput) {
    const res = await fetch(`${API_URL}/products`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });

    if (!res.ok) {
        const error = await res.text();
        throw new Error(error);
    }

    return res.json();
}

export async function updateProduct(id: number, data: ProductInput) {
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