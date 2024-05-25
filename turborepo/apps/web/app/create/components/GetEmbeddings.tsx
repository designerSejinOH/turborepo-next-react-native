import OpenAI from 'openai'
const API_KEY = process.env.OPENAI_API_KEY

const openai = new OpenAI({
  apiKey: API_KEY,
  dangerouslyAllowBrowser: true,
})

interface GetEmbeddingsProps {
  prompt_text: string
}

export async function GetEmbeddings(props: GetEmbeddingsProps) {
  const { prompt_text } = props
  const embedding = await openai.embeddings.create({
    model: 'text-embedding-ada-002',
    input: prompt_text,
    encoding_format: 'float',
  })

  console.log('Result:', embedding)
}
