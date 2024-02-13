import ClientSidebar from '@/components/client/ClientSidebar'

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div id="clientApp" className="flex">
      <ClientSidebar />
      <div className="h-[1200px] w-full">{children}</div>
    </div>
  )
}
