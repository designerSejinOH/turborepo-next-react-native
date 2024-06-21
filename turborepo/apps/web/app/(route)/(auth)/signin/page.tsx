'use client'

import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Screen } from '@/components'
import { useAuthForm } from '../hooks'
import { Section, SigningInput } from '../components'

export default function LogInPage(props) {
  const router = useRouter()
  const { values, handleChange, handleSubmit, loading, message } = useAuthForm(
    {
      email: '',
      password: '',
    },
    'signIn',
  )

  // 메시지 상태가 성공적으로 변경되었을 때 실행
  useEffect(() => {
    if (message.type === 'success') {
      console.log('success!')
      // 추가적인 성공 후 로직, 예를 들어 페이지 이동
      router.push('/explore')
    }
  }, [message, router])

  return (
    <Screen>
      <form onSubmit={handleSubmit} className='flex w-full h-full overflow-x-hidden'>
        <Section
          pagenation='Log In'
          heading='Welcome back!'
          buttonType='submit'
          buttonText='Log In'
          onPrev={() => router.back()}
        >
          {message.payload && (
            <div
              className={`w-full h-fit rounded-full transition-all ${message.type === 'error' ? 'text-red-700' : 'text-green-500'}`}
            >
              {message.payload}
            </div>
          )}
          <div className='w-full h-fit'>
            <span className='text-gray text-lg'>Email</span>
            <SigningInput type='email' placeholder={null} values={values} onChange={handleChange} label={null} />
          </div>
          <div className='w-full h-fit'>
            <span className='text-gray text-lg'>Password</span>
            <SigningInput type='password' placeholder={null} values={values} onChange={handleChange} label={null} />
          </div>
          {loading && <div className='rounded-full  px-3 py-2 transition-all text-center'>Loading...</div>}
        </Section>
      </form>
    </Screen>
  )
}
