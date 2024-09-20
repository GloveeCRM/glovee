import { FormRoleTypes } from '@/lib/types/form'
import { fetchClientForms } from '@/lib/data/form'
import { getSessionPayload } from '@/lib/auth/session'
import ClientFormSummaryCard from './client-form-summary-card'

interface ClientFormsWrapperProps {
  orgName: string
}

export default async function ClientFormsWrapper({ orgName }: ClientFormsWrapperProps) {
  const payload = await getSessionPayload()
  const clientID = payload?.user.id || 0
  const forms = await fetchClientForms(orgName, clientID)

  const hasForms = forms !== null && forms?.length > 0

  const mainForms = forms?.filter((form) => form.role === FormRoleTypes.MAIN)
  const dependentForms = forms?.filter((form) => form.role !== FormRoleTypes.MAIN)

  return !hasForms ? (
    <div className="flex flex-1 flex-col items-center justify-center text-[20px] text-n-400">
      No forms are assigned to you yet
    </div>
  ) : (
    <div>
      {mainForms && (
        <div className="mb-[20px]">
          <h3 className="mb-[12px] font-medium">Main Applicant</h3>
          {mainForms.map((form) => (
            <div className="mb-[16px] px-[8px]" key={form.id}>
              <ClientFormSummaryCard form={form} />
            </div>
          ))}
        </div>
      )}
      {dependentForms && (
        <div>
          <h3 className="mb-[12px] font-medium">Dependents</h3>
          {dependentForms.map((form) => (
            <div className="mb-[16px] px-[8px]" key={form.id}>
              <ClientFormSummaryCard form={form} />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
