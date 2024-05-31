export interface ScreenProps {
  backgroundColor?: string
  nav?: boolean
  padding?: number
  children: React.ReactNode
}

export function Screen(props: ScreenProps) {
  const { backgroundColor = 'black', nav = false, padding = 0, children } = props

  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      {!nav ? (
        <div
          className='fixed w-full h-full z-10 flex flex-col items-center justify-center min-h-screen gap-4'
          style={{
            backgroundColor: backgroundColor,
            padding: padding,
          }}
        >
          {children}
        </div>
      ) : (
        <div
          className='flex flex-col items-center justify-center w-full min-h-screen gap-4 pb-20'
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
