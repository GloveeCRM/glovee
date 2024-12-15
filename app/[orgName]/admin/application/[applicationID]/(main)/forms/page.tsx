import AdminApplicationFormsWrapper from '@/components/admin/application/admin-application-form-wrapper'
import CreateNewFormButton from '@/components/admin/application/create-new-form-button'

interface AdminApplicationFormsPageParams {
  applicationID: string
}

interface AdminApplicationFormsPageProps {
  params: AdminApplicationFormsPageParams
}

export default async function AdminApplicationFormsPage({
  params,
}: AdminApplicationFormsPageProps) {
  const applicationID = parseInt(params.applicationID)
  return (
    <div>
      <div>
        <CreateNewFormButton applicationID={applicationID} />
      </div>
      <AdminApplicationFormsWrapper applicationID={applicationID} />
    </div>
  )
}
