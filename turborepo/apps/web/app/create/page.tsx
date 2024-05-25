'use client'

import styles from '../styles/index.module.css'
import { PromptInput, GetEmbeddings } from './components'
import { useState } from 'react'

export default function Web() {
  const [prompt, setPrompt] = useState('')

  return (
    <>
      <div className='w-full h-full  flex flex-col gap-10 items-center justify-center min-h-screen p-10 bg-slate-200'>
        <h1 className='text-2xl'>Generate</h1>
        <div>
          <button onClick={() => {}}>Generate</button>
        </div>
      </div>
    </>
  )
}
