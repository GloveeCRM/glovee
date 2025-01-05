'use client'

import { useEffect, useState } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'react-hot-toast'
import { IoClose } from 'react-icons/io5'
import { FaClipboardList } from 'react-icons/fa6'

import { FormTemplateType } from '@/lib/types/form'
import { errorMessages } from '@/lib/constants/errors'
import { CreateApplicationFormSchema } from '@/lib/zod/schemas'
import { searchFormTemplates } from '@/lib/data/form'
import { createApplicationForm } from '@/lib/actions/form'

import { DialogClose, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
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
  CommandGroup,
  CommandEmpty,
  CommandInput,
  CommandList,
  CommandItem,
  CommandSeparator,
} from '@/components/ui/command'
import SearchClientsCommandItemSkeleton from '@/components/skeleton/admin/search-clients-command-item-skeleton'

interface AddApplicationFormDialogContentProps {
  applicationID: number
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}

export default function AddApplicationFormDialogContent({
  applicationID,
  isOpen,
  setIsOpen,
}: AddApplicationFormDialogContentProps) {
  const [formTemplates, setFormTemplates] = useState<FormTemplateType[] | null>(null)
  const [isFetchingFormTemplates, setIsFetchingFormTemplates] = useState<boolean>(false)
  const [isSearchingFormTemplates, setIsSearchingFormTemplates] = useState<boolean>(false)

  const defaultFormValues = {
    formTemplateID: 0,
    formName: '',
  }

  const form = useForm<z.infer<typeof CreateApplicationFormSchema>>({
    resolver: zodResolver(CreateApplicationFormSchema),
    defaultValues: defaultFormValues,
  })

  function createApplicationFormSuccessToast(message: string) {
    toast.success((t) => message, {
      duration: 3000,
      position: 'bottom-right',
    })
  }

  function createApplicationFormErrorToast(message: string) {
    toast.error((t) => message, {
      duration: 3000,
      position: 'bottom-right',
    })
  }

  async function handleCreateApplicationForm(values: z.infer<typeof CreateApplicationFormSchema>) {
    const { formTemplateID, formName } = values
    const { applicationFormID, error } = await createApplicationForm({
      applicationID,
      formTemplateID,
      formName,
    })
    if (applicationFormID) {
      createApplicationFormSuccessToast('Application form created!')
    } else {
      createApplicationFormErrorToast(errorMessages(error || 'something_went_wrong'))
    }
    setIsOpen(false)
  }

  const resetForm = form.reset

  useEffect(() => {
    async function fetchAndSetFormTemplates() {
      setIsFetchingFormTemplates(true)
      const { formTemplates } = await searchFormTemplates({})
      setFormTemplates(formTemplates || [])
      setIsFetchingFormTemplates(false)
    }

    if (isOpen) {
      fetchAndSetFormTemplates()
    } else {
      setFormTemplates(null)
      resetForm()
    }
  }, [isOpen, resetForm])

  return (
    <DialogContent onOpenAutoFocus={(e) => e.preventDefault()}>
      <DialogHeader>
        <DialogTitle>Create a new form</DialogTitle>
      </DialogHeader>
      <Form {...form}>
        <form
          className="flex flex-col gap-[12px] text-[14px]"
          onSubmit={form.handleSubmit(handleCreateApplicationForm)}
        >
          <div className="flex flex-col gap-[6px]">
            <FormField
              control={form.control}
              name="formTemplateID"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Form template</FormLabel>
                    {field.value !== 0 ? (
                      <FormControl>
                        <div className="flex items-center justify-between rounded bg-zinc-100 px-[8px] py-[4px]">
                          <div className="flex items-center gap-[8px]">
                            <div className="rounded-full bg-zinc-400 p-[7px] text-white">
                              <FaClipboardList className="h-[18px] w-[18px]" />
                            </div>
                            {
                              formTemplates?.find((ft) => ft.formTemplateID === field.value)?.form
                                .formName
                            }
                          </div>
                          <div className="cursor-pointer" onClick={() => field.onChange(0)}>
                            <IoClose className="h-[20px] w-[20px]" />
                          </div>
                        </div>
                      </FormControl>
                    ) : (
                      <Command className="relative overflow-visible">
                        <CommandInput
                          className={`rounded border border-zinc-200 ${isSearchingFormTemplates && 'ring-1 ring-zinc-500'}`}
                          placeholder="Search for a form template"
                          onFocus={() => setIsSearchingFormTemplates(true)}
                          onBlur={() =>
                            setTimeout(() => {
                              setIsSearchingFormTemplates(false)
                            }, 200)
                          }
                        />

                        {isSearchingFormTemplates && (
                          <CommandList className="absolute top-[43px] z-50 max-h-[126px] w-full border">
                            {isFetchingFormTemplates ? (
                              <SearchClientsCommandItemSkeleton />
                            ) : (
                              <CommandEmpty className="py-[8px] text-center text-[14px] text-zinc-500">
                                No form templates found
                              </CommandEmpty>
                            )}
                            <CommandGroup>
                              {formTemplates?.map((formTemplate) => (
                                <>
                                  <CommandItem
                                    key={formTemplate.formTemplateID}
                                    value={formTemplate.form.formName}
                                    onSelect={() => {
                                      field.onChange(formTemplate.formTemplateID)
                                      form.setValue('formName', formTemplate.form.formName)
                                    }}
                                  >
                                    <div className="flex items-center gap-[8px]">
                                      <div className="rounded-full bg-zinc-400 p-[7px] text-white">
                                        <FaClipboardList className="h-[18px] w-[18px]" />
                                      </div>
                                      {formTemplate.form.formName}
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

            {form.watch('formTemplateID') !== 0 && (
              <FormField
                control={form.control}
                name="formName"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Form name</FormLabel>
                    <FormControl>
                      <input
                        type="text"
                        placeholder="e.g. Personal Information"
                        className="w-full rounded border border-zinc-200 p-[8px] text-[14px] placeholder:text-zinc-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-500"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
          </div>

          <div className="flex gap-[8px]">
            <DialogClose asChild>
              <button className="w-full rounded bg-zinc-400 p-[8px] text-white hover:bg-zinc-500">
                Cancel
              </button>
            </DialogClose>
            <button
              className="w-full rounded bg-zinc-800 p-[8px] text-white hover:bg-zinc-900"
              type="submit"
            >
              Create form
            </button>
          </div>
        </form>
      </Form>
    </DialogContent>
  )
}
