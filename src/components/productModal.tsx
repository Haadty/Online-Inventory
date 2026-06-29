import { useEffect, useState } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    TextField,
    Button,
    Stack
} from "@mui/material";

import type { Product } from "../types/product";

interface Props {
    open: boolean;
    onClose: () => void;
    onSave: (data: Omit<Product, "id">) => void;
    editing?: Product | null;
}

export default function ProductModal({ open, onClose, onSave, editing }: Props) {

    const [name, setName] = useState("");
    const [code, setCode] = useState("");
    const [quantity, setQuantity] = useState(0);

    useEffect(() => {
        if (editing) {
            setName(editing.name);
            setCode(editing.code);
            setQuantity(editing.quantity);
        } else {
            setName("");
            setCode("");
            setQuantity(0);
        }
    }, [editing]);

    return (
        <Dialog open={open} onClose={onClose} fullWidth>
            <DialogTitle>
                {editing ? "Edit Product" : "New Product"}
            </DialogTitle>

            <DialogContent>
                <Stack spacing={2} mt={1}>

                    <TextField
                        label="Name"
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />

                    <TextField
                        label="Code"
                        value={code}
                        onChange={e => setCode(e.target.value)}
                    />

                    <TextField
                        label="Quantity"
                        type="number"
                        value={quantity}
                        onChange={e => setQuantity(Number(e.target.value))}
                    />

                    <Button
                        variant="contained"
                        onClick={() => {
                            onSave({ name, code, quantity });
                            onClose();
                        }}
                    >
                        Save
                    </Button>

                </Stack>
            </DialogContent>
        </Dialog>
    );
}