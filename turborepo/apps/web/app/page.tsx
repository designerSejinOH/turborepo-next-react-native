'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Screen, Splash } from '@/components'

export default function Web() {
  const router = useRouter()

  useEffect(() => {
    // 여기서 로그인 상태를 체크합니다.
    const isLoggedIn = false // 예시로 로그인 상태를 false로 설정

    if (isLoggedIn) {
      router.replace('/explore')
    }
  }, [router])

  return (
    <>
      <Screen>
        <Splash />
      </Screen>
    </>
  )
}
