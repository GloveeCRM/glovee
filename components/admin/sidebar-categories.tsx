import { fetchCategoriesByTemplateId } from '@/lib/data/template'
import { FiPlus } from 'react-icons/fi'

export default async function SidebarCategories({
  className,
  templateId,
}: {
  className?: string
  templateId: number
}) {
  const categories = (await fetchCategoriesByTemplateId(templateId)) as any
  return (
    <div id="sidebarCategories" className={`${className}`}>
      <p>Categories:</p>
      {categories?.map((category: any) => <div key={category.id}>{category.name}</div>)}
      <div className="flex items-center">
        <FiPlus className="h-[20px] w-[20px]" />
        {categories?.length > 0 ? (
          <span className="text-[16px]">Add another category</span>
        ) : (
          <span className="text-[16px]">Create a category</span>
        )}
      </div>
    </div>
  )
}
