import { notFound } from 'next/navigation'
import { Suspense } from 'react'

import { EmailVerificationCard } from '@/components/auth/email-verification-card'
import EmailVerificationLoading from '@/components/auth/email-verification-loading'

export default async function NewVerificationPage({
  searchParams,
}: {
  searchParams: { verificationToken?: string }
}) {
  const verificationToken = searchParams.verificationToken

  if (!verificationToken) {
    notFound()
  }

  return (
    <Suspense fallback={<EmailVerificationLoading />}>
      <EmailVerificationCard verificationToken={verificationToken} />
    </Suspense>
  )
}
