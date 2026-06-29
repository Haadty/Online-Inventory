import {
    Drawer,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Toolbar,
    Divider,
    Box
} from "@mui/material";

import {
    Inventory,
    People,
    CompareArrows,
} from "@mui/icons-material";

import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";

import { useNavigate } from "react-router-dom";
import { useThemeMode } from "../theme/themeContext";

const drawerWidth = 240;

function Sidebar() {
    const navigate = useNavigate();
    const { mode, toggleTheme } = useThemeMode();

    return (
        <Drawer
            variant="permanent"
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                "& .MuiDrawer-paper": {
                    width: drawerWidth,
                    boxSizing: "border-box",
                    display: "flex",
                    flexDirection: "column",
                },
            }}
        >
            <Toolbar />

            <Box sx={{ flex: 1 }}>
                <List>
                    <ListItemButton onClick={() => navigate("/products")}>
                        <ListItemIcon>
                            <Inventory />
                        </ListItemIcon>
                        <ListItemText primary="Products" />
                    </ListItemButton>

                    <ListItemButton onClick={() => navigate("/users")}>
                        <ListItemIcon>
                            <People />
                        </ListItemIcon>
                        <ListItemText primary="Users" />
                    </ListItemButton>

                    <ListItemButton onClick={() => navigate("/transactions")}>
                        <ListItemIcon>
                            <CompareArrows />
                        </ListItemIcon>
                        <ListItemText primary="Transactions" />
                    </ListItemButton>
                </List>
            </Box>

            <Divider />

            <List>
                <ListItemButton onClick={toggleTheme}>
                    <ListItemIcon>
                        {mode === "light"
                            ? <DarkModeIcon />
                            : <LightModeIcon />}
                    </ListItemIcon>

                    <ListItemText
                        primary={mode === "light"
                            ? "Dark Mode"
                            : "Light Mode"}
                    />
                </ListItemButton>
            </List>
        </Drawer>
    );
}

export default Sidebar;