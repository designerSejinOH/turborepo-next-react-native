'use client'

import styles from '../styles/index.module.css'
import { useRouter } from 'next/navigation'

export default function Web() {
  const router = useRouter()

  const getLoginSuccess = () => {
    goToHome()
  }

  const goToHome = () => {
    router.push('/home')
  }

  return (
    <>
      <div className='fixed w-full h-full z-10 bg-black flex flex-col gap-10 items-center justify-center min-h-screen p-10'>
        <h1 className='text-white text-2xl'>Welcome to Sphere Sound!</h1>
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
    </>
  )
}
