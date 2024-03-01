import TemplateCardWrapper from '@/components/admin/template-card-wrapper'

export default async function TemplatesPage() {
  return (
    <div className="p-[8px]">
      <h1 className="mb-[15px] text-[24px] font-bold">Templates</h1>
      <TemplateCardWrapper />
    </div>
  )
}
