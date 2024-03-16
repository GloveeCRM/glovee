import { fetchTemplateCategoriesWithSectionsByTemplateId } from '@/lib/data/template'
import TemplateEditSidebarCategoryWrapper from './template-edit-sidebar-category-wrapper'

interface TemplateEditSidebarCategoriesProps {
  templateId: string
}

export default async function TemplateEditSidebarCategories({
  templateId,
}: TemplateEditSidebarCategoriesProps) {
  const initialCategories = await fetchTemplateCategoriesWithSectionsByTemplateId(templateId)

  return (
    <div className="text-[16px]">
      <TemplateEditSidebarCategoryWrapper
        templateId={templateId}
        initialCategories={initialCategories}
      />
    </div>
  )
}
