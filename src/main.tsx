import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import CssBaseline from "@mui/material/CssBaseline";

import App from "./app";
import { CustomThemeProvider } from "./theme/ThemeContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <CustomThemeProvider>
            <CssBaseline />
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </CustomThemeProvider>
    </React.StrictMode>,
);
