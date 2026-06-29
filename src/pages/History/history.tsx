import { useEffect, useState } from "react";

import Layout from "../../components/layout";
import { Box } from "@mui/material";

import {
    DataGrid,
    type GridColDef
} from "@mui/x-data-grid";

import type { HistoryItem } from "../../types/history";
import { getHistory } from "../../services/historyService";

function History() {

    const [rows, setRows] = useState<HistoryItem[]>([]);

    useEffect(() => {
        getHistory()
            .then(setRows)
            .catch(console.error);
    }, []);

    const columns: GridColDef<HistoryItem>[] = [
        {
            field: "id",
            headerName: "ID",
            width: 90
        },

        {
            field: "createdAt",
            headerName: "Date",
            flex: 1,
            valueGetter: (params) =>
                new Date(params.row.createdAt).toLocaleString()
        },

        {
            field: "type",
            headerName: "Action",
            flex: 1
        },

        {
            field: "product",
            headerName: "Product",
            flex: 1,
            valueGetter: (params) =>
                params.row.product.name
        },

        {
            field: "user",
            headerName: "User",
            flex: 1,
            valueGetter: (params) =>
                params.row.user.name
        }
    ];

    return (
        <Layout title="History">

            <Box sx={{ height: 500, width: "100%" }}>
                <DataGrid<HistoryItem>
                    rows={rows}
                    columns={columns}
                    getRowId={(row) => row.id}
                />
            </Box>

        </Layout>
    );
}

export default History;