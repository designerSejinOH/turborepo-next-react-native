import { useState } from 'react'
import { supabase } from '@/lib/supabase'

export function useAuthForm(initialValues, type) {
  const [values, setValues] = useState(initialValues)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState({ type: 'default', payload: '' })

  const handleChange = (event) => {
    const { name, value } = event.target
    setValues((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setLoading(true)

    try {
      const response = await (type === 'signIn'
        ? supabase.auth.signInWithPassword(values)
        : supabase.auth.signUp(values))

      if (response.error) {
        throw response.error
      }

      // 성공적으로 인증 처리가 완료되면 로컬 스토리지에 로그인 상태 저장
      localStorage.setItem('isLoggedIn', 'true')

      // 선택적으로 사용자 정보 또는 토큰을 저장
      if (response.data && response.data.user) {
        localStorage.setItem('user', JSON.stringify(response.data.user))
      }

      setMessage({ type: 'success', payload: type === 'signIn' ? 'Log in successful!' : 'Signup successful!' })
    } catch (error) {
      setMessage({ type: 'error', payload: error.message || 'An unexpected error occurred.' })
      localStorage.removeItem('isLoggedIn') // 에러 발생 시 로그인 상태 제거
    } finally {
      setLoading(false)
    }
  }

  return { values, handleChange, handleSubmit, loading, message }
}
