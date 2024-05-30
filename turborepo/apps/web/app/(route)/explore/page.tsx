'use client'

import { Screen, Header } from '@/components'

export default function Web() {
  return (
    <Screen nav>
      <Header />
      <div className='w-full h-fit flex flex-col items-center justify-center'></div>
    </Screen>
  )
}
