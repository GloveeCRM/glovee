'use client'

import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import toast from 'react-hot-toast'

import { UserType } from '@/lib/types/user'
import { UpdateClientSchema } from '@/lib/zod/schemas'
import { updateUserProfile } from '@/lib/actions/user'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Callout } from '@/components/ui/callout'
import { BiMessageSquareError } from 'react-icons/bi'

interface ClientProfileEditProps {
  onClose: () => void
  client: UserType
}

export default function ClientProfileEditForm({ onClose, client }: ClientProfileEditProps) {
  const defaultFormValues = {
    firstName: client.firstName,
    lastName: client.lastName,
    email: client.email,
  }

  const form = useForm<z.infer<typeof UpdateClientSchema>>({
    resolver: zodResolver(UpdateClientSchema),
    defaultValues: defaultFormValues,
  })

  function clientInformationUpdateSuccessToast(message: string) {
    toast.success((t) => message, {
      duration: 3000,
      position: 'bottom-right',
    })
  }

  function clientInformationUpdateErrorToast(message: string) {
    toast.error((t) => message, {
      duration: 3000,
      position: 'bottom-right',
    })
  }

  async function handleUpdateClientInformation(values: z.infer<typeof UpdateClientSchema>) {
    const { user, error } = await updateUserProfile({
      userID: client.userID,
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
    })
    if (user) {
      clientInformationUpdateSuccessToast(`${user.firstName} ${user.lastName} updated!`)
      onClose()
    } else if (error) {
      form.setError('root.error', {
        message: error,
      })
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleUpdateClientInformation)}>
        <div className="flex gap-[12px]">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel htmlFor="clientFirstName">First Name</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="John"
                    className="border-n-500 focus-visible:ring-n-400"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel htmlFor="clientLastName">Last Name</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Doe"
                    className="border-n-500 focus-visible:ring-n-400"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="mb-[16px] w-full">
              <FormLabel htmlFor="clientEmail">Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="example@gmail.com"
                  className="border-n-500 focus-visible:ring-n-400"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {form.formState.errors.root?.error?.message && (
          <Callout variant="error" className="mb-[16px]">
            <div className="flex items-center gap-[4px]">
              <BiMessageSquareError className="h-[16px] w-[16px]" />
              <span>{form.formState.errors.root.error.message}</span>
            </div>
          </Callout>
        )}

        <div className="flex gap-[8px]">
          <Button
            variant="default"
            className="bg-n-600 hover:bg-n-600/80"
            fullWidth={true}
            onClick={onClose}
          >
            Cancel
          </Button>

          <Button type="submit" variant="secondary" fullWidth={true} autoFocus>
            Save
          </Button>
        </div>
      </form>
    </Form>
  )
}
