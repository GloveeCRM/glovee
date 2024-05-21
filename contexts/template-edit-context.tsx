'use client'

import { Dispatch, SetStateAction, createContext, useContext, useEffect, useState } from 'react'

import { fetchFullTemplateById } from '@/lib/data/template'
import { TemplateType } from '@/lib/types/template'
import {
  formatTemplate,
  getTemplateFromLocalStorage,
  setTemplateOnLocalStorage,
} from '@/lib/functions/template'

type TemplateEditContextType = {
  templateID: number
  template: TemplateType | null
  setTemplate: Dispatch<SetStateAction<TemplateType | null>>
  savedTemplate: TemplateType | null
  setSavedTemplate: Dispatch<SetStateAction<TemplateType | null>>
  isTemplateChanged: boolean
  setIsTemplateChanged: Dispatch<SetStateAction<boolean>>
  selectedCategoryID: number
  setSelectedCategoryID: Dispatch<SetStateAction<number>>
  selectedSectionID: number
  setSelectedSectionID: Dispatch<SetStateAction<number>>
  selectedQuestionSetID: number
  setSelectedQuestionSetID: Dispatch<SetStateAction<number>>
  selectedQuestionID: number
  setSelectedQuestionID: Dispatch<SetStateAction<number>>
}

const templateEditContextDefaultValues: TemplateEditContextType = {
  templateID: 0,
  template: null,
  setTemplate: () => {},
  savedTemplate: null,
  setSavedTemplate: () => {},
  isTemplateChanged: false,
  setIsTemplateChanged: () => {},
  selectedCategoryID: 0,
  setSelectedCategoryID: () => {},
  selectedSectionID: 0,
  setSelectedSectionID: () => {},
  selectedQuestionSetID: 0,
  setSelectedQuestionSetID: () => {},
  selectedQuestionID: 0,
  setSelectedQuestionID: () => {},
}

const TemplateEditContext = createContext<TemplateEditContextType>(templateEditContextDefaultValues)

interface TemplateEditProviderProps {
  templateID: number
  children: React.ReactNode
}

export default function TemplateEditProvider({ templateID, children }: TemplateEditProviderProps) {
  const [template, setTemplate] = useState<TemplateType | null>(null)
  const [savedTemplate, setSavedTemplate] = useState<TemplateType | null>(null)
  const [selectedCategoryID, setSelectedCategoryID] = useState<number>(
    template?.categories?.[0]?.id || 0
  )
  const [selectedSectionID, setSelectedSectionID] = useState<number>(
    template?.categories?.[0]?.sections?.[0]?.id || 0
  )
  const [selectedQuestionSetID, setSelectedQuestionSetID] = useState<number>(0)
  const [selectedQuestionID, setSelectedQuestionID] = useState<number>(0)
  const [isTemplateChanged, setIsTemplateChanged] = useState<boolean>(false)

  useEffect(() => {
    async function fetchAndSetInitialTemplate() {
      const fetchedTemplate = await fetchFullTemplateById(templateID)
      setSavedTemplate(fetchedTemplate)

      const localTemplate = getTemplateFromLocalStorage(templateID)
      if (localTemplate) {
        setTemplate(localTemplate)
      } else {
        setTemplate(fetchedTemplate)
      }
    }

    fetchAndSetInitialTemplate()
  }, [templateID])

  useEffect(() => {
    if (template) {
      setTemplateOnLocalStorage(templateID, template)
    }

    function setDefaultSelections() {
      if (!template || !template.categories) return

      if (!selectedCategoryID) {
        setSelectedCategoryID(template.categories?.[0]?.id)
      }

      if (!selectedSectionID && template.categories?.[0]?.sections) {
        setSelectedSectionID(template.categories[0].sections[0]?.id || 0)
      }
    }

    setDefaultSelections()

    function detectAndSetIsTemplateChanged() {
      const currentTemplateStr = JSON.stringify(template)
      const savedTemplateStr = JSON.stringify(savedTemplate)
      setIsTemplateChanged(currentTemplateStr !== savedTemplateStr)
    }

    detectAndSetIsTemplateChanged()
  }, [template, savedTemplate, selectedCategoryID, selectedSectionID, templateID])

  const value = {
    templateID,
    template,
    setTemplate,
    savedTemplate,
    setSavedTemplate,
    isTemplateChanged,
    setIsTemplateChanged,
    selectedCategoryID,
    setSelectedCategoryID,
    selectedSectionID,
    setSelectedSectionID,
    selectedQuestionSetID,
    setSelectedQuestionSetID,
    selectedQuestionID,
    setSelectedQuestionID,
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
