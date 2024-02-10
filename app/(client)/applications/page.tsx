import ClientApplicationTable from '@/components/client/client-application-table'

export default function ClientApplicationPage() {
  return (
    <div className="p-[8px]">
      <h1 className="mb-[15px] text-[24px] font-bold">Applications</h1>

      <div className="gap-[8px] md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <ClientApplicationTable />
      </div>
    </div>
  )
}
