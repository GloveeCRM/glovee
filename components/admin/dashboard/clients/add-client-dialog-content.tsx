'use client'

import { useEffect } from 'react'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { BiMessageSquareError } from 'react-icons/bi'
import toast from 'react-hot-toast'

import { errorMessages } from '@/lib/constants/errors'
import { CreateClientSchema } from '@/lib/zod/schemas'
import { createClient } from '@/lib/actions/user'
import { DialogTitle, DialogContent, DialogHeader, DialogClose } from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Callout } from '@/components/ui/callout'

interface AddClientDialogContentProps {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}

export default function AddClientDialogContent({ isOpen, setIsOpen }: AddClientDialogContentProps) {
  const defaultFormValues = {
    firstName: '',
    lastName: '',
    email: '',
  }

  const form = useForm<z.infer<typeof CreateClientSchema>>({
    resolver: zodResolver(CreateClientSchema),
    defaultValues: defaultFormValues,
  })

  function clientCreationSuccessToast(message: string) {
    toast.success((t) => message, {
      duration: 3000,
      position: 'bottom-right',
    })
  }

  function clientCreationErrorToast(message: string) {
    toast.error((t) => message, {
      duration: 3000,
      position: 'bottom-right',
    })
  }

  async function handleCreateClient(values: z.infer<typeof CreateClientSchema>) {
    const { user, error } = await createClient({
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
    })

    if (user) {
      setIsOpen(false)
      clientCreationSuccessToast(`${user.firstName} ${user.lastName} created!`)
    } else if (error) {
      form.setError('root.error', {
        message: error,
      })
    } else {
      setIsOpen(false)
      clientCreationErrorToast(errorMessages('something_went_wrong'))
    }
  }

  useEffect(() => {
    if (!isOpen) {
      form.reset()
    }
  }, [isOpen])

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Create a new client</DialogTitle>
      </DialogHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleCreateClient)} className="flex flex-col gap-[6px]">
          <div className="flex gap-[12px]">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>First name</FormLabel>
                  <FormControl>
                    <input
                      type="text"
                      placeholder="Jane"
                      className="w-full rounded border border-zinc-200 p-[8px] text-[14px] placeholder:text-zinc-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-500"
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
                  <FormLabel>Last name</FormLabel>
                  <FormControl>
                    <input
                      type="text"
                      placeholder="Cooper"
                      className="w-full rounded border border-zinc-200 p-[8px] text-[14px] placeholder:text-zinc-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-500"
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
              <FormItem className="mb-[20px]">
                <FormLabel>Email address</FormLabel>
                <FormControl>
                  <input
                    type="email"
                    placeholder="jane.cooper@gmail.com"
                    className="w-full rounded border border-zinc-200 p-[8px] text-[14px] placeholder:text-zinc-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-500"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {form.formState.errors.root?.error?.message && (
            <Callout variant="error" className="mb-[20px]">
              <div className="flex items-center gap-[4px]">
                <BiMessageSquareError className="h-[16px] w-[16px]" />
                <span>{form.formState.errors.root.error.message}</span>
              </div>
            </Callout>
          )}

          <div className="flex gap-[8px]">
            <DialogClose asChild>
              <button className="w-full rounded bg-zinc-400 p-[8px] text-white hover:bg-zinc-500">
                Cancel
              </button>
            </DialogClose>
            <button className="w-full rounded bg-zinc-800 p-[8px] text-white hover:bg-zinc-900">
              Create
            </button>
          </div>
        </form>
      </Form>
    </DialogContent>
  )
}
