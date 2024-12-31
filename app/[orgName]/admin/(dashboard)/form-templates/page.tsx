import TemplateCardWrapper from '@/components/admin/dashboard/form-templates/template-card-wrapper'
import TemplatePageToolbar from '@/components/admin/dashboard/form-templates/template-page-toolbar'

interface FormTemplatesPageSearchParams {
  query?: string
}

interface FormTemplatesPageProps {
  searchParams: FormTemplatesPageSearchParams
}

export default async function TemplatesPage({ searchParams }: FormTemplatesPageProps) {
  const query = searchParams.query?.trim() || ''

  return (
    <div className="flex h-full flex-col gap-[20px] overflow-hidden">
      <TemplatePageToolbar />
      <TemplateCardWrapper searchQuery={query} />
    </div>
  )
}
