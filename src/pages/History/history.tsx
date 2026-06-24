import Layout from "../../components/Layout/layout";

import { Box } from "@mui/material";

import {
    DataGrid,
    type GridColDef
} from "@mui/x-data-grid";

const rows = [
    {
        id: 1,
        date: "2026-06-24",
        action: "Product Created",
        product: "PVC Pipe",
        user: "Admin"
    }
];

const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "date", headerName: "Date", flex: 1 },
    { field: "action", headerName: "Action", flex: 1 },
    { field: "product", headerName: "Product", flex: 1 },
    { field: "user", headerName: "User", flex: 1 }
];

function History() {
    return (
        <Layout title="History">

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

export default History;