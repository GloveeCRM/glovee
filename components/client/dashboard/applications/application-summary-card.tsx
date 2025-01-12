import { ApplicationType } from '@/lib/types/application'
import { formatDateToShortMonthDayYearTime } from '@/lib/utils/date'
import Link from 'next/link'
import { MdArrowOutward } from 'react-icons/md'
interface ApplicationSummaryCardProps {
  application: ApplicationType
}

export default function ApplicationSummaryCard({
  application,
}: Readonly<ApplicationSummaryCardProps>) {
  return (
    <div className="flex flex-col gap-[18px] rounded-md border border-sand-500 bg-white p-[12px] text-[14px] shadow-sm">
      <div className="flex justify-between gap-[12px]">
        <div className="flex flex-col gap-[4px]">
          <span className="font-medium">{application.applicationName}</span>
          <span className="text-[12px] text-zinc-500">{application.applicationID}</span>
        </div>
        <span className="h-fit flex-shrink-0 rounded-full bg-coral-100 px-[12px] py-[1px] text-[12px]">
          Pending Client Submission
        </span>
      </div>
      <div className="flex items-center justify-between gap-[12px]">
        <div className="flex flex-shrink-0 items-center gap-[8px]">
          <span className="font-medium">Last update:</span>
          <span className="text-[12px] text-zinc-500">
            {formatDateToShortMonthDayYearTime({
              date: application.updatedAt,
              format: 'long',
              includeTime: true,
            })}
          </span>
        </div>
        <Link
          href={`/application/${application.applicationID}/forms`}
          className="flex flex-shrink-0 items-center gap-[2px] rounded-md bg-teal-100 px-[8px] py-[2px] text-teal-900 hover:bg-teal-200"
        >
          <span>Open application</span>
          <MdArrowOutward className="h-[16px] w-[16px]" />
        </Link>
      </div>
    </div>
  )
}
