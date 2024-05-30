'use client'

import dynamic from 'next/dynamic'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Screen } from '@/components'
import { TypeAnimation } from 'react-type-animation'
import { GoArrowLeft, GoArrowRight } from 'react-icons/go'

export default function OnboardingPage() {
  const router = useRouter()

  return (
    <>
      <Screen>
        <div className='w-full h-4/5 flex flex-col items-center justify-center'>
          <div className='w-full h-fit flex flex-col items-center justify-end'>
            <Image src='/img/logo.png' width={120} height={120} alt='logo' />
          </div>
          <div className='w-full h-full flex flex-col items-center p-10 justify-start'>
            <TypeAnimation
              sequence={['Onboarding...']}
              wrapper='div'
              cursor={false}
              speed={40}
              className='text-white text-2xl font-light'
            />
          </div>
        </div>
        <div className='w-full h-1/5 flex flex-row items-center justify-between px-4 '>
          <button
            className='border rounded-full pl-4 pr-6 border-white py-2 text-lg bg-black text-white active:bg-white active:text-black flex flex-row gap-2 items-center justify-center'
            onClick={() => {
              router.push('/')
            }}
          >
            <GoArrowLeft /> Prev
          </button>
          <button
            className='border rounded-full pl-6 pr-4 border-white py-2 text-lg bg-white text-black active:bg-black active:text-white flex flex-row gap-2 items-center justify-center'
            onClick={() => {
              router.push('/auth/login')
            }}
          >
            Next <GoArrowRight />
          </button>
        </div>
      </Screen>
    </>
  )
}
