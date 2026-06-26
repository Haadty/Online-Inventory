import { useEffect, useState } from "react";

import Layout from "../../components/Layout/layout";

import { DataGrid, type GridColDef } from "@mui/x-data-grid";

import type { Product } from "../../types/product";
import { getProducts } from "../../services/productService";

import {
    Button,
    Card,
    CardContent,
    Grid,
    Typography
} from "@mui/material";

function Products() {

    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {

        getProducts()
            .then(setProducts)
            .catch(console.error);

    }, []);

    const totalProducts = products.length;

    const lowStockProducts = products.filter(
        product => product.quantity <= 5
    ).length;

    const columns: GridColDef[] = [
        { field: "id", headerName: "ID", width: 90 },
        { field: "name", headerName: "Name", flex: 1 },
        { field: "code", headerName: "Code", flex: 1 },
        { field: "quantity", headerName: "Quantity", width: 150 },
    ];

    return (

        <Layout title="Products">

            <Grid container spacing={3} sx={{ mb: 3 }}>

                <Grid size={{ xs: 12, md: 4 }}>

                    <Card>

                        <CardContent>

                            <Typography variant="h6">
                                Total Products
                            </Typography>

                            <Typography variant="h3">
                                {totalProducts}
                            </Typography>

                        </CardContent>

                    </Card>

                </Grid>

                <Grid size={{ xs: 12, md: 4 }}>

                    <Card>

                        <CardContent>

                            <Typography variant="h6">
                                Low Stock
                            </Typography>

                            <Typography variant="h3">
                                {lowStockProducts}
                            </Typography>

                        </CardContent>

                    </Card>

                </Grid>

                <Grid size={{ xs: 12, md: 4 }}>

                    <Card>

                        <CardContent>

                            <Typography variant="h6">
                                Products In Stock
                            </Typography>

                            <Typography variant="h3">
                                {products.length}
                            </Typography>

                        </CardContent>

                    </Card>

                </Grid>

            </Grid>

            <Button variant="contained" size="large">
                New Product
            </Button>

            <div style={{ height: 500, marginTop: 20 }}>
                <DataGrid
                    rows={products}
                    columns={columns}
                    pageSizeOptions={[5, 10]}
                />
            </div>

        </Layout>

    );
}

export default Products;