import Link from 'next/link'
import { IoChevronBackOutline } from 'react-icons/io5'
import TemplateInfoCard from './template-info-card'
import { fetchTemplateCategoriesByTemplateId } from '@/lib/data/template'
import TemplatePreviewCategoriesCardWrapper from './template-preview-categories-card-wrapper'

export default async function TemplatePreviewSidebar({ templateId }: { templateId: string }) {
  return (
    <div className="sticky top-0 flex h-screen w-[240px] flex-col bg-n-700 text-white">
      <Link href={`/admin/templates/`} className="flex w-fit items-center gap-[4px] p-[8px]">
        <IoChevronBackOutline className="h-[20px] w-[20px]" />
        <span className="text-[16px]">Back</span>
      </Link>
      <TemplateInfoCard className="mx-[8px]" templateId={templateId} />
      <TemplatePreviewCategories templateId={templateId} />
    </div>
  )
}

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

async function TemplatePreviewCategories({ templateId }: { templateId: string }) {
  const templateCategories = (await fetchTemplateCategoriesByTemplateId(
    templateId
  )) as TemplateCategory[]
  return (
    <div className="mt-[6px] h-full px-[6px]">
      <TemplatePreviewCategoriesCardWrapper templateCategories={templateCategories} />
    </div>
  )
}
