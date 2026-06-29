import { API_URL } from "../api";
import type { Product } from "../../src/types/product";

export async function getProducts(): Promise<Product[]> {
    const res = await fetch(`${API_URL}/products`);
    return res.json();
}

export async function createProduct(product: Partial<Product>) {
    const res = await fetch(`${API_URL}/products`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(product)
    });

    return res.json();
}

export async function updateProduct(id: number, product: Partial<Product>) {
    const res = await fetch(`${API_URL}/products/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(product)
    });

    return res.json();
}

export async function deleteProduct(id: number) {
    const res = await fetch(`${API_URL}/products/${id}`, {
        method: "DELETE"
    });

    return res.json();
}