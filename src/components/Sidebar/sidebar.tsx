import {
    Drawer,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Toolbar
} from "@mui/material";

import {
    Inventory,
    People,
    AdminPanelSettings,
    CompareArrows,
    History
} from "@mui/icons-material";

import { useNavigate } from "react-router-dom";

const drawerWidth = 240;

function Sidebar() {

    const navigate = useNavigate();

    return (

        <Drawer
            variant="permanent"
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                "& .MuiDrawer-paper": {
                    width: drawerWidth
                }
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

        </Drawer>

    );
}

export default Sidebar;