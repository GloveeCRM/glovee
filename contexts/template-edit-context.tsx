'use client'

import { Dispatch, SetStateAction, createContext, useContext, useEffect, useState } from 'react'

import { searchTemplates } from '@/lib/data/template'
import { FormCategoryType, FormType } from '@/lib/types/form'
import { searchForms } from '@/lib/data/form'
import { useAuthContext } from './auth-context'

type TemplateEditContextType = {
  formID: number
  formTemplateID: number
  template: FormType | null
  setTemplate: Dispatch<SetStateAction<FormType | null>>
  savedTemplate: FormType | null
  setSavedTemplate: Dispatch<SetStateAction<FormType | null>>
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
  formCategories: FormCategoryType[] | null
  setFormCategories: Dispatch<SetStateAction<FormCategoryType[] | null>>
}

const templateEditContextDefaultValues: TemplateEditContextType = {
  formID: 0,
  formTemplateID: 0,
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
  formCategories: null,
  setFormCategories: () => {},
}

const TemplateEditContext = createContext<TemplateEditContextType>(templateEditContextDefaultValues)

interface TemplateEditProviderProps {
  orgName: string
  formID: number
  formTemplateID: number
  children: React.ReactNode
}

export default function TemplateEditProvider({
  orgName,
  formID,
  formTemplateID,
  children,
}: TemplateEditProviderProps) {
  const [template, setTemplate] = useState<FormType | null>(null)
  const [formCategories, setFormCategories] = useState<FormCategoryType[] | null>(null)
  const [savedTemplate, setSavedTemplate] = useState<FormType | null>(null)
  const [selectedCategoryID, setSelectedCategoryID] = useState<number>(
    template?.categories?.[0]?.id || 0
  )
  const [selectedSectionID, setSelectedSectionID] = useState<number>(
    template?.categories?.[0]?.sections?.[0]?.id || 0
  )
  const [selectedQuestionSetID, setSelectedQuestionSetID] = useState<number>(0)
  const [selectedQuestionID, setSelectedQuestionID] = useState<number>(0)
  const [isTemplateChanged, setIsTemplateChanged] = useState<boolean>(false)

  const { sessionUserID } = useAuthContext()

  // useEffect(() => {
  //   async function fetchAndSetInitialTemplate() {
  //     const fetchedTemplate = await fetchFullTemplateById(orgName, templateID)
  //     setSavedTemplate(fetchedTemplate)

  //     const localTemplate = getTemplateFromLocalStorage(templateID)
  //     if (localTemplate) {
  //       setTemplate(localTemplate)
  //     } else {
  //       setTemplate(fetchedTemplate)
  //     }
  //   }

  //   fetchAndSetInitialTemplate()
  // }, [templateID])

  // useEffect(() => {
  //   if (template) {
  //     setTemplateOnLocalStorage(templateID, template)
  //   }

  //   function setDefaultSelections() {
  //     if (!template || !template.categories) return

  //     if (!selectedCategoryID) {
  //       setSelectedCategoryID(template.categories?.[0]?.id)
  //     }

  //     if (!selectedSectionID && template.categories?.[0]?.sections) {
  //       setSelectedSectionID(template.categories[0].sections[0]?.id || 0)
  //     }
  //   }

  //   setDefaultSelections()

  //   function detectAndSetIsTemplateChanged() {
  //     const currentTemplateStr = JSON.stringify(template)
  //     const savedTemplateStr = JSON.stringify(savedTemplate)
  //     setIsTemplateChanged(currentTemplateStr !== savedTemplateStr)
  //   }

  //   detectAndSetIsTemplateChanged()
  // }, [template, savedTemplate, selectedCategoryID, selectedSectionID, templateID])

  useEffect(() => {
    async function fetchAndSetTemplate() {
      const { formTemplates } = await searchTemplates({
        filters: {
          formTemplateID: formTemplateID,
        },
      })
      const template = formTemplates?.[0] || null
      setTemplate(template)
    }

    fetchAndSetTemplate()
  }, [formTemplateID])

  useEffect(() => {
    async function fetchAndSetFormCategories() {
      const { forms } = await searchForms({
        filters: {
          userID: sessionUserID || 0,
          formID: formID,
          includeCategories: true,
          includeSections: true,
        },
      })
      const form = forms?.[0]
      const categories = form?.categories || []
      setFormCategories(categories)
    }

    fetchAndSetFormCategories()
  }, [template])

  const value = {
    formID,
    formTemplateID,
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
    formCategories,
    setFormCategories,
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
