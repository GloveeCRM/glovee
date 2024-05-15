import { notFound } from 'next/navigation'

import NewPasswordForm from '@/components/auth/new-password-form'

interface NewPasswordPageProps {
  searchParams: { resetPasswordToken?: string }
}

export default function NewPasswordPage({ searchParams }: NewPasswordPageProps) {
  const resetPasswordToken = searchParams.resetPasswordToken

  if (!resetPasswordToken) {
    return notFound()
  }

  return <NewPasswordForm resetPasswordToken={resetPasswordToken} />
}
