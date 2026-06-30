import { useEffect, useState } from "react";

import Layout from "../../components/layout";
import UserModal from "../../components/userModal";

import {
    Box,
    Button
} from "@mui/material";

import {
    DataGrid,
    type GridColDef
} from "@mui/x-data-grid";

import type { User, UserInput } from "../../types/user";
import {
    getUsers,
    createUser,
    updateUser,
    deleteUser
} from "../../services/userService";

function Users() {

    const [users, setUsers] = useState<User[]>([]);
    const [open, setOpen] = useState(false);
    const [editing, setEditing] = useState<User | null>(null);

    async function loadUsers() {
        const data = await getUsers();
        setUsers(data);
    }

    useEffect(() => {
        loadUsers();
    }, []);

    async function handleSave(data: UserInput) {
        if (editing) {
            await updateUser(editing.id, data);
        } else {
            await createUser(data);
        }

        await loadUsers();
    }
    
    async function handleDelete(id: number) {
        await deleteUser(id);
        await loadUsers();
    }

    const columns: GridColDef[] = [
        { field: "id", headerName: "ID", width: 80 },
        { field: "name", headerName: "Name", flex: 1 },
        { field: "email", headerName: "Email", flex: 1 },

        {
            field: "role",
            headerName: "Role",
            width: 120,
            renderCell: (params) => (
                <Box
                    sx={{
                        fontWeight: "bold",
                        color: params.row.role === "ADMIN" ? "red" : "green"
                    }}
                >
                    {params.row.role}
                </Box>
            )
        },

        {
            field: "actions",
            headerName: "Actions",
            width: 200,
            renderCell: (params) => (
                <>
                    <Button
                        size="small"
                        onClick={() => {
                            setEditing(params.row);
                            setOpen(true);
                        }}
                    >
                        Edit
                    </Button>

                    <Button
                        size="small"
                        color="error"
                        onClick={() => handleDelete(params.row.id)}
                    >
                        Delete
                    </Button>
                </>
            )
        }
    ];

    return (
        <Layout title="Users">

            {/* HEADER */}
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 2
                }}
            >
                <h2>Users</h2>

                <Button
                    variant="contained"
                    onClick={() => {
                        setEditing(null);
                        setOpen(true);
                    }}
                >
                    New User
                </Button>
            </Box>

            {/* GRID ÚNICO */}
            <Box sx={{ height: 500 }}>
                <DataGrid
                    rows={users}
                    columns={columns}
                    getRowId={(row) => row.id}
                />
            </Box>

            <UserModal
                open={open}
                onClose={() => setOpen(false)}
                onSave={handleSave}
                editing={editing}
            />

        </Layout>
    );
}

export default Users;