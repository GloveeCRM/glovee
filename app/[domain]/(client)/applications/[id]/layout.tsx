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
    <div id="clientApp" className="flex">
      <ClientApplicationSidebar applicationId={params.id} />
      <div className="w-full">{children}</div>
    </div>
  )
}
