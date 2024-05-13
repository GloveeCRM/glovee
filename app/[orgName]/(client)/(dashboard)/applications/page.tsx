import ClientApplicationsWrapper from '@/components/client/client-applications-wrapper'

export default function ClientApplicationsPage() {
  return (
    <div className="flex h-full flex-col p-[8px]">
      <h1 className="mb-[15px] text-[24px] font-bold">Applications</h1>
      <ClientApplicationsWrapper />
    </div>
  )
}
