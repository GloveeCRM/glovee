import { notFound } from 'next/navigation'

import SetNewPasswordForm from '@/components/auth/set-new-password-form'

interface SetNewPasswordPageProps {
  searchParams: { resetPasswordToken?: string }
}

export default async function SetNewPasswordPage({ searchParams }: SetNewPasswordPageProps) {
  const resetPasswordToken = searchParams.resetPasswordToken

  if (!resetPasswordToken) {
    return notFound()
  }

  return <SetNewPasswordForm resetPasswordToken={resetPasswordToken} />
}
