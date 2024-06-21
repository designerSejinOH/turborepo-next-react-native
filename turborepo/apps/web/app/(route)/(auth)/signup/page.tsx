'use client'

import React, { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Screen } from '@/components'
import { BarLoader } from 'react-spinners'
import { AnimatePresence, motion } from 'framer-motion'
import { Section, SigningInput } from '../components'
import { useAuthForm } from '../hooks'

export default function SignUpPage(props) {
  const router = useRouter()
  const { values, handleChange, handleSubmit, loading, message } = useAuthForm(
    {
      email: '',
      password: '',
    },
    'signUp',
  )

  const [step, setStep] = useState(1)
  const form1Ref = useRef(null)
  const form2Ref = useRef(null)
  const form3Ref = useRef(null)
  const form4Ref = useRef(null)

  useEffect(() => {
    const scrollToForm = async () => {
      switch (step) {
        case 1:
          form1Ref.current?.scrollIntoView({ behavior: 'smooth' })
          break
        case 2:
          form2Ref.current?.scrollIntoView({ behavior: 'smooth' })
          break
        case 3:
          form3Ref.current?.scrollIntoView({ behavior: 'smooth' })
          break
        default:
          break
      }
    }
    scrollToForm()
  }, [step])

  return (
    <Screen>
      <form onSubmit={handleSubmit} className='flex w-full h-full overflow-x-hidden'>
        <motion.div className='flex flex-row w-fit h-full'>
          <Section
            heading='What is your email?'
            subHeading='Create an account to get started'
            formRef={form1Ref}
            step={step}
            buttonType='button'
            onPrev={() => {
              router.back()
            }}
            onNext={() => {
              values.email.includes('@') ? setStep(2) : alert('Please enter a valid email address')
            }}
          >
            <SigningInput
              type='email'
              placeholder='xxx@xxx.xxx'
              values={values}
              onChange={handleChange}
              label={`Please enter your email address :)`}
            />
          </Section>
          <Section
            heading='What is your password?'
            subHeading='Create an account to get started'
            formRef={form2Ref}
            step={step}
            buttonType='submit'
            onPrev={() => {
              setStep(1)
            }}
            onNext={() => {
              values.password.length >= 6 ? setStep(3) : alert('Password must be at least 6 characters long')
            }}
          >
            <SigningInput
              type='password'
              placeholder='******'
              values={values}
              onChange={handleChange}
              label={`Please enter your password :)`}
            />
          </Section>
          <Section
            heading='Register your account'
            subHeading='Checking any errors...'
            formRef={form3Ref}
            step={step}
            onPrev={() => {
              setStep(step - 1)
            }}
            buttonType='button'
            buttonText={message.type === 'success' ? 'Continue' : 'Try again'}
            onNext={() => {
              message.payload === 'error' ? setStep(1) : setStep(4)
            }}
          >
            {loading && <BarLoader color='#FFF' />}
            <AnimatePresence>
              {message.payload && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className={
                    `w-full h-fit text-xl text-white px-2 ` +
                    (message.type === 'success' ? 'bg-green-500 ' : 'bg-red-500')
                  }
                >
                  {message?.payload}
                </motion.div>
              )}
            </AnimatePresence>
          </Section>
        </motion.div>
      </form>
    </Screen>
  )
}
