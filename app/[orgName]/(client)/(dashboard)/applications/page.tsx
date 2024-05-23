import ClientApplicationsWrapper from '@/components/client/client-applications-wrapper'

interface ClientApplicationsPageProps {
  params: {
    orgName: string
  }
}

export default function ClientApplicationsPage({
  params: { orgName },
}: ClientApplicationsPageProps) {
  return (
    <div className="flex h-full flex-col p-[8px]">
      <h1 className="mb-[15px] text-[24px] font-bold">Applications</h1>
      <ClientApplicationsWrapper orgName={orgName} />
    </div>
  )
}
