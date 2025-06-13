import { useAuthStore } from '@/store/authStore';
import { NavLink } from 'react-router-dom'

export default function Navbar() {
  // Example: Replace this with your actual admin check logic
  const isAdmin = useAuthStore(s => s?.user?.role)

  return (
    <nav className='flex gap-6 items-center text-md font-[poppins-medium] max-lg:hidden'>
      <NavLink to='/' className={({ isActive }) =>
        isActive
          ? 'text-[var(--color-primary)] font-semibold'
          : 'text-[var(--text-tertiary)] hover:text-[var(--color-primary)] transition-colors'
      }>Home</NavLink>
      <NavLink to='/products' className={({ isActive }) =>
        isActive
          ? 'text-[var(--color-primary)] font-semibold'
          : 'text-[var(--text-tertiary)] hover:text-[var(--color-primary)] transition-colors'
      }>Products</NavLink>
      {isAdmin && (
        <>
          <NavLink to='/admin-overview' className={({ isActive }) =>
            isActive
              ? 'text-[var(--color-primary)] font-semibold'
              : 'text-[var(--text-tertiary)] hover:text-[var(--color-primary)] transition-colors'
          }>Admin Overview</NavLink>
          <NavLink to='/create-product' className={({ isActive }) =>
            isActive
              ? 'text-[var(--color-primary)] font-semibold'
              : 'text-[var(--text-tertiary)] hover:text-[var(--color-primary)] transition-colors'
          }>Create Product</NavLink>
          <NavLink to='/all-users' className={({ isActive }) =>
            isActive
              ? 'text-[var(--color-primary)] font-semibold'
              : 'text-[var(--text-tertiary)] hover:text-[var(--color-primary)] transition-colors'
          }>All Users</NavLink>
        </>
      )}
    </nav>
  );
}

