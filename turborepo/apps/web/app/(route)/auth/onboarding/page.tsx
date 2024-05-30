'use client'

import dynamic from 'next/dynamic'
import { useState, useEffect, use } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Screen } from '@/components'
import { TypeAnimation } from 'react-type-animation'
import { GoArrowLeft, GoArrowRight } from 'react-icons/go'
import { map } from 'maath/dist/declarations/src/buffer'

interface SectionProps {
  heading: string
  step: number
  children?: React.ReactNode
}

const Section = (props: SectionProps) => {
  const { heading, step, children } = props
  return (
    <div className='w-full h-full flex flex-col items-center justify-center p-4'>
      <TypeAnimation
        key={step} // Add key prop to re-render the component
        sequence={[heading]}
        wrapper='div'
        cursor={false}
        speed={40}
        className='w-full flex flex-row justify-start items-center text-white text-4xl'
      />
      <div className='w-full h-full flex flex-col items-center justify-center'>{children}</div>
    </div>
  )
}

export default function OnboardingPage() {
  const router = useRouter()
  const [step, setStep] = useState(0)

  const favors = ['댄스', '힙합', '발라드', '팝', '록', '재즈', '클래식', 'R&B', 'EDM']

  return (
    <>
      <Screen>
        {step === 0 ? (
          <Section heading='당신의 취향은...' step={step}>
            <div className='w-64 h-64 flex flex-col justify-center items-center rounded-full bg-primary text-white text-2xl px-4 py-2 mt-4'>
              <span>취향 대분류</span>
            </div>
          </Section>
        ) : step === 1 ? (
          <Section heading='취향과 맞는 음악은...' step={step}>
            <div className='w-full max-h-64  flex flex-grow flex-wrap justify-center gap-2 items-center p-4'>
              {favors.map((favor, index) => (
                <button
                  key={index}
                  className='w-16 h-16 flex flex-row items-center justify-center text-white bg-primary rounded-full active:bg-white active:text-primary border border-primary'
                >
                  {favor}
                </button>
              ))}
            </div>
          </Section>
        ) : step === 2 ? (
          <Section heading='분석한 당신의 취향은...' step={step}>
            <div className='w-64 h-64 flex flex-col justify-center items-center rounded-full bg-primary text-white text-2xl px-4 py-2 mt-4'>
              <span className='w-1/2 h-fit bg-black text-2xl flex flex-row items-center justify-center'>추천</span>
            </div>
            <div className='w-full h-fit flex flex-row gap-4 justify-start items-center rounded-lg bg-gray p-4 mt-20'>
              <div className='w-20 h-16 bg-black flex flex-row items-center justify-center'>
                <Image src='/img/logo.png' width={60} height={60} alt='logo' />
              </div>
              <div className='w-full h-full flex flex-col gap-2 items-start justify-center'>
                <div className='w-fit h-full flex flex-col items-center justify-start'>
                  <span className='text-white text-xl'>Demo Song</span>
                  <p className='text-white text-sm'>by Demo Artist</p>
                </div>
                <div className='w-full h-2 border border-black'>
                  <div className='w-1/2 h-full bg-black'></div>
                </div>
              </div>
            </div>
            <div className='w-full h-fit flex flex-row gap-4 justify-center items-center mt-4'>
              <button className='w-16 h-16 bg-black border text-white rounded-full flex flex-row items-center justify-center active:bg-white active:text-black'>
                <GoArrowLeft />
              </button>
              <button className='w-32 h-16 bg-white border text-black rounded-full flex flex-row items-center justify-center active:bg-black active:text-white'>
                좋아요
              </button>
              <button className='w-16 h-16 bg-white border text-black rounded-full flex flex-row items-center justify-center active:bg-black active:text-white'>
                <GoArrowRight />
              </button>
            </div>
          </Section>
        ) : null}
        <div className='w-full h-fit flex flex-row items-center justify-between px-4 pb-16'>
          <button
            className='border rounded-full pl-4 pr-6 border-white py-2 text-lg bg-black text-white active:bg-white active:text-black flex flex-row gap-2 items-center justify-center'
            onClick={() => {
              if (step > 0) setStep(step - 1)
              else router.push('/')
            }}
          >
            <GoArrowLeft /> Prev
          </button>
          <button
            className='border rounded-full pl-6 pr-4 border-white py-2 text-lg bg-white text-black active:bg-black active:text-white flex flex-row gap-2 items-center justify-center'
            onClick={() => {
              if (step < 2) setStep(step + 1)
              else router.push('/auth/login')
            }}
          >
            Next <GoArrowRight />
          </button>
        </div>
      </Screen>
    </>
  )
}
