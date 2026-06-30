import { useEffect, useState } from "react";

import {
    Dialog,
    DialogTitle,
    DialogContent,
    TextField,
    Button,
    MenuItem,
    Stack
} from "@mui/material";

import type { User } from "../types/user";
import type { Product } from "../types/product";
import type { Movement } from "../types/movement";

interface MovementInput {
    type: "IN" | "OUT" | "ADJUST";
    quantity: number;
    reason: string;

    adminId: number | "";
    recipientId: number | "" | null;
    productId: number | "";
}

interface Props {
    open: boolean;
    onClose: () => void;
    onSave: (data: MovementInput) => void;

    users: User[];
    products: Product[];

    editing?: Movement | null;
}

export default function TransactionModal({
    open,
    onClose,
    onSave,
    users,
    products,
    editing
}: Props) {

    const [form, setForm] = useState<MovementInput>({
        type: "OUT",
        quantity: 1,
        reason: "",
        adminId: "",
        recipientId: "",
        productId: ""
    });

    useEffect(() => {
        if (editing) {
            setForm({
                type: editing.type,
                quantity: editing.quantity,
                reason: editing.reason ?? "",

                adminId: editing.adminId ?? "",
                recipientId: editing.recipientId ?? "",
                productId: editing.productId
            });
        } else {
            setForm({
                type: "OUT",
                quantity: 1,
                reason: "",
                adminId: "",
                recipientId: "",
                productId: ""
            });
        }
    }, [editing, open]);

    function handleChange(field: keyof MovementInput, value: any) {
        setForm(prev => ({
            ...prev,
            [field]: value
        }));
    }

    function handleSubmit() {
        onSave(form);
        onClose();
    }

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>
                {editing ? "Edit Transaction" : "New Transaction"}
            </DialogTitle>

            <DialogContent>
                <Stack spacing={2} mt={2}>

                    <TextField
                        select
                        label="Type"
                        value={form.type}
                        onChange={(e) => handleChange("type", e.target.value)}
                    >
                        <MenuItem value="IN">IN</MenuItem>
                        <MenuItem value="OUT">OUT</MenuItem>
                        <MenuItem value="ADJUST">ADJUST</MenuItem>
                    </TextField>

                    <TextField
                        type="number"
                        label="Quantity"
                        value={form.quantity}
                        onChange={(e) =>
                            handleChange("quantity", Number(e.target.value))
                        }
                    />

                    <TextField
                        label="Reason"
                        value={form.reason}
                        onChange={(e) =>
                            handleChange("reason", e.target.value)
                        }
                    />

                    <TextField
                        select
                        label="Admin"
                        value={form.adminId}
                        onChange={(e) =>
                            handleChange("adminId", Number(e.target.value))
                        }
                    >
                        {users
                            .filter(u => u.role === "ADMIN")
                            .map(admin => (
                                <MenuItem key={admin.id} value={admin.id}>
                                    {admin.name}
                                </MenuItem>
                            ))}
                    </TextField>

                    <TextField
                        select
                        label="Recipient (User)"
                        value={form.recipientId ?? ""}
                        onChange={(e) =>
                            handleChange(
                                "recipientId",
                                e.target.value === ""
                                    ? null
                                    : Number(e.target.value)
                            )
                        }
                    >
                        <MenuItem value="">None</MenuItem>

                        {users
                            .filter(u => u.role === "USER")
                            .map(user => (
                                <MenuItem key={user.id} value={user.id}>
                                    {user.name}
                                </MenuItem>
                            ))}
                    </TextField>

                    <TextField
                        select
                        label="Product"
                        value={form.productId}
                        onChange={(e) =>
                            handleChange("productId", Number(e.target.value))
                        }
                    >
                        {products.map(product => (
                            <MenuItem key={product.id} value={product.id}>
                                {product.name}
                            </MenuItem>
                        ))}
                    </TextField>

                    <Button
                        variant="contained"
                        onClick={handleSubmit}
                        disabled={
                            !form.adminId ||
                            !form.productId ||
                            form.quantity <= 0
                        }
                    >
                        Save
                    </Button>

                </Stack>
            </DialogContent>
        </Dialog>
    );
}