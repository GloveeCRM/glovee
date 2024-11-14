'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { GoPlus } from 'react-icons/go'
import { IoClose } from 'react-icons/io5'

import { DEFAULT_MALE_CLIENT_LOGO_URL } from '@/lib/constants/images'
import { UserType } from '@/lib/types/user'
import { searchClients } from '@/lib/data/user'
import { createApplication } from '@/lib/actions/application'
import { CreateApplicationSchema } from '@/lib/zod/schemas'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
  DialogHeader,
  DialogClose,
} from '@/components/ui/dialog'
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

interface CreateNewApplicationButtonProp {
  client?: UserType
}

export default function CreateNewApplicationButton({ client }: CreateNewApplicationButtonProp) {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [clients, setClients] = useState<UserType[] | null>(null)
  const [isSearchingClients, setIsSearchingClients] = useState<boolean>(false)

  useEffect(() => {
    async function fetchClients() {
      const { clients } = await searchClients({})
      setClients(clients || null)
    }

    if (!client) {
      fetchClients()
    }
  }, [client])

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
      applicationCreationErrorToast(error || 'Failed to create application!')
    }
    setIsOpen(false)
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
          <span>New Application</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a new application</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form className="w-full" onSubmit={form.handleSubmit(handleCreateApplication)}>
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
                      <FormControl>
                        {field.value && (
                          <div className="mb-[6px] flex items-center justify-between rounded bg-n-200 p-[6px]">
                            <div className="flex items-center gap-[8px]">
                              <Image
                                src={
                                  clients?.find((c) => c.userID === field.value)
                                    ?.profilePictureURL || DEFAULT_MALE_CLIENT_LOGO_URL
                                }
                                alt=""
                                className="rounded-full"
                                width={30}
                                height={30}
                              />
                              {clients?.find((c) => c.userID === field.value)?.firstName}{' '}
                              {clients?.find((c) => c.userID === field.value)?.lastName}
                            </div>
                            <div className="cursor-pointer" onClick={() => field.onChange(0)}>
                              <IoClose className="h-[20px] w-[20px]" />
                            </div>
                          </div>
                        )}
                      </FormControl>
                      {field.value === 0 && (
                        <Command className="relative overflow-visible">
                          <CommandInput
                            className={`rounded border ${isSearchingClients && 'border-n-500'}`}
                            placeholder="Search for a client"
                            onFocus={() => setIsSearchingClients(true)}
                            onBlur={() =>
                              setTimeout(() => {
                                setIsSearchingClients(false)
                              }, 200)
                            }
                          />

                          {isSearchingClients && (
                            <CommandList className="absolute top-[37px] z-50 max-h-[126px] w-full border">
                              <CommandEmpty className="py-[8px] text-center text-[14px] text-n-500">
                                No Clients Found
                              </CommandEmpty>
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
            <div className="mt-[24px] flex gap-[8px]">
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
