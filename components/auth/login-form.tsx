'use client'

import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { FaRegCheckCircle } from 'react-icons/fa'
import { BiMessageSquareError } from 'react-icons/bi'

import { login } from '@/lib/actions/auth'
import { LoginSchema } from '@/lib/zod/schemas'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Callout } from '@/components/ui/callout'

export default function LoginForm() {
  const defaultFormValues = {
    email: '',
    password: '',
  }

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: defaultFormValues,
  })

  async function handleLogin(values: z.infer<typeof LoginSchema>) {
    const { email, password } = values
    const { redirectLink, error } = await login({ email, password })
    if (!error) {
      form.setError('root.success', {
        message: 'Login successful!',
      })
      setTimeout(() => {
        window.location.href = redirectLink || '/'
      }, 500)
    } else {
      form.setError('root.error', {
        message: error,
      })
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleLogin)} className="flex flex-col gap-[2px]">
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
  )
}
