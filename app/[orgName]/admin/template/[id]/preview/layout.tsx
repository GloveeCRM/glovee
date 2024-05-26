import TemplatePreviewSidebar from '@/components/admin/template/preview/template-preview-sidebar'

interface TemplatePreviewLayoutProps {
  params: {
    id: string
    orgName: string
  }
  children: React.ReactNode
}

export default async function TemplatePreviewLayout({
  params,
  children,
}: TemplatePreviewLayoutProps) {
  const templateID = parseInt(params.id)
  const orgName = params.orgName

  return (
    <div id="templatePreviewLayout" className="flex">
      <TemplatePreviewSidebar orgName={orgName} templateID={templateID} />
      <div className="w-full p-[8px]">{children}</div>
    </div>
  )
}
