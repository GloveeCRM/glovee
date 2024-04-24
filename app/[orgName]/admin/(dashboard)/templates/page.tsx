import TemplateCardWrapper from '@/components/admin/dashboard/templates/template-card-wrapper'

interface TemplatesPageProps {
  params: {
    orgName: string
  }
}
export default async function TemplatesPage({ params: { orgName } }: TemplatesPageProps) {
  return (
    <div>
      <h1 className="mb-[15px] text-[24px] font-bold">Templates</h1>
      <TemplateCardWrapper orgName={orgName} />
    </div>
  )
}
