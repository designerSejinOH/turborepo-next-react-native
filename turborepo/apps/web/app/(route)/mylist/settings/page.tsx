'use client'

import { Profile, Screen } from '@/components'

export default function SettingsPage() {
  return (
    <Screen padding={10}>
      <div className='w-full h-1/5 flex flex-col items-center justify-center bg-gray bg-opacity-30 relative'>
        <h1 className='text-2xl font-light absolute top-4 left-4'>Kim User</h1>
      </div>
      <div className='w-full h-4/5 flex flex-col items-center justify-center bg-white rounded-b-3xl'></div>
    </Screen>
  )
}
