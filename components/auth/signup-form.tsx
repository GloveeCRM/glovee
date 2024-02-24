'use client'

import Link from 'next/link'
import { useFormState } from 'react-dom'

import { FaRegCheckCircle } from 'react-icons/fa'
import { BiMessageSquareError } from 'react-icons/bi'

import { signUp } from '@/lib/actions/auth'

import GoogleSignInButton from './google-sign-in-button'
import { SubmitButton } from '../ui/buttons'
import { Callout } from '../ui/callout'
import { FormInput, InputLabel, TextInput } from '../ui/inputs'

export default function SignUpForm() {
  const [formState, dispatch] = useFormState(signUp, {})

  const nameError = formState?.errors?.name ? formState?.errors?.name[0] : ''
  const emailError = formState?.errors?.email ? formState?.errors?.email[0] : ''
  const passwordError = formState?.errors?.password ? formState?.errors?.password[0] : ''

  return (
    <form action={dispatch} className="w-full max-w-[400px]">
      <div id="form-inputs" className="mb-[26px] flex flex-col gap-[14px]">
        <FormInput id="name-input" error={nameError}>
          <InputLabel htmlFor="name">Name</InputLabel>
          <TextInput id="name" name="name" placeholder="John Doe" />
        </FormInput>
        <FormInput id="email-input" error={emailError}>
          <InputLabel htmlFor="email">Email</InputLabel>
          <TextInput id="email" name="email" placeholder="example@gmail.com" />
        </FormInput>
        <FormInput id="password-input" error={passwordError}>
          <InputLabel htmlFor="password">Password</InputLabel>
          <TextInput id="password" name="password" placeholder="Password" />
        </FormInput>
      </div>

      {formState?.success && (
        <Callout variant="success" className="mb-[12px]">
          <div className="flex items-center gap-[4px]">
            <FaRegCheckCircle className="h-[16px] w-[16px]" />
            <span>Email does not exist!</span>
          </div>
        </Callout>
      )}

      {formState?.error && (
        <Callout variant="error" className="mb-[12px]">
          <div className="flex items-center gap-[4px]">
            <BiMessageSquareError className="h-[16px] w-[16px]" />
            <span>{formState.error}</span>
          </div>
        </Callout>
      )}

      <div id="form-buttons" className="flex flex-col gap-[10px]">
        <SubmitButton size="full">Sign Up</SubmitButton>
        <GoogleSignInButton className="rounded p-[10px]" />
      </div>

      <div className="mt-[10px] flex justify-center gap-[5px] text-[12px]">
        <span>Already have account?</span>
        <Link href={'/login'} className="cursor-pointer text-blue-400 hover:underline">
          Log In
        </Link>
      </div>
    </form>
  )
}
