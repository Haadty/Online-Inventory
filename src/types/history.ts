export interface HistoryItem {
    id: number;
    type: "IN" | "OUT";
    quantity: number;
    createdAt: string;

    user: {
        name: string;
    };

    product: {
        name: string;
    };
}