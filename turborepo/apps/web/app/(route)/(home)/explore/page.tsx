'use client'

import { Screen, Header } from '@/components'
import { TypeAnimation } from 'react-type-animation'

export default function Web() {
  return (
    <Screen nav>
      <div className='w-full h-fit flex flex-col items-center justify-start p-4'>
        <TypeAnimation
          sequence={['Explore Music']}
          wrapper='div'
          cursor={false}
          speed={40}
          className='w-full flex flex-row justify-start items-center text-white text-4xl'
        />
      </div>
      <Header />
      <div className='w-full h-full flex flex-col items-center justify-center gap-10 p-4'></div>
    </Screen>
  )
}
