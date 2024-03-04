import ClientSidebar from '@/components/client/client-sidebar'

interface ClientLayoutProps {
  params: { orgName: string }
  children: React.ReactNode
}

export default function ClientLayout({ children, params }: ClientLayoutProps) {
  const orgName = params.orgName

  return (
    <div id="client" className="flex">
      <ClientSidebar orgName={orgName} />
      <div className="flex-1 p-[8px]">{children}</div>
    </div>
  )
}
