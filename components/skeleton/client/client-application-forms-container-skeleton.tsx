import { Separator } from '@/components/ui/separator'

export default function ClientApplicationFormsContainerSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-[16px] overflow-y-auto px-[8px]">
      <ClientApplicationFormCardSkeleton />
      <ClientApplicationFormCardSkeleton />
    </div>
  )
}

function ClientApplicationFormCardSkeleton() {
  return (
    <div className="flex min-w-[400px] flex-col gap-[34px] rounded-lg border border-sand-500 bg-white p-[10px] shadow-sm">
      <div className="flex w-full justify-between">
        <div className="h-[14px] w-[130px] rounded-lg bg-sand-500" />
        <div className="h-[14px] w-[170px] rounded-full bg-sand-400" />
      </div>
      <div className="mt-[7px] flex w-full justify-around px-[16px]">
        <div className="flex w-full flex-col items-center">
          <div className="flex w-full items-center">
            <Separator className="mr-[6px] h-[2px] flex-grow bg-sand-400" />
            <div className="h-[38px] w-[38px] rounded-full bg-sand-500" />
            <Separator className="invisible ml-[6px] h-[2px] flex-grow bg-sand-400" />
          </div>
          <div className="mt-[6px] h-[12px] w-[80px] rounded-lg bg-sand-500" />
        </div>
        <div className="flex w-full flex-col items-center">
          <div className="flex w-full items-center">
            <Separator className="mr-[6px] h-[2px] flex-grow bg-sand-400" />
            <div className="h-[38px] w-[38px] rounded-full bg-sand-500" />
            <Separator className="ml-[6px] h-[2px] flex-grow bg-sand-400" />
          </div>
          <div className="mt-[6px] h-[12px] w-[80px] rounded-lg bg-sand-500" />
        </div>
        <div className="flex w-full flex-col items-center">
          <div className="flex w-full items-center">
            <Separator className="mr-[6px] h-[2px] flex-grow bg-sand-400" />
            <div className="h-[38px] w-[38px] rounded-full bg-sand-500" />
            <Separator className="invisible ml-[6px] h-[2px] flex-grow bg-sand-400" />
          </div>
          <div className="mt-[6px] h-[12px] w-[80px] rounded-lg bg-sand-500" />
        </div>
      </div>
      <div className="flex justify-end">
        <div className="h-[22px] w-[60px] rounded-lg bg-sand-400" />
      </div>
    </div>
  )
}
