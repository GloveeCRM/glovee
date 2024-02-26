'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useFormState } from 'react-dom'

import { FaRegCheckCircle } from 'react-icons/fa'
import { BiMessageSquareError } from 'react-icons/bi'

import { login } from '@/lib/actions/auth'

import GoogleSignInButton from './google-sign-in-button'
import { FormInput, InputLabel, PasswordInput, TextInput } from '../ui/inputs'
import { Callout } from '../ui/callout'
import { SubmitButton } from '../ui/buttons'
import Divider from '../ui/divider'

export default function LoginForm() {
  const [formState, dispatch] = useFormState(login, {})

  const searchParams = useSearchParams()
  const urlError =
    searchParams.get('error') === 'OAuthAccountNotLinked'
      ? 'Email already in use with different provider!'
      : ''

  const emailError = formState?.errors?.email ? formState?.errors?.email[0] : ''
  const passwordError = formState?.errors?.password ? formState?.errors?.password[0] : ''

  return (
    <form
      id="login-form"
      action={dispatch}
      className="w-full max-w-[420px] rounded-md border border-n-300 p-[20px] shadow-sm"
    >
      <h1 id="login-form-title" className="mb-[8px] text-center text-xl font-bold text-n-700">
        Login
      </h1>

      <Divider className="mb-[16px] border-n-300" />

      <div id="form-inputs" className="mb-[26px] flex flex-col gap-[14px]">
        <FormInput id="email-input" error={emailError}>
          <InputLabel htmlFor="email">Email</InputLabel>
          <TextInput id="email" name="email" placeholder="example@gmail.com" />
        </FormInput>
        <FormInput id="password-input" error={passwordError}>
          <InputLabel htmlFor="password">Password</InputLabel>
          <PasswordInput id="password" name="password" placeholder="Password" className="" />
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

      {(formState?.error || urlError) && (
        <Callout variant="error" className="mb-[12px]">
          <div className="flex items-center gap-[4px]">
            <BiMessageSquareError className="h-[16px] w-[16px]" />
            <span>{formState.error || urlError}</span>
          </div>
        </Callout>
      )}

      <div id="form-buttons" className="flex flex-col gap-[10px]">
        <SubmitButton size="full">Login</SubmitButton>
        <GoogleSignInButton className="rounded p-[10px]" />
      </div>

      <p id="forgot-password" className="mt-[8px]">
        <Link
          href="/reset-password"
          className="cursor-pointer text-[14px] text-blue-500 hover:underline"
        >
          Forgot password?
        </Link>
      </p>

      <div
        id="do-not-have-an-account"
        className="mt-[16px] flex justify-center gap-[5px] text-[13px]"
      >
        <span>Do not have a account?</span>
        <Link href="/signup" className="cursor-pointer text-blue-500 hover:underline">
          Sign Up
        </Link>
      </div>
    </form>
  )
}
