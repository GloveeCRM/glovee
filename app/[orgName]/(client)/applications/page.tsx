import ClientApplicationTable from '@/components/client/client-application-table'

export default function ClientApplicationPage() {
  return (
    <div className="flex h-full flex-col p-[8px]">
      <h1 className="mb-[15px] text-[24px] font-bold">Applications</h1>
      <ClientApplicationTable />
    </div>
  )
}
