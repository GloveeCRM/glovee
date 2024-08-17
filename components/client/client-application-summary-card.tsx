'use client'

import Link from 'next/link'
import { FaFileLines, FaFilePen } from 'react-icons/fa6'

import { ApplicationStatusTypes, ApplicationType } from '@/lib/types/application'
import { Button } from '@/components/ui/button'
import ProgressIndicatorRing from '@/components/ui/progress-indicator-ring'
import ApplicationSummaryCardApplicantInfo from './application-summary-card-applicant-info'
import ApplicationCardCategorySummariesWrapper from './application-card-category-summaries-wrapper'
import SubmitApplicationDialog from './submit-application-dialog'

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
              {application.status === ApplicationStatusTypes.SUBMITTED ? (
                <Button size="default">
                  <div className="flex items-center justify-center gap-[8px]">
                    <span>View Submission</span>
                    <FaFileLines className="h-[16px] w-[16px]" />
                  </div>
                </Button>
              ) : (
                <Button size="default">
                  <div className="flex items-center justify-center gap-[8px]">
                    <span>Open Application</span>
                    <FaFilePen className="h-[16px] w-[16px]" />
                  </div>
                </Button>
              )}
            </Link>
          </div>
          {application.status !== ApplicationStatusTypes.SUBMITTED && (
            <SubmitApplicationDialog application={application} />
          )}
        </div>
      </div>
    </div>
  )
}
