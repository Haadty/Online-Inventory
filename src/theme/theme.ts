import { createTheme } from "@mui/material/styles";

export function getTheme(mode: "light" | "dark") {
    return createTheme({
        palette: {
            mode,

            primary: {
                main: "#1565C0",
            },
            secondary: {
                main: "#2E7D32",
            },

            background: {
                default: mode === "light" ? "#F4F6F8" : "#121212",
                paper: mode === "light" ? "#ffffff" : "#1e1e1e",
            },
        },

        shape: {
            borderRadius: 10,
        },

        typography: {
            fontFamily: ["Inter", "Roboto", "Arial"].join(","),
        },
    });
}