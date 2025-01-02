'use client'

import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useEffect } from 'react'
import { BiMessageSquareError } from 'react-icons/bi'

import { UpdateClientSchema } from '@/lib/zod/schemas'
import { UserStatusTypes, UserType } from '@/lib/types/user'
import { errorMessages } from '@/lib/constants/errors'
import { DEFAULT_MALE_CLIENT_LOGO_URL } from '@/lib/constants/images'
import { updateUserProfile } from '@/lib/actions/user'

import { DialogClose, DialogContent, DialogHeader } from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Callout } from '@/components/ui/callout'
import { Separator } from '@/components/ui/separator'
import ClientProfilePicture from './client-profile-picture'
import SetUserStatusButton from './set-user-status-button'

interface EditClientProfileDialogContentProps {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  client: UserType
}

export default function EditClientProfileDialogContent({
  isOpen,
  setIsOpen,
  client,
}: EditClientProfileDialogContentProps) {
  let defaultFormValues = {
    firstName: client.firstName,
    lastName: client.lastName,
    email: client.email,
  }

  const form = useForm<z.infer<typeof UpdateClientSchema>>({
    resolver: zodResolver(UpdateClientSchema),
    defaultValues: defaultFormValues,
  })

  const { firstName, lastName, email } = form.getValues()

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

  async function handleUpdateClientInformation(formValues: z.infer<typeof UpdateClientSchema>) {
    console.log(formValues)
    const { firstName, lastName, email } = formValues

    const { user, error } = await updateUserProfile({
      userID: client.userID,
      firstName,
      lastName,
      email,
    })
    if (user) {
      defaultFormValues = {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      }
      form.reset(defaultFormValues)

      clientInformationUpdateSuccessToast(`${user.firstName} ${user.lastName} information updated!`)
      setIsOpen(false)
    } else if (error) {
      form.setError('root.error', {
        message: error,
      })
    } else {
      clientInformationUpdateErrorToast(errorMessages('something_went_wrong'))
      setIsOpen(false)
    }
  }

  const resetForm = form.reset

  useEffect(() => {
    if (!isOpen) {
      resetForm()
    }
  }, [isOpen, resetForm])

  return (
    <DialogContent className="p-0">
      <DialogHeader className="space-y-0">
        <div className="absolute z-0 h-[75px] w-full rounded-t-lg bg-zinc-800/20" />
        <div className="z-10 flex flex-col gap-[14px] px-[18px] pt-[24px]">
          <ClientProfilePicture
            url={client.profilePictureURL || DEFAULT_MALE_CLIENT_LOGO_URL}
            clientID={client.userID}
            editable={true}
          />
          <div className="flex items-end gap-[16px]">
            <div className="flex flex-1 flex-col gap-[4px]">
              <div className="text-[20px] font-bold">
                {firstName} {lastName}
              </div>
              <span className="truncate text-[16px] text-zinc-600">{email}</span>
            </div>
            <SetUserStatusButton
              userID={client.userID}
              newStatus={
                client.status === UserStatusTypes.ACTIVE
                  ? UserStatusTypes.INACTIVE
                  : UserStatusTypes.ACTIVE
              }
            />
          </div>
        </div>
      </DialogHeader>
      <Separator className="mx-[18px] bg-zinc-100" />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleUpdateClientInformation)}
          className="flex flex-col gap-[18px] px-[18px] pb-[18px] pt-[24px]"
        >
          <div className="flex">
            <div className="min-w-[140px] text-[16px] font-medium">Name</div>
            <div className="flex gap-[12px]">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem className="w-full">
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
          </div>

          <div className="flex">
            <div className="min-w-[140px] text-[16px] font-medium">Email address</div>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="mb-[20px] w-full">
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
          </div>

          {form.formState.errors.root?.error?.message && (
            <Callout variant="error" className="mb-[20px]">
              <div className="flex items-center gap-[4px]">
                <BiMessageSquareError className="h-[16px] w-[16px]" />
                <span>{form.formState.errors.root.error.message}</span>
              </div>
            </Callout>
          )}

          <div className="flex justify-between">
            <div className="flex flex-1 gap-[8px]">
              <DialogClose asChild>
                <button className="w-full rounded bg-zinc-400 p-[8px] text-white hover:bg-zinc-500">
                  Cancel
                </button>
              </DialogClose>
              <button className="w-full rounded bg-zinc-800 p-[8px] text-white hover:bg-zinc-900">
                Save changes
              </button>
            </div>
          </div>
        </form>
      </Form>
    </DialogContent>
  )
}
