'use client'

import { useState } from 'react'
import { Screen } from '@/components'
import Image from 'next/image'
import OpenAI from 'openai'
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

  // const imageChat = async () => {
  //   const response = await openai.chat.completions.create({
  //     model: 'gpt-4-turbo',
  //     messages: [
  //       {
  //         role: 'user',
  //         content: [
  //           { type: 'text', text: "What's in this image?" },
  //           {
  //             type: 'image',
  //             url: '/img/imagesdemo.jpg'
  //           },
  //         ],
  //       },
  //     ],
  //   })
  //   console.log(response)
  // }

  return (
    <Screen nav>
      <h1 className='text-2xl'>Generate</h1>
      <div className='w-full h-full flex flex-col gap-4'>
        <Image src='/img/imagesdemo.jpg' alt='image' width={300} height={200} />
      </div>
      <div className='w-full h-full flex flex-col gap-4'>
        <button
          onClick={() => {
            // imageChat()
          }}
          className='bg-blue-500 text-white px-4 py-2 rounded'
        >
          Image Chat
        </button>
      </div>
    </Screen>
  )
}
