'use client'

import styles from '../styles/index.module.css'
import { PromptInput } from './components'

export default function Web() {
  return (
    <>
      <div className='w-full h-full  flex flex-col gap-10 items-center justify-center min-h-screen p-10'>
        <h1 className='text-white text-2xl'>Welcome to Sphere Sound!</h1>
        <div className='flex flex-col items-center justify-center w-full max-w-md p-4'>
          <PromptInput label='Tell me your occasion' value='' onChange={(value) => console.log(value)} />
        </div>
      </div>
    </>
  )
}
