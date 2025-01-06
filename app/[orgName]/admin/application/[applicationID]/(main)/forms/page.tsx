import { Suspense } from 'react'

import AddApplicationFormButton from '@/components/admin/application/add-application-form-button'
import AdminApplicationFormsContainer from '@/components/admin/application/admin-application-forms-container'
import AdminApplicationFormsContainerSkeleton from '@/components/skeleton/admin/admin-application-forms-container-skeleton'

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
    <div className="flex flex-1 flex-col gap-[20px]">
      <div className="flex justify-end">
        <AddApplicationFormButton applicationID={applicationID} />
      </div>
      <Suspense fallback={<AdminApplicationFormsContainerSkeleton />}>
        <AdminApplicationFormsContainer applicationID={applicationID} />
      </Suspense>
    </div>
  )
}
