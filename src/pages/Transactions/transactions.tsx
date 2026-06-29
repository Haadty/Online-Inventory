import Layout from "../../components/layout/layout";

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
        product: "PVC Pipe",
        user: "John Doe",
        type: "Exit",
        quantity: 5
    }
];

const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "product", headerName: "Product", flex: 1 },
    { field: "user", headerName: "User", flex: 1 },
    { field: "type", headerName: "Type", flex: 1 },
    { field: "quantity", headerName: "Quantity", width: 120 }
];

function Transactions() {
    return (
        <Layout title="Transactions">

            <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
                <Button variant="contained">
                    New Transaction
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

export default Transactions;