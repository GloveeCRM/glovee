'use client'

import { useFormState } from 'react-dom'

import { login } from '@/lib/actions/auth'
import { useSearchParams } from 'next/navigation'
import { Social } from './social'

export default function LoginForm() {
  const searchParams = useSearchParams()
  const urlError =
    searchParams.get('error') === 'OAuthAccountNotLinked'
      ? 'Email already in use with different provider!'
      : ''
  const [formState, dispatch] = useFormState(login, undefined)

  return (
    <form action={dispatch}>
      {formState?.success}
      {formState?.error || urlError}
      <Social />
      <div>
        <label htmlFor="email">Email</label>
        {formState?.errors?.email && <p>{formState.errors.email[0]}</p>}
        <input type="text" id="email" name="email" placeholder="hi" />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        {formState?.errors?.password && <p>{formState.errors.password[0]}</p>}
        <input type="password" id="password" name="password" placeholder="******" />
      </div>
      <button type="submit">Login</button>
    </form>
  )
}
