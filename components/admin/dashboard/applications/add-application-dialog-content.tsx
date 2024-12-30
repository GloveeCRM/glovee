'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { IoClose } from 'react-icons/io5'

import { UserType } from '@/lib/types/user'
import { errorMessages } from '@/lib/constants/errors'
import { DEFAULT_MALE_CLIENT_LOGO_URL } from '@/lib/constants/images'
import { CreateApplicationSchema } from '@/lib/zod/schemas'
import { createApplication } from '@/lib/actions/application'
import { searchClients } from '@/lib/data/user'

import { DialogTitle, DialogContent, DialogHeader, DialogClose } from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command'
import SearchClientsCommandItemSkeleton from '@/components/skeleton/admin/search-clients-command-item-skeleton'

interface AddApplicationDialogContentProps {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  client?: UserType
}

export default function AddApplicationDialogContent({
  isOpen,
  setIsOpen,
  client,
}: AddApplicationDialogContentProps) {
  const [clients, setClients] = useState<UserType[] | null>(null)
  const [isFetchingClients, setIsFetchingClients] = useState<boolean>(false)
  const [isSearchingClients, setIsSearchingClients] = useState<boolean>(false)

  const defaultFormValues = {
    clientID: client?.userID || 0,
  }

  const form = useForm<z.infer<typeof CreateApplicationSchema>>({
    resolver: zodResolver(CreateApplicationSchema),
    defaultValues: defaultFormValues,
  })

  function applicationCreationSuccessToast(message: string) {
    toast.success((t) => message, {
      duration: 3000,
      position: 'bottom-right',
    })
  }

  function applicationCreationErrorToast(message: string) {
    toast.error((t) => message, {
      duration: 3000,
      position: 'bottom-right',
    })
  }

  async function handleCreateApplication(values: z.infer<typeof CreateApplicationSchema>) {
    const { clientID } = values
    const { application, error } = await createApplication({
      userID: clientID,
    })
    if (application) {
      applicationCreationSuccessToast('Application created!')
    } else {
      applicationCreationErrorToast(errorMessages(error || 'something_went_wrong'))
    }
    setIsOpen(false)
  }

  const resetForm = form.reset

  useEffect(() => {
    async function fetchAndSetClients() {
      setIsFetchingClients(true)
      const { clients } = await searchClients({})
      setClients(clients || null)
      setIsFetchingClients(false)
    }

    if (!client) {
      if (isOpen) {
        fetchAndSetClients()
      } else {
        setClients(null)
        resetForm()
      }
    }
  }, [isOpen, client, resetForm])

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Create a new application</DialogTitle>
      </DialogHeader>
      <Form {...form}>
        <form className="mt-[12px] w-full" onSubmit={form.handleSubmit(handleCreateApplication)}>
          {client ? (
            <FormField
              control={form.control}
              name="clientID"
              render={() => {
                return (
                  <FormItem>
                    <FormLabel>Client</FormLabel>
                    <div className="flex items-center gap-[8px] p-[4px] text-[14px] text-gray-700">
                      <Image
                        src={client?.profilePictureURL || DEFAULT_MALE_CLIENT_LOGO_URL}
                        alt="CLient Logo"
                        width={30}
                        height={30}
                        className="rounded-full"
                      />
                      <span className="font-medium">
                        {client.firstName} {client.lastName}
                      </span>
                    </div>
                  </FormItem>
                )
              }}
            />
          ) : (
            <FormField
              control={form.control}
              name="clientID"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Client</FormLabel>
                    {field.value !== 0 ? (
                      <FormControl>
                        <div className="mb-[6px] flex items-center justify-between rounded bg-zinc-100 p-[6px]">
                          <div className="flex items-center gap-[8px]">
                            <Image
                              src={
                                clients?.find((c) => c.userID === field.value)?.profilePictureURL ||
                                DEFAULT_MALE_CLIENT_LOGO_URL
                              }
                              alt=""
                              className="rounded-full"
                              width={29}
                              height={29}
                            />
                            {clients?.find((c) => c.userID === field.value)?.firstName}{' '}
                            {clients?.find((c) => c.userID === field.value)?.lastName}
                          </div>
                          <div className="cursor-pointer" onClick={() => field.onChange(0)}>
                            <IoClose className="h-[20px] w-[20px]" />
                          </div>
                        </div>
                      </FormControl>
                    ) : (
                      <Command className="relative overflow-visible">
                        <CommandInput
                          className={`rounded border border-zinc-200 ${isSearchingClients && 'ring-1 ring-zinc-500'}`}
                          placeholder="Search for a client"
                          onFocus={() => setIsSearchingClients(true)}
                          onBlur={() =>
                            setTimeout(() => {
                              setIsSearchingClients(false)
                            }, 200)
                          }
                        />

                        {isSearchingClients && (
                          <CommandList className="absolute top-[43px] z-50 max-h-[126px] w-full border">
                            {isFetchingClients ? (
                              <SearchClientsCommandItemSkeleton />
                            ) : (
                              <CommandEmpty className="py-[8px] text-center text-[14px] text-zinc-500">
                                No Clients Found
                              </CommandEmpty>
                            )}
                            <CommandGroup>
                              {clients?.map((client) => (
                                <>
                                  <CommandItem
                                    key={client.userID}
                                    value={client.firstName + ' ' + client.lastName}
                                    onSelect={() => field.onChange(client.userID)}
                                  >
                                    <div className="flex items-center gap-[8px]">
                                      <Image
                                        src={
                                          client.profilePictureURL || DEFAULT_MALE_CLIENT_LOGO_URL
                                        }
                                        alt=""
                                        className="rounded-full"
                                        width={25}
                                        height={25}
                                      />
                                      {client.firstName} {client.lastName}
                                    </div>
                                  </CommandItem>
                                  <CommandSeparator />
                                </>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        )}
                      </Command>
                    )}
                    <FormMessage />
                  </FormItem>
                )
              }}
            />
          )}
          <div className="mt-[52px] flex gap-[8px]">
            <DialogClose asChild>
              <button className="w-full rounded bg-zinc-400 p-[8px] text-white hover:bg-zinc-500">
                Cancel
              </button>
            </DialogClose>
            <button className="w-full rounded bg-zinc-800 p-[8px] text-white hover:bg-zinc-900">
              Create application
            </button>
          </div>
        </form>
      </Form>
    </DialogContent>
  )
}
