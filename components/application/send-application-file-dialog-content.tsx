'use client'

import { useEffect, useRef } from 'react'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { BiMessageSquareError, BiSolidTrash } from 'react-icons/bi'
import { FaFile, FaFileArrowUp } from 'react-icons/fa6'

import { SendApplicationFileSchema } from '@/lib/zod/schemas'
import { uploadFileToS3 } from '@/lib/utils/s3'
import { extractFileNameParts } from '@/lib/utils/file'
import { createApplicationFile } from '@/lib/actions/application'

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
import { fetchPresignedPutURL } from '@/lib/data/s3'

interface SendApplicationFileDialogContentProps {
  applicationID: number
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}

const defaultFormValues = {
  fileName: '',
  file: undefined,
}

export default function SendApplicationFileDialogContent({
  applicationID,
  isOpen,
  setIsOpen,
}: SendApplicationFileDialogContentProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const form = useForm<z.infer<typeof SendApplicationFileSchema>>({
    resolver: zodResolver(SendApplicationFileSchema),
    defaultValues: defaultFormValues,
  })

  function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (file) {
      const { name } = extractFileNameParts(file.name)
      form.reset({
        file,
        fileName: name,
      })
    }
  }

  function handleDragOver(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault()
    e.currentTarget.setAttribute('data-dragover', 'true')
  }

  function handleDragLeave(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault()
    e.currentTarget.removeAttribute('data-dragover')
  }

  function handleDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault()
    e.currentTarget.removeAttribute('data-dragover')
    const file = e.dataTransfer.files?.[0]
    if (file) {
      const { name } = extractFileNameParts(file.name)
      form.reset({
        file,
        fileName: name,
      })
    }
  }

  function handleFileRemove() {
    form.reset(defaultFormValues)
  }

  function sendApplicationFileSuccessToast(message: string) {
    toast.success((t) => message, {
      duration: 3000,
      position: 'bottom-right',
    })
  }

  function sendApplicationFileErrorToast(message: string) {
    toast.error((t) => message, {
      duration: 3000,
      position: 'bottom-right',
    })
  }

  async function handleSendApplicationFile(values: z.infer<typeof SendApplicationFileSchema>) {
    const { file, fileName } = values

    const {
      url,
      objectKey,
      error: uploadURLDataError,
    } = await fetchPresignedPutURL({
      fileName: fileName + '.' + file.type.split('/')[1],
      mimeType: file.type,
      purpose: 'application_file',
      parentEntityID: applicationID,
      expiresIn: 3600,
    })

    if (uploadURLDataError) {
      sendApplicationFileErrorToast('Failed to upload file')
      console.error(uploadURLDataError)
      return
    }

    if (!url) {
      sendApplicationFileErrorToast('Failed to upload file')
      console.error('No upload URL received')
      return
    }

    const uploadRes = await uploadFileToS3(url, file)

    if (!uploadRes.success) {
      sendApplicationFileErrorToast('Failed to upload file to S3')
      console.error(uploadRes.message || 'Failed to upload file to S3')
      return
    }

    const { error: createApplicationFileError } = await createApplicationFile({
      applicationID: applicationID,
      objectKey: objectKey || '',
      fileName: fileName + '.' + file.type.split('/')[1],
      mimeType: file.type,
      size: file.size,
    })

    if (createApplicationFileError) {
      console.error(createApplicationFileError)
      form.setError('root.error', {
        message: createApplicationFileError || 'Failed to create application file',
      })
      console.error(createApplicationFileError)
      return
    }

    sendApplicationFileSuccessToast('File sent successfully!')
    setIsOpen(false)
  }

  const resetForm = form.reset

  useEffect(() => {
    if (!isOpen) {
      resetForm(defaultFormValues)
    }
  }, [isOpen, resetForm])

  const selectedFile = form.watch('file')

  return (
    <DialogContent onOpenAutoFocus={(e) => e.preventDefault()}>
      <DialogHeader>
        <DialogTitle>Send application file</DialogTitle>
      </DialogHeader>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSendApplicationFile)}
          className="flex flex-col gap-[12px] text-[14px]"
        >
          <FormField
            control={form.control}
            name="file"
            render={({ field: { onChange, value, ...field } }) => (
              <FormItem>
                <FormControl>
                  <>
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileSelect}
                      className="hidden"
                    />
                    {selectedFile ? (
                      <div className="flex justify-between rounded-lg border border-sand-600 p-[16px]">
                        <div className="flex items-center gap-[8px]">
                          <div className="flex items-center justify-center rounded bg-zinc-200 p-[6px]">
                            <FaFile className="h-[27px] w-[27px] text-zinc-600" />
                          </div>
                          <div className="flex flex-col gap-[2px]">
                            <p className="text-[14px] font-medium">{form.watch('fileName')}</p>
                            <p className="text-[12px] text-zinc-600">
                              {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                            </p>
                          </div>
                        </div>
                        <button onClick={handleFileRemove}>
                          <BiSolidTrash className="h-[28px] w-[28px] text-zinc-600 hover:text-red-600" />
                        </button>
                      </div>
                    ) : (
                      <div
                        className="rounded-lg border-2 border-dashed border-zinc-200 data-[dragover=true]:border-teal-500 data-[dragover=true]:bg-teal-100/50"
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                      >
                        <div className="pointer-events-none flex flex-col items-center justify-center gap-[16px] p-[16px]">
                          <FaFileArrowUp className="h-[36px] w-[36px] text-zinc-400" />
                          <p className="text-sm text-zinc-600">Drag and drop a file here, or</p>
                          <button
                            onClick={() => fileInputRef.current?.click()}
                            className="pointer-events-auto rounded bg-zinc-600 px-[8px] py-[4px] text-white hover:bg-zinc-700"
                          >
                            Select File
                          </button>
                        </div>
                      </div>
                    )}
                  </>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {selectedFile && (
            <FormField
              control={form.control}
              name="fileName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>File Name</FormLabel>
                  <FormControl>
                    <input
                      type="text"
                      className="w-full rounded border border-zinc-200 p-2 text-sm"
                      placeholder="Custom file name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          {form.formState.errors.root?.error?.message && (
            <Callout variant="error">
              <div className="flex items-center gap-[8px]">
                <BiMessageSquareError className="h-[20px] w-[20px]" />
                <span>{form.formState.errors.root.error.message}</span>
              </div>
            </Callout>
          )}

          <div className="mt-[12px] flex gap-[8px]">
            <DialogClose asChild>
              <button className="w-full rounded bg-zinc-400 p-[8px] text-white hover:bg-zinc-500">
                Cancel
              </button>
            </DialogClose>
            <button
              className="w-full rounded bg-zinc-800 p-[8px] text-white hover:bg-zinc-900"
              type="submit"
            >
              Send file
            </button>
          </div>
        </form>
      </Form>
    </DialogContent>
  )
}
