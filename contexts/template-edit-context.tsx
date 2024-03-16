'use client'

import { fetchTemplateCategoriesWithSectionsByTemplateId } from '@/lib/data/template'
import { TemplateCategoryType } from '@/lib/types/template'
import { Dispatch, SetStateAction, createContext, useContext, useEffect, useState } from 'react'

type TemplateEditContextType = {
  templateId: string
  categories: TemplateCategoryType[] | null
  setCategories: Dispatch<SetStateAction<TemplateCategoryType[] | null>>
  selectedCategoryId: string
  selectedSectionId: string
  setSelectedCategoryId: Dispatch<SetStateAction<string>>
  setSelectedSectionId: Dispatch<SetStateAction<string>>
}

const templateEditContextDefaultValues: TemplateEditContextType = {
  templateId: '',
  categories: null,
  setCategories: () => {},
  selectedCategoryId: '',
  setSelectedCategoryId: () => {},
  selectedSectionId: '',
  setSelectedSectionId: () => {},
}

const TemplateEditContext = createContext<TemplateEditContextType>(templateEditContextDefaultValues)

interface TemplateEditProviderProps {
  templateId: string
  children: React.ReactNode
}

export default function TemplateEditProvider({ templateId, children }: TemplateEditProviderProps) {
  const [savedCategories, setSavedCategories] = useState<TemplateCategoryType[] | null>([])
  const [categories, setCategories] = useState<TemplateCategoryType[] | null>(null)
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>(categories?.[0]?.id || '')
  const [selectedSectionId, setSelectedSectionId] = useState<string>(
    categories?.[0]?.sections?.[0]?.id || ''
  )

  const value = {
    templateId,
    categories,
    setCategories,
    selectedCategoryId,
    setSelectedCategoryId,
    selectedSectionId,
    setSelectedSectionId,
  }

  useEffect(() => {
    if (templateId) {
      fetchTemplateCategoriesWithSectionsByTemplateId(templateId).then((data) => {
        setSavedCategories(data)
        setCategories(data)
      })
    }
  }, [templateId])

  useEffect(() => {
    if (categories && selectedCategoryId === '') {
      setSelectedCategoryId(categories[0].id)
      setSelectedSectionId(categories[0].sections?.[0].id || '')
    }
  }, [categories])

  return <TemplateEditContext.Provider value={value}>{children}</TemplateEditContext.Provider>
}

export function useTemplateEditContext() {
  const context = useContext(TemplateEditContext)
  if (context === undefined) {
    throw new Error('useTemplateEditContext must be used within a TemplateEditProvider')
  }
  return context
}
