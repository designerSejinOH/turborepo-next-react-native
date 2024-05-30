'use client'

import React from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

export function BottomTab(): React.JSX.Element {
  const pathname = usePathname()

  return (
    <>
      <div className='fixed left-0 bottom-0 w-full h-[5rem] pb-6 flex flex-row items-center justify-between bg-gray'>
        <Link
          href='/explore'
          className={`${pathname === '/explore' ? 'text-gray bg-black' : 'text-black bg-gray'} h-full w-full flex flex-row  justify-center  items-center text-left text-2xl`}
        >
          <span>Explore</span>
        </Link>
        <Link
          href={pathname === '/generate' ? '/explore' : '/generate'}
          className={`${pathname === '/generate' ? 'text-gray bg-black' : 'text-black bg-gray'} h-full w-full flex flex-row justify-center items-center text-2xl`}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className={`w-6 h-6`}
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            {pathname === '/generate' ? (
              <circle cx='12' cy='12' r='10' strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' />
            ) : (
              <path strokeLinecap='square' strokeLinejoin='bevel' strokeWidth={2} d='M12 4v16m8-8H4' />
            )}
          </svg>
        </Link>
        <Link
          href='/mylist'
          className={`${pathname === '/mylist' ? 'text-gray bg-black' : 'text-black bg-gray'} h-full w-full flex flex-row justify-center  items-center text-2xl`}
        >
          <span>My List</span>
        </Link>
      </div>
    </>
  )
}
