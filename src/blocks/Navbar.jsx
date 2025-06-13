import { useAuthStore } from '@/store/authStore';
import { NavLink } from 'react-router-dom';
import {
  Home,
  ShoppingBag,
  LayoutDashboard,
  PlusSquare,
  Users
} from 'lucide-react';

export default function Navbar() {
  const {user} = useAuthStore();

  return (
    <nav className='flex gap-8 items-center text-sm font-[poppins-medium] max-xl:hidden'>
      <NavLink to='/' className={({ isActive }) =>
        isActive
          ? 'text-[var(--color-primary)] font-semibold flex items-center gap-2'
          : 'text-[var(--text-tertiary)] hover:text-[var(--color-primary)] transition-colors flex items-center gap-2'
      }>
        <Home size={18} />
        Home
      </NavLink>
      <NavLink to='/products' className={({ isActive }) =>
        isActive
          ? 'text-[var(--color-primary)] font-semibold flex items-center gap-2'
          : 'text-[var(--text-tertiary)] hover:text-[var(--color-primary)] transition-colors flex items-center gap-2'
      }>
        <ShoppingBag size={18} />
        Products
      </NavLink>
      {user?.role == 'admin' && (
        <>
          <NavLink to='/admin-overview' className={({ isActive }) =>
            isActive
              ? 'text-[var(--color-primary)] font-semibold flex items-center gap-2'
              : 'text-[var(--text-tertiary)] hover:text-[var(--color-primary)] transition-colors flex items-center gap-2'
          }>
            <LayoutDashboard size={18} />
            Admin Overview
          </NavLink>
          <NavLink to='/create-product' className={({ isActive }) =>
            isActive
              ? 'text-[var(--color-primary)] font-semibold flex items-center gap-2'
              : 'text-[var(--text-tertiary)] hover:text-[var(--color-primary)] transition-colors flex items-center gap-2'
          }>
            <PlusSquare size={18} />
            Create Product
          </NavLink>
          <NavLink to='/all-users' className={({ isActive }) =>
            isActive
              ? 'text-[var(--color-primary)] font-semibold flex items-center gap-2'
              : 'text-[var(--text-tertiary)] hover:text-[var(--color-primary)] transition-colors flex items-center gap-2'
          }>
            <Users size={18} />
            All Users
          </NavLink>
        </>
      )}
    </nav>
  );
}
