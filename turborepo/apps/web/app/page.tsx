'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Screen, Splash } from '@/components'

export default function Web() {
  const router = useRouter()

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true'
    if (isLoggedIn) {
      // 사용자가 로그인한 상태로 앱에 접근
      // 필요한 사용자 데이터 불러오기 또는 메인 페이지로 리디렉션
      console.log('User is already logged in.')
      router.push('/explore')
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
