'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { IoCompassSharp, IoGlobeOutline, IoAdd } from 'react-icons/io5'

const NavLink = ({ href, children, active }) => (
  <Link
    href={href}
    className={`${active ? 'text-white bg-black ' : 'text-gray'} h-full w-full flex flex-row justify-center items-center text-xl rounded-full`}
  >
    {children}
  </Link>
)

export function NavBar() {
  const pathname = usePathname()

  return (
    <div className='fixed z-10 left-0 bottom-8 w-full h-fit p-4'>
      <div className='flex flex-row gap-2 bg-white bg-opacity-10 rounded-full w-full h-16 p-2 '>
        <NavLink href='/explore' active={pathname === '/explore'}>
          <IoCompassSharp />
        </NavLink>
        <NavLink href='/generate' active={pathname === '/generate'}>
          <IoAdd />
        </NavLink>
        <NavLink href='/mylist' active={pathname === '/mylist'}>
          <IoGlobeOutline />
        </NavLink>
      </div>
    </div>
  )
}
