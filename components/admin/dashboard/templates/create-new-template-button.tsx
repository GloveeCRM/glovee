'use client'

import { useState } from 'react'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import toast from 'react-hot-toast'
import { useForm } from 'react-hook-form'
import { GoPlus } from 'react-icons/go'

import { TemplateSchema } from '@/lib/zod/schemas'
import { createNewTemplate } from '@/lib/actions/template'
import { useOrgContext } from '@/contexts/org-context'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
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
import { Textarea } from '@/components/ui/textarea'

export default function CreateNewTemplateButton() {
  const { orgName } = useOrgContext()
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const defaultFormValues = {
    name: '',
    description: '',
  }

  const form = useForm<z.infer<typeof TemplateSchema>>({
    resolver: zodResolver(TemplateSchema),
    defaultValues: defaultFormValues,
  })

  function templateCreationSuccessToast(message: string) {
    toast.success((t) => message, {
      duration: 3000,
      position: 'bottom-right',
    })
  }

  function templateCreationErrorToast(message: string) {
    toast.error((t) => message, {
      duration: 3000,
      position: 'bottom-right',
    })
  }

  function handleCreateTemplate(values: z.infer<typeof TemplateSchema>) {
    createNewTemplate(orgName, values)
      .then((res) => {
        if (res.success) {
          templateCreationSuccessToast(res.success)
        } else {
          templateCreationErrorToast(res.error)
        }
      })
      .finally(() => {
        setIsOpen(false)
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
          <span>New Template</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a new template</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleCreateTemplate)}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Template Name</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="Personal Information" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="mb-[16px]">
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="This template is used to collect personal information."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

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
