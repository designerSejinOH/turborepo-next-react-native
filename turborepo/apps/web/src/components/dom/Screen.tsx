export interface ScreenProps {
  backgroundColor?: string
  fixed?: boolean
  children: React.ReactNode
}

export function Screen(props: ScreenProps) {
  const { backgroundColor = 'black', fixed = true, children } = props

  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      {fixed ? (
        <div
          className='fixed w-full h-full z-10 flex flex-col items-center justify-center min-h-screen p-4'
          style={{
            backgroundColor: backgroundColor,
          }}
        >
          {children}
        </div>
      ) : (
        <div
          className='flex flex-col items-center justify-center w-full min-h-screen p-4'
          style={{
            backgroundColor: backgroundColor,
          }}
        >
          {children}
        </div>
      )}
    </div>
  )
}
