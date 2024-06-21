'use client'
import React, { useState } from 'react'
import { GoChevronLeft } from 'react-icons/go'
import { TypeAnimation } from 'react-type-animation'
import { AnimatePresence, motion } from 'framer-motion'

export interface SectionProps {
  pagenation?: string
  heading: string
  subHeading?: string
  formRef?: React.RefObject<HTMLDivElement>
  step?: number
  onPrev?: () => void
  children: React.ReactNode
  buttonType: 'button' | 'submit'
  buttonText?: string
  onNext?: () => void
}

export function Section(props: SectionProps) {
  const {
    pagenation,
    heading,
    subHeading,
    formRef,
    step,
    onPrev,
    children,
    buttonType,
    buttonText = 'Next',
    onNext,
  } = props
  const [headingDone, setHeadingDone] = useState(false)

  return (
    <>
      <div ref={formRef} className='w-screen h-full flex flex-col justify-start items-center px-4 py-6'>
        <button
          className='w-full h-fit text-lg flex flex-row items-center justify-start px-2 py-6 active:opacity-50'
          onClick={() => {
            onPrev && onPrev()
          }}
        >
          <GoChevronLeft className='text-2xl' />
          <p className='text-lg'>{pagenation ? pagenation : 'Step ' + step}</p>
        </button>
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
              {subHeading && (
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
              )}
            </>
          )}
        </div>
        <div className='w-full h-fit mt-12 mb-24 px-4 flex flex-col items-center justify-between gap-4'>{children}</div>
        <button
          className='w-4/5 h-fit text-xl border text-white py-2 px-4 rounded active:bg-white active:text-balck'
          type={buttonType}
          onClick={() => {
            onNext && onNext()
          }}
        >
          {buttonText}
        </button>
      </div>
    </>
  )
}
