import { Suspense } from 'react'

import FormTemplatesContainer from '@/components/admin/dashboard/form-templates/form-templates-container'
import TemplatePageToolbar from '@/components/admin/dashboard/form-templates/template-page-toolbar'
import FormTemplatesContainerSkeleton from '@/components/skeleton/admin/form-templates-container-skeleton'

interface FormTemplatesPageSearchParams {
  query?: string
}

interface FormTemplatesPageProps {
  searchParams: FormTemplatesPageSearchParams
}

export default async function TemplatesPage({ searchParams }: FormTemplatesPageProps) {
  const query = searchParams.query?.trim() || ''

  const searchKey = `form-templates-${query}`

  return (
    <div className="flex h-full flex-col gap-[20px] overflow-hidden">
      <TemplatePageToolbar />
      <Suspense key={searchKey} fallback={<FormTemplatesContainerSkeleton />}>
        <FormTemplatesContainer searchQuery={query} />
      </Suspense>
    </div>
  )
}
