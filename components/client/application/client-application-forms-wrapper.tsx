import { fetchApplicationForms } from '@/lib/data/form'
import ClientFormSummaryCard from '../client-form-summary-card'

interface ClientApplicationFormsWrapperProps {
  applicationID: number
}

export default async function ClientApplicationFormsWrapper({
  applicationID,
}: ClientApplicationFormsWrapperProps) {
  const { applicationForms } = await fetchApplicationForms({ applicationID })

  const hasForms = applicationForms && applicationForms?.length > 0

  return !hasForms ? (
    <div className="flex h-full flex-1 flex-col items-center justify-center text-[20px] text-n-500">
      No forms are assigned to you yet
    </div>
  ) : (
    <div className="mt-[16px] flex flex-col gap-[16px]">
      {applicationForms.map((form) => (
        <div className="px-[8px]" key={form.formID}>
          <ClientFormSummaryCard form={form} />
        </div>
      ))}
    </div>
  )
}
