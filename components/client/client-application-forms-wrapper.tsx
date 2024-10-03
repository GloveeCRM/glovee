import { FormRoleTypes } from '@/lib/types/form'
import { fetchFormsByApplicationID } from '@/lib/data/form'
import ClientFormSummaryCard from './client-form-summary-card'

interface ClientApplicationFormsWrapperProps {
  applicationID: number
}

export default async function ClientApplicationFormsWrapper({
  applicationID,
}: ClientApplicationFormsWrapperProps) {
  const forms = await fetchFormsByApplicationID(applicationID)

  const hasForms = forms && forms?.length > 0

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
