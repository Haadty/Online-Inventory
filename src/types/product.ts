export interface Product {
    id: number;

    name: string;
    code: string;

    description?: string | null;
    category?: string | null;

    quantity: number;
    minStock: number;
    maxStock?: number | null;

    price?: number | null;
    costPrice?: number | null;

    location?: string | null;

    status: "ACTIVE" | "INACTIVE" | "OUT_OF_STOCK";

    createdAt: string;
    updatedAt: string;
}

export type ProductInput = Omit<
    Product,
    "id" | "createdAt" | "updatedAt"
>;