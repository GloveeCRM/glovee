'use client'

import { FiMoreHorizontal } from 'react-icons/fi'
import SidebarSubcategoryCard from './sidebar-subcategory-card'
import { IoMdArrowDropdown, IoMdArrowDropright } from 'react-icons/io'
import { useState } from 'react'

export default function SidebarCategoryCard({ category }: { category: any }) {
  const [isExpanded, setIsExpanded] = useState(false)
  return (
    <div className="">
      <div className="flex items-center justify-between">
        <button
          className="flex items-center text-[13px] text-n-300"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? (
            <IoMdArrowDropdown className="h-[22px] w-[22px]" />
          ) : (
            <IoMdArrowDropright className="h-[22px] w-[22px]" />
          )}
          <span>{category.name}</span>
        </button>

        <button>
          <FiMoreHorizontal className="h-[22px] w-[22px] opacity-0 duration-100 hover:opacity-100" />
        </button>
      </div>
      <div>
        {isExpanded &&
          category.subCategories?.map((subcategory: any) => (
            <SidebarSubcategoryCard key={subcategory.id} subcategory={subcategory} />
          ))}
      </div>
    </div>
  )
}
