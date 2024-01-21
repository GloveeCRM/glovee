'use client'

import { useFormState } from 'react-dom'

import { register } from '@/lib/actions/auth'

export default function RegisterForm() {
  const [formState, dispatch] = useFormState(register, undefined)

  return (
    <form action={dispatch}>
      <div>
        <label htmlFor="first-name">First Name</label>
        {formState?.errors?.firstName && <p>{formState.errors.firstName[0]}</p>}
        <input type="text" id="firstName" name="firstName" />
      </div>
      <div>
        <label htmlFor="last-name">Last Name</label>
        {formState?.errors?.lastName && <p>{formState.errors.lastName[0]}</p>}
        <input type="text" id="lastName" name="lastName" />
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
      <button type="submit">Register</button>
    </form>
  )
}
