'use client'

import Link from 'next/link'
import { redirect } from 'next/navigation'
import { useState } from 'react'

import { FaRegCheckCircle } from 'react-icons/fa'
import { BiMessageSquareError } from 'react-icons/bi'

import { login } from '@/lib/actions/auth'

import { FormInput, InputLabel, PasswordInput, TextInput } from '../ui/inputs'
import { Callout } from '../ui/callout'
import { SubmitButton } from '../ui/buttons'
import Divider from '../ui/divider'

export default function LoginForm() {
  const [formState, setFormState] = useState<any>({})

  async function handleLogin(formData: FormData) {
    login(formData).then((res) => {
      if (res.success) {
        setFormState({ success: res.success })
        setTimeout(() => {
          window.location.href = res.data?.redirectLink
        }, 1000)
      } else {
        setFormState(res)
      }
    })
  }

  const emailError = formState?.errors?.email ? formState?.errors?.email[0] : ''
  const passwordError = formState?.errors?.password ? formState?.errors?.password[0] : ''

  return (
    <form
      id="login-form"
      action={handleLogin}
      className="w-full max-w-[420px] rounded-md border border-n-300 p-[20px] shadow-sm"
    >
      <h1 id="login-form-title" className="mb-[8px] text-center text-xl font-bold text-n-700">
        Login
      </h1>

      <Divider className="mb-[16px] border-n-300" />

      <div id="form-inputs" className="mb-[26px] flex flex-col gap-[14px]">
        <FormInput id="email-input" errors={emailError}>
          <InputLabel htmlFor="email" text="md" weight="semibold">
            Email
          </InputLabel>
          <TextInput id="email" name="email" placeholder="example@gmail.com" />
        </FormInput>
        <FormInput id="password-input" errors={passwordError}>
          <InputLabel htmlFor="password" text="md" weight="semibold">
            Password
          </InputLabel>
          <PasswordInput id="password" name="password" placeholder="Password" />
        </FormInput>
      </div>

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

      <div id="form-buttons">
        <SubmitButton size="full" className="p-[8px]">
          Login
        </SubmitButton>
      </div>

      <p id="forgot-password" className="mt-[8px]">
        <Link
          href="/reset-password"
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
    </form>
  )
}
