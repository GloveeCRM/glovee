import { fetchTemplateById } from '@/lib/data/template'
import TemplateInfoCardTitle from './template-info-card-title'
import TemplateInfoCardDescription from './template-info-card-description'

interface TemplateInfoCardProps {
  templateId: string
  editable?: boolean
  className?: string
}
export default async function TemplateInfoCard({
  templateId,
  editable = false,
  className,
}: TemplateInfoCardProps) {
  const template = await fetchTemplateById(templateId)

  return (
    <div className={`${className} rounded bg-n-600`}>
      <TemplateInfoCardTitle
        templateId={templateId}
        title={template?.title || 'Untitled Template'}
        editable={editable}
      />
      {template?.description && (
        <TemplateInfoCardDescription
          templateId={templateId}
          description={template.description}
          editable={editable}
        />
      )}
    </div>
  )
}
