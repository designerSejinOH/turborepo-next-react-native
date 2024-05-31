'use client'

// app/(auth)/page.js
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { Screen } from '@/components'
import { BarLoader } from 'react-spinners'

export default function AuthPage() {
  const router = useRouter()

  useEffect(() => {
    // 로그인 상태를 체크하여 페이지를 나눕니다.
    const isFirstVisit = true // 예시로 첫 방문 상태를 true로 설정

    if (isFirstVisit) {
      router.replace('auth/onboarding')
    } else {
      router.replace('auth/login')
    }
  }, [router])

  return (
    <Screen>
      <BarLoader color='#fff' />
    </Screen>
  )
}
