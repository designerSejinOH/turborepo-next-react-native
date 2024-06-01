import { NavBar } from '@/components'

export interface ScreenProps {
  backgroundColor?: string
  nav?: boolean
  padding?: number
  children: React.ReactNode
}

export function Screen(props: ScreenProps) {
  const { backgroundColor = 'black', nav = false, padding = 0, children } = props

  return (
    <div className='w-full h-screen relative overflow-hidden pb-8'>
      {nav ? (
        <div
          className='flex flex-col items-center justify-center w-full h-full pb-8 overflow-hidden relative'
          style={{
            backgroundColor: backgroundColor,
            padding: padding,
          }}
        >
          {children}
          <NavBar />
        </div>
      ) : (
        <div
          className='absoulte w-full h-full top-0 z-10 flex flex-col items-center justify-center overflow-hidden relative'
          style={{
            backgroundColor: backgroundColor,
            padding: padding,
          }}
        >
          {children}
        </div>
      )}
    </div>
  )
}
