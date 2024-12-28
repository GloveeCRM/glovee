import { fetchApplicationForms } from '@/lib/data/form'
import AdminFormSummaryCard from './admin-form-summary-card'

interface AdminApplicationFormsWrapperProps {
  applicationID: number
}

export default async function AdminApplicationFormsWrapper({
  applicationID,
}: AdminApplicationFormsWrapperProps) {
  const { applicationForms } = await fetchApplicationForms({ applicationID })

  const hasForms = applicationForms && applicationForms?.length > 0

  return !hasForms ? (
    <div className="flex h-full flex-1 flex-col items-center justify-center text-[20px] text-n-500">
      No forms are assigned to you yet
    </div>
  ) : (
    <div className="mt-[16px] flex flex-col gap-[16px]">
      {applicationForms.map((applicationForm) => (
        <div className="px-[8px]" key={applicationForm.formID}>
          <AdminFormSummaryCard applicationForm={applicationForm} />
        </div>
      ))}
    </div>
  )
}
