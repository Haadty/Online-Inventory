import { useEffect, useState } from "react";

import Layout from "../../components/layout";

import { Box, Button } from "@mui/material";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";

import type { User } from "../../types/user";
import { getUsers } from "../../services/userService";

function Users() {

    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        getUsers()
            .then(setUsers)
            .catch(console.error);
    }, []);

    const admins = users.filter(user => user.role === "ADMIN");
    const normalUsers = users.filter(user => user.role === "USER");

    const columns: GridColDef[] = [
        { field: "id", headerName: "ID", width: 90 },
        { field: "name", headerName: "Name", flex: 1 },
        { field: "email", headerName: "Email", flex: 1 },
        { field: "role", headerName: "Role", flex: 1 }
    ];

    return (
        <Layout title="Users">

            <Box sx={{ mb: 5 }}>

                <Box sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 2
                }}>
                    <h2>Admins</h2>

                    <Button variant="contained">
                        New Admin
                    </Button>
                </Box>

                <Box sx={{ height: 300, width: "100%" }}>
                    <DataGrid
                        rows={admins}
                        columns={columns}
                        pageSizeOptions={[5, 10]}
                    />
                </Box>
            </Box>

            <Box>

                <Box sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 2
                }}>
                    <h2>Users</h2>

                    <Button variant="contained">
                        New User
                    </Button>
                </Box>

                <Box sx={{ height: 300, width: "100%" }}>
                    <DataGrid
                        rows={normalUsers}
                        columns={columns}
                        pageSizeOptions={[5, 10]}
                    />
                </Box>
            </Box>

        </Layout>
    );
}

export default Users;