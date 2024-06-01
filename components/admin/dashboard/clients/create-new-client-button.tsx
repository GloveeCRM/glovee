'use client'

import { useState } from 'react'
import { GoPlus } from 'react-icons/go'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { BiMessageSquareError } from 'react-icons/bi'

import { createNewClient } from '@/lib/actions/user'
import { CreateClientSchema } from '@/lib/zod/schemas'
import { useOrgContext } from '@/contexts/org-context'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
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

export default function CreateNewClientButton() {
  const { orgName } = useOrgContext()
  const [isOpen, setIsOpen] = useState<boolean>(false)

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

  function handleCreateClient(values: z.infer<typeof CreateClientSchema>) {
    createNewClient(orgName, values).then((res) => {
      if (res.success) {
        setIsOpen(false)
        clientCreationSuccessToast(res.success || 'Client created!')
      } else if (res.error === 'a user with this email exists in the organization') {
        form.setError('root.error', {
          message: res.error,
        })
      } else {
        setIsOpen(false)
        clientCreationErrorToast(res.error || 'Failed to create client')
      }
    })
  }

  function handleDialogOpenChange(isOpen: boolean) {
    setIsOpen(isOpen)
    form.reset(defaultFormValues)
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleDialogOpenChange}>
      <DialogTrigger asChild>
        <Button variant="outline" size="md">
          <GoPlus className="mr-[6px] h-[20px] w-[20px]" />
          <span>New Client</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a new client</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleCreateClient)}>
            <div className="flex gap-[12px]">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="Jane" {...field} />
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
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="Cooper" {...field} />
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
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="example@gmail.com" {...field} />
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
                <Button variant="secondary" fullWidth={true}>
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit" variant="default" fullWidth={true} autoFocus>
                Create
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
