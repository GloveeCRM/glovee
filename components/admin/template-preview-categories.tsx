import { fetchTemplateCategoriesByTemplateId } from '@/lib/data/template'
import { Category } from '../client/application-categories'
import ApplicationCategoriesCardWrapper from '../client/application-categories-card-wrapper'

export default async function TemplatePreviewCategories({ templateId }: { templateId: string }) {
  const templateCategories = (await fetchTemplateCategoriesByTemplateId(templateId)) as Category[]
  return (
    <div className="mt-[6px] px-[6px]">
      <ApplicationCategoriesCardWrapper categories={templateCategories} />
    </div>
  )
}
