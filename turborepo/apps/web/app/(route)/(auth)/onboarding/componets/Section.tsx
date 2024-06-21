'use client'

import { useState } from 'react'
import { TypeAnimation } from 'react-type-animation'
import { motion, AnimatePresence } from 'framer-motion'
import { GoChevronLeft } from 'react-icons/go'
import { useRouter } from 'next/navigation'

export interface SectionProps {
  heading?: string
  subHeading?: string
  step?: number
  children?: React.ReactNode
  bottom?: boolean
  bottomHeading?: string
  bottomActive?: boolean
  onBottomButtonClick?: () => void
}

export const Section = (props: SectionProps) => {
  const { heading, subHeading, step, children, bottom = true, bottomHeading, bottomActive, onBottomButtonClick } = props

  return (
    <>
      <Pagenation step={step} />
      <TopContainer step={step} heading={heading} subHeading={subHeading} />
      <div className='w-full h-full px-4 overflow-y-scroll flex flex-col items-center justify-between'>{children}</div>
      {bottom && (
        <BottomContainer
          bottomHeading={bottomHeading}
          bottomActive={bottomActive}
          onBottomButtonClick={onBottomButtonClick}
        />
      )}
    </>
  )
}

export const Pagenation = (props: SectionProps) => {
  const { heading, subHeading, step, children, bottom = true, bottomHeading, bottomActive, onBottomButtonClick } = props
  const router = useRouter()

  return (
    <>
      <button
        className='w-full h-fit text-lg flex flex-row items-center justify-start px-2 py-6'
        onClick={() => {
          router.back()
        }}
      >
        <GoChevronLeft className='text-2xl' />
        <p className='text-lg'>Step {step} of 3</p>
      </button>
    </>
  )
}

export const TopContainer = (props: SectionProps) => {
  const { step, heading, subHeading } = props
  const [headingDone, setHeadingDone] = useState(false)

  return (
    <>
      <div className='w-full h-fit px-4 py-6 flex flex-col gap-4 items-center justify-start'>
        {heading && (
          <>
            <TypeAnimation
              key={step} // Add key prop to re-render the component
              sequence={[
                heading,
                () => {
                  setHeadingDone(true)
                },
              ]}
              wrapper='div'
              cursor={false}
              speed={50}
              className='w-full h-fit flex flex-row justify-start items-center text-white text-4xl'
            />
            <AnimatePresence>
              {headingDone && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1 }}
                  className='w-full h-fit flex flex-row justify-start items-center text-gray text-lg'
                >
                  {subHeading}
                </motion.p>
              )}
            </AnimatePresence>
          </>
        )}
      </div>
    </>
  )
}

export const BottomContainer = (props: SectionProps) => {
  const { bottomActive, bottomHeading, onBottomButtonClick } = props

  return (
    <>
      <div className='w-full h-32 flex flex-row items-start justify-center p-4'>
        <button
          disabled={!bottomActive}
          onClick={onBottomButtonClick}
          className={
            'w-1/2 h-fit py-4  flex flex-row items-center justify-center rounded-full bg-primary text-white border border-primary active:bg-black active:text-white'
          }
          style={{ opacity: bottomActive ? 1 : 0.5 }}
        >
          {bottomHeading}
        </button>
      </div>
    </>
  )
}
