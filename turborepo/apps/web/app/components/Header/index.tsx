'use client'

import React, { useState } from 'react'
import { GoKebabHorizontal, GoSearch, GoSignOut, GoSmiley, GoX } from 'react-icons/go'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export function Header() {
  const router = useRouter()

  return (
    <div className='w-full h-fit relative'>
      {/* <Profile /> */}
      <div className='flex flex-row p-4 gap-2 fixed w-full justify-end right-0 top-0 z-20 '>
        {/* <SearchButton /> */}
        <LogoutButton />
      </div>
    </div>
  )
}

export function Profile(user: string) {
  return (
    <>
      <div className='w-fit h-fit px-2 flex flex-row gap-2 items-center justify-center text-2xl fixed left-0 top-0 z-10 '>
        {/* <GoSmiley /> */}
        {user && <h1 className=' font-light'>{user}</h1>}
      </div>
    </>
  )
}

const LogoutButton = () => {
  const router = useRouter()

  const handleLogout = () => {
    // Supabase 로그아웃 API 호출 (사용 중인 인증 서비스에 따라 다름)
    supabase.auth.signOut()

    // 로컬 스토리지에서 로그인 상태 제거
    localStorage.removeItem('isLoggedIn')
    localStorage.removeItem('user')

    // 사용자를 로그인 페이지로 리디렉션
    router.push('/')

    console.log('Logged out successfully')
  }

  return (
    <button
      onClick={handleLogout}
      className=' bg-white bg-opacity-30 rounded-full px-4 py-1 text-white active:bg-opacity-70'
    >
      Log Out
    </button>
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
