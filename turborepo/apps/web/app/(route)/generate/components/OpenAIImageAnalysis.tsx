import React, { useState } from 'react'
import OpenAI from 'openai'
import { GoNorthStar, GoPulse } from 'react-icons/go'
const API_KEY = process.env.NEXT_PUBLIC_OPEN_API_KEY

const openai = new OpenAI({
  apiKey: API_KEY,
  dangerouslyAllowBrowser: true,
})

export const OpenAIImageAnalysis = () => {
  const [image, setImage] = useState(null)
  const [response, setResponse] = useState(null)

  const handleImageUpload = (event) => {
    setImage(event.target.files[0])
  }

  const handleSubmit = async () => {
    if (!image) {
      alert('Please upload an image first.')
      return
    }

    try {
      // Read the image as a data URL
      const reader = new FileReader()
      reader.readAsDataURL(image)
      reader.onloadend = async () => {
        const imageUrl = reader.result as string

        // Call the OpenAI API
        const response = await openai.chat.completions.create({
          model: 'gpt-4o',
          messages: [
            {
              role: 'user',
              content: [
                {
                  type: 'text',
                  text: 'Analyze the scene depicted in this image and summarize the situation. Formulate a concise, two-line prompt suitable for music creation based on the analyzed content. The goal is to assist in generating music by providing creative and contextually relevant prompts that reflect the mood and elements present in the image.',
                },
                {
                  type: 'image_url',
                  image_url: { url: imageUrl },
                },
              ],
            },
          ],
        })

        setResponse(response.choices[0].message.content)
      }
    } catch (error) {
      console.error('Error fetching the API', error)
    }
  }

  return (
    <div className='w-full h-fit flex flex-col gap-4 justify-center items-center'>
      <input
        className='w-full h-fit text-sm border px-2 py-2'
        type='file'
        accept='image/*'
        onChange={handleImageUpload}
      />
      <div className='flex flex-col gap-2 w-full h-fit'>
        <div className='w-full h-fit min-h-24 border'>
          <h2 className='w-full h-fit px-2 border-b bg-white text-black'>Response</h2>
          {response && <pre className='p-2 w-full text-wrap'>{response}</pre>}
        </div>
        <div className='flex flex-row gap-2 w-full h-fit'>
          <button
            className='w-full h-fit px-4 py-2 rounded-lg text-left border border-primary bg-primary'
            onClick={handleSubmit}
          >
            <GoPulse />
            Analyze Image
          </button>
          <button
            className='w-full h-fit px-4 py-2 rounded-lg text-left  text-black border border-white bg-white'
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
