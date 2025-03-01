import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Glovee',
  description: '',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="h-svh cursor-default overflow-hidden bg-sand-400 text-zinc-900">
        {children}
      </body>
    </html>
  )
}
