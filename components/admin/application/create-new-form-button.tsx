'use client'

import { useEffect, useState } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import toast from 'react-hot-toast'
import { GoPlus } from 'react-icons/go'

import { FormTemplateType } from '@/lib/types/form'
import { searchFormTemplates } from '@/lib/data/form'
import { CreateApplicationFormSchema } from '@/lib/zod/schemas'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { createApplicationForm } from '@/lib/actions/form'
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface CreateNewFormButtonProps {
  applicationID: number
}

export default function CreateNewFormButton({ applicationID }: CreateNewFormButtonProps) {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false)
  const [formTemplates, setFormTemplates] = useState<FormTemplateType[] | null>(null)

  useEffect(() => {
    async function fetchAndSetFormTemplates() {
      const { formTemplates, error } = await searchFormTemplates({})
      if (error) {
        console.error(error)
      }
      setFormTemplates(formTemplates || [])
    }

    fetchAndSetFormTemplates()
  }, [])

  const defaultFormValues = {
    formTemplateID: 0,
  }

  const form = useForm<z.infer<typeof CreateApplicationFormSchema>>({
    resolver: zodResolver(CreateApplicationFormSchema),
    defaultValues: defaultFormValues,
  })

  function applicationFormCreationSuccessToast(message: string) {
    toast.success((t) => message, {
      duration: 3000,
      position: 'bottom-right',
    })
  }

  function applicationFormCreationErrorToast(message: string) {
    toast.error((t) => message, {
      duration: 3000,
      position: 'bottom-right',
    })
  }

  async function handleCreateApplicationForm(values: z.infer<typeof CreateApplicationFormSchema>) {
    const { formTemplateID } = values
    const { error } = await createApplicationForm({
      applicationID,
      formTemplateID,
    })
    if (error) {
      applicationFormCreationErrorToast(error || 'Failed to create application!')
    } else {
      applicationFormCreationSuccessToast('Form created sucessfully!')
    }
    setIsDialogOpen(false)
  }

  function handleDialogOpenChange(isOpen: boolean) {
    form.reset(defaultFormValues)
    setIsDialogOpen(isOpen)
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={handleDialogOpenChange}>
      <DialogTrigger asChild>
        <Button size="md">
          <GoPlus className="mr-[6px] h-[20px] w-[20px]" />
          <span>Add a New Form</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a new form</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form className="w-full" onSubmit={form.handleSubmit(handleCreateApplicationForm)}>
            <FormField
              control={form.control}
              name="formTemplateID"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Template</FormLabel>
                    {formTemplates && formTemplates.length > 0 ? (
                      <Select onValueChange={(value) => field.onChange(Number(value))}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a template" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {formTemplates.map((formTemplate) => (
                            <SelectItem
                              key={formTemplate.formTemplateID}
                              value={String(formTemplate.formTemplateID)}
                            >
                              {formTemplate.templateName}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    ) : (
                      <div className="p-[4px] text-center text-[14px]">No templates found</div>
                    )}
                  </FormItem>
                )
              }}
            />
            <div className="mt-[24px] flex gap-[8px]">
              <DialogClose asChild>
                <Button variant="secondary" fullWidth={true}>
                  Cancel
                </Button>
              </DialogClose>
              <Button
                type="submit"
                variant="default"
                fullWidth={true}
                autoFocus
                disabled={form.watch('formTemplateID') === 0 || form.formState.isSubmitting}
              >
                Create
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
