'use client'

import { useRouter } from 'next/navigation'
import { TypeAnimation } from 'react-type-animation'

interface LogoProps {
  isStatic?: boolean
}

export function Logo(props: LogoProps) {
  const { isStatic = false } = props
  const router = useRouter()

  return (
    <button
      className='text-5xl font-mono font-medium text-white p-4 active:opacity-50 active:scale-95'
      onClick={() => {
        router.push('/')
      }}
    >
      {isStatic ? (
        <span>QDIO</span>
      ) : (
        <TypeAnimation
          sequence={[500, 'Q+Audio', 1000, 'QDIO']}
          wrapper='span'
          cursor={false}
          speed={30}
          deletionSpeed={40}
        />
      )}
    </button>
  )
}
