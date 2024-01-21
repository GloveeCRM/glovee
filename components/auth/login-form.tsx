'use client'

import { useFormState } from 'react-dom'

import { login } from '@/lib/actions/auth'

export default function LoginForm() {
  const [errors, dispatch] = useFormState(login, undefined)
  return (
    <form action={dispatch}>
      <div>
        <label htmlFor="email">Email</label>
        {errors?.email && <p>{errors.email[0]}</p>}
        <input type="text" id="email" name="email" placeholder="hi" />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        {errors?.password && <p>{errors.password[0]}</p>}
        <input type="password" id="password" name="password" placeholder="******" />
      </div>
      <button type="submit">Login</button>
    </form>
  )
}
