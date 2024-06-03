'use client'

import Link from 'next/link'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { FaRegCheckCircle } from 'react-icons/fa'
import { BiMessageSquareError } from 'react-icons/bi'

import { login } from '@/lib/actions/auth'
import { LoginSchema } from '@/lib/zod/schemas'
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

export default function LoginForm() {
  const { orgName } = useOrgContext()

  const defaultFormValues = {
    email: '',
    password: '',
  }

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: defaultFormValues,
  })

  function handleLogin(orgName: string, values: z.infer<typeof LoginSchema>) {
    login(orgName, values).then((res) => {
      if (res.success) {
        form.setError('root.success', {
          message: res.success,
        })
        setTimeout(() => {
          window.location.href = res.data?.redirectLink
        }, 500)
      } else {
        form.setError('root.error', {
          message: res.error,
        })
      }
    })
  }

  return (
    <div
      id="login-form"
      className="w-full max-w-[420px] rounded-md border border-n-300 p-[20px] shadow-sm"
    >
      <h1 id="login-form-title" className="mb-[8px] text-center text-xl font-bold text-n-700">
        Login
      </h1>
      <Separator className="mb-[16px] bg-n-300" />
      <Form {...form}>
        <form onSubmit={form.handleSubmit((values) => handleLogin(orgName, values))}>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="example@gmail.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
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
            Login
          </Button>
        </form>
      </Form>
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
  )
}
