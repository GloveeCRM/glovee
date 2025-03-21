'use client'

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
import { Callout } from '@/components/ui/callout'

interface SetNewPasswordFormProps {
  resetPasswordToken: string
}

export default function SetNewPasswordForm({ resetPasswordToken }: SetNewPasswordFormProps) {
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
  )
}
