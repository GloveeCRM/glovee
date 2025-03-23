import { fetchApplicationForm } from '@/lib/data/form'

import ApplicationFormQuestionSetsContainer from '@/components/application/application-form-question-sets-container'

interface ClientApplicationFormSubmissionPageParams {
  applicationFormID: string
}

interface ClientApplicationFormSubmissionPageProps {
  params: ClientApplicationFormSubmissionPageParams
}

export default async function ClientApplicationFormSubmissionPage({
  params,
}: ClientApplicationFormSubmissionPageProps) {
  const { applicationFormID } = params
  const applicationFormIDNumeric = Number(applicationFormID)

  const { applicationForm } = await fetchApplicationForm({
    applicationFormID: applicationFormIDNumeric,
  })

  if (!applicationForm) {
    return null
  }

  return (
    <div className="h-full p-[8px]">
      <ApplicationFormQuestionSetsContainer applicationFormStatus={applicationForm.status} />
    </div>
  )
}
