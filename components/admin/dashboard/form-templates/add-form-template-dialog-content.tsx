'use client'

import { useEffect } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'react-hot-toast'
import { BiMessageSquareError } from 'react-icons/bi'

import { errorMessages } from '@/lib/constants/errors'
import { CreateFormTemplateSchema } from '@/lib/zod/schemas'
import { createFormTemplate } from '@/lib/actions/form'

import { DialogClose, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Callout } from '@/components/ui/callout'

interface AddFormTemplateDialogContentProps {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}

export default function AddFormTemplateDialogContent({
  isOpen,
  setIsOpen,
}: AddFormTemplateDialogContentProps) {
  const defaultFormValues = {
    templateName: '',
  }

  const form = useForm<z.infer<typeof CreateFormTemplateSchema>>({
    resolver: zodResolver(CreateFormTemplateSchema),
    defaultValues: defaultFormValues,
  })

  function formTemplateCreationSuccessToast(message: string) {
    toast.success((t) => message, {
      duration: 3000,
      position: 'bottom-right',
    })
  }

  function formTemplateCreationErrorToast(message: string) {
    toast.error((t) => message, {
      duration: 3000,
      position: 'bottom-right',
    })
  }

  async function handleCreateFormTemplate(values: z.infer<typeof CreateFormTemplateSchema>) {
    const { templateName, templateDescription } = values

    const { formTemplate, error } = await createFormTemplate({
      templateName,
      templateDescription,
    })

    if (formTemplate) {
      formTemplateCreationSuccessToast(`${formTemplate.templateName} created!`)
      setIsOpen(false)
    } else if (error) {
      form.setError('root.error', {
        message: error,
      })
    } else {
      formTemplateCreationErrorToast(errorMessages('something_went_wrong'))
    }
  }

  const resetForm = form.reset

  useEffect(() => {
    if (!isOpen) {
      resetForm()
    }
  }, [isOpen, resetForm])

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Create a new form template</DialogTitle>
      </DialogHeader>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleCreateFormTemplate)}
          className="flex flex-col gap-[6px] text-[14px]"
        >
          <FormField
            control={form.control}
            name="templateName"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Template name</FormLabel>
                <FormControl>
                  <input
                    type="text"
                    placeholder="e.g. Personal information"
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
            name="templateDescription"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Template description</FormLabel>
                <FormControl>
                  <textarea
                    rows={3}
                    placeholder="e.g. This template is used to collect personal information from clients."
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
              Create client
            </button>
          </div>
        </form>
      </Form>
    </DialogContent>
  )
}
