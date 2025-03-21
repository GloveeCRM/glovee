import Link from 'next/link'

import LoginForm from '@/components/auth/login-form'
import AuthOrganizationInfo from '@/components/auth/auth-organization-info'
import { Separator } from '@/components/ui/separator'

export default function LoginCard() {
  return (
    <div
      id="login-form"
      className="flex w-full max-w-[420px] flex-col gap-[24px] rounded-md border border-sand-500 bg-white p-[20px] shadow-sm"
    >
      <AuthOrganizationInfo />
      <div className="flex w-full flex-col gap-[4px]">
        <h1 id="login-form-title" className="mb-[8px] text-center text-xl font-bold text-n-700">
          Login
        </h1>
        <Separator className="mb-[16px] bg-sand-500" />
        <LoginForm />
        <p id="forgot-password" className="mt-[8px]">
          <Link
            href="/forgot-password"
            className="cursor-pointer text-[14px] text-blue-500 hover:underline"
          >
            Forgot password?
          </Link>
        </p>

        <div
          id="do-not-have-an-account"
          className="mt-[16px] flex justify-center gap-[5px] text-[13px]"
        >
          <span>Do not have a account?</span>
          <Link href="/signup" className="cursor-pointer text-blue-500 hover:underline">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  )
}
