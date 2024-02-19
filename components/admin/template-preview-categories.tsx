import { fetchTemplateCategoriesByTemplateId } from '@/lib/data/template'
import TemplatePreviewCategoriesCardWrapper from './template-preview-categories-card-wrapper'

export interface TemplateCategory {
  id: string
  title: string
  position: number
  templateSections: TemplateSection[]
}

export interface TemplateSection {
  id: string
  title: string
  position: number
}

export default async function TemplatePreviewCategories({ templateId }: { templateId: string }) {
  const templateCategories = (await fetchTemplateCategoriesByTemplateId(
    templateId
  )) as TemplateCategory[]
  return (
    <div className="mt-[6px] px-[6px]">
      <TemplatePreviewCategoriesCardWrapper templateCategories={templateCategories} />
    </div>
  )
}
