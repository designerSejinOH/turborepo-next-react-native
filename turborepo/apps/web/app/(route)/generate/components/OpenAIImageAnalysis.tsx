import React, { useState } from 'react'
import OpenAI from 'openai'
import { GoCopy, GoNorthStar, GoPulse } from 'react-icons/go'
import { PulseLoader } from 'react-spinners'

const API_KEY = process.env.NEXT_PUBLIC_OPEN_API_KEY

import axios from 'axios'

// replace your vercel domain
const baseUrl = 'https://sunoapi-hbo.vercel.app'

const openai = new OpenAI({
  apiKey: API_KEY,
  dangerouslyAllowBrowser: true,
})

export const OpenAIImageAnalysis = () => {
  const [image, setImage] = useState<File | null>(null)
  const [response, setResponse] = useState<string | null>(null)
  const [musicPrompt, setMusicPrompt] = useState<string | null>(null)
  const [keywords, setKeywords] = useState<string[] | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [embedding, setEmbedding] = useState<number[] | null>(null)

  const [audidLoading, setAudioLoading] = useState<boolean>(false)

  const [audioUrl, setAudioUrl] = useState<string | null>(null)

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setImage(event.target.files[0])
    }
  }

  const handleSubmit = async () => {
    if (!image) {
      alert('Please upload an image first.')
      return
    }

    setLoading(true)
    setResponse(null)
    setMusicPrompt(null)
    setKeywords(null)
    setEmbedding(null)

    try {
      // Read the image as a data URL
      const reader = new FileReader()
      reader.readAsDataURL(image)
      reader.onloadend = async () => {
        const imageUrl = reader.result as string

        // Call the OpenAI API for image analysis
        const response = await openai.chat.completions.create({
          model: 'gpt-4o',
          messages: [
            {
              role: 'user',
              content: [
                {
                  type: 'text',
                  text: 'Analyze the scene depicted in this image and extract keywords that summarize the situation. Formulate a concise, two-line prompt suitable for music creation based on the analyzed content. Please format your response as follows: "Keywords: [keyword1, keyword2, ...]. Music Prompt: <prompt>." Ensure that the Music Prompt is always provided in this format.',
                },
                {
                  type: 'image_url',
                  image_url: { url: imageUrl } as any,
                },
              ],
            },
          ],
        })

        const fullResponse = response.choices[0].message.content
        console.log('Full Response:', fullResponse) // Debugging line

        // Extract the keywords and music prompt
        const keywordsMatch = fullResponse.match(/Keywords:\s*(.*)\.\s*Music Prompt:/i)
        const promptMatch = fullResponse.match(/Music Prompt:\s*(.*)/i)

        if (keywordsMatch) {
          setKeywords(keywordsMatch[1].split(',').map((kw) => kw.trim()))
        } else {
          setKeywords(['Keywords not found in the response.'])
        }

        if (promptMatch) {
          setMusicPrompt(promptMatch[1])
        } else {
          setMusicPrompt('Music prompt not found in the response.')
        }

        // Generate embedding for keywords
        if (keywordsMatch) {
          const embeddingResponse = await openai.embeddings.create({
            model: 'text-embedding-ada-002',
            input: keywordsMatch[1].split(',').map((kw) => kw.trim()),
          })
          setEmbedding(embeddingResponse.data[0].embedding)
        }

        setLoading(false)
      }
    } catch (error) {
      console.error('Error fetching the API', error)
      setLoading(false)
    }
  }

  const handleCopyClipBoard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)

      alert('Copy Success!')
    } catch (error) {
      alert('Failed to copy to clipboard.')
    }
  }

  async function generateAudioByPrompt(payload) {
    const url = `${baseUrl}/api/generate`
    const response = await axios.post(url, payload, {
      headers: { 'Content-Type': 'application/json' },
    })
    return response.data
  }

  async function getAudioInformation(audioIds) {
    const url = `${baseUrl}/api/get?ids=${audioIds}`
    const response = await axios.get(url)
    return response.data
  }

  async function GenerateAudio() {
    setAudioLoading(true)

    const data = await generateAudioByPrompt({
      prompt: musicPrompt,
      make_instrumental: false,
      wait_audio: false,
    })

    const ids = `${data[0].id},${data[1].id}`
    console.log(`ids: ${ids}`)

    for (let i = 0; i < 60; i++) {
      const data = await getAudioInformation(ids)
      if (data[0].status === 'streaming') {
        console.log(`${data[0].id} ==> ${data[0].audio_url}`)
        console.log(`${data[1].id} ==> ${data[1].audio_url}`)
        setAudioUrl(data[0].audio_url)
        setAudioLoading(false)
        break
      }
      // sleep 5s
      await new Promise((resolve) => setTimeout(resolve, 5000))
    }
  }

  return (
    <div className='w-full h-fit flex flex-col gap-4 justify-center items-center'>
      <input
        className='w-full h-fit text-sm border px-2 py-2 rounded-xl'
        type='file'
        accept='image/*'
        onChange={handleImageUpload}
      />
      <div className='flex flex-col gap-2 w-full h-fit'>
        <div className='w-full h-fit border rounded-xl min-h-16 overflow-hidden relative'>
          <h2 className='w-full h-fit px-2 border-b bg-white text-black'>Keywords</h2>
          {loading ? (
            <div className='w-full h-fit py-4 flex justify-center items-center'>
              <PulseLoader size={5} color='#AAA' />
            </div>
          ) : (
            keywords && <pre className='p-2 w-full text-wrap text-gray'>{keywords.join(', ')}</pre>
          )}
          <button
            className='w-fit h-fit absolute bottom-0 z-20 right-0 p-2  bg-opacity-50 text-white rounded-full flex flex-row items-center justify-center active:bg-opacity-100 active:text-black'
            onClick={() => handleCopyClipBoard(keywords ? keywords.join(', ') : '')}
          >
            <GoCopy />
          </button>
        </div>
        <div className='w-full h-fit border rounded-xl min-h-16 py overflow-hidden text-wrap'>
          <h2 className='w-full h-fit px-2 border-b bg-white text-black'>Embedding</h2>
          {loading ? (
            <div className='w-full h-fit py-4 flex justify-center items-center'>
              <PulseLoader size={5} color='#AAA' />
            </div>
          ) : (
            embedding && (
              <pre className='p-2 w-full text-wrap text-gray max-h-24 overflow-x-auto whitespace-pre-wrap break-all text-xs'>
                {JSON.stringify(embedding)}
              </pre>
            )
          )}
        </div>
        <div className='w-full h-fit border rounded-xl min-h-16 overflow-hidden relative'>
          <h2 className='w-full h-fit px-2 border-b bg-white text-black'>Music Prompt</h2>
          {loading ? (
            <div className='w-full h-fit py-4 flex justify-center items-center'>
              <PulseLoader size={5} color='#AAA' />
            </div>
          ) : (
            musicPrompt && <pre className='p-2 w-full text-wrap text-gray'>{musicPrompt}</pre>
          )}
          <button
            className='w-fit h-fit absolute bottom-0 z-20 right-0 p-2  bg-opacity-50 text-white rounded-full flex flex-row items-center justify-center active:bg-opacity-100 active:text-black'
            onClick={() => handleCopyClipBoard(musicPrompt || '')}
          >
            <GoCopy />
          </button>
        </div>
        <p className='w-full h-fit text-sm text-gray'>Analyze the image by ChatGPT.</p>

        <div className='flex flex-row gap-2 w-full h-fit'>
          <button
            className='w-full h-fit flex flex-row gap-4 justify-start items-center px-4 py-2 rounded-xl text-lg text-left border border-primary bg-primary active:bg-white active:text-primary'
            onClick={handleSubmit}
          >
            <GoPulse />
            Analyze Image
          </button>
        </div>
      </div>
      <div className='w-full h-fit flex flex-col gap-2 justify-center items-center'>
        <p className='w-full h-fit text-sm text-gray'>Generate music by Suno.</p>
        <button
          className='w-full h-fit flex flex-row gap-4 justify-start items-center px-4 py-2 rounded-xl text-lg text-left border border-white bg-white text-black active:bg-black active:text-white'
          onClick={GenerateAudio}
          style={{ opacity: musicPrompt ? 1 : 0.5 }}
        >
          <GoNorthStar />
          Generate Music
        </button>
        {audidLoading && (
          <div className='w-full h-fit py-4 flex justify-center items-center'>
            <PulseLoader size={5} color='#AAA' />
          </div>
        )}

        {audioUrl && (
          <audio controls>
            <source src={audioUrl} type='audio/mpeg' />
          </audio>
        )}
        <button
          onClick={() => {
            handleCopyClipBoard(audioUrl)
          }}
          className='w-full h-fit flex flex-row gap-4 justify-start items-center px-4 py-2 rounded-xl text-lg text-left border border-white bg-white text-black active:bg-black active:text-white'
          style={{ display: audioUrl ? 'block' : 'none' }}
        >
          <GoCopy />
          Copy Music URL
        </button>
      </div>
    </div>
  )
}
