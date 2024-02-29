import Image from 'next/image'

import { DEFAULT_ORG_LOGO_URL } from '@/lib/constants/images'
import { fetchOrganizationByOrgName } from '@/lib/data/organization'
import { getCurrentOrgName } from '@/lib/utils/server'

export default async function OrgInfoCard() {
  const orgName = getCurrentOrgName()
  if (!orgName) return null
  const org = await fetchOrganizationByOrgName(orgName)

  return (
    <div
      id="org-info"
      className="flex items-center gap-[8px] rounded-md bg-n-600 p-[6px] text-[14px] font-semibold text-n-100"
    >
      <Image
        src={org?.logoUrl || DEFAULT_ORG_LOGO_URL}
        alt="Organization Logo"
        width={65}
        height={65}
        className="rounded-full"
      />
      <h1>{org?.name || 'Untitled Organization'}</h1>
    </div>
  )
}