'use client'

import Link from 'next/link'
import { FaFileLines, FaFilePen } from 'react-icons/fa6'

import { ApplicationFormType } from '@/lib/types/form'
import { Button } from '@/components/ui/button'
import ProgressIndicatorRing from '@/components/ui/progress-indicator-ring'
import FormCardCategorySummariesWrapper from './form-card-category-summaries-wrapper'
import SubmitFormDialog from './submit-application-dialog'
import { Badge } from '../ui/badge'

interface ClientFormSummaryCardProps {
  applicationForm: ApplicationFormType
}

export default function ClientFormSummaryCard({ applicationForm }: ClientFormSummaryCardProps) {
  return (
    <div className="items-center justify-between rounded-lg border border-n-500 p-[10px]">
      <div>
        <div className="flex justify-between">
          <div>
            <Link
              href={`/application/${applicationForm.applicationID}/form/${applicationForm.applicationFormID}`}
            >
              <span className="font-semi-bold text-[16px]">{applicationForm.formID}</span>
            </Link>
          </div>
          <div className="flex items-center gap-[8px]">
            {/* <Badge size="lg">{form.status}</Badge> */}
            {/* <ProgressIndicatorRing completionRate={form.completionRate} /> */}
          </div>
        </div>
        {applicationForm.form.categories && (
          <FormCardCategorySummariesWrapper categorySummaries={applicationForm.form.categories} />
        )}
        {/* <div className="mt-[16px] flex justify-between gap-[8px]"> */}
        {/* <div className="w-[150px]">
            {form.status === FormStatusTypes.SUBMITTED ? (
              <Link href={`/application/${form.applicationID}/submission/${form.id}`}>
                <Button size="default">
                  <div className="flex items-center justify-center gap-[8px]">
                    <span>View Submission</span>
                    <FaFileLines className="h-[16px] w-[16px]" />
                  </div>
                </Button>
              </Link>
            ) : (
              <Link href={`/application/${form.applicationID}/form/${form.id}`}>
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
        </div> */}
      </div>
    </div>
  )
}
