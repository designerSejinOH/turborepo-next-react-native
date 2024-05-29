'use client'

import dynamic from 'next/dynamic'
import { useState, useEffect } from 'react'
import { SplashScreen, OnboardingScreen, LoginScreen } from './screens'

export default function Web() {
  const [isStarted, setIsStarted] = useState(false)
  const [isOnboarded, setIsOnboarded] = useState(false)

  return (
    <>
      {!isStarted ? (
        <SplashScreen onClicked={() => setIsStarted(true)} />
      ) : !isOnboarded ? (
        <OnboardingScreen onPrev={() => setIsStarted(false)} onNext={() => setIsOnboarded(true)} />
      ) : (
        <LoginScreen />
      )}
    </>
  )
}
