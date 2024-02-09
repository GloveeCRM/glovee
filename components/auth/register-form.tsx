'use client'

import { useFormState } from 'react-dom'

import { signUp } from '@/lib/actions/auth'

import GoogleSignInButton from './google-sign-in-button'
import Link from 'next/link'

export default function RegisterForm() {
  const [formState, dispatch] = useFormState(signUp, {})

  return (
    <>
      <form action={dispatch} className="w-1/5">
        <div>
          <label htmlFor="name" className="block text-[16px]">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="mb-[28px] w-full rounded border border-black p-[8px] leading-tight"
          />
          {formState?.errors?.name && <p>{formState.errors.name[0]}</p>}
        </div>
        <div>
          <label htmlFor="email" className="block text-[16px]">
            Email
          </label>
          <input
            type="text"
            id="email"
            name="email"
            className="mb-[28px] w-full rounded border border-black p-[8px] leading-tight"
          />
          {formState?.errors?.email && <p>{formState.errors.email[0]}</p>}
        </div>
        <div>
          <label htmlFor="password" className="block text-[16px]">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="w-full rounded border border-black p-[8px] leading-tight"
          />
          {formState?.errors?.password && <p>{formState.errors.password[0]}</p>}
        </div>
        {formState?.success}
        {formState?.error}
        <button type="submit" className="mt-[20px] w-full rounded bg-n-300 p-[8px]">
          Register
        </button>
        <GoogleSignInButton className="mt-[5px] rounded p-[10px]" />
        <div className="mt-[10px] flex justify-center gap-[5px] text-[12px]">
          <span>Already have account?</span>
          <Link href={'/login'} className="cursor-pointer text-blue-400 hover:underline">
            Log In
          </Link>
        </div>
      </form>
    </>
  )
}
