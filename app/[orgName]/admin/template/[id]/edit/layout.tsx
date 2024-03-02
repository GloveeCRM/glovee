import TemplateEditSidebar from '@/components/admin/template/edit/template-edit-sidebar'

interface templateEditLayoutProps {
  params: { orgName: string; id: string }
  children: React.ReactNode
}

export default function templateEditLayout({ params, children }: templateEditLayoutProps) {
  console.log('orgName:', params.orgName)
  return (
    <div id="templateEditLayout" className="flex">
      <TemplateEditSidebar templateId={params.id} />
      <div className="w-full">{children}</div>
    </div>
  )
}
