'use client'

import { useEffect, useState } from 'react'

import { useTemplateEditContext } from '@/contexts/template-edit-context'
import CreateSectionButton from './create-section-button'
import TemplateEditTopbarSection from './template-edit-topbar-section'
import { TemplateEditTopbarSectionWrapperSkeleton } from '@/components/skeletons'

export default function TemplateEditTopbarSectionWrapper() {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const { selectedCategoryId, selectedSectionId, template } = useTemplateEditContext()

  const selectedCategorySections = template?.categories?.find(
    (c) => c.id === selectedCategoryId
  )?.sections

  useEffect(() => {
    if (selectedCategorySections) {
      setIsLoading(false)
    }
  }, [selectedCategorySections])

  if (isLoading) {
    return <TemplateEditTopbarSectionWrapperSkeleton />
  }

  return (
    <div className="flex h-full text-n-100">
      <div className="flex overflow-scroll text-[12px]">
        {selectedCategorySections?.map((section) => (
          <TemplateEditTopbarSection
            key={section.id}
            section={section}
            active={section.id === selectedSectionId}
          />
        ))}
      </div>
      <div>
        {selectedCategoryId && <CreateSectionButton type="plus" categoryId={selectedCategoryId} />}
      </div>
    </div>
  )
}
