'use client'

import { ApplicationSummaryType } from '@/lib/types/application'
import { submitApplicationById } from '@/lib/actions/application'
import ApplicationCardCategorySummariesWrapper from './application-card-category-summaries-wrapper'
import { Button, SubmitButton } from '../ui/buttons'
import ProgressIndicatorRing from '../ui/progress-indicator-ring'
import ApplicationSummaryCardApplicantInfo from './application-summary-card-applicant-info'
import Link from 'next/link'

interface ClientApplicationSummaryCardProps {
  applicationSummary: ApplicationSummaryType
}

export default function ClientApplicationSummaryCard({
  applicationSummary,
}: ClientApplicationSummaryCardProps) {
  return (
    <div className="items-center justify-between rounded-md border border-n-700 p-[10px]">
      <div>
        <div className="flex justify-between">
          <ApplicationSummaryCardApplicantInfo
            applicantFirstName={applicationSummary.applicantFirstName}
            applicantLastName={applicationSummary.applicantLastName}
            role={applicationSummary.role}
          />
          <div>
            <ProgressIndicatorRing completionRate={applicationSummary.completionRate} />
          </div>
        </div>
        {applicationSummary.categories && (
          <ApplicationCardCategorySummariesWrapper
            categorySummaries={applicationSummary.categories}
          />
        )}
        <div className="flex gap-[8px]">
          <SubmitButton
            size="xs"
            hsize="sm"
            onClick={() => submitApplicationById(applicationSummary.id)}
            disabled={applicationSummary.completionRate !== 100}
          >
            Submit
          </SubmitButton>
          <Link href={`/application/${applicationSummary.id}`}>
            <Button size="xs" hsize="sm">
              View
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
