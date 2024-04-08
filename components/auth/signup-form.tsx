'use client'

import Link from 'next/link'
import { useFormState } from 'react-dom'

import { FaRegCheckCircle } from 'react-icons/fa'
import { BiMessageSquareError } from 'react-icons/bi'

import { signUp } from '@/lib/actions/auth'

import GoogleSignInButton from './google-sign-in-button'
import { SubmitButton } from '../ui/buttons'
import { Callout } from '../ui/callout'
import { FormInput, InputLabel, PasswordInput, TextInput } from '../ui/inputs'
import Divider from '../ui/divider'

export default function SignUpForm() {
  const [formState, dispatch] = useFormState(signUp, {})

  const nameError = formState?.errors?.name ? formState?.errors?.name[0] : ''
  const emailError = formState?.errors?.email ? formState?.errors?.email[0] : ''
  const passwordError = formState?.errors?.password ? formState?.errors?.password[0] : ''

  return (
    <form
      id="signup-form"
      action={dispatch}
      className="w-full max-w-[420px] rounded-md border border-n-300 p-[20px] shadow-sm"
    >
      <h1 id="signup-form-title" className="mb-[8px] text-center text-xl font-bold text-n-700">
        Sign Up
      </h1>

      <Divider className="mb-[16px] border-n-300" />

      <div id="form-inputs" className="mb-[26px] flex flex-col gap-[14px]">
        <FormInput id="name-input" errors={nameError}>
          <InputLabel htmlFor="name" text="md" weight="semibold">
            Name
          </InputLabel>
          <TextInput id="name" name="name" placeholder="John Doe" />
        </FormInput>
        <FormInput id="email-input" errors={emailError}>
          <InputLabel htmlFor="email" text="md" weight="semibold">
            Email
          </InputLabel>
          <TextInput id="email" name="email" placeholder="example@gmail.com" />
        </FormInput>
        <FormInput id="password-input" errors={passwordError}>
          <InputLabel htmlFor="password" text="md" weight="semibold">
            Password
          </InputLabel>
          <PasswordInput id="password" name="password" placeholder="Password" />
        </FormInput>
      </div>

      {formState?.success && (
        <Callout variant="success" className="mb-[12px]">
          <div className="flex items-center gap-[4px]">
            <FaRegCheckCircle className="h-[16px] w-[16px]" />
            <span>{formState.success}</span>
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
