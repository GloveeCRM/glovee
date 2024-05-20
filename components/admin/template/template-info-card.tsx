import { fetchTemplateById } from '@/lib/data/template'
import TemplateInfoCardTitle from './template-info-card-title'
import TemplateInfoCardDescription from './template-info-card-description'

interface TemplateInfoCardProps {
  templateID: number
  editable?: boolean
  className?: string
}
export default async function TemplateInfoCard({
  templateID,
  editable = false,
  className,
}: TemplateInfoCardProps) {
  const template = await fetchTemplateById(templateID)

  return (
    <div className={`${className} rounded bg-n-600`}>
      <TemplateInfoCardTitle
        templateID={templateID}
        title={template?.name || 'Untitled Template'}
        editable={editable}
      />

      <TemplateInfoCardDescription
        templateID={templateID}
        description={template?.description || ''}
        editable={editable}
      />
    </div>
  )
}
