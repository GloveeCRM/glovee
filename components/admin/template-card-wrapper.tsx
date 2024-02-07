'use client'

import { experimental_useOptimistic as useOptimistic } from 'react'
import CreateNewTemplateCard from './create-new-template-card'
import TemplateCard from './template-card'
type Template = {
  id: string
  title: string
  description: string | null
}
type TemplateCardWrapperProps = {
  templates: Template[]
}
export default function TemplateCardWrapper({ templates }: TemplateCardWrapperProps) {
  return (
    <div className="grid grid-cols-1 gap-[8px] md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      <CreateNewTemplateCard />
      {templates?.map((template) => (
        <TemplateCard
          key={template.id}
          title={template.title}
          description={template.description || null}
          id={template.id}
        />
      ))}
    </div>
  )
}
