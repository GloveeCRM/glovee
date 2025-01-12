'use client'

import { useApplicationFormContext } from '@/contexts/application-form-context'
import ApplicationFormInfoCardSkeleton from '../skeleton/admin/application-form-info-card-skeleton'

export default function ApplicationFormInfoCard() {
  const { applicationForm } = useApplicationFormContext()

  if (!applicationForm) return <ApplicationFormInfoCardSkeleton />

  return (
    <div className="flex flex-col gap-[6px] rounded bg-zinc-700 p-[8px]">
      <span className="text-[12px] text-zinc-300">Form Name</span>
      <span className="text-[12px]">{applicationForm?.form.formName}</span>
    </div>
  )
}
