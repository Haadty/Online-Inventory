import { useEffect, useState } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    TextField,
    Button,
    Stack,
    MenuItem,
    Box
} from "@mui/material";

import type { Product, ProductInput } from "../types/product";

interface Props {
    open: boolean;
    onClose: () => void;
    onSave: (data: ProductInput) => void;
    editing?: Product | null;
}

const statusOptions: Product["status"][] = [
    "ACTIVE",
    "INACTIVE",
    "OUT_OF_STOCK"
];

type FormState = Omit<Product, "id" | "createdAt" | "updatedAt">;

export default function ProductModal({
    open,
    onClose,
    onSave,
    editing
}: Props) {

    const [form, setForm] = useState<FormState>({
        name: "",
        code: "",
        description: "",
        category: "",
        quantity: 0,
        minStock: 0,
        maxStock: null,
        price: null,
        costPrice: null,
        location: "",
        status: "ACTIVE"
    });

    useEffect(() => {
        if (editing) {
            setForm({
                name: editing.name,
                code: editing.code,
                description: editing.description ?? "",
                category: editing.category ?? "",
                quantity: editing.quantity,
                minStock: editing.minStock,
                maxStock: editing.maxStock ?? null,
                price: editing.price ?? null,
                costPrice: editing.costPrice ?? null,
                location: editing.location ?? "",
                status: editing.status
            });
        } else {
            setForm({
                name: "",
                code: "",
                description: "",
                category: "",
                quantity: 0,
                minStock: 0,
                maxStock: null,
                price: null,
                costPrice: null,
                location: "",
                status: "ACTIVE"
            });
        }
    }, [editing, open]);

    function handleChange<K extends keyof FormState>(
        field: K,
        value: FormState[K]
    ) {
        setForm(prev => ({
            ...prev,
            [field]: value
        }));
    }

    function toNumberOrNull(value: string): number | null {
        if (value === "") return null;
        const n = Number(value);
        return isNaN(n) ? null : n;
    }

    function handleSubmit() {
        onSave(form);
        onClose();
    }

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
            <DialogTitle>
                {editing ? "Edit Product" : "New Product"}
            </DialogTitle>

            <DialogContent>
                <Stack spacing={2} mt={2}>

                    <Box display="flex" gap={2}>
                        <TextField
                            fullWidth
                            label="Name"
                            value={form.name}
                            onChange={e => handleChange("name", e.target.value)}
                        />

                        <TextField
                            fullWidth
                            label="Code"
                            value={form.code}
                            onChange={e => handleChange("code", e.target.value)}
                        />
                    </Box>

                    <TextField
                        fullWidth
                        label="Description"
                        value={form.description}
                        onChange={e => handleChange("description", e.target.value)}
                    />

                    <Box display="flex" gap={2}>
                        <TextField
                            fullWidth
                            label="Category"
                            value={form.category}
                            onChange={e => handleChange("category", e.target.value)}
                        />

                        <TextField
                            fullWidth
                            label="Location"
                            value={form.location}
                            onChange={e => handleChange("location", e.target.value)}
                        />
                    </Box>

                    <Box display="flex" gap={2}>
                        <TextField
                            fullWidth
                            type="number"
                            label="Quantity"
                            value={form.quantity}
                            onChange={e => handleChange("quantity", Number(e.target.value))}
                        />

                        <TextField
                            fullWidth
                            type="number"
                            label="Min Stock"
                            value={form.minStock}
                            onChange={e => handleChange("minStock", Number(e.target.value))}
                        />

                        <TextField
                            fullWidth
                            type="number"
                            label="Max Stock"
                            value={form.maxStock ?? ""}
                            onChange={e =>
                                handleChange("maxStock", toNumberOrNull(e.target.value))
                            }
                        />
                    </Box>

                    <Box display="flex" gap={2}>
                        <TextField
                            fullWidth
                            type="number"
                            label="Price"
                            value={form.price ?? ""}
                            onChange={e =>
                                handleChange("price", toNumberOrNull(e.target.value))
                            }
                        />

                        <TextField
                            fullWidth
                            type="number"
                            label="Cost Price"
                            value={form.costPrice ?? ""}
                            onChange={e =>
                                handleChange("costPrice", toNumberOrNull(e.target.value))
                            }
                        />
                    </Box>

                    <TextField
                        select
                        label="Status"
                        value={form.status}
                        onChange={e =>
                            handleChange("status", e.target.value as Product["status"])
                        }
                    >
                        {statusOptions.map(status => (
                            <MenuItem key={status} value={status}>
                                {status}
                            </MenuItem>
                        ))}
                    </TextField>

                    <Box display="flex" justifyContent="flex-end" gap={2}>
                        <Button onClick={onClose}>
                            Cancel
                        </Button>

                        <Button variant="contained" onClick={handleSubmit}>
                            Save
                        </Button>
                    </Box>

                </Stack>
            </DialogContent>
        </Dialog>
    );
}