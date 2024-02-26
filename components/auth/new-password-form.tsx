'use client'

import Link from 'next/link'
import { useFormState } from 'react-dom'
import { BiMessageSquareError } from 'react-icons/bi'
import { FaRegCheckCircle } from 'react-icons/fa'

import { resetPassword } from '@/lib/actions/auth'
import Divider from '../ui/divider'
import { FormInput, InputLabel, PasswordInput } from '../ui/inputs'
import { Callout } from '../ui/callout'
import { SubmitButton } from '../ui/buttons'

interface NewPasswordFormProps {
  resetPasswordToken: string
}
export default function NewPasswordForm({ resetPasswordToken }: NewPasswordFormProps) {
  const newPasswordWithToken = resetPassword.bind(null, resetPasswordToken)
  const [formState, dispatch] = useFormState(newPasswordWithToken, {})

  const passwordError = formState?.errors?.password ? formState?.errors?.password[0] : ''

  return (
    <form
      id="new-password-form"
      action={dispatch}
      className="w-full max-w-[420px] rounded-md border border-n-300 p-[20px] shadow-sm"
    >
      <h1
        id="new-password-form-title"
        className="mb-[8px] text-center text-xl font-bold text-n-700"
      >
        New Password
      </h1>

      <Divider className="mb-[16px] border-n-300" />

      <FormInput id="password-input" error={passwordError} className="mb-[20px]">
        <InputLabel htmlFor="password">New Password</InputLabel>
        <PasswordInput id="password" name="password" placeholder="Password" />
      </FormInput>

      {formState?.success && (
        <Callout variant="success" className="mb-[12px]">
          <div className="flex items-center gap-[4px]">
            <FaRegCheckCircle className="h-[16px] w-[16px]" />
            <span>{formState.success}</span>
          </div>
        </Callout>
      )}

      {formState?.error && (
        <Callout variant="error" className="mb-[12px]">
          <div className="flex items-center gap-[4px]">
            <BiMessageSquareError className="h-[16px] w-[16px]" />
            <span>{formState.error}</span>
          </div>
        </Callout>
      )}

      <SubmitButton size="full">Set New Password</SubmitButton>

      <p id="back-to-login-page" className="mt-[16px]">
        <Link href="/login" className="cursor-pointer text-[14px] text-blue-500 hover:underline">
          Back to login
        </Link>
      </p>
    </form>
  )
}
