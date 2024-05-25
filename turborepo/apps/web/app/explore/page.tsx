'use client'

import styles from '../styles/index.module.css'

export default function Web() {
  return (
    <>
      <div className='w-full h-full flex flex-col gap-10 items-center justify-center min-h-screen pt-10 px-10 pb-24 bg-slate-200'>
        <h1 className='text-2xl'>ExploreScreen</h1>
        <div className='w-full h-full flex flex-col gap-4 border'>
          <div className='w-full h-full flex flex-row gap-4'>
            <div className='w-1/2 h-full bg-slate-400'>1</div>
            <div className='w-1/2 h-full bg-slate-400'>2</div>
          </div>
          <div className='w-full h-full flex flex-row gap-4'>
            <div className='w-1/2 h-full bg-slate-400'>3</div>
            <div className='w-1/2 h-full bg-slate-400'>4</div>
          </div>
        </div>
      </div>
    </>
  )
}
