'use client'

import { Dispatch, SetStateAction, createContext, useContext, useEffect, useState } from 'react'

import {
  fetchFullTemplateById,
  fetchTemplateCategoriesWithSectionsByTemplateId,
} from '@/lib/data/template'
import { TemplateCategoryType, TemplateType } from '@/lib/types/template'

type TemplateEditContextType = {
  templateId: string
  template: TemplateType | null
  setTemplate: Dispatch<SetStateAction<TemplateType | null>>
  selectedCategoryId: string
  selectedSectionId: string
  setSelectedCategoryId: Dispatch<SetStateAction<string>>
  setSelectedSectionId: Dispatch<SetStateAction<string>>
}

const templateEditContextDefaultValues: TemplateEditContextType = {
  templateId: '',
  template: null,
  setTemplate: () => {},
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
  const [template, setTemplate] = useState<TemplateType | null>(null)
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>(
    template?.categories?.[0]?.id || ''
  )
  const [selectedSectionId, setSelectedSectionId] = useState<string>(
    template?.categories?.[0]?.sections?.[0]?.id || ''
  )

  const value = {
    templateId,
    template,
    setTemplate,
    selectedCategoryId,
    setSelectedCategoryId,
    selectedSectionId,
    setSelectedSectionId,
  }

  useEffect(() => {
    if (templateId) {
      fetchFullTemplateById(templateId).then((data) => {
        setTemplate(data)
      })
    }
  }, [templateId])

  useEffect(() => {
    if (template && template.categories && selectedCategoryId === '') {
      setSelectedCategoryId(template.categories[0].id)
      setSelectedSectionId(template.categories[0].sections?.[0].id || '')
    }
  }, [template])

  return <TemplateEditContext.Provider value={value}>{children}</TemplateEditContext.Provider>
}

export function useTemplateEditContext() {
  const context = useContext(TemplateEditContext)
  if (context === undefined) {
    throw new Error('useTemplateEditContext must be used within a TemplateEditProvider')
  }
  return context
}
