'use client'

import {
  ApplicationQuestionSetType,
  ApplicationSectionType,
  ApplicationType,
} from '@/lib/types/application'
import { createContext, useContext } from 'react'

type ApplicationContextType = {
  applicationID: number
  application: ApplicationType | null
}

const applicationContextDefaultValues: ApplicationContextType = {
  applicationID: 0,
  application: null,
}

const ApplicationContext = createContext<ApplicationContextType>(applicationContextDefaultValues)

interface ApplicationContextProviderProps {
  applicationID: number
  application: ApplicationType | null
  children: React.ReactNode
}

export default function ApplicationContextProvider({
  applicationID,
  application,
  children,
}: ApplicationContextProviderProps) {
  const value = {
    applicationID,
    application,
  }

  return <ApplicationContext.Provider value={value}>{children}</ApplicationContext.Provider>
}

export function useApplicationContext() {
  const context = useContext(ApplicationContext)
  if (!context) {
    throw new Error('useApplicationContext must be used within a ApplicationContextProvider')
  }
  return context
}
