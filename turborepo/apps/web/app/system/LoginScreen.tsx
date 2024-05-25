'use client'

import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'

export default function LoginScreen() {
  const router = useRouter()

  const getLoginSuccess = () => {
    goToExpolre()
  }

  const goToExpolre = () => {
    router.push('/explore')
  }

  return (
    <>
      <div className='flex flex-col items-center justify-center h-screen'>
        <div className='fixed w-full h-full z-10 bg-black flex flex-col gap-10 items-center justify-center min-h-screen p-10'>
          <div className='flex flex-col items-center justify-center w-full max-w-md p-4'>
            <form
              className='flex flex-col w-full space-y-4'
              onSubmit={(e) => {
                e.preventDefault()
                getLoginSuccess()
              }}
            >
              <input type='text' placeholder='Username' className='p-2 border bg-black  text-white' />
              <input type='password' placeholder='Password' className='p-2 border bg-black text-white' />
              <button className='p-2 bg-white' type='submit'>
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
