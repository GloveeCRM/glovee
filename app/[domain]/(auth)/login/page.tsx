import LoginForm from '@/components/auth/login-form'
import { Suspense } from 'react'

export default function LoginPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginForm />
    </Suspense>
  )
}
