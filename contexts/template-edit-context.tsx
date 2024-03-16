'use client'

import { Dispatch, SetStateAction, createContext, useContext, useEffect, useState } from 'react'

import { fetchFullTemplateById } from '@/lib/data/template'
import { TemplateType } from '@/lib/types/template'
import { getTemplateFromLocalStorage, setTemplateOnLocalStorage } from '@/lib/functions/template'

type TemplateEditContextType = {
  templateId: string
  template: TemplateType | null
  setTemplate: Dispatch<SetStateAction<TemplateType | null>>
  savedTemplate: TemplateType | null
  setSavedTemplate: Dispatch<SetStateAction<TemplateType | null>>
  isTemplateChanged: boolean
  selectedCategoryId: string
  setSelectedCategoryId: Dispatch<SetStateAction<string>>
  selectedSectionId: string
  setSelectedSectionId: Dispatch<SetStateAction<string>>
}

const templateEditContextDefaultValues: TemplateEditContextType = {
  templateId: '',
  template: null,
  setTemplate: () => {},
  savedTemplate: null,
  setSavedTemplate: () => {},
  isTemplateChanged: false,
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
  const [savedTemplate, setSavedTemplate] = useState<TemplateType | null>(null)
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>(
    template?.categories?.[0]?.id || ''
  )
  const [selectedSectionId, setSelectedSectionId] = useState<string>(
    template?.categories?.[0]?.sections?.[0]?.id || ''
  )
  const [isTemplateChanged, setIsTemplateChanged] = useState<boolean>(false)

  useEffect(() => {
    async function fetchAndSetInitialTemplate() {
      const fetchedTemplate = await fetchFullTemplateById(templateId)
      setSavedTemplate(fetchedTemplate)

      const localTemplate = getTemplateFromLocalStorage(templateId)
      if (localTemplate) {
        setTemplate(localTemplate)
      } else {
        setTemplate(fetchedTemplate)
      }
    }

    fetchAndSetInitialTemplate()
  }, [templateId])

  useEffect(() => {
    if (template) {
      setTemplateOnLocalStorage(templateId, template)
    }

    function setDefaultSelections() {
      if (!template || !template.categories) return

      if (!selectedCategoryId) {
        setSelectedCategoryId(template.categories[0].id)
      }

      if (!selectedSectionId && template.categories[0].sections) {
        setSelectedSectionId(template.categories[0].sections[0].id || '')
      }
    }

    setDefaultSelections()

    function detectAndSetIsTemplateChanged() {
      const currentTemplateStr = JSON.stringify(template)
      const savedTemplateStr = JSON.stringify(savedTemplate)
      setIsTemplateChanged(currentTemplateStr !== savedTemplateStr)
    }

    detectAndSetIsTemplateChanged()
  }, [template, savedTemplate])

  const value = {
    templateId,
    template,
    setTemplate,
    savedTemplate,
    setSavedTemplate,
    isTemplateChanged,
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
