'use client'

import dynamic from 'next/dynamic'
import { useState, useEffect } from 'react'
import LoginScreen from './system/LoginScreen'
import OnboardingScreen from './system/OnboardingScreen'

export default function Web() {
  const [isLogin, setIsLogin] = useState(false)

  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
  }, [])
    setIsClient(true)

  return (
    <>
      {!isLogin ? (
        <>
          <OnboardingScreen
            isStarted={isLogin}
            onStarted={() => {
              setIsLogin(true)
            }}
          />
        </>
      ) : (
        <>
          <LoginScreen />
        </>
      )}
    </>
  )
}
