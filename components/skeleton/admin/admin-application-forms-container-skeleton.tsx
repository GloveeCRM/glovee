import { Separator } from '@/components/ui/separator'

export default function AdminApplicationFormsContainerSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-[16px] overflow-y-auto px-[8px]">
      <AdminApplicationFormCardSkeleton />
      <AdminApplicationFormCardSkeleton />
    </div>
  )
}

function AdminApplicationFormCardSkeleton() {
  return (
    <div className="flex min-w-[400px] flex-col items-end justify-between rounded-lg border border-sand-500 bg-white p-[12px] shadow-sm">
      <div className="flex w-full justify-between">
        <div className="h-[10px] w-[130px] rounded-lg bg-sand-500" />
        <div className="h-[12px] w-[100px] rounded-full bg-sand-400" />
      </div>
      <div className="mt-[34px] flex w-full justify-between px-[16px]">
        <div className="flex w-full items-center">
          <div className="h-[10px] w-[80px] flex-shrink-0 rounded-lg bg-sand-500" />
          <Separator className="mx-[8px] h-[2px] min-w-[20px] flex-grow bg-sand-400" />
        </div>
        <div className="flex w-full items-center">
          <div className="h-[10px] w-[65px] flex-shrink-0 rounded-lg bg-sand-500" />
          <Separator className="mx-[8px] h-[2px] min-w-[20px] flex-grow bg-sand-400" />
        </div>
        <div className="h-[10px] w-[110px] flex-shrink-0 rounded-lg bg-sand-500" />
      </div>
      <div className="mt-[28px] h-[22px] w-[60px] rounded-lg bg-sand-400" />
    </div>
  )
}
