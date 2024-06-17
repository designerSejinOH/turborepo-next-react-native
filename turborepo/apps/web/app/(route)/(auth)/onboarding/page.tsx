'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Screen } from '@/components'
import { GridLoader } from 'react-spinners'
import { motion } from 'framer-motion'
import { Section } from './componets/Section'
import { QShape } from './componets'

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
          <QShape />
        </Section>
      ) : null}
    </Screen>
  )
}
