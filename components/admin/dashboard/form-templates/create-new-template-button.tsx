'use client'

import { useState } from 'react'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import toast from 'react-hot-toast'
import { useForm } from 'react-hook-form'
import { GoPlus } from 'react-icons/go'

import { CreateFormTemplateSchema } from '@/lib/zod/schemas'
import { createFormTemplate } from '@/lib/actions/form'

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

export default function CreateNewTemplateButton() {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const defaultFormValues = {
    templateName: '',
  }

  const form = useForm<z.infer<typeof CreateFormTemplateSchema>>({
    resolver: zodResolver(CreateFormTemplateSchema),
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

  async function handleCreateTemplate(values: z.infer<typeof CreateFormTemplateSchema>) {
    const { templateName } = values
    const { error } = await createFormTemplate({ templateName })
    if (error) {
      templateCreationErrorToast(error)
    } else {
      templateCreationSuccessToast('Template created successfully')
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
              name="templateName"
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

            <div className="mt-[16px] flex gap-[8px]">
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
