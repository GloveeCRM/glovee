'use client'

import Link from 'next/link'
import { FaFilePen } from 'react-icons/fa6'

import { ApplicationStatusTypes, ApplicationType } from '@/lib/types/application'
import { submitApplicationById } from '@/lib/actions/application'
import { Button } from '@/components/ui/button'
import ProgressIndicatorRing from '@/components/ui/progress-indicator-ring'
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
            applicantFirstName={application.applicant.firstName}
            applicantLastName={application.applicant.lastName}
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
              <Button size="default">
                <div className="flex items-center justify-center gap-[8px]">
                  <span>
                    {`${application.status === ApplicationStatusTypes.SUBMITTED ? 'View' : 'Open'} application`}
                  </span>
                  <FaFilePen className="h-[16px] w-[16px]" />
                </div>
              </Button>
            </Link>
          </div>
          {application.status !== ApplicationStatusTypes.SUBMITTED && (
            <Button
              variant="secondary"
              size="default"
              onClick={() => submitApplicationById(application.id)}
              disabled={application.completionRate !== 100}
            >
              Submit
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
