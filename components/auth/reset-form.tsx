'use client'

import Link from 'next/link'
import { sendResetPasswordEmail } from '@/lib/actions/auth'
import { useFormState } from 'react-dom'

export function ResetPasswordForm() {
  const [formState, dispatch] = useFormState(sendResetPasswordEmail, {})

  return (
    <form action={dispatch} className="space-y-6 bg-yellow-500">
      <div>
        <label htmlFor="email">Email</label>
        <input
          type="text"
          id="email"
          name="email"
          placeholder="example@gmail.com"
          className="mb-[28px] w-full rounded border border-black p-[8px] leading-tight"
        />
        {formState?.errors?.email && <p>{formState.errors.email[0]}</p>}
      </div>
      {formState?.success}
      <button type="submit" className="w-full bg-gray-500">
        Send reset email
      </button>
      <Link href={'/login'}>Back to login</Link>
    </form>
  )
}
