import { NavLink } from 'react-router-dom'
import clsx from 'clsx'
import Home from '@/pages/Home'
import Product from '@/pages/Product'
import { HomeIcon } from 'lucide-react'
import { Plus } from 'lucide-react'
import { LayoutDashboard } from 'lucide-react'


export default function MobileNavModal() {

    return (
        <div className='fixed bottom-4 w-screen flex justify-center min-sm:hidden'>
            <div className='bg-[var(--bg-tertiary)] backdrop-blur-sm rounded-full flex items-center gap-6 p-1'>

                <NavLink to="/">
                    {({ isActive }) => (
                        <div className={clsx('p-2', 'rounded-full', 'transition', isActive ? 'text-white' : 'text-[#717889]', isActive ? 'bg-gradient-to-r from-[#6c5ce7] to-[#958aec]' : 'bg-transparent', isActive ? 'hover:bg-gradient-to-r from-[#6c5ce7] to-[#958aec]' : 'hover:bg-[var(--bg-overlay)]')}>
                            <HomeIcon />
                        </div>
                    )}
                </NavLink>
                <NavLink to={'/products'}>
                    {({ isActive }) => (
                        <div className={clsx('p-2', 'rounded-full', 'transition', isActive ? 'text-white' : 'text-[#717889]', isActive && localStorage.getItem('authToken') ? 'bg-gradient-to-r from-[#6c5ce7] to-[#958aec]' : 'bg-transparent', isActive && localStorage.getItem('authToken') ? 'hover:bg-gradient-to-r from-[#6c5ce7] to-[#958aec]' : 'hover:bg-[var(--bg-overlay)]')}>
                            <LayoutDashboard />
                        </div>
                    )}
                </NavLink>
            </div>
        </div>
    )
}