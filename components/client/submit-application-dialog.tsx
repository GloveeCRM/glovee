'use client'

import { useState } from 'react'
import toast from 'react-hot-toast'
import { ImSpinner2 } from 'react-icons/im'

import { ApplicationFormStatusTypes, FormType } from '@/lib/types/form'
// import { setFormStatus } from '@/lib/actions/form'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { useAuthContext } from '@/contexts/auth-context'

interface SubmitFormDialogProps {
  form: FormType
}

export default function SubmitFormDialog({ form }: SubmitFormDialogProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const { sessionUserID } = useAuthContext()

  function handleSubmitForm() {
    setIsSubmitting(true)
    // setFormStatus(form.formID, FormStatusTypes.SUBMITTED, sessionUserID || 0)
    //   .then((response) => {
    //     if (response.success) {
    //       submitFormSuccessToast(response.success)
    //     } else {
    //       submitFormErrorToast(response.error || 'An error occurred while submitting the form')
    //     }
    //   })
    //   .finally(() => {
    //     setIsOpen(false)
    //     setIsSubmitting(false)
    //   })
  }

  function submitFormSuccessToast(message: string) {
    toast.success((t) => message, {
      duration: 3000,
      position: 'bottom-right',
    })
  }

  function submitFormErrorToast(message: string) {
    toast.error((t) => message, {
      duration: 3000,
      position: 'bottom-right',
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="default" size="default" disabled={true /*form.completionRate !== 100}*/}>
          Submit
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure you want to submit this form?</DialogTitle>
        </DialogHeader>
        <div className="mt-[16px] flex gap-[8px]">
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
            onClick={handleSubmitForm}
          >
            {isSubmitting ? (
              <ImSpinner2 className="h-[24px] w-[24px] animate-spin text-n-200" />
            ) : (
              'Submit'
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
