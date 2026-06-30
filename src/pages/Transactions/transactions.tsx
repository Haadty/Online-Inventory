import { useEffect, useState } from "react";

import Layout from "../../components/layout";
import TransactionModal from "../../components/transactionModal";

import {
    Box,
    Button
} from "@mui/material";

import {
    DataGrid,
    type GridColDef
} from "@mui/x-data-grid";

import type { Movement } from "../../types/movement";
import type { User } from "../../types/user";
import type { Product } from "../../types/product";

import { getMovements, createMovement } from "../../services/movementService";
import { getUsers } from "../../services/userService";
import { getProducts } from "../../services/productService";

function Transactions() {

    const [movements, setMovements] = useState<Movement[]>([]);
    const [users, setUsers] = useState<User[]>([]);
    const [products, setProducts] = useState<Product[]>([]);

    const [open, setOpen] = useState(false);

    async function loadAll() {
        const [m, u, p] = await Promise.all([
            getMovements(),
            getUsers(),
            getProducts()
        ]);

        setMovements(m);
        setUsers(u);
        setProducts(p);
    }

    useEffect(() => {
        loadAll();
    }, []);

    async function handleSave(data: any) {
        await createMovement(data);
        await loadAll();
    }

    const columns: GridColDef[] = [
        { field: "id", headerName: "ID", width: 70 },

        {
            field: "product",
            headerName: "Product",
            flex: 1,
            valueGetter: (_, row) => row.product?.name ?? "-"
        },

        {
            field: "admin",
            headerName: "Admin",
            flex: 1,
            valueGetter: (_, row) => row.product?.name ?? "-"
        },

        {
            field: "recipient",
            headerName: "Recipient",
            flex: 1,
            valueGetter: (_, row) =>
                row.recipient?.name ?? "-"
        },

        { field: "type", headerName: "Type", width: 120 },

        { field: "quantity", headerName: "Qty", width: 100 },

        { field: "reason", headerName: "Reason", flex: 1 }
    ];

    return (
        <Layout title="Transactions">

            <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
                <Button
                    variant="contained"
                    onClick={() => setOpen(true)}
                >
                    New Transaction
                </Button>
            </Box>

            <Box sx={{ height: 520 }}>
                <DataGrid
                    rows={movements}
                    columns={columns}
                    getRowId={(row) => row.id}
                />
            </Box>

            <TransactionModal
                open={open}
                onClose={() => setOpen(false)}
                onSave={handleSave}
                users={users}
                products={products}
            />

        </Layout>
    );
}

export default Transactions;