export type User = {
    id: number;
    name: string;
    email: string;
    password: string; 
    role: "ADMIN" | "USER";
    createdAt?: string;
    updatedAt?: string;
};

export type UserInput = {
    name: string;
    email: string;
    password: string;
    role: "ADMIN" | "USER";
};