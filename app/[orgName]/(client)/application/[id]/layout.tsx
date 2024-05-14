import ClientApplicationSidebar from '@/components/client/client-application-sidebar'

export default function ApplicationLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode
  params: {
    id: string
  }
}>) {
  return (
    <div id="clientApp" className="flex overflow-hidden">
      <ClientApplicationSidebar applicationId={params.id} />
      <div className="flex-1 overflow-auto p-[8px]">{children}</div>
    </div>
  )
}
