interface ApplicationLayoutParams {
  applicationID: number
}

interface ApplicationLayoutProps {
  children: React.ReactNode
  params: ApplicationLayoutParams
}

export default function ApplicationLayout({ children, params }: Readonly<ApplicationLayoutProps>) {
  const { applicationID } = params

  return (
    <div id="client-application-layout" className="flex overflow-hidden">
      <div className="h-screen flex-1 p-[8px]">{children}</div>
    </div>
  )
}
