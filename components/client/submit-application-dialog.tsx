'use client'

import { useState } from 'react'
import toast from 'react-hot-toast'
import { ImSpinner2 } from 'react-icons/im'

import { FormType } from '@/lib/types/form'
import { submitFormById } from '@/lib/actions/form'
import { useOrgContext } from '@/contexts/org-context'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import FormSummaryCardApplicantInfo from './form-summary-card-applicant-info'

interface SubmitFormDialogProps {
  form: FormType
}

export default function SubmitFormDialog({ form }: SubmitFormDialogProps) {
  const { orgName } = useOrgContext()
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

  function handleSubmitForm() {
    setIsSubmitting(true)
    submitFormById(form.id, orgName)
      .then((response) => {
        if (response.success) {
          submitFormSuccessToast(response.success)
        } else {
          submitFormErrorToast(response.error || 'An error occurred while submitting the form')
        }
      })
      .finally(() => {
        setIsOpen(false)
        setIsSubmitting(false)
      })
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
        <Button variant="default" size="default" disabled={form.completionRate !== 100}>
          Submit
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure you want to submit this form?</DialogTitle>
        </DialogHeader>
        <div className="mt-[8px]">
          <FormSummaryCardApplicantInfo
            applicantFirstName={form.applicant.firstName}
            applicantLastName={form.applicant.lastName}
            role={form.role}
          />
        </div>
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
