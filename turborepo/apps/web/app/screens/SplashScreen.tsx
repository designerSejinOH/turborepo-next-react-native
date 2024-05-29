'use client'

import dynamic from 'next/dynamic'
import { useState } from 'react'
import { Screen } from '@/components'
import Image from 'next/image'
import { TypeAnimation } from 'react-type-animation'
import { GoArrowRight } from 'react-icons/go'

interface SplashScreenProps {
  onClicked: () => void
}

export function SplashScreen(props: SplashScreenProps) {
  const { onClicked } = props
  const [isTypedDone, setIsTypedDone] = useState(false)

  return (
    <>
      <Screen>
        <div className='w-full h-3/5 flex flex-col items-center justify-center'>
          <div className='w-full h-2/3 flex flex-col items-center justify-end'>
            <Image src='/img/logo.png' width={300} height={300} alt='logo' />
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
        <div className='w-full h-2/5 flex flex-col items-center justify-center'>
          {isTypedDone && (
            <button
              className='border rounded-full pl-6 pr-4 border-white py-2 text-lg bg-white text-black active:bg-black active:text-white flex flex-row gap-2 items-center justify-center'
              onClick={() => {
                onClicked()
              }}
            >
              Get Started <GoArrowRight />
            </button>
          )}
        </div>
      </Screen>
    </>
  )
}
