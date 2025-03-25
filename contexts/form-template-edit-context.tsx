'use client'

import { Dispatch, SetStateAction, createContext, useContext, useState } from 'react'

import { FormTemplateType } from '@/lib/types/form'

type FormTemplateEditContextType = {
  formTemplateID: number
  formTemplate: FormTemplateType | null
  setFormTemplate: Dispatch<SetStateAction<FormTemplateType>>
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
  formTemplate: FormTemplateType
  children: React.ReactNode
}

export default function FormTemplateEditProvider({
  formTemplate,
  children,
}: FormTemplateEditProviderProps) {
  const [formTemplateState, setFormTemplateState] = useState<FormTemplateType>(formTemplate)

  const value = {
    formTemplateID: formTemplate.formTemplateID || 0,
    formTemplate: formTemplateState,
    setFormTemplate: setFormTemplateState as Dispatch<SetStateAction<FormTemplateType>>,
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
