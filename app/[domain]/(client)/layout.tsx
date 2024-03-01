import ClientSidebar from '@/components/client/client-sidebar'

interface ClientLayoutProps {
  children: React.ReactNode
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  return (
    <div id="client" className="flex">
      <ClientSidebar />
      <div className="flex-1">{children}</div>
    </div>
  )
}
