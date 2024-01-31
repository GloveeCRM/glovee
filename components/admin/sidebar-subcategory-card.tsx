import { FiMoreHorizontal } from 'react-icons/fi'

export default function SidebarSubcategoryCard({ subcategory }: { subcategory: any }) {
  return (
    <div className="flex items-center justify-between bg-yellow-500">
      <p>{subcategory.name}</p>
      <FiMoreHorizontal className="h-[22px] w-[22px] opacity-0 duration-100 hover:opacity-100" />
    </div>
  )
}
