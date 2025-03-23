'use client'

import ApplicationFormInfoCardSkeleton from '../skeleton/admin/application-form-info-card-skeleton'
import { useFormContext } from '@/contexts/form-context'

export default function ApplicationFormInfoCard() {
  const { form } = useFormContext()

  if (!form) return <ApplicationFormInfoCardSkeleton />

  return (
    <div className="flex flex-col gap-[6px] rounded bg-zinc-700 p-[8px]">
      <span className="text-[12px] text-zinc-300">Form Name</span>
      <span className="text-[12px]">{form?.formName}</span>
    </div>
  )
}
