import { Separator } from '@/components/ui/separator'

import AuthOrganizationInfoSkeleton from './auth-organization-info-skeleton'

export default function LoginFormSkeleton() {
  return (
    <div className="flex w-full max-w-[420px] animate-pulse flex-col gap-[26px] rounded-md border border-sand-500 bg-white px-[20px] py-[24px] shadow-sm">
      <AuthOrganizationInfoSkeleton />
      <div className="flex flex-col items-center gap-[22px]">
        <div className="h-[20px] w-[100px] rounded bg-sand-600" />
        <Separator className="mx-[8px] h-[1px] w-full flex-grow bg-sand-500" />
        <div className="flex w-full flex-col gap-[20px]">
          <div className="mb-[4px] flex w-full flex-col gap-[8px]">
            <div className="h-[14px] w-[80px] rounded bg-sand-800" />
            <div className="h-[34px] w-full rounded bg-sand-600" />
          </div>
          <div className="mb-[4px] flex w-full flex-col gap-[8px]">
            <div className="h-[14px] w-[80px] rounded bg-sand-800" />
            <div className="h-[34px] w-full rounded bg-sand-600" />
          </div>
          <div className="flex h-[40px] w-full items-center justify-center rounded bg-sand-700">
            <div className="h-[16px] w-[60px] rounded bg-sand-500" />
          </div>
          <div className="flex w-full flex-col gap-[24px]">
            <div className="h-[14px] w-[140px] rounded bg-sand-800" />
            <div className="flex w-full justify-center gap-[8px]">
              <div className="h-[14px] w-[160px] rounded bg-sand-600" />
              <div className="h-[14px] w-[60px] rounded bg-sand-800" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
