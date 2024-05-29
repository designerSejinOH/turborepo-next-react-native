'use client'

import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'
import { Screen } from '@/components'
import Image from 'next/image'

export function LoginScreen() {
  const router = useRouter()

  const getLoginSuccess = () => {
    goToExpolre()
  }

  const goToExpolre = () => {
    router.push('/explore')
  }

  return (
    <>
      <Screen>
        <div className='w-full h-2/5 flex flex-col items-center justify-center'>
          <Image src='/img/logo.png' width={300} height={300} alt='logo' />
        </div>
        <div className='w-full h-3/5 flex flex-col items-center justify-start'>
          <div className='flex flex-col items-center justify-center w-full max-w-md p-10'>
            <form
              className='flex flex-col w-full space-y-4'
              onSubmit={(e) => {
                e.preventDefault()
                getLoginSuccess()
              }}
            >
              <input
                type='text'
                placeholder='Username'
                className='px-4 py-2 border rounded-full bg-black text-light  text-white placeholder:text-gray-100'
              />
              <input
                type='password'
                placeholder='Password'
                className='px-4 py-2 border rounded-full bg-black text-light text-white placeholder:text-gray-100'
              />
              <button
                className='px-4 py-2 bg-white rounded-full border border-white text-black active:bg-black active:text-white'
                type='submit'
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </Screen>
    </>
  )
}
