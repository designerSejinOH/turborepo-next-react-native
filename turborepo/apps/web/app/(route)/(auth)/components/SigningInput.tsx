'use client'

import React from 'react'

export interface SigningInputProps {
  type: 'email' | 'password'
  placeholder: string
  values: { email: string; password: string }
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  label: string
}

export function SigningInput(props: SigningInputProps) {
  const { type, placeholder, values, onChange, label } = props

  return (
    <>
      <input
        className='appearance-none border-b bg-transparent text-xl w-full py-2 text-white leading-tight caret-white focus:caret-white'
        id={type}
        name={type}
        type={type}
        placeholder={placeholder}
        // required
        value={type == 'email' ? values.email : values.password}
        onChange={onChange}
      />
      <label className='w-full h-fit flex justify-start items-center text-gray' htmlFor={type}>
        {label}
      </label>
    </>
  )
}
