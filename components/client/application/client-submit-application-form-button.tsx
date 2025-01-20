'use client'

import { updateApplicationFormStatus } from '@/lib/actions/form'
import { ApplicationFormStatusTypes } from '@/lib/types/form'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { FaFileExport, FaSpinner } from 'react-icons/fa'

export default function ClientSubmitApplicationFormButton({
  applicationFormID,
  disabled,
}: {
  applicationFormID: number
  disabled: boolean
}) {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

  function updateApplicationFormStatusSuccessToast(message: string) {
    toast.success((t) => message, {
      duration: 3000,
      position: 'bottom-right',
    })
  }

  function updateApplicationFormStatusErrorToast(message: string) {
    toast.error((t) => message, {
      duration: 3000,
      position: 'bottom-right',
    })
  }

  async function handleSubmit() {
    setIsSubmitting(true)
    const { error } = await updateApplicationFormStatus({
      applicationFormID,
      status: ApplicationFormStatusTypes.CLIENT_SUBMITTED,
    })
    setIsSubmitting(false)
    if (error) {
      updateApplicationFormStatusErrorToast(error)
    } else {
      updateApplicationFormStatusSuccessToast('Form submitted')
    }
  }

  return (
    <button
      className={`flex items-center gap-[4px] rounded-md px-[8px] py-[2px] ${
        disabled ? 'bg-zinc-100 text-zinc-500' : 'bg-zinc-200 text-zinc-900 hover:bg-zinc-300'
      }`}
      disabled={disabled || isSubmitting}
      onClick={handleSubmit}
    >
      {isSubmitting ? (
        <>
          <FaSpinner className="h-[16px] w-[16px] animate-spin" />
          <span className="text-[12px]">Submitting...</span>
        </>
      ) : (
        <>
          <FaFileExport className="h-[16px] w-[16px]" />
          <span className="text-[12px]">Submit Form</span>
        </>
      )}
    </button>
  )
}
