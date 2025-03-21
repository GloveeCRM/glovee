import Link from 'next/link'

import SetNewPasswordForm from '@/components/auth/set-new-password-form'
import AuthOrganizationInfo from '@/components/auth/auth-organization-info'
import { Separator } from '@/components/ui/separator'

interface SetNewPasswordCardProps {
  resetPasswordToken: string
}

export default function SetNewPasswordCard({ resetPasswordToken }: SetNewPasswordCardProps) {
  return (
    <div
      id="forgot-password-form"
      className="flex w-full max-w-[420px] flex-col gap-[24px] rounded-md border border-sand-500 bg-white p-[20px] shadow-sm"
    >
      <AuthOrganizationInfo />
      <div className="flex w-full flex-col gap-[4px]">
        <h1
          id="forgot-password-form-title"
          className="mb-[8px] text-center text-xl font-bold text-n-700"
        >
          New Password
        </h1>
        <Separator className="mb-[16px] bg-n-300" />
        <SetNewPasswordForm resetPasswordToken={resetPasswordToken} />
        <p id="back-to-login-page" className="mt-[16px]">
          <Link href="/login" className="cursor-pointer text-[14px] text-blue-500 hover:underline">
            Back to login
          </Link>
        </p>
      </div>
    </div>
  )
}
