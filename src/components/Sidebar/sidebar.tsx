import {
    Drawer,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Toolbar,
    Divider,
} from "@mui/material";

import {
    Inventory,
    People,
    AdminPanelSettings,
    CompareArrows,
    History,
} from "@mui/icons-material";

import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";

import { useNavigate } from "react-router-dom";
import { useThemeMode } from "../../theme/ThemeContext";

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
                },
            }}
        >
            <Toolbar />

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

                <ListItemButton onClick={() => navigate("/admins")}>
                    <ListItemIcon>
                        <AdminPanelSettings />
                    </ListItemIcon>
                    <ListItemText primary="Admins" />
                </ListItemButton>

                <ListItemButton onClick={() => navigate("/transactions")}>
                    <ListItemIcon>
                        <CompareArrows />
                    </ListItemIcon>
                    <ListItemText primary="Transactions" />
                </ListItemButton>

                <ListItemButton onClick={() => navigate("/history")}>
                    <ListItemIcon>
                        <History />
                    </ListItemIcon>
                    <ListItemText primary="History" />
                </ListItemButton>
            </List>

            <Divider />

            <List>
                <ListItemButton onClick={toggleTheme}>
                    <ListItemIcon>
                        {mode === "light" ? <DarkModeIcon /> : <LightModeIcon />}
                    </ListItemIcon>

                    <ListItemText
                        primary={mode === "light" ? "Dark Mode" : "Light Mode"}
                    />
                </ListItemButton>
            </List>
        </Drawer>
    );
}

export default Sidebar;
