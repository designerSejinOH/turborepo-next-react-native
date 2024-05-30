'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'

export function Logo() {
  const router = useRouter()

  return (
    <Image
      onClick={() => {
        router.push('/')
      }}
      src='/img/logo.png'
      width={300}
      height={300}
      alt='logo'
    />
  )
}
