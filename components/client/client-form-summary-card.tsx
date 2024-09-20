'use client'

import Link from 'next/link'
import { FaFileLines, FaFilePen } from 'react-icons/fa6'

import { FormStatusTypes, FormType } from '@/lib/types/form'
import { Button } from '@/components/ui/button'
import ProgressIndicatorRing from '@/components/ui/progress-indicator-ring'
import FormSummaryCardApplicantInfo from './form-summary-card-applicant-info'
import FormCardCategorySummariesWrapper from './form-card-category-summaries-wrapper'
import SubmitFormDialog from './submit-application-dialog'

interface ClientFormSummaryCardProps {
  form: FormType
}

export default function ClientFormSummaryCard({ form }: ClientFormSummaryCardProps) {
  return (
    <div className="items-center justify-between rounded-lg border border-n-500 p-[10px]">
      <div>
        <div className="flex justify-between">
          <FormSummaryCardApplicantInfo
            applicantFirstName={form.applicant.firstName}
            applicantLastName={form.applicant.lastName}
            role={form.role}
          />
          <div>
            <ProgressIndicatorRing completionRate={form.completionRate} />
          </div>
        </div>
        {form.categories && (
          <FormCardCategorySummariesWrapper categorySummaries={form.categories} />
        )}
        <div className="mt-[16px] flex justify-between gap-[8px]">
          <div className="w-[150px]">
            {form.status === FormStatusTypes.SUBMITTED ? (
              <Link href={`/submission/${form.id}`}>
                <Button size="default">
                  <div className="flex items-center justify-center gap-[8px]">
                    <span>View Submission</span>
                    <FaFileLines className="h-[16px] w-[16px]" />
                  </div>
                </Button>
              </Link>
            ) : (
              <Link href={`/application/${form.id}`}>
                <Button size="default">
                  <div className="flex items-center justify-center gap-[8px]">
                    <span>Open Application</span>
                    <FaFilePen className="h-[16px] w-[16px]" />
                  </div>
                </Button>
              </Link>
            )}
          </div>
          {form.status !== FormStatusTypes.SUBMITTED && <SubmitFormDialog form={form} />}
        </div>
      </div>
    </div>
  )
}
