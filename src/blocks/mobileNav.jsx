import { useState } from "react"
import { NavLink } from "react-router-dom"
import { X, Menu } from "lucide-react"
import {
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemText,
    Box,
} from "@mui/material"
import { useAuthStore } from "@/store/authStore"
import { useNavigate } from 'react-router-dom'

export default function MobileNavModal() {
    const [open, setOpen] = useState(false)
    const { user } = useAuthStore()
    const navigate = useNavigate()

    const navLinks = [
        { name: "Home", to: "/" },
        { name: "Products", to: "/products" },
    ]

    const adminLinks = [
        { name: "Admin Overview", to: "/admin-overview" },
        { name: "Create Product", to: "/create-product" },
        { name: "All Users", to: "/all-users" },
    ]

    const toggleDrawer = () => setOpen((prev) => !prev)

    return (
        <>
            {/* 🟣 FAB Toggle Button */}
            <Box
                sx={{
                    position: "fixed",
                    bottom: 16,
                    left: 16,
                    zIndex: 1300,
                    borderRadius: '50px',
                    backdropFilter: "blur(8px)",
                    display: {
                        xs: "block", // 0px+
                        lg: "block", // 1200px+
                        xl: "none",  // 1536px+
                    },
                    "@media (min-width:1280px)": {
                        display: "none",
                    },
                }}
            >
                <IconButton
                    onClick={toggleDrawer}
                    sx={{
                        backgroundColor: "var(--color-primary)",
                        color: "white",
                        border: '2px solid var(--bg-tertiary)',
                        "&:hover": {
                            backgroundColor: "#059669",
                        },
                        p: 2,
                    }}
                >
                    {open ? <X sx={{ fontSize: 32 }} /> : <Menu sx={{ fontSize: 32 }} />}
                </IconButton>
            </Box>

            {/* 🟢 Drawer Navigation */}
            <Drawer
                anchor="left"
                open={open}
                onClose={toggleDrawer}
                sx={{
                    display: {
                        xs: "block",
                        lg: "block",
                        xl: "none",
                    },
                    "@media (min-width:1280px)": {
                        display: "none",
                    },
                    '& .MuiDrawer-paper': {
                        display: {
                            xs: "block",
                            lg: "block",
                            xl: "none",
                        },
                        "@media (min-width:1280px)": {
                            display: "none",
                        },
                    }
                }}
            >
                <Box
                    sx={{
                        width: 250,
                        bgcolor: "var(--bg-color)",
                        height: "100%",
                        padding: 1.5,
                    }}
                    role="presentation"
                    onKeyDown={toggleDrawer}
                >
                    <h1 className="font-[poppins-bold] text-2xl max-sm:text-xl mb-6 text-[var(--text-primary)] select-none" onClick={() => navigate('/')}>
                        Forge
                        <span style={{ color: "var(--color-primary)" }}>&amp;Bolt</span>.
                    </h1>

                    <List>
                        {navLinks.map((link) => (
                            <ListItem
                                key={link.to}
                                disablePadding
                                sx={{ marginBottom: "0.5rem", borderRadius: "6px" }}
                                onClick={() => setOpen(false)}
                            >
                                <NavLink
                                    to={link.to}
                                    style={{
                                        width: "100%",
                                        textDecoration: "none",
                                        fontFamily: "'Poppins', sans-serif",
                                        fontWeight: 500,
                                    }}
                                    className={({ isActive }) =>
                                        `block  py-1 text-sm rounded-lg transition font-medium ${isActive
                                            ? 'px-4 bg-[var(--color-primary)] text-white'
                                            : 'text-[var(--text-tertiary)] hover:text-white hover:bg-[var(--color-primary)] px-2'
                                        }`
                                    }
                                >
                                    <ListItemText
                                        primary={link.name}
                                        primaryTypographyProps={{
                                            fontFamily: "'poppins-medium', sans-serif",
                                            fontWeight: 500,
                                        }}
                                    />
                                </NavLink>
                            </ListItem>
                        ))}

                        {/* Admin-only links */}
                        {user?.role === "admin" && adminLinks.map((link) => (
                            <ListItem
                                key={link.to}
                                disablePadding
                                sx={{ marginBottom: "0.5rem", borderRadius: "6px" }}
                                onClick={() => setOpen(false)}
                            >
                                <NavLink
                                    to={link.to}
                                    style={{
                                        width: "100%",
                                        textDecoration: "none",
                                        fontFamily: "'poppins-medium', sans-serif",
                                        fontWeight: 500,
                                    }}
                                    className={({ isActive }) =>
                                        `block  py-1 text-sm rounded-lg transition font-medium ${isActive
                                            ? 'bg-[var(--color-primary)] text-white px-4'
                                            : 'text-[var(--text-tertiary)] hover:text-white hover:bg-[var(--color-primary)] px-2'
                                        }`
                                    }
                                >
                                    <ListItemText
                                        primary={link.name}
                                        primaryTypographyProps={{
                                            fontFamily: "'poppins-medium', sans-serif",
                                            fontWeight: 500,
                                        }}
                                    />
                                </NavLink>
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </Drawer>
        </>
    )
}
