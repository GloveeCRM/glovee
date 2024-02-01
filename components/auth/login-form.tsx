'use client'

import { useFormState } from 'react-dom'
import { useSearchParams } from 'next/navigation'

import { login } from '@/lib/actions/auth'

import GoogleSignInButton from './google-sign-in-button'

export default function LoginForm() {
  const [formState, dispatch] = useFormState(login, {})

  const searchParams = useSearchParams()
  const urlError =
    searchParams.get('error') === 'OAuthAccountNotLinked'
      ? 'Email already in use with different provider!'
      : ''

  return (
    <form action={dispatch}>
      <div>
        <label htmlFor="email">Email</label>
        <input type="text" id="email" name="email" placeholder="hi" />
        {formState?.errors?.email && <p>{formState.errors.email[0]}</p>}
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" placeholder="******" />
        {formState?.errors?.password && <p>{formState.errors.password[0]}</p>}
      </div>
      {formState?.success}
      {formState?.error || urlError}
      <GoogleSignInButton />
      <button type="submit">Login</button>
    </form>
  )
}
