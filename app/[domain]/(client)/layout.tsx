import ClientSidebar from '@/components/client/client-sidebar'

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div id="clientApp" className="flex">
      <ClientSidebar />
      <div className="w-full">{children}</div>
    </div>
  )
}
