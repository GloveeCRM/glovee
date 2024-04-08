'use client'

import { createContext, useContext } from 'react'

type OrgContextType = {
  orgName: string
}

const orgContextDefaultValues: OrgContextType = {
  orgName: '',
}

const OrgContext = createContext<OrgContextType>(orgContextDefaultValues)

interface OrgProviderProps {
  orgName: string
  children: React.ReactNode
}

export default function OrgProvider({ orgName, children }: OrgProviderProps) {
  const value = {
    orgName,
  }

  return <OrgContext.Provider value={value}>{children}</OrgContext.Provider>
}

export function useOrgContext() {
  const context = useContext(OrgContext)
  if (!context) {
    throw new Error('useOrgContext must be used within a OrgProvider')
  }
  return context
}
