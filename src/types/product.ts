export interface Product {
    id: number;
    name: string;
    code: string;
    description?: string;
    quantity: number;
    createdAt: string;
    createdById: number;
}