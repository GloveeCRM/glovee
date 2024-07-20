'use client'

import { createContext, useContext } from 'react'

type ApplicationContextType = {
  applicationID: number | null
}

const applicationContextDefaultValues: ApplicationContextType = {
  applicationID: null,
}

const ApplicationContext = createContext<ApplicationContextType>(applicationContextDefaultValues)

interface ApplicationContextProviderProps {
  applicationID: number | null
  children: React.ReactNode
}

export default function ApplicationContextProvider({
  applicationID,
  children,
}: ApplicationContextProviderProps) {
  const value = {
    applicationID,
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
