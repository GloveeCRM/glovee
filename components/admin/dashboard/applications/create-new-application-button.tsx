'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { set, z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { GoPlus } from 'react-icons/go'

import { TemplateType } from '@/lib/types/template'
import { ApplicationRoleTypes } from '@/lib/types/application'
import { UserType } from '@/lib/types/user'
import { DEFAULT_MALE_CLIENT_LOGO_URL } from '@/lib/constants/images'
import { searchClients } from '@/lib/data/user'
import { searchTemplates } from '@/lib/data/template'
import { createNewApplication } from '@/lib/actions/application'
import { ApplicationSchema } from '@/lib/zod/schemas'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
  DialogHeader,
  DialogFooter,
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
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { IoClose } from 'react-icons/io5'

interface CreateNewApplicationButtonProp {
  orgName: string
  client?: UserType
}

export default function CreateNewApplicationButton({
  orgName,
  client,
}: CreateNewApplicationButtonProp) {
  const [open, setOpen] = useState<boolean>(false)
  const [templates, setTemplates] = useState<TemplateType[]>([])
  const [clients, setClients] = useState<UserType[]>([])
  const [isSearchingClients, setIsSearchingClients] = useState<boolean>(false)

  useEffect(() => {
    searchTemplates(orgName).then((res) => {
      setTemplates(res)
    })

    if (!client) {
      searchClients(orgName).then((res) => {
        setClients(res)
      })
    }
  }, [orgName])

  const defaultFormValues = {
    clientID: client?.id || 0,
    role: '',
    applicantFirstName: '',
    applicantLastName: '',
    templateID: 0,
  }

  const form = useForm<z.infer<typeof ApplicationSchema>>({
    resolver: zodResolver(ApplicationSchema),
    defaultValues: defaultFormValues,
  })

  async function handleCreateApplication(values: z.infer<typeof ApplicationSchema>) {
    createNewApplication(orgName, values).then((res) => {
      if (res.success) {
        setOpen(false)
      } else {
        console.error(res)
      }
    })
  }

  function handleDialogOpenChange(isOpen: boolean) {
    setOpen(isOpen)
    form.reset(defaultFormValues)
  }

  return (
    <Dialog open={open} onOpenChange={handleDialogOpenChange}>
      <DialogTrigger asChild>
        <Button variant="outline">
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
              <div className="flex items-center gap-[4px] text-[14px] text-gray-700">
                {client.avatarURL === null ? (
                  <Image
                    src={DEFAULT_MALE_CLIENT_LOGO_URL}
                    alt="CLient Logo"
                    width={20}
                    height={20}
                    className="rounded-full"
                  />
                ) : (
                  client.avatarURL
                )}
                {client.firstName} {client.lastName}
              </div>
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
                                  clients.find((c) => c.id === field.value)?.avatarURL ||
                                  DEFAULT_MALE_CLIENT_LOGO_URL
                                }
                                alt=""
                                className="rounded-full"
                                width={30}
                                height={30}
                              />
                              {clients.find((c) => c.id === field.value)?.firstName}{' '}
                              {clients.find((c) => c.id === field.value)?.lastName}
                            </div>
                            <div
                              className="cursor-pointer"
                              onClick={() => form.setValue('clientID', 0)}
                            >
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
                            <CommandList className="absolute top-[46px] z-50 max-h-[126px] w-full border">
                              <CommandEmpty className="py-[8px] text-center text-[14px] text-n-500">
                                No Clients Found
                              </CommandEmpty>
                              <CommandGroup>
                                {clients.map((client) => (
                                  <>
                                    <CommandItem
                                      key={client.id}
                                      value={client.firstName + ' ' + client.lastName}
                                      onSelect={() => field.onChange(client.id)}
                                    >
                                      <div className="flex items-center gap-[8px]">
                                        <Image
                                          src={client.avatarURL || DEFAULT_MALE_CLIENT_LOGO_URL}
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
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Role</FormLabel>
                    <Select onValueChange={(value) => field.onChange(value)}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a role" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Object.values(ApplicationRoleTypes).map((role) => (
                          <SelectItem key={role} value={role}>
                            {role.charAt(0).toUpperCase() + role.slice(1).toLowerCase()}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )
              }}
            />
            <FormField
              control={form.control}
              name="applicantFirstName"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="First Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )
              }}
            />
            <FormField
              control={form.control}
              name="applicantLastName"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="Last Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )
              }}
            />
            <FormField
              control={form.control}
              name="templateID"
              render={() => {
                return (
                  <FormItem>
                    <FormLabel>Template</FormLabel>
                    <Select onValueChange={(value) => form.setValue('templateID', Number(value))}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a template" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {templates.map((template) => (
                          <SelectItem key={template.id} value={String(template.id)}>
                            {template.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )
              }}
            />
            <div className="mt-[16px] flex gap-[8px]">
              <DialogClose asChild>
                <Button variant="secondary" fullWidth={true}>
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit" variant="default" fullWidth={true}>
                Create
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
