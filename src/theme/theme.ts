import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    palette: {
        primary: {
            main: "#1565C0"
        },
        secondary: {
            main: "#2E7D32"
        },
        background: {
            default: "#F4F6F8"
        }
    },

    shape: {
        borderRadius: 10
    },

    typography: {
        fontFamily: [
            "Inter",
            "Roboto",
            "Arial"
        ].join(",")
    }
});

export default theme;