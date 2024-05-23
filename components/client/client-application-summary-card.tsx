'use client'

import Link from 'next/link'
import { FaFilePen } from 'react-icons/fa6'

import { ApplicationStatus } from '@prisma/client'
import { ApplicationType } from '@/lib/types/application'
import { submitApplicationById } from '@/lib/actions/application'
import { Button, SubmitButton } from '../ui/buttons'
import ProgressIndicatorRing from '../ui/progress-indicator-ring'
import ApplicationSummaryCardApplicantInfo from './application-summary-card-applicant-info'
import ApplicationCardCategorySummariesWrapper from './application-card-category-summaries-wrapper'

interface ClientApplicationSummaryCardProps {
  application: ApplicationType
}

export default function ClientApplicationSummaryCard({
  application,
}: ClientApplicationSummaryCardProps) {
  return (
    <div className="items-center justify-between rounded-lg border border-n-500 p-[10px]">
      <div>
        <div className="flex justify-between">
          <ApplicationSummaryCardApplicantInfo
            applicantFirstName={application.applicantFirstName}
            applicantLastName={application.applicantLastName}
            role={application.role}
          />
          <div>
            <ProgressIndicatorRing completionRate={application.completionRate} />
          </div>
        </div>
        {application.categories && (
          <ApplicationCardCategorySummariesWrapper categorySummaries={application.categories} />
        )}
        <div className="mt-[16px] flex justify-between gap-[8px]">
          <div className="w-[150px]">
            <Link href={`/application/${application.id}`}>
              <Button
                size="full"
                hsize="sm"
                className="bg-n-700 text-[12px] font-medium text-n-100 hover:bg-n-900"
              >
                <div className="flex items-center justify-center gap-[8px]">
                  <span>
                    {`${application.status === ApplicationStatus.SUBMITTED ? 'View' : 'Open'} application`}
                  </span>
                  <FaFilePen className="h-[16px] w-[16px]" />
                </div>
              </Button>
            </Link>
          </div>
          {application.status !== ApplicationStatus.SUBMITTED && (
            <SubmitButton
              size="xs"
              hsize="sm"
              className="text-[12px] font-medium"
              onClick={() => submitApplicationById(application.id)}
              disabled={application.completionRate !== 100}
            >
              Submit
            </SubmitButton>
          )}
        </div>
      </div>
    </div>
  )
}
