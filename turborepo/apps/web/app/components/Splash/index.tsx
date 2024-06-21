'use client'

import { Logo } from '@/components'
import { TypeAnimation } from 'react-type-animation'
import { GoSquareFill, GoSquare } from 'react-icons/go'
import { useRouter } from 'next/navigation'

export function Splash() {
  const router = useRouter()

  return (
    <>
      <div className='w-full h-full flex flex-col items-center justify-center py-10'>
        <Logo />
        <p className='text-xs text-gray'>© 2024 QDIO</p>
      </div>
      <div className='w-full h-fit flex flex-row items-center justify-center py-4'>
        <>
          <button
            className='relative w-1/2 h-fit px-4 py-2 text-xl text-center flex flex-row  items-center justify-center active:opacity-50'
            onClick={() => {
              router.push('/signup')
            }}
          >
            <GoSquareFill className='mr-2' />
            Join Now
          </button>
          <hr className='w-[1px] border-t-0 h-full bg-gray' />
          <button
            className=' w-1/2 h-fit px-4 py-2 text-xl text-center flex flex-row  items-center justify-center active:opacity-50'
            onClick={() => {
              router.push('/signin')
            }}
          >
            <GoSquare className='mr-2' />
            Log In
          </button>
        </>
      </div>
    </>
  )
}
