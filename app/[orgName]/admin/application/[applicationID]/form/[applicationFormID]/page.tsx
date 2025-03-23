import { fetchApplicationForm } from '@/lib/data/form'

import ApplicationFormQuestionSetsContainer from '@/components/application/application-form-question-sets-container'

interface AdminApplicationFormPageParams {
  applicationFormID: string
}

interface AdminApplicationFormPageProps {
  params: AdminApplicationFormPageParams
}

export default async function AdminApplicationFormPage({ params }: AdminApplicationFormPageProps) {
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
