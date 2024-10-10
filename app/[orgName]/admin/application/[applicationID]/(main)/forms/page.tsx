import AdminApplicationFormsWrapper from '@/components/admin/application/admin-application-form-wrapper'

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
  return <AdminApplicationFormsWrapper applicationID={applicationID} />
}
