'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Screen } from '@/components'
import Image from 'next/image'
import { TypeAnimation } from 'react-type-animation'
import { GoArrowRight } from 'react-icons/go'

export default function SplashPage() {
  const router = useRouter()
  const [isTypedDone, setIsTypedDone] = useState(false)

  useEffect(() => {
    // 스플래쉬 스크린을 몇 초간 보여주고 로그인/온보딩 페이지로 리다이렉트
    {
      isTypedDone &&
        setTimeout(() => {
          router.replace('/auth')
        }, 2000)
    }
  }, [isTypedDone, router])

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
        <div className='w-full h-2/5 flex flex-col items-center justify-end py-10'>
          <p className='text-xs'>Copyright © 2024 Starge | All Rights Reserved</p>
        </div>
      </Screen>
    </>
  )
}
