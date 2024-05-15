'use client'

import Link from 'next/link'
import { useState } from 'react'
import { FaRegCheckCircle } from 'react-icons/fa'
import { BiMessageSquareError } from 'react-icons/bi'

import { forgotPassword } from '@/lib/actions/auth'
import { FormInput, InputLabel, TextInput } from '../ui/inputs'
import { Callout } from '../ui/callout'
import { SubmitButton } from '../ui/buttons'
import Divider from '../ui/divider'

export default function ForgotPasswordForm() {
  const [formState, setFormState] = useState<any>({})

  async function handleForgotPassword(formData: FormData) {
    forgotPassword(formData).then((res) => {
      if (res.success) {
        setFormState({ success: res.success })
      } else {
        setFormState(res)
      }
    })
  }

  const emailError = formState?.errors?.email ? formState?.errors?.email[0] : ''

  return (
    <form
      id="forgot-password-form"
      action={handleForgotPassword}
      className="w-full max-w-[420px] rounded-md border border-n-300 p-[20px] shadow-sm"
    >
      <h1
        id="forgot-password-form-title"
        className="mb-[8px] text-center text-xl font-bold text-n-700"
      >
        Reset Password
      </h1>

      <Divider className="mb-[16px] border-n-300" />

      <FormInput id="emai-input" errors={emailError} className="mb-[20px]">
        <InputLabel htmlFor="email" text="md" weight="semibold">
          Email
        </InputLabel>
        <TextInput id="email" name="email" placeholder="example@gmail.com" />
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

      <SubmitButton size="full" className="p-[8px]">
        Reset Password
      </SubmitButton>

      <p id="back-to-login-page" className="mt-[16px]">
        <Link href="/login" className="cursor-pointer text-[14px] text-blue-500 hover:underline">
          Back to login
        </Link>
      </p>
    </form>
  )
}