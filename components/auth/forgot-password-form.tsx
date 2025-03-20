'use client'

import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { FaRegCheckCircle } from 'react-icons/fa'
import { BiMessageSquareError } from 'react-icons/bi'

import { forgotPassword } from '@/lib/actions/auth'
import { ForgotPasswordSchema } from '@/lib/zod/schemas'

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
  )
}
