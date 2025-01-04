import AdminApplicationFormsContainer from '@/components/admin/application/admin-application-forms-container'
import CreateNewFormButton from '@/components/admin/application/create-new-form-button'

interface AdminApplicationFormsPageParams {
  applicationID: number
}

interface AdminApplicationFormsPageProps {
  params: AdminApplicationFormsPageParams
}

export default async function AdminApplicationFormsPage({
  params,
}: AdminApplicationFormsPageProps) {
  const { applicationID } = params

  return (
    <div className="flex h-full flex-col gap-[20px]">
      <div className="flex justify-end">
        <CreateNewFormButton applicationID={applicationID} />
      </div>
      <AdminApplicationFormsContainer applicationID={applicationID} />
    </div>
  )
}
