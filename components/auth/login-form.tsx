'use client'

import { useFormState } from 'react-dom'
import { useSearchParams } from 'next/navigation'

import { login } from '@/lib/actions/auth'

import GoogleSignInButton from './google-sign-in-button'
import Link from 'next/link'
import { InputError, InputLabel, TextInput } from '../ui/inputs'

export default function LoginForm() {
  const [formState, dispatch] = useFormState(login, {})

  const searchParams = useSearchParams()
  const urlError =
    searchParams.get('error') === 'OAuthAccountNotLinked'
      ? 'Email already in use with different provider!'
      : ''

  return (
    <form action={dispatch}>
      <div className="mb-[24px] flex flex-col gap-[10px]">
        <InputLabel htmlFor="email">Email</InputLabel>
        <div>
          <TextInput id="email" name="email" placeholder="example@gmail.com" className="mb-[6px]" />
          {formState?.errors?.email && <InputError>{formState.errors.email[0]}</InputError>}
        </div>
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="******"
          className="mb-[28px] w-full rounded border border-black p-[8px] leading-tight"
        />
        {formState?.errors?.password && <p>{formState.errors.password[0]}</p>}
      </div>
      {formState?.success}
      {formState?.error || urlError}
      <Link href={'/reset'} className="cursor-pointer text-blue-400 hover:underline">
        Forgot password?
      </Link>
      <button type="submit" className="mt-[20px] w-full rounded bg-n-300 p-[8px]">
        Login
      </button>
      <GoogleSignInButton className="mt-[5px] rounded p-[10px]" />
      <div className="mt-[10px] flex justify-center gap-[5px] text-[12px]">
        <span>Do not have a account?</span>
        <Link href={'/signup'} className="cursor-pointer text-blue-400 hover:underline">
          Sign Up
        </Link>
      </div>
    </form>
  )
}
