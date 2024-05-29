'use client'

import React from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

export function BottomTab(): React.JSX.Element {
  const pathname = usePathname()
  const links = [
    { path: '/explore', label: 'EXPLORE' },
    { path: '/create', label: '+' },
    { path: '/my', label: 'MY' },
  ]

  return (
    <>
      <div className='fixed left-0 bottom-0 w-full flex flex-row gap-2 p-4 pb-8'>
        {links.map((link) => (
          <Link
            key={link.path}
            href={link.path}
            className={`${pathname === link.path ? 'text-blue-500' : 'text-gray-500'} p-4 w-full text-center text-xl`}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </>
  )
}
