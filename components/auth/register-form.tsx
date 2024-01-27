'use client'

import { useFormState } from 'react-dom'

import { register } from '@/lib/actions/auth'

import GoogleSignInButton from './google-sign-in-button'

export default function RegisterForm() {
  const [formState, dispatch] = useFormState(register, undefined)

  return (
    <form action={dispatch}>
      <div>
        <label htmlFor="name">name</label>
        <input type="text" id="name" name="name" />
        {formState?.errors?.name && <p>{formState.errors.name[0]}</p>}
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input type="text" id="email" name="email" />
        {formState?.errors?.email && <p>{formState.errors.email[0]}</p>}
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" />
        {formState?.errors?.password && <p>{formState.errors.password[0]}</p>}
      </div>
      {formState?.success}
      {formState?.error}
      <GoogleSignInButton />
      <button type="submit">Register</button>
    </form>
  )
}
