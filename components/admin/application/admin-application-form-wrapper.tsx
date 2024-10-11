import { searchForms } from '@/lib/data/form'
import { getSessionUserID } from '@/lib/auth/session'
import AdminFormSummaryCard from './admin-form-summary-card'

interface AdminApplicationFormsWrapperProps {
  applicationID: number
}

export default async function AdminApplicationFormsWrapper({
  applicationID,
}: AdminApplicationFormsWrapperProps) {
  const userID = await getSessionUserID()
  const { forms } = await searchForms({
    filters: { applicationID, userID },
  })

  const hasForms = forms && forms?.length > 0

  return !hasForms ? (
    <div className="flex h-full flex-1 flex-col items-center justify-center text-[20px] text-n-500">
      No forms are assigned to you yet
    </div>
  ) : (
    <div className="mt-[16px] flex flex-col gap-[16px]">
      {forms.map((form) => (
        <div className="px-[8px]" key={form.id}>
          <AdminFormSummaryCard form={form} />
        </div>
      ))}
    </div>
  )
}
