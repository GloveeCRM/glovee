import { fetchApplicationForms } from '@/lib/data/form'
import AdminFormSummaryCard from './admin-form-summary-card'
import { FaClipboardList } from 'react-icons/fa6'

interface AdminApplicationFormsContainerProps {
  applicationID: number
}

export default async function AdminApplicationFormsContainer({
  applicationID,
}: AdminApplicationFormsContainerProps) {
  const { applicationForms } = await fetchApplicationForms({ applicationID })

  const hasForms = applicationForms && applicationForms?.length > 0

  return !hasForms ? (
    <div className="flex flex-1 flex-col items-center justify-center gap-[24px]">
      <span className="text-center text-[18px] text-zinc-500">
        No forms are assigned to this application yet
      </span>
      <FaClipboardList className="h-[300px] w-[300px] text-zinc-700/10" />
    </div>
  ) : (
    <div className="mt-[16px] flex flex-col gap-[16px] px-[8px]">
      {applicationForms.map((applicationForm) => (
        <AdminFormSummaryCard key={applicationForm.formID} applicationForm={applicationForm} />
      ))}
    </div>
  )
}
