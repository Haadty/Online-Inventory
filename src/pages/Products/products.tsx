import { useEffect, useState } from "react";

import Layout from "../../components/layout";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";

import type { Product } from "../../types/product";
import ProductModal from "../../components/productModal";

import {
    getProducts,
    createProduct,
    updateProduct,
    deleteProduct
} from "../../services/productService";

import {
    Button,
    Card,
    CardContent,
    Grid,
    Typography
} from "@mui/material";

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

    async function handleSave(data: Omit<Product, "id">) {

        if (editing) {
            await updateProduct(editing.id, data);
        } else {
            await createProduct(data);
        }

        await loadProducts();
    }

    const columns: GridColDef[] = [
        { field: "id", headerName: "ID", width: 90 },
        { field: "name", headerName: "Name", flex: 1 },
        { field: "code", headerName: "Code", flex: 1 },
        { field: "quantity", headerName: "Quantity", width: 150 },

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
        <Layout title="Products">

            <Grid container spacing={3} sx={{ mb: 3 }}>

                <Grid size={{ xs: 12, md: 4 }}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6">Total Products</Typography>
                            <Typography variant="h3">{products.length}</Typography>
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

            <div style={{ height: 500, marginTop: 20 }}>
                <DataGrid
                    rows={products}
                    columns={columns}
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