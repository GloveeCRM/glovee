'use client'

import { Dispatch, SetStateAction, createContext, useContext, useState } from 'react'

import { ApplicationFormType } from '@/lib/types/form'

type ApplicationFormContextType = {
  applicationFormID: number
  applicationForm: ApplicationFormType
  setApplicationForm: Dispatch<SetStateAction<ApplicationFormType>>
}

const applicationFormContextDefaultValues: ApplicationFormContextType = {
  applicationFormID: 0,
  applicationForm: {} as ApplicationFormType,
  setApplicationForm: () => {},
}

const ApplicationFormContext = createContext<ApplicationFormContextType>(
  applicationFormContextDefaultValues
)

interface ApplicationFormProviderProps {
  applicationForm: ApplicationFormType
  children: React.ReactNode
}

export default function FormTemplateEditProvider({
  applicationForm,
  children,
}: ApplicationFormProviderProps) {
  const [applicationFormState, setApplicationFormState] =
    useState<ApplicationFormType>(applicationForm)

  const value = {
    applicationFormID: applicationForm.applicationFormID || 0,
    applicationForm: applicationFormState,
    setApplicationForm: setApplicationFormState as Dispatch<SetStateAction<ApplicationFormType>>,
  }

  return <ApplicationFormContext.Provider value={value}>{children}</ApplicationFormContext.Provider>
}

export function useApplicationFormContext() {
  const context = useContext(ApplicationFormContext)
  if (context === undefined) {
    throw new Error('useApplicationFormContext must be used within a ApplicationFormProvider')
  }
  return context
}
