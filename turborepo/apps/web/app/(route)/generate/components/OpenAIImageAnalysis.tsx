import React, { useState } from 'react'
import OpenAI from 'openai'
import { GoNorthStar, GoPulse } from 'react-icons/go'
import { PulseLoader } from 'react-spinners'

const API_KEY = process.env.NEXT_PUBLIC_OPEN_API_KEY

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

  return (
    <div className='w-full h-fit flex flex-col gap-4 justify-center items-center'>
      <input
        className='w-full h-fit text-sm border px-2 py-2 rounded-xl'
        type='file'
        accept='image/*'
        onChange={handleImageUpload}
      />
      <div className='flex flex-col gap-2 w-full h-fit'>
        <div className='w-full h-fit border rounded-xl overflow-hidden'>
          <h2 className='w-full h-fit px-2 border-b bg-white text-black'>Keywords</h2>
          {loading ? (
            <div className='w-full h-fit py-4 flex justify-center items-center'>
              <PulseLoader size={5} color='#AAA' />
            </div>
          ) : (
            keywords && <pre className='p-2 w-full text-wrap text-gray'>{keywords.join(', ')}</pre>
          )}
        </div>
        <div className='w-full h-fit border rounded-xl overflow-hidden'>
          <h2 className='w-full h-fit px-2 border-b bg-white text-black'>Music Prompt</h2>
          {loading ? (
            <div className='w-full h-fit py-4 flex justify-center items-center'>
              <PulseLoader size={5} color='#AAA' />
            </div>
          ) : (
            musicPrompt && <pre className='p-2 w-full text-wrap text-gray'>{musicPrompt}</pre>
          )}
        </div>
        <div className='w-full h-fit border rounded-xl overflow-hidden text-wrap'>
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
        <div className='flex flex-row gap-2 w-full h-fit'>
          <button
            className='w-full h-fit px-4 py-2 rounded-lg text-left border border-primary bg-primary active:bg-white active:text-primary'
            onClick={handleSubmit}
          >
            <GoPulse />
            Analyze Image
          </button>
          <button
            className='w-full h-fit px-4 py-2 rounded-lg text-left  text-black border border-white bg-white active:bg-black active:text-white'
            onClick={handleSubmit}
          >
            <GoNorthStar />
            Generate Music
          </button>
        </div>
      </div>
      <p className='w-full h-fit text-sm text-gray'>* Image Analysis with OpenAI</p>
    </div>
  )
}
