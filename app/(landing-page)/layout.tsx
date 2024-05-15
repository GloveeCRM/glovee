import type { Metadata } from 'next'

import '../globals.css'

export const metadata: Metadata = {
  title: 'Immigration CRM',
  description: '',
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="p-[8px]">{children}</body>
    </html>
  )
}
