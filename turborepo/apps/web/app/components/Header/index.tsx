'use client'

import React, { useState } from 'react'
import { GoKebabHorizontal, GoSearch, GoSmiley, GoX } from 'react-icons/go'
import { useRouter } from 'next/navigation'

export function Header() {
  const router = useRouter()

  return (
    <div className='w-full h-fit relative'>
      {/* <Profile /> */}
      <div className='flex flex-row p-4 gap-2 fixed w-full justify-end right-0 top-0 z-20 '>
        {/* <SearchButton /> */}
        <ActionButton
          onClick={() => {
            router.push('/mylist/settings')
          }}
        >
          <GoKebabHorizontal />
        </ActionButton>
      </div>
    </div>
  )
}

export function Profile() {
  return (
    <>
      <div className='w-fit h-fit px-2 flex flex-row gap-2 items-center justify-center text-2xl fixed left-0 top-0 z-10 '>
        {/* <GoSmiley /> */}
        <h1 className=' font-light'>Kim User</h1>
      </div>
    </>
  )
}

export function SearchButton() {
  const [activeInput, setActiveInput] = useState(false)
  return (
    <>
      <div
        className={`h-fit p-2 text-xl bg-gray  text-white rounded-full flex flex-row items-center justify-center active:bg-opacity-100 active:text-black ${activeInput ? 'w-full bg-opacity-100' : 'w-fit bg-opacity-50'}`}
      >
        {activeInput && (
          <>
            <input
              className='w-full h-fit py-0 px-2 bg-transparent text-black text-xl placeholder:text-black'
              type='text'
              placeholder='Search'
            />
          </>
        )}
        {activeInput ? (
          <GoX
            className='text-black text-xl'
            onClick={() => {
              setActiveInput(false)
            }}
          />
        ) : (
          <GoSearch
            className=' text-xl'
            onClick={() => {
              setActiveInput(true)
            }}
          />
        )}
      </div>
    </>
  )
}
interface ActionButtonProps {
  children: React.ReactNode
  onClick: () => void
}
export function ActionButton(props: ActionButtonProps) {
  const { children, onClick } = props
  return (
    <>
      <button
        className='w-fit h-fit p-2 text-xl bg-gray bg-opacity-50 text-white rounded-full flex flex-row items-center justify-center active:bg-white active:text-black'
        onClick={() => {
          onClick()
        }}
      >
        {children}
      </button>
    </>
  )
}
