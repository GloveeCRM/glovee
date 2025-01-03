import Link from 'next/link'
import { FaFileLines, FaFilePen } from 'react-icons/fa6'

import { ApplicationFormType, FormStatusTypes } from '@/lib/types/form'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

interface AdminFormSummaryCardProps {
  applicationForm: ApplicationFormType
}

export default function AdminFormSummaryCard({ applicationForm }: AdminFormSummaryCardProps) {
  return (
    <div className="flex flex-col gap-[10px] rounded-lg border border-n-500 p-[10px]">
      <div className="flex w-full items-center justify-between">
        <div>{applicationForm.formID}</div>
        <Badge size="lg">{applicationForm.formID}</Badge>
      </div>
      {/* {form.status === FormStatusTypes.SUBMITTED ? (
        <Link href={`/admin/application/${form.applicationID}/submitted-form/${form.id}`}>
          <Button size="default">
            <div className="flex items-center justify-center gap-[8px]">
              <span>View Answers</span>
              <FaFileLines className="h-[16px] w-[16px]" />
            </div>
          </Button>
        </Link>
      ) : (
        <Link href={`/admin/application/${form.applicationID}/form/${form.id}`}>
          <Button size="default">
            <div className="flex items-center justify-center gap-[8px]">
              <span>Open Form</span>
              <FaFilePen className="h-[16px] w-[16px]" />
            </div>
          </Button>
        </Link>
      )} */}
    </div>
  )
}
