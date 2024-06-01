'use client'

import dynamic from 'next/dynamic'
import { useState, useEffect, useRef, Suspense } from 'react'
import { Sphere, Resize, Stars, OrbitControls, Box } from '@react-three/drei'
import * as THREE from 'three'
import { useRouter } from 'next/navigation'
import { Screen } from '@/components'
import { GridLoader } from 'react-spinners'
import { motion } from 'framer-motion'
import { Section } from './Section'
import { Common } from '@/components/_canvas/View'
import { Canvas, useThree } from '@react-three/fiber'

const View = dynamic(() => import('@/components/_canvas/View').then((mod) => mod.View), {
  ssr: false,
  loading: () => (
    <div className='flex h-96 w-full flex-col items-center justify-center'>
      <svg className='-ml-1 mr-3 h-5 w-5 animate-spin text-white' fill='none' viewBox='0 0 24 24'>
        <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4' />
        <path
          className='opacity-75'
          fill='currentColor'
          d='M4 12a8 8 0 0 1 8-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 0 1 4 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
        />
      </svg>
    </div>
  ),
})

const favors = ['댄스', '힙합', '발라드', '팝', '록', '재즈', '클래식', 'R&B', 'EDM']

export default function OnboardingPage() {
  const router = useRouter()
  const [step, setStep] = useState(0)

  const [selectedFavors, setSelectedFavors] = useState<string[]>([])

  useEffect(() => {
    if (step === 1) {
      setTimeout(() => {
        setStep(step + 1)
      }, 3000)
    }
  }, [step])

  return (
    <Screen>
      {step === 0 ? (
        <Section
          heading='취향에 맞는 곡을 선택해주세요'
          subHeading='자신의 취향과 맞는 곡들을 3개 이상 선택해주세요'
          step={step}
          bottomHeading='선택 완료'
          bottomActive={selectedFavors.length >= 3}
          onBottomButtonClick={() => {
            setStep(step + 1)
          }}
        >
          <div className='w-fit h-fit pt-16 pb-20 grid grid-cols-3 gap-2 justify-center items-center p-4'>
            {favors.map((favor, index) => (
              <motion.button
                key={index}
                onClick={
                  selectedFavors.includes(favor)
                    ? () => setSelectedFavors(selectedFavors.filter((selectedFavor) => selectedFavor !== favor))
                    : () => setSelectedFavors([...selectedFavors, favor])
                }
                className='w-20 h-20 flex flex-row items-center justify-center rounded-full'
                style={{
                  backgroundColor: selectedFavors.includes(favor) ? '#FFF' : '#000',
                  color: selectedFavors.includes(favor) ? '#000' : '#FFF',
                  border: selectedFavors.includes(favor) ? '1px solid #000' : '1px solid #FFF',
                }}
                whileTap={{ scale: 0.8 }}
              >
                {favor}
              </motion.button>
            ))}
          </div>
          {selectedFavors.length < 3 && (
            <motion.p className='w-full h-fit text-center text-sm text-gray'> 3개 이상 선택해주세요</motion.p>
          )}
        </Section>
      ) : step === 1 ? (
        <Section step={step} heading='취향을 분석중입니다...' subHeading='잠시만 기다려주세요' bottom={false}>
          <GridLoader color='#FFF' size={48} margin={16} className='mt-20' />
        </Section>
      ) : step === 2 ? (
        <Section
          step={step}
          heading='당신의 취향에 맞는 곡'
          subHeading={'취향을 분석하여 데모곡을 만들었어요 \n마음에 들지 않는다면 다시 분석할게요!'}
          bottomHeading='완료'
          bottomActive={true}
          onBottomButtonClick={() => {
            router.push('/explore')
          }}
        >
          <Canvas>
            <Suspense fallback={null}>
              <Stars />
              <ambientLight intensity={1} />
              <Resize scale={1}>
                <pointLight position={[2, 2, 2]} />
                <Box args={[1, 1, 1]} position={[0, 0, 0]}>
                  <meshStandardMaterial color='blue' />
                </Box>
              </Resize>
              <CameraControls />
            </Suspense>
          </Canvas>
        </Section>
      ) : null}
    </Screen>
  )
}

export function CameraControls() {
  const {
    camera,
    gl: { domElement },
  } = useThree()
  return (
    <OrbitControls args={[camera, domElement]} autoRotate autoRotateSpeed={0.5} enableDamping dampingFactor={0.1} />
  )
}
