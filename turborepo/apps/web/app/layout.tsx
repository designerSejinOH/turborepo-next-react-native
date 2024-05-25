import { BottomTab } from '../src/components'
import styles from '../styles/index.module.css'
import '../styles/global.css'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Layout } from '@/components/dom/Layout'

export const metadata = {
  title: 'SphereSound',
  description: 'SphereSound is a music platform that allows you to explore and generate music.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body>
        <Layout>{children}</Layout>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
