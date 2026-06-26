import {
    Box,
    Button,
    Paper,
    Typography,
    TextField
} from "@mui/material";

import { useNavigate } from "react-router-dom";

function Login() {

    const navigate = useNavigate();

    return (

        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh"
            }}
        >
            <Paper
                elevation={4}
                sx={{
                    width: 400,
                    p: 4
                }}
            >

                <Typography
                    variant="h4"
                    sx={{
                        textAlign: "center",
                        mb: 1
                    }}
                >
                    Inventory System
                </Typography>

                <Typography
                    sx={{
                        textAlign: "center",
                        color: "text.secondary",
                        mb: 4
                    }}
                >
                    Municipal Warehouse
                </Typography>

                <TextField
                    fullWidth
                    label="Email"
                    margin="normal"
                />

                <TextField
                    fullWidth
                    type="password"
                    label="Password"
                    margin="normal"
                />

                <Button
                    variant="contained"
                    fullWidth
                    size="large"
                    sx={{ mt: 2 }}
                    onClick={() => navigate("/products")}
                >
                    Sign In
                </Button>

            </Paper>

        </Box>
    );
}

export default Login;