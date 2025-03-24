'use client'

import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'

import {
  FormCategoryType,
  FormQuestionSetType,
  FormQuestionType,
  FormSectionType,
  FormTemplateType,
} from '@/lib/types/form'
import {
  fetchFormSectionQuestionSetsAndQuestions,
  fetchFormTemplateSectionQuestionSetsAndQuestions,
  fetchFormTemplateWithCategoriesAndSections,
  searchFormTemplates,
} from '@/lib/data/form'

type FormTemplateEditContextType = {
  formTemplateID: number
  formTemplate: FormTemplateType | null
  setFormTemplate: Dispatch<SetStateAction<FormTemplateType | null>>
}

const formTemplateEditContextDefaultValues: FormTemplateEditContextType = {
  formTemplateID: 0,
  formTemplate: null,
  setFormTemplate: () => {},
}

const FormTemplateEditContext = createContext<FormTemplateEditContextType>(
  formTemplateEditContextDefaultValues
)

interface FormTemplateEditProviderProps {
  formTemplateID: number
  children: React.ReactNode
}

export default function FormTemplateEditProvider({
  formTemplateID,
  children,
}: FormTemplateEditProviderProps) {
  const [formTemplate, setFormTemplate] = useState<FormTemplateType | null>(null)

  useEffect(() => {
    async function fetchAndSetFormTemplate() {
      const { formTemplates } = await searchFormTemplates({
        filters: {
          formTemplateID: formTemplateID,
        },
        limit: 1,
      })
      setFormTemplate(formTemplates?.[0] || null)
    }

    fetchAndSetFormTemplate()
  }, [formTemplateID])

  const value = {
    formTemplateID,
    formTemplate,
    setFormTemplate,
  }

  return (
    <FormTemplateEditContext.Provider value={value}>{children}</FormTemplateEditContext.Provider>
  )
}

export function useFormTemplateEditContext() {
  const context = useContext(FormTemplateEditContext)
  if (context === undefined) {
    throw new Error('useFormTemplateEditContext must be used within a FormTemplateEditProvider')
  }
  return context
}
