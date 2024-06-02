import TemplateCardWrapper from '@/components/admin/dashboard/templates/template-card-wrapper'
import TemplatePageToolbar from '@/components/admin/dashboard/templates/template-page-toolbar'

interface TemplatesPageParams {
  orgName: string
}

interface TemplatesPageProps {
  params: TemplatesPageParams
}

export default async function TemplatesPage({ params: { orgName } }: TemplatesPageProps) {
  return (
    <div className="flex flex-col gap-[20px]">
      <TemplatePageToolbar />
      <TemplateCardWrapper orgName={orgName} />
    </div>
  )
}
