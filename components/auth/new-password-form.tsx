'use client'

import Link from 'next/link'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { FaRegCheckCircle } from 'react-icons/fa'
import { BiMessageSquareError } from 'react-icons/bi'

import { resetPassword } from '@/lib/actions/auth'
import { NewPasswordSchema } from '@/lib/zod/schemas'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components//ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components//ui/button'
import { Separator } from '@/components//ui/separator'
import { Callout } from '@/components/ui/callout'

interface NewPasswordFormProps {
  resetPasswordToken: string
}

export default function NewPasswordForm({ resetPasswordToken }: NewPasswordFormProps) {
  const defaultFormValues = {
    newPassword: '',
  }

  const form = useForm<z.infer<typeof NewPasswordSchema>>({
    resolver: zodResolver(NewPasswordSchema),
    defaultValues: defaultFormValues,
  })

  function handleForgotPassword(values: z.infer<typeof NewPasswordSchema>) {
    const { newPassword } = values

    resetPassword({ resetPasswordToken, newPassword }).then((res) => {
      if (res.error) {
        form.setError('root.error', {
          message: res.error,
        })
      } else {
        form.setError('root.success', {
          message: 'Password reset successful',
        })
        setTimeout(() => {
          window.location.href = '/login'
        }, 1000)
      }
    })
  }

  return (
    <div
      id="forgot-password-form"
      className="w-full max-w-[420px] rounded-md border border-n-300 p-[20px] shadow-sm"
    >
      <h1
        id="forgot-password-form-title"
        className="mb-[8px] text-center text-xl font-bold text-n-700"
      >
        New Password
      </h1>
      <Separator className="mb-[16px] bg-n-300" />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleForgotPassword)}>
          <FormField
            control={form.control}
            name="newPassword"
            render={({ field }) => (
              <FormItem className="mb-[20px] mt-[12px]">
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="Password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {form.formState.errors.root?.success?.message && (
            <Callout variant="success" className="mb-[20px]">
              <div className="flex items-center gap-[4px]">
                <FaRegCheckCircle className="h-[16px] w-[16px]" />
                <span>{form.formState.errors.root.success.message}</span>
              </div>
            </Callout>
          )}

          {form.formState.errors.root?.error?.message && (
            <Callout variant="error" className="mb-[20px]">
              <div className="flex items-center gap-[4px]">
                <BiMessageSquareError className="h-[16px] w-[16px]" />
                <span>{form.formState.errors.root.error.message}</span>
              </div>
            </Callout>
          )}

          <Button type="submit" variant="default" fullWidth={true}>
            Set New Password
          </Button>
        </form>
      </Form>

      <p id="back-to-login-page" className="mt-[16px]">
        <Link href="/login" className="cursor-pointer text-[14px] text-blue-500 hover:underline">
          Back to login
        </Link>
      </p>
    </div>
  )
}
