import type { ReactNode } from "react";

import {
    AppBar,
    Box,
    Toolbar,
    Typography
} from "@mui/material";

import Sidebar from "../Sidebar/sidebar";

interface LayoutProps {
    title: string;
    children: ReactNode;
}

function Layout({
    title,
    children
}: LayoutProps) {

    return (

        <Box sx={{ display: "flex" }}>

            <Sidebar />

            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 3
                }}
            >

                <AppBar
                    position="static"
                    color="transparent"
                    elevation={0}
                >

                    <Toolbar>

                        <Typography variant="h5">
                            {title}
                        </Typography>

                    </Toolbar>

                </AppBar>

                {children}

            </Box>

        </Box>

    );
}

export default Layout;