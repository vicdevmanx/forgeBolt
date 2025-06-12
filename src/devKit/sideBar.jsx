import {
  Drawer,
  DrawerContent,
} from "@/components/ui/drawer"
import { useState } from "react"
import { NavLink } from "react-router-dom"

const SidebarDrawer = () => {
  const [open, setOpen] = useState(false)

  const navLinks = [
    { name: 'Home', to: '/' },
    { name: 'Products', to: '/products' },
  ]

  const toggleDrawer = () => setOpen(prev => !prev)

  return (
    <>
      {/* 👇 Your toggle div anywhere you want */}
      <div
        onClick={toggleDrawer}
        className="cursor-pointer bg-primary text-white px-4 py-2 rounded-md"
      >
        Toggle Sidebar
      </div>

      {/* 👇 The actual Drawer */}
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerContent
          side="left"
          className="w-[250px] p-4 bg-[var(--bg-secondary)] h-full"
        >
          <h2 className="text-xl font-bold mb-6 text-[var(--text-primary)]">Navigation</h2>

          <nav className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setOpen(false)} // close on nav click
                className={({ isActive }) =>
                  `px-4 py-2 rounded-md font-[poppins-medium] transition-all ${
                    isActive
                      ? 'bg-[var(--color-primary)] text-[var(--text-primary)]'
                      : 'text-[var(--text-secondary)] hover:bg-[var(--color-primary)] hover:text-[var(--text-primary)]'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </nav>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export default SidebarDrawer
