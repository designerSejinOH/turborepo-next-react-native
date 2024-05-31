'use client'

import { useState } from 'react'
import { Screen } from '@/components'
import Image from 'next/image'
import OpenAI from 'openai'
import { OpenAIImageAnalysis } from './components'
import { TypeAnimation } from 'react-type-animation'
const API_KEY = process.env.NEXT_PUBLIC_OPEN_API_KEY

const openai = new OpenAI({
  apiKey: API_KEY,
  dangerouslyAllowBrowser: true,
})

export default function Web() {
  const [prompt, setPrompt] = useState('')
  const [sendPrompt, setSendPrompt] = useState('')
  const [sendData, setSendData] = useState({
    prompt: '',
    embeddings: [],
  })

  return (
    <Screen nav>
      <div className='w-full h-fit flex flex-col items-center justify-start p-4'>
        <TypeAnimation
          sequence={['Generate Music']}
          wrapper='div'
          cursor={false}
          speed={40}
          className='w-full flex flex-row justify-start items-center text-white text-4xl'
        />
      </div>
      <div className='w-full h-full flex flex-col items-center justify-start gap-10 p-4 overflow-y-scroll'>
        <OpenAIImageAnalysis />
      </div>
    </Screen>
  )
}
