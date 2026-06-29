import { useState } from "react";

import {
    Box,
    Button,
    Paper,
    Typography,
    TextField,
    Alert,
    IconButton,
    Tooltip
} from "@mui/material";

import { useNavigate } from "react-router-dom";

import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";

import { useThemeMode } from "../../theme/themeContext";

function Login() {

    const navigate = useNavigate();
    const { mode, toggleTheme } = useThemeMode();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleLogin() {
        setError("");
        setLoading(true);

        try {
            const response = await fetch("http://localhost:3001/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email,
                    password
                })
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.message || "Login failed");
                return;
            }

            localStorage.setItem("user", JSON.stringify(data));

            if (data.role !== "ADMIN") {
                setError("Access denied: only admins can enter");
                return;
            }

            navigate("/products");

        } catch {
            setError("Unable to connect to server");
        } finally {
            setLoading(false);
        }
    }

    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
                position: "relative"
            }}
        >

            <Tooltip title={mode === "light" ? "Dark Mode" : "Light Mode"}>
                <IconButton
                    onClick={toggleTheme}
                    sx={{ position: "absolute", top: 24, right: 24 }}
                >
                    {mode === "light"
                        ? <DarkModeIcon />
                        : <LightModeIcon />}
                </IconButton>
            </Tooltip>

            <Paper elevation={4} sx={{ width: 400, p: 4 }}>

                <Typography variant="h4" sx={{ textAlign: "center", mb: 1 }}>
                    Inventory System
                </Typography>

                <Typography sx={{ textAlign: "center", color: "text.secondary", mb: 4 }}>
                    Municipal Warehouse
                </Typography>

                {error && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                        {error}
                    </Alert>
                )}

                <TextField
                    fullWidth
                    label="Email"
                    margin="normal"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <TextField
                    fullWidth
                    type="password"
                    label="Password"
                    margin="normal"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <Button
                    variant="contained"
                    fullWidth
                    size="large"
                    sx={{ mt: 2 }}
                    onClick={handleLogin}
                    disabled={loading}
                >
                    {loading ? "Signing in..." : "Sign In"}
                </Button>

            </Paper>
        </Box>
    );
}

export default Login;