'use client'

import { createContext, useContext, useEffect, useState } from 'react'

import { OrganizationType } from '@/lib/types/organization'
import { fetchOrganizationProfile } from '@/lib/data/organization'

type OrgContextType = {
  orgName: string
  organization: OrganizationType | null
  setOrganization: (organization: OrganizationType | null) => void
  isLoading: boolean
}

const orgContextDefaultValues: OrgContextType = {
  orgName: '',
  organization: null,
  setOrganization: () => {},
  isLoading: true,
}

const OrgContext = createContext<OrgContextType>(orgContextDefaultValues)

interface OrgProviderProps {
  orgName: string
  children: React.ReactNode
}

export default function OrgProvider({ orgName, children }: OrgProviderProps) {
  const [organization, setOrganization] = useState<OrganizationType | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    async function fetchAndSetOrganization() {
      setIsLoading(true)
      const { organization } = await fetchOrganizationProfile({ orgName })
      if (organization) {
        setOrganization(organization)
      }
      setIsLoading(false)
    }

    fetchAndSetOrganization()
  }, [orgName])

  const value = {
    orgName,
    organization,
    setOrganization,
    isLoading,
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
