import ClientApplicationsTableSkeleton from '@/components/skeleton/admin/client-applications-table-skeleton'
import ClientProfileCardSkeleton from '@/components/skeleton/admin/client-profile-card-skeleton'

export default function ClientPageLoading() {
  return (
    <div className="flex h-[calc(100svh-16px)] flex-col gap-[8px]">
      <ClientProfileCardSkeleton />
      <div className="mt-[20px] flex items-end justify-end">
        <AddApplicationButtonSkeleton />
      </div>
      <ClientApplicationsTableSkeleton />
    </div>
  )
}

function AddApplicationButtonSkeleton() {
  return (
    <div className="bg-sand-600 flex h-[33px] w-[142px] animate-pulse items-center justify-center gap-[4px] rounded">
      <div className="bg-sand-500 h-[8px] w-[8px] rounded-sm" />
      <div className="bg-sand-500 h-[8px] w-[100px] rounded-sm" />
    </div>
  )
}
