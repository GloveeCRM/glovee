'use client'

import { useState } from 'react'
import ClientSidebarCategoryCard from './client-application-category-card'

export default function ApplicationCategoriesCardWrapper({ categories }: { categories: any[] }) {
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>(categories[0]?.id)

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategoryId(categoryId)
  }

  return (
    <div className="flex flex-col">
      {categories.map((category: any) => (
        <ClientSidebarCategoryCard
          key={category.id}
          category={category}
          isExpanded={selectedCategoryId === category.id}
          onClick={handleCategoryClick}
        />
      ))}
    </div>
  )
}
