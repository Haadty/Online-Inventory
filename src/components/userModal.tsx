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

export type UserInput = Omit<User, "id" | "createdAt" | "updatedAt">;

interface Props {
    open: boolean;
    onClose: () => void;
    onSave: (data: UserInput) => void;
    editing?: User | null;
}

export default function UserModal({
    open,
    onClose,
    onSave,
    editing
}: Props) {

    const [form, setForm] = useState<UserInput>({
        name: "",
        email: "",
        password: "",
        role: "USER"
    });

    useEffect(() => {
        if (editing) {
            setForm({
                name: editing.name,
                email: editing.email,
                password: "", // nunca preenche senha por segurança
                role: editing.role
            });
        } else {
            setForm({
                name: "",
                email: "",
                password: "",
                role: "USER"
            });
        }
    }, [editing, open]);

    function handleChange(field: keyof UserInput, value: any) {
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
                {editing ? "Edit User" : "New User"}
            </DialogTitle>

            <DialogContent>

                <Stack spacing={2} mt={2}>

                    <TextField
                        label="Name"
                        value={form.name}
                        onChange={e => handleChange("name", e.target.value)}
                        fullWidth
                    />

                    <TextField
                        label="Email"
                        value={form.email}
                        onChange={e => handleChange("email", e.target.value)}
                        fullWidth
                    />

                    <TextField
                        label="Password"
                        type="password"
                        value={form.password}
                        onChange={e => handleChange("password", e.target.value)}
                        fullWidth
                    />

                    <TextField
                        select
                        label="Role"
                        value={form.role}
                        onChange={e => handleChange("role", e.target.value)}
                        fullWidth
                    >
                        <MenuItem value="ADMIN">ADMIN</MenuItem>
                        <MenuItem value="USER">USER</MenuItem>
                    </TextField>

                    <Button
                        variant="contained"
                        onClick={handleSubmit}
                    >
                        Save
                    </Button>

                </Stack>

            </DialogContent>
        </Dialog>
    );
}