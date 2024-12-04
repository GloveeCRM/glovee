import { searchForms } from '@/lib/data/form'
import ClientFormSummaryCard from '../client-form-summary-card'
import { getSessionUserID } from '@/lib/auth/session'

interface ClientApplicationFormsWrapperProps {
  applicationID: number
}

export default async function ClientApplicationFormsWrapper({
  applicationID,
}: ClientApplicationFormsWrapperProps) {
  const userID = await getSessionUserID()
  const { forms } = await searchForms({
    filters: { applicationID, userID, includeCategories: true },
  })

  const hasForms = forms && forms?.length > 0

  return !hasForms ? (
    <div className="flex h-full flex-1 flex-col items-center justify-center text-[20px] text-n-500">
      No forms are assigned to you yet
    </div>
  ) : (
    <div className="mt-[16px] flex flex-col gap-[16px]">
      {forms.map((form) => (
        <div className="px-[8px]" key={form.formID}>
          <ClientFormSummaryCard form={form} />
        </div>
      ))}
    </div>
  )
}
