'use client'

import { createContext, useContext, useEffect, useState } from 'react'

import { OrganizationType } from '@/lib/types/organization'
import { fetchOrganizationProfile } from '@/lib/data/organization'

type OrgContextType = {
  orgName: string
  organization: OrganizationType | null
  setOrganization: (organization: OrganizationType | null) => void
}

const orgContextDefaultValues: OrgContextType = {
  orgName: '',
  organization: null,
  setOrganization: () => {},
}

const OrgContext = createContext<OrgContextType>(orgContextDefaultValues)

interface OrgProviderProps {
  orgName: string
  children: React.ReactNode
}

export default function OrgProvider({ orgName, children }: OrgProviderProps) {
  const [organization, setOrganization] = useState<OrganizationType | null>(null)

  useEffect(() => {
    async function fetchAndSetOrganization() {
      const { organization } = await fetchOrganizationProfile({ orgName })
      if (organization) {
        setOrganization(organization)
      }
    }

    fetchAndSetOrganization()
  }, [orgName])

  const value = {
    orgName,
    organization,
    setOrganization,
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
