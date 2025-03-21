import Link from 'next/link'

import AuthOrganizationInfo from '@/components/auth/auth-organization-info'
import ForgotPasswordForm from '@/components/auth/forgot-password-form'
import { Separator } from '@/components/ui/separator'

interface ForgotPasswordCardProps {
  orgName: string
}

export default function ForgotPasswordCard({ orgName }: ForgotPasswordCardProps) {
  return (
    <div
      id="forgot-password-form"
      className="flex w-full max-w-[420px] flex-col gap-[24px] rounded-md border border-sand-500 bg-white p-[20px] shadow-sm"
    >
      <AuthOrganizationInfo orgName={orgName} />
      <div className="flex w-full flex-col gap-[4px]">
        <h1
          id="forgot-password-form-title"
          className="mb-[8px] text-center text-xl font-bold text-n-700"
        >
          Forgot Password
        </h1>
        <Separator className="mb-[16px] bg-n-300" />
        <ForgotPasswordForm />
        <p id="back-to-login-page" className="mt-[16px]">
          <Link href="/login" className="cursor-pointer text-[14px] text-blue-500 hover:underline">
            Back to login
          </Link>
        </p>
      </div>
    </div>
  )
}
