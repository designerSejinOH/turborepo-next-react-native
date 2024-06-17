'use client'
import { useState } from 'react'
import { TypeAnimation } from 'react-type-animation'
import { motion, AnimatePresence } from 'framer-motion'

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
      <TopContainer step={step} heading={heading} subHeading={subHeading} />
      <div className='w-full h-full overflow-y-scroll flex flex-col items-center justify-between py-2'>{children}</div>
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

export const TopContainer = (props: SectionProps) => {
  const { step, heading, subHeading } = props
  const [headingDone, setHeadingDone] = useState(false)

  return (
    <>
      <div className='w-full h-28 flex flex-col items-center justify-start p-4'>
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
              className='w-full h-fit flex flex-row justify-start items-center text-white text-2xl'
            />
            <AnimatePresence>
              {headingDone && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1 }}
                  className='w-full h-fit flex flex-row justify-start items-center text-gray text-sm'
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
