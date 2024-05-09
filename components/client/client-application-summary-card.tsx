'use client'

import Image from 'next/image'

import { DEFAULT_MALE_CLIENT_LOGO_URL } from '@/lib/constants/images'
import { ApplicationSummaryType } from '@/lib/types/application'
import { submitApplicationById } from '@/lib/actions/application'
import ApplicationCategoriesProgress from './application-categories-progress'
import { SubmitButton } from '../ui/buttons'
import ProgressIndicatorRing from '../ui/progress-indicator-ring'
import ApplicationSummaryCardApplicantInfo from './application-summary-card-applicant-info'

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
          <ApplicationCategoriesProgress categories={applicationSummary.categories} />
        )}
        <SubmitButton size="sm" onClick={() => submitApplicationById(applicationSummary.id)}>
          Submit
        </SubmitButton>
      </div>
    </div>
  )
}
