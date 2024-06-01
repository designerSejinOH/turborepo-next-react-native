'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Screen, Logo } from '@/components'
import Image from 'next/image'
import { TypeAnimation } from 'react-type-animation'
import { GoArrowRight } from 'react-icons/go'

export default function SplashPage() {
  const router = useRouter()
  const [isTypedDone, setIsTypedDone] = useState(false)

  return (
    <>
      <Screen>
        <div className='w-full h-3/5 flex flex-col items-center justify-center'>
          <div className='w-full h-2/3 flex flex-col items-center justify-end'>
            <Logo />
          </div>
          <div className='w-full h-1/3 flex flex-col items-center justify-start'>
            <TypeAnimation
              sequence={[
                'Stage Your Moments',
                () => {
                  setIsTypedDone(true)
                },
              ]}
              wrapper='div'
              cursor={false}
              speed={40}
              className='text-white text-xl font-light'
            />
          </div>
        </div>
        <div className='w-full h-1/5 flex flex-col items-center justify-center py-10'>
          {isTypedDone && (
            <>
              <button
                className='animate-pulse text-sm  active:text-primary flex flex-row  items-center justify-center'
                onClick={() => {
                  router.replace('/auth')
                }}
              >
                Starge 처음 시작하기
              </button>
              <button
                className='animate-pulse text-sm  active:text-primary flex flex-row  items-center justify-center'
                onClick={() => {
                  router.replace('/explore')
                }}
              >
                바로 시작하기
              </button>
            </>
          )}
        </div>
        <div className='w-full h-1/5 flex flex-col items-center justify-end py-10'>
          <p className='text-xs text-gray'>Copyright © 2024 Starge | All Rights Reserved</p>
        </div>
      </Screen>
    </>
  )
}
