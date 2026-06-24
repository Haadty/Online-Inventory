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
        name: "John Doe",
        cpf: "123.456.789-00",
        department: "Public Works"
    }
];

const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "name", headerName: "Name", flex: 1 },
    { field: "cpf", headerName: "CPF", flex: 1 },
    { field: "department", headerName: "Department", flex: 1 }
];

function Users() {
    return (
        <Layout title="Users">

            <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
                <Button variant="contained">
                    New User
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

export default Users;