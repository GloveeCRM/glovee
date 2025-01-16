import { fetchApplicationForms } from '@/lib/data/form'
import ClientApplicationFormSummaryCard from './client-application-form-summary-card'

interface ClientApplicationFormsContainerProps {
  applicationID: number
}

export default async function ClientApplicationFormsContainer({
  applicationID,
}: ClientApplicationFormsContainerProps) {
  const { applicationForms } = await fetchApplicationForms({ applicationID })

  const hasForms = applicationForms && applicationForms?.length > 0

  return !hasForms ? (
    <div className="flex h-full flex-1 flex-col items-center justify-center text-[20px] text-n-500">
      No forms are assigned to you yet
    </div>
  ) : (
    <div className="flex flex-col gap-[16px] px-[8px]">
      {applicationForms.map((applicationForm) => (
        <ClientApplicationFormSummaryCard
          key={applicationForm.applicationFormID}
          applicationForm={applicationForm}
        />
      ))}
    </div>
  )
}
