import { verifyUserEmail } from '@/lib/actions/auth'

import EmailVerificationError from './email-verification-error'
import EmailVerificationSuccess from './email-verification-success'
import { notFound } from 'next/navigation'

export async function EmailVerificationCard({ verificationToken }: { verificationToken: string }) {
  const { error, success } = await verifyUserEmail(verificationToken)

  return (
    <div>
      {error ? (
        <EmailVerificationError error={error} />
      ) : success ? (
        <EmailVerificationSuccess success={success} />
      ) : (
        notFound()
      )}
    </div>
  )
}
