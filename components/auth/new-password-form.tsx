'use client'

import { newPassword } from '@/lib/actions/auth'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useFormState } from 'react-dom'

export default function NewPasswordForm() {
  const searchParams = useSearchParams()
  const token = searchParams.get('token')
  const newPasswordWithToken = newPassword.bind(null, token)
  const [formState, dispatch] = useFormState(newPasswordWithToken, {})
  return (
    <form action={dispatch}>
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
      <button type="submit" className="w-full bg-gray-500">
        Reset password
      </button>
      <Link href={'/login'}>Back to login</Link>
    </form>
  )
}
