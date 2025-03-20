'use client'

import Image from 'next/image'

import { DEFAULT_ORG_LOGO_URL } from '@/lib/constants/images'
import { useOrgContext } from '@/contexts/org-context'

import AuthOrganizationInfoSkeleton from '@/components/skeleton/auth/auth-organization-info-skeleton'

export default function AuthOrganizationInfo() {
  const { isLoading, organization } = useOrgContext()

  if (isLoading) {
    return <AuthOrganizationInfoSkeleton />
  }

  return (
    <div className="flex flex-col items-center">
      <Image
        src={organization?.logoFile?.url || DEFAULT_ORG_LOGO_URL}
        alt={`${organization?.name} logo`}
        width={64}
        height={64}
        className="h-[86px] w-[86px] rounded-xl border border-sand-500 shadow-sm"
      />
      <h2 className="mt-[10px] text-center text-xl font-bold">
        {organization?.name || 'Something went wrong'}
      </h2>
    </div>
  )
}
