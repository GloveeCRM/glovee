'use client'

import Link from 'next/link'
import { FaFilePen } from 'react-icons/fa6'

import { ApplicationType } from '@/lib/types/application'
import { Button } from '@/components/ui/button'

interface ClientApplicationSummaryCardProps {
  application: ApplicationType
}

export default function ClientApplicationSummaryCard({
  application,
}: ClientApplicationSummaryCardProps) {
  return (
    <div className="items-center justify-between rounded-lg border border-n-500 p-[10px]">
      <div>{JSON.stringify(application, null, 2)}</div>
      <div className="mt-[16px] flex justify-between gap-[8px]">
        <div className="w-[150px]">
          <OpenApplicationButton applicationID={application.applicationID} />
        </div>
      </div>
    </div>
  )
}

interface OpenApplicationButtonProps {
  applicationID: number
}

function OpenApplicationButton({ applicationID }: OpenApplicationButtonProps) {
  return (
    <Link href={`/application/${applicationID}/forms`}>
      <Button size="default">
        <div className="flex items-center justify-center gap-[8px]">
          <span>Open Application</span>
          <FaFilePen className="h-[16px] w-[16px]" />
        </div>
      </Button>
    </Link>
  )
}
