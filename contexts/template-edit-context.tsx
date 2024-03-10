'use client'

import { TemplateCategoryType } from '@/lib/types/template'
import { Dispatch, SetStateAction, createContext, useContext, useState } from 'react'

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
  const [categories, setCategories] = useState<TemplateCategoryType[] | null>(null)
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>(categories?.[0]?.id || '')
  const [selectedSectionId, setSelectedSectionId] = useState<string>(
    categories?.[0]?.sections?.[0].id || ''
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

  return <TemplateEditContext.Provider value={value}>{children}</TemplateEditContext.Provider>
}

export function useTemplateEditContext() {
  const context = useContext(TemplateEditContext)
  if (context === undefined) {
    throw new Error('useTemplateEditContext must be used within a TemplateEditProvider')
  }
  return context
}
