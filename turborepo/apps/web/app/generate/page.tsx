'use client'

import { PromptInput } from './components'
import { useState } from 'react'
import OpenAI from 'openai'
const API_KEY = process.env.NEXT_PUBLIC_OPEN_API_KEY

const openai = new OpenAI({
  apiKey: API_KEY,
  dangerouslyAllowBrowser: true,
})

export default function Web() {
  const [prompt, setPrompt] = useState('')
  const [sendData, setSendData] = useState({
    prompt: '',
    embeddings: [],
  })

  return (
    <>
      <div className='w-full h-full  flex flex-col gap-10 items-center justify-center min-h-screen p-10'>
        <h1 className='text-2xl'>Generate</h1>
        <div className='w-full h-full flex flex-col gap-4'></div>
      </div>
    </>
  )
}
