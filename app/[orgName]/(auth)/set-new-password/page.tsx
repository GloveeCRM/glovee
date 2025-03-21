import { notFound } from 'next/navigation'

import SetNewPasswordCard from '@/components/auth/set-new-password-card'

interface SetNewPasswordPageProps {
  searchParams: { resetPasswordToken?: string }
  params: {
    orgName: string
  }
}

export default async function SetNewPasswordPage({
  searchParams,
  params,
}: SetNewPasswordPageProps) {
  const { orgName } = params
  const { resetPasswordToken } = searchParams

  if (!resetPasswordToken) {
    return notFound()
  }

  return <SetNewPasswordCard orgName={orgName} resetPasswordToken={resetPasswordToken} />
}
