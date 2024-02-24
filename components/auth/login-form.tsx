'use client'

import { useFormState } from 'react-dom'
import { useSearchParams } from 'next/navigation'

import { login } from '@/lib/actions/auth'

import GoogleSignInButton from './google-sign-in-button'
import Link from 'next/link'
import { FormInput, InputError, InputLabel, PasswordInput, TextInput } from '../ui/inputs'
import { Callout } from '../ui/callout'
import { BiMessageSquareError } from 'react-icons/bi'
import { SubmitButton } from '../ui/buttons'

export default function LoginForm() {
  const [formState, dispatch] = useFormState(login, {})

  const searchParams = useSearchParams()
  const urlError =
    searchParams.get('error') === 'OAuthAccountNotLinked'
      ? 'Email already in use with different provider!'
      : ''

  return (
    <form id="login-form" action={dispatch} className="w-full max-w-[400px]">
      <div id="form-inputs" className="flex flex-col gap-[14px]">
        <FormInput id="email-input">
          <InputLabel htmlFor="email">Email</InputLabel>
          <div>
            <TextInput
              id="email"
              name="email"
              placeholder="example@gmail.com"
              className="mb-[6px]"
            />
            {formState?.errors?.email && <InputError>{formState.errors.email[0]}</InputError>}
          </div>
        </FormInput>
        <FormInput id="password-input">
          <InputLabel htmlFor="password">Password</InputLabel>
          <div>
            <PasswordInput
              id="password"
              name="password"
              placeholder="Password"
              className="mb-[6px]"
            />
            {formState?.errors?.password && <InputError>{formState.errors.password[0]}</InputError>}
          </div>
        </FormInput>
      </div>

      {formState?.success && <Callout variant="success">{formState.success}</Callout>}

      {(formState?.error || urlError) && (
        <Callout variant="error">
          <div className="flex items-center gap-[4px]">
            <BiMessageSquareError className="h-[16px] w-[16px]" />
            <span>{formState.error || urlError}</span>
          </div>
        </Callout>
      )}

      <div id="form-buttons" className="mt-[26px] flex flex-col gap-[10px]">
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
