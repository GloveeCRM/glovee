import ClientSidebar from '@/components/client/client-sidebar'

interface ClientLayoutProps {
  params: { orgName: string }
  children: React.ReactNode
}

export default function ClientLayout({ children, params }: ClientLayoutProps) {
  const orgName = params.orgName

  return (
    <div id="client" className="flex overflow-hidden">
      <ClientSidebar orgName={orgName} />
      <div className="max-h-screen flex-1 overflow-y-auto p-[8px]">{children}</div>
    </div>
  )
}
