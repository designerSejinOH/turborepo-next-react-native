'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { GoPlus } from 'react-icons/go'

const navItems = [
  { href: '/explore', label: 'Explore', icon: false },
  { href: '/generate', label: '', icon: true },
  { href: '/mylist', label: 'My List', icon: false },
]

const NavLink = ({ href, label, icon, active }) => (
  <Link
    href={href}
    className={`${active ? 'text-white bg-black ' : 'text-gray'} h-full w-full flex flex-row justify-center items-center text-2xl rounded-xl`}
  >
    {icon ? <GoPlus /> : <span>{label}</span>}
  </Link>
)

export function NavBar() {
  const pathname = usePathname()

  return (
    <div className='fixed left-0 bottom-4 w-full h-fit p-4'>
      <div className='flex flex-row gap-2 bg-white rounded-xl w-full h-20 p-2 '>
        {navItems.map(({ href, label, icon }) => (
          <NavLink key={href} href={href} label={label} icon={icon} active={pathname === href} />
        ))}
      </div>
    </div>
  )
}