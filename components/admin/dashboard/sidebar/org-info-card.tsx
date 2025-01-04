import Image from 'next/image'

import { DEFAULT_ORG_LOGO_URL } from '@/lib/constants/images'
import { fetchOrganizationProfile } from '@/lib/data/organization'

interface OrgInfoCardProps {
  orgName: string
  collapsed?: boolean
}

export default async function OrgInfoCard({ orgName, collapsed }: OrgInfoCardProps) {
  const { organization } = await fetchOrganizationProfile({ orgName })

  const imageSize = collapsed ? 'h-[51px] w-[51px]' : 'h-[65px] w-[65px]'

  return (
    <div
      id="org-info"
      className="flex items-center gap-[8px] rounded-md bg-coral-400 p-[6px] text-[14px] font-semibold"
    >
      <Image
        src={organization?.logoURL || DEFAULT_ORG_LOGO_URL}
        alt="Organization Logo"
        width={65}
        height={65}
        className={`rounded-full ${imageSize}`}
        draggable={false}
      />
      {!collapsed && <h1>{organization?.name}</h1>}
    </div>
  )
}
