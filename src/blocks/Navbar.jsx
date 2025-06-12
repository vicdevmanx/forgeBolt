import { NavLink } from 'react-router-dom'

export default function Navbar() {
  return (
    <nav className='flex gap-6 items-center text-md font-[poppins-medium] max-sm:hidden'>
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
    </nav>
  );
}

