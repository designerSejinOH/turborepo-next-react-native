'use client'

import { Screen } from '@/components'

export default function Web() {
  return (
    <Screen nav>
      <div className='w-full h-fit flex flex-col items-center justify-center'>
        <h1 className='text-2xl'>ExploreScreen</h1>
      </div>
      <div className='w-full h-full flex flex-col items-center justify-center'></div>
    </Screen>
  )
}
