'use client'

import { useFormState } from 'react-dom'

import { register } from '@/lib/actions/auth'
import { Social } from './social'

export default function RegisterForm() {
  const [formState, dispatch] = useFormState(register, undefined)

  return (
    <form action={dispatch}>
      {formState?.success}
      {formState?.error}
      <div>
        <label htmlFor="name">name</label>
        {formState?.errors?.name && <p>{formState.errors.name[0]}</p>}
        <input type="text" id="name" name="name" />
      </div>
      <div>
        <label htmlFor="email">Email</label>
        {formState?.errors?.email && <p>{formState.errors.email[0]}</p>}
        <input type="text" id="email" name="email" />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        {formState?.errors?.password && <p>{formState.errors.password[0]}</p>}
        <input type="password" id="password" name="password" />
      </div>
      <Social />
      <button type="submit">Register</button>
    </form>
  )
}
