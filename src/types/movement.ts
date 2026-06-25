export type MovementType = "IN" | "OUT";

export interface Movement {
    id: number;
    type: MovementType;
    quantity: number;
    createdAt: string;

    userId: number;
    productId: number;
}