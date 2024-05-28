'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { z } from 'zod'
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
                render={() => {
                  return (
                    <FormItem>
                      <FormLabel>Client</FormLabel>
                      <Select onValueChange={(value) => form.setValue('clientID', Number(value))}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a client" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {clients.map((client) => (
                            <SelectItem key={client.id} value={String(client.id)}>
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
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
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
        <DialogFooter></DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
