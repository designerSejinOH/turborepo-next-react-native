'use client'

import dynamic from 'next/dynamic'

interface OnboardingScreenProps {
  onStarted: () => void
  isStarted: boolean
}

export default function OnboardingScreen(props: OnboardingScreenProps) {
  const { onStarted, isStarted } = props
  return (
    <>
      <div className='flex flex-col items-center justify-center h-screen'>
        <div className='fixed w-full h-full z-10 bg-black flex flex-col gap-10 items-center justify-center min-h-screen p-10'>
          {' '}
          <h1 className='text-white text-2xl'>Welcome to Sphere Sound!</h1>
          <button
            className='p-2 bg-white'
            onClick={() => {
              onStarted()
            }}
          >
            Get Started
          </button>
        </div>
      </div>
    </>
  )
}
