'use client'

import dynamic from 'next/dynamic'
import { useState, useEffect, use } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Screen } from '@/components'
import { TypeAnimation } from 'react-type-animation'
import { GoArrowLeft, GoArrowRight, GoSmiley } from 'react-icons/go'
import { GridLoader, PacmanLoader, PuffLoader } from 'react-spinners'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'

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

  const favors = [
    '댄스',
    '힙합',
    '발라드',
    '팝',
    '록',
    '재즈',
    '클래식',
    'R&B',
    'EDM',
    'OST',
    '인디',
    '포크',
    '펑크',
    '메탈',
    '레게',
    '락',
  ]

  const demolists = [
    {
      title: 'Demo Song1',
      artist: 'Demo Artist1',
      image: '/img/logo.png',
    },
    {
      title: 'Demo Song2',
      artist: 'Demo Artist2',
      image: '/img/logo.png',
    },
    {
      title: 'Demo Song3',
      artist: 'Demo Artist3',
      image: '/img/logo.png',
    },
  ]
  const [demo, setDemo] = useState(0)

  return (
    <>
      <Screen>
        {step === 0 ? (
          <Section heading='당신의 취향은...' step={step}>
            <div className='w-64 h-64 flex flex-col justify-center items-center rounded-full bg-primary text-white text-2xl px-4 py-2 mt-4'>
              <PuffLoader color='#fff' size={100} />
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
            <PacmanLoader color='#fff' size={60} margin={10} />
            <Swiper
              className='w-full h-fit flex flex-row items-center justify-center mt-20'
              spaceBetween={50}
              slidesPerView={1}
              navigation
              pagination={{ clickable: true }}
              scrollbar={{ draggable: true }}
            >
              {demolists.map((demo, index) => (
                <SwiperSlide
                  key={index}
                  className='w-full h-fit flex flex-row gap-4 justify-center items-center rounded-lg bg-gray p-4 '
                >
                  <div className='w-20 h-20 bg-black flex flex-row items-center justify-center'>
                    <Image src='/img/logo.png' width={60} height={60} alt='logo' />
                  </div>
                  <div className='w-full h-full flex flex-col gap-2 items-start justify-center'>
                    <div className='w-fit h-full flex flex-col items-center justify-start'>
                      <span className='text-white text-xl'>{demolists[index].title}</span>
                      <p className='text-white text-sm'>{demolists[index].artist}</p>
                    </div>
                    <div className='w-full h-2 border border-black'>
                      <div className='w-1/2 h-full bg-black'></div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
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
              else router.push('/explore')
            }}
          >
            Next <GoArrowRight />
          </button>
        </div>
      </Screen>
    </>
  )
}
