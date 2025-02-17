'use client'

import Link from 'next/link'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { FaRegCheckCircle } from 'react-icons/fa'
import { BiMessageSquareError } from 'react-icons/bi'

import { register } from '@/lib/actions/auth'
import { SignupSchema } from '@/lib/zod/schemas'
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
import { Separator } from '@/components/ui/separator'
import { Callout } from '@/components/ui/callout'

export default function SignUpForm() {
  const defaultFormValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  }

  const form = useForm<z.infer<typeof SignupSchema>>({
    resolver: zodResolver(SignupSchema),
    defaultValues: defaultFormValues,
  })

  async function handleSignup(values: z.infer<typeof SignupSchema>) {
    const { email, password, firstName, lastName } = values

    const { redirectURL, error } = await register({ email, password, firstName, lastName })
    if (!error) {
      form.setError('root.success', {
        message: 'Please check your email for verification',
      })
      setTimeout(() => {
        window.location.href = redirectURL || '/'
      }, 500)
    } else {
      form.setError('root.error', {
        message: error,
      })
    }
  }

  return (
    <div
      id="signup-form"
      className="w-full max-w-[420px] rounded-md border border-n-300 p-[20px] shadow-sm"
    >
      <h1 id="signup-form-title" className="mb-[8px] text-center text-xl font-bold text-n-700">
        Sign Up
      </h1>
      <Separator className="mb-[16px] bg-n-300" />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSignup)}>
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="John" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
            Sign Up
          </Button>
        </form>
      </Form>

      <div className="mt-[10px] flex justify-center gap-[5px] text-[12px]">
        <span>Already have account?</span>
        <Link href={'/login'} className="cursor-pointer text-blue-400 hover:underline">
          Log In
        </Link>
      </div>
    </div>
  )
}
