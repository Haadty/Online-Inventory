export interface Movement {
    id: number;
    type: "IN" | "OUT" | "ADJUST";
    quantity: number;
    reason?: string;

    adminId: number;
    recipientId?: number | null;
    productId: number;

    admin?: { id: number; name: string };
    recipient?: { id: number; name: string };
    product?: { id: number; name: string };
}