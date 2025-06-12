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

export default function MobileNavModal() {
  const [open, setOpen] = useState(false)

  const navLinks = [
    { name: "Home", to: "/" },
    { name: "Products", to: "/products" },
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
          borderRadius:'50px',
          display: { xs: "block", sm: "none" },
          backdropFilter: "blur(8px)",
        }}
      >
        <IconButton
          onClick={toggleDrawer}
          sx={{
            backgroundColor: "var(--color-primary)",
            color: "white",
            border:'2px solid var(--bg-tertiary)',
            "&:hover": {
              backgroundColor: "#059669", // hover emerald-600
            },
            p: 2,
          }}
        >
          {open ? <X sx={{ fontSize: 32 }} /> : <Menu sx={{ fontSize: 32 }} />}
        </IconButton>
      </Box>

      {/* 🟢 Drawer Navigation */}
      <Drawer anchor="left" open={open} onClose={toggleDrawer}>
        <Box
          sx={{
            width: 250,
            bgcolor: "var(--bg-secondary)",
            height: "100%",
            padding: 2,
          }}
          role="presentation"
          onClick={toggleDrawer}
          onKeyDown={toggleDrawer}
        >
          <h2
            style={{
              color: "var(--text-primary)",
              fontWeight: "bold",
              marginBottom: "1rem",
              fontSize: "1.25rem",
              fontFamily: "Poppins-bold",
            }}
          >
              <h1 className="font-[poppins-bold] text-2xl max-sm:text-xl">Forge<span className="text-[var(--color-primary)]">&Bolt</span>.</h1>
          </h2>

          <List>
            {navLinks.map((link) => (
              <ListItem
                key={link.to}
                disablePadding
                sx={{ marginBottom: "0.5rem", borderRadius: "6px" }}
              >
                <NavLink
                  to={link.to}
                  onClick={() => setOpen(false)}
                  style={{ width: "100%", textDecoration: "none" }}
                  className={({ isActive }) =>
                    `block px-4 py-2 rounded-md bg-[var(--bg-tertiary)] transition font-[poppins-bold] font-bold ${
                      isActive
                        ? 'bg-[var(--color-primary)] text-white'
                        : 'text-[var(--text-secondary)] hover:text-white hover:bg-[var(--color-primary)]'
                    }`
                  }
                >
                  <ListItemText primary={link.name} />
                </NavLink>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  )
}
