import { fetchTemplateById } from '@/lib/data/template'
import TemplateInfoCardTitle from './template-info-card-title'
import TemplateInfoCardDescription from './template-info-card-description'

export default async function TemplateInfoCard({
  templateId,
  className,
}: {
  templateId: string
  className?: string
}) {
  const template = await fetchTemplateById(templateId)
  return (
    <div className={`${className} rounded bg-n-600 p-[8px]`}>
      <TemplateInfoCardTitle title={template?.title || ''} />
      <TemplateInfoCardDescription description={template?.description || ''} />
    </div>
  )
}
