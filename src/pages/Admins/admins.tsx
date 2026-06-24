import Layout from "../../components/Layout/layout";

import {
    Box,
    Button
} from "@mui/material";

import {
    DataGrid,
    type GridColDef
} from "@mui/x-data-grid";

const rows = [
    {
        id: 1,
        name: "Admin Master",
        email: "admin@system.com",
        role: "Manager"
    }
];

const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "name", headerName: "Name", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "role", headerName: "Role", flex: 1 }
];

function Admins() {
    return (
        <Layout title="Admins">

            <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
                <Button variant="contained">
                    New Admin
                </Button>
            </Box>

            <Box sx={{ height: 500, width: "100%" }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSizeOptions={[5, 10]}
                />
            </Box>

        </Layout>
    );
}

export default Admins;