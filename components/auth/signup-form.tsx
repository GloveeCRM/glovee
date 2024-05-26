'use client'

import Link from 'next/link'
import { useState } from 'react'

import { FaRegCheckCircle } from 'react-icons/fa'
import { BiMessageSquareError } from 'react-icons/bi'

import { signUp } from '@/lib/actions/auth'
import { useOrgContext } from '@/contexts/org-context'

import { SubmitButton } from '../ui/buttons'
import { Callout } from '../ui/callout'
import { FormInput, InputLabel, PasswordInput, TextInput } from '../ui/inputs'
import Divider from '../ui/divider'

export default function SignUpForm() {
  const [formState, setFormState] = useState<any>({})
  const { orgName } = useOrgContext()

  async function handleSignUp(formData: FormData) {
    signUp(orgName, formData).then((res) => {
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

  const firstnameError = formState?.errors?.firstname ? formState?.errors?.firstname[0] : ''
  const lastnameError = formState?.errors?.lastname ? formState?.errors?.lastname[0] : ''
  const emailError = formState?.errors?.email ? formState?.errors?.email[0] : ''
  const passwordError = formState?.errors?.password ? formState?.errors?.password[0] : ''

  return (
    <form
      id="signup-form"
      action={handleSignUp}
      className="w-full max-w-[420px] rounded-md border border-n-300 p-[20px] shadow-sm"
    >
      <h1 id="signup-form-title" className="mb-[8px] text-center text-xl font-bold text-n-700">
        Sign Up
      </h1>

      <Divider className="mb-[16px] border-n-300" />

      <div id="form-inputs" className="mb-[26px] flex flex-col gap-[14px]">
        <FormInput id="firstname-input" errors={firstnameError}>
          <InputLabel htmlFor="firstname" text="md" weight="semibold">
            First Name
          </InputLabel>
          <TextInput id="firstname" name="firstname" placeholder="John" />
        </FormInput>
        <FormInput id="lastname-input" errors={lastnameError}>
          <InputLabel htmlFor="lastname" text="md" weight="semibold">
            Last Name
          </InputLabel>
          <TextInput id="lastname" name="lastname" placeholder="Doe" />
        </FormInput>
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

      <div id="form-buttons" className="">
        <SubmitButton size="full" className="p-[8px]">
          Sign Up
        </SubmitButton>
      </div>

      <div className="mt-[10px] flex justify-center gap-[5px] text-[12px]">
        <span>Already have account?</span>
        <Link href={'/login'} className="cursor-pointer text-blue-400 hover:underline">
          Log In
        </Link>
      </div>
    </form>
  )
}
