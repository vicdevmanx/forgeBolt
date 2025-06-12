import Navbar from "./Navbar";
import { useAuthStore } from "@/store/authStore";
import { useContext, useEffect } from "react";
import { GlobalContext } from "@/components/functional/context";
import { Moon } from "lucide-react";
import { Sun } from "lucide-react";
import { User } from "lucide-react";
import { ShoppingCart } from "lucide-react";
import { useNavigate } from 'react-router-dom'
import MobileNavModal from "./mobileNav";
import { Button } from "@/components/ui/button";
import CustomDropdown from "./customDropdown";
import { toast } from "sonner";


export default function Header() {
  const isLoggedIn = useAuthStore(s => !!s.token)
  const openLoginModal = useAuthStore(s => s.openLoginModal)
  const openSignupModal = useAuthStore(s => s.openSignupModal)
  const total = useAuthStore(s => s.total);
  const user = useAuthStore(s => s.user)
  const { theme, toggleTheme } = useContext(GlobalContext)
  const navigate = useNavigate()
  const logout = useAuthStore((s) => s.logout)

  const logoutFn = () => {
    logout()
    navigate('/')
    toast.info('You Logged Out')
  }

  const trigger = (
    <div className="p-2 hover:bg-[var(--bg-tertiary)] active:bg-[var(--bg-tertiary)] rounded-lg flex gap-1 items-end cursor-pointer">
      <User className="size-5" />
      <h3 className="text-xs text-[var(--text-primary)] font-[poppins-medium]">{user ? user.name?.slice(0,6) || user.name  : "loading"}..</h3>
    </div>
  )

  const menuItems = [
    { label: "Profile", onClick: () => navigate("/profile") },
    { label: "Logout", onClick: logoutFn, danger: true },
  ]




  return (
    <header className="flex items-center p-3 px-8 max-lg:px-2 sticky top-0 justify-between bg-[var(--bg-color)] border-b border-[var(--bg-tertiary)] z-20">
      <h1 className="font-[poppins-bold] text-2xl max-sm:text-xl">Forge<span className="text-[var(--color-primary)]">&Bolt</span>.</h1>
      <Navbar />

      {
        isLoggedIn ?
          <div className="flex items-center gap-1">
            {theme == "light" ? <span className=" p-2 hover:bg-[var(--bg-tertiary)] active:bg-[var(--bg-tertiary)] rounded-lg" onClick={toggleTheme}><Moon className="size-5" /></span>
              :
              <span className=" p-2 hover:bg-[var(--bg-tertiary)] active:bg-[var(--bg-tertiary)] rounded-lg" onClick={toggleTheme}><Sun className="size-5" /></span>
            }

            <span className=" p-2 hover:bg-[var(--bg-tertiary)] active:bg-[var(--bg-tertiary)] rounded-lg relative" onClick={() => navigate('/cart')}><ShoppingCart className="size-5" />
            <span className="absolute top-0 right-0 bg-[var(--color-primary)] text-white rounded-full p-1 w-4.5 h-4.5 text-xs flex items-center justify-center">{total}</span></span>
            <CustomDropdown trigger={trigger} items={menuItems} />
          </div>
          :
          <div className="flex items-center gap-1">

            {theme == "light" ? <span className=" p-2 hover:bg-[var(--bg-tertiary)] active:bg-[var(--bg-tertiary)] rounded-lg" onClick={toggleTheme}><Moon className="size-5" /></span>
              :
              <span className=" p-2 hover:bg-[var(--bg-tertiary)] active:bg-[var(--bg-tertiary)] rounded-lg" onClick={toggleTheme}><Sun className="size-5" /></span>
            }
            <div className="flex items-center gap-2">
              <Button className='rounded-full bg-[var(--color-secondary)] text-xs text-white py-2 min-sm:px-6' onClick={() => openSignupModal()}>Signup</Button>
              <Button className='rounded-full bg-[var(--bg-tertiary)] text-xs text-[var(--text-primary)] py-2 min-sm:px-6' onClick={() => openLoginModal()}>Login</Button>
            </div>
          </div>
      }

    </header>
  );
}
