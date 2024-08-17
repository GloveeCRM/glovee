'use client'

import { useState } from 'react'
import toast from 'react-hot-toast'
import { ImSpinner2 } from 'react-icons/im'

import { ApplicationType } from '@/lib/types/application'
import { submitApplicationById } from '@/lib/actions/application'
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
import ApplicationSummaryCardApplicantInfo from './application-summary-card-applicant-info'

interface SubmitApplicationDialogProps {
  application: ApplicationType
}

export default function SubmitApplicationDialog({ application }: SubmitApplicationDialogProps) {
  const { orgName } = useOrgContext()
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

  function handleSubmitApplication() {
    setIsSubmitting(true)
    submitApplicationById(application.id, orgName)
      .then((response) => {
        if (response.success) {
          submitApplicationSuccessToast(response.success)
        } else {
          submitApplicationErrorToast(
            response.error || 'An error occurred while submitting the application'
          )
        }
      })
      .finally(() => {
        setIsOpen(false)
        setIsSubmitting(false)
      })
  }

  function submitApplicationSuccessToast(message: string) {
    toast.success((t) => message, {
      duration: 3000,
      position: 'bottom-right',
    })
  }

  function submitApplicationErrorToast(message: string) {
    toast.error((t) => message, {
      duration: 3000,
      position: 'bottom-right',
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="default" size="default" disabled={application.completionRate !== 100}>
          Submit
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure you want to submit this application?</DialogTitle>
        </DialogHeader>
        <div className="mt-[8px]">
          <ApplicationSummaryCardApplicantInfo
            applicantFirstName={application.applicant.firstName}
            applicantLastName={application.applicant.lastName}
            role={application.role}
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
            onClick={handleSubmitApplication}
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
