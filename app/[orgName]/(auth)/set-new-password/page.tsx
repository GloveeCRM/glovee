import { notFound } from 'next/navigation'

import SetNewPasswordCard from '@/components/auth/set-new-password-card'

interface SetNewPasswordPageProps {
  searchParams: { resetPasswordToken?: string }
}

export default async function SetNewPasswordPage({ searchParams }: SetNewPasswordPageProps) {
  const resetPasswordToken = searchParams.resetPasswordToken

  if (!resetPasswordToken) {
    return notFound()
  }

  return <SetNewPasswordCard resetPasswordToken={resetPasswordToken} />
}
