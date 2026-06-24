import Layout from "../../components/Layout/layout";

import {
    Button,
    Card,
    CardContent,
    Grid,
    Typography
} from "@mui/material";

function Products() {

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
                                245
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
                                12
                            </Typography>

                        </CardContent>

                    </Card>

                </Grid>

                <Grid size={{ xs: 12, md: 4 }}>

                    <Card>

                        <CardContent>

                            <Typography variant="h6">
                                Transactions Today
                            </Typography>

                            <Typography variant="h3">
                                32
                            </Typography>

                        </CardContent>

                    </Card>

                </Grid>

            </Grid>

            <Button
                variant="contained"
                size="large"
            >
                New Product
            </Button>

        </Layout>

    );
}

export default Products;