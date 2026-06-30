import { useEffect, useState } from "react";

import Layout from "../../components/layout";
import ProductModal from "../../components/productModal";

import {
    getProducts,
    createProduct,
    updateProduct,
    deleteProduct,
} from "../../services/productService";

import type { Product, ProductInput } from "../../types/product";

import Grid from "@mui/material/Grid";

import { DataGrid, type GridColDef } from "@mui/x-data-grid";

import { Button, Card, CardContent, Typography, Chip } from "@mui/material";

function Products() {
    const [products, setProducts] = useState<Product[]>([]);
    const [open, setOpen] = useState(false);
    const [editing, setEditing] = useState<Product | null>(null);

    async function loadProducts() {
        const data = await getProducts();
        setProducts(data);
    }

    useEffect(() => {
        loadProducts();
    }, []);

    async function handleDelete(id: number) {
        await deleteProduct(id);
        await loadProducts();
    }

    async function handleSave(data: ProductInput) {
        if (editing) {
            await updateProduct(editing.id, data);
        } else {
            await createProduct(data);
        }

        await loadProducts();
    }

    const totalProducts = products.length;

    const lowStock = products.filter((p) => p.quantity <= p.minStock).length;

    const outOfStock = products.filter((p) => p.status === "OUT_OF_STOCK").length;

    const columns: GridColDef[] = [
        { field: "id", headerName: "ID", width: 70 },

        { field: "name", headerName: "Name", flex: 1, minWidth: 150 },

        { field: "code", headerName: "Code", flex: 1, minWidth: 120 },

        {
            field: "category",
            headerName: "Category",
            flex: 1,
            minWidth: 120,
        },

        {
            field: "quantity",
            headerName: "Stock",
            width: 100,
        },

        {
            field: "minStock",
            headerName: "Min",
            width: 80,
        },

        {
            field: "price",
            headerName: "Price",
            width: 100,
            valueFormatter: (value) =>
                value ? `R$ ${Number(value).toFixed(2)}` : "-",
        },

        {
            field: "status",
            headerName: "Status",
            width: 140,
            renderCell: (params) => {
                const status = params.row.status;

                const color =
                    status === "ACTIVE"
                        ? "success"
                        : status === "INACTIVE"
                            ? "warning"
                            : "error";

                return <Chip label={status} color={color as any} size="small" />;
            },
        },

        {
            field: "actions",
            headerName: "Actions",
            width: 200,
            sortable: false,
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
            ),
        },
    ];

    return (
        <Layout title="Products">
            <Grid container spacing={2} sx={{ mb: 3 }}>
                <Grid size={{ xs: 12, md: 4 }}>
                    <Card>
                        <CardContent>
                            <Typography>Total Products</Typography>
                            <Typography variant="h4">{totalProducts}</Typography>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid size={{ xs: 12, md: 4 }}>
                    <Card>
                        <CardContent>
                            <Typography>Low Stock</Typography>
                            <Typography variant="h4" color="warning.main">
                                {lowStock}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid size={{ xs: 12, md: 4 }}>
                    <Card>
                        <CardContent>
                            <Typography>Out of Stock</Typography>
                            <Typography variant="h4" color="error.main">
                                {outOfStock}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            <Button
                variant="contained"
                size="large"
                onClick={() => {
                    setEditing(null);
                    setOpen(true);
                }}
            >
                New Product
            </Button>

            <div style={{ height: 520, marginTop: 20 }}>
                <DataGrid
                    rows={products}
                    columns={columns}
                    getRowId={(row) => row.id}
                />
            </div>

            <ProductModal
                open={open}
                onClose={() => setOpen(false)}
                onSave={handleSave}
                editing={editing}
            />
        </Layout>
    );
}

export default Products;
