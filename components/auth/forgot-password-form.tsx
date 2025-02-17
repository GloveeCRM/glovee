'use client'

import Link from 'next/link'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { FaRegCheckCircle } from 'react-icons/fa'
import { BiMessageSquareError } from 'react-icons/bi'

import { forgotPassword } from '@/lib/actions/auth'
import { ForgotPasswordSchema } from '@/lib/zod/schemas'
import { useOrgContext } from '@/contexts/org-context'
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

export default function ForgotPasswordForm() {
  const defaultFormValues = {
    email: '',
  }

  const form = useForm<z.infer<typeof ForgotPasswordSchema>>({
    resolver: zodResolver(ForgotPasswordSchema),
    defaultValues: defaultFormValues,
  })

  function handleForgotPassword(values: z.infer<typeof ForgotPasswordSchema>) {
    const { email } = values

    forgotPassword({ email }).then((res) => {
      if (res.error) {
        form.setError('root.error', {
          message: res.error,
        })
      } else {
        form.setError('root.success', {
          message: 'Password reset email sent',
        })
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
        Forgot Password
      </h1>
      <Separator className="mb-[16px] bg-n-300" />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleForgotPassword)}>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="mb-[20px]">
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="example@gmail.com" {...field} />
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
            Send Reset Link
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
