interface ApplicationFormsLayoutProps {
  children: React.ReactNode
}

export default function ApplicationFormsLayout({
  children,
}: Readonly<ApplicationFormsLayoutProps>) {
  return <div>{children}</div>
}
