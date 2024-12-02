import { Metadata } from 'next'

import '@/app/globals.css'
import FormTemplateEditProvider from '@/contexts/template-edit-context'

import TemplateEditSidebar from '@/demo/form-template-builder/components/template-edit-sidebar'
// import TemplateEditToolbar from '@/demo/form-template-builder/components/template-edit-toolbar'

export const metadata: Metadata = {
  title: 'Form Builder Demo',
  description: '',
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default async function RootLayout({ children }: RootLayoutProps) {
  const formTemplateID = 1

  return (
    <html lang="en">
      <body id="form-builder-demo">
        <FormTemplateEditProvider formTemplateID={formTemplateID}>
          <TemplateEditSidebar />
          <div className="h-svh w-full min-w-0 overflow-y-scroll bg-n-400">{children}</div>
          {/* <TemplateEditToolbar /> */}
        </FormTemplateEditProvider>
      </body>
    </html>
  )
}
