'use client'

import { createContext, useContext } from 'react'

type FormContextType = {
  formID: number
}

const formContextDefaultValues: FormContextType = {
  formID: 0,
}

const FormContext = createContext<FormContextType>(formContextDefaultValues)

interface FormContextProviderProps {
  formID: number
  children: React.ReactNode
}

export default function FormContextProvider({ formID, children }: FormContextProviderProps) {
  const value = {
    formID,
  }

  return <FormContext.Provider value={value}>{children}</FormContext.Provider>
}

export function useFormContext() {
  const context = useContext(FormContext)
  if (!context) {
    throw new Error('useFormContext must be used within a FormContextProvider')
  }
  return context
}
