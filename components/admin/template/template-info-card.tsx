'use client'

import { useTemplateEditContext } from '@/contexts/template-edit-context'
import { TemplateInfoCardSkeleton } from '@/components/skeletons'
import TemplateInfoCardTitle from './template-info-card-title'
import TemplateInfoCardDescription from './template-info-card-description'

interface TemplateInfoCardProps {
  editable?: boolean
}

export default function TemplateInfoCard({ editable = false }: TemplateInfoCardProps) {
  const { template } = useTemplateEditContext()

  if (!template) {
    return <TemplateInfoCardSkeleton />
  }

  return (
    <div className="rounded bg-n-600">
      <TemplateInfoCardTitle title={template.name || 'Untitled Template'} editable={editable} />
      <TemplateInfoCardDescription
        description={template.description || 'No Description'}
        editable={editable}
      />
    </div>
  )
}
