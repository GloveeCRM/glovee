import TemplatePreviewSidebar from '@/components/admin/template/preview/template-preview-sidebar'

interface TemplatePreviewLayoutProps {
  children: React.ReactNode
}

export default async function TemplatePreviewLayout({ children }: TemplatePreviewLayoutProps) {
  return (
    <div id="templatePreviewLayout" className="flex">
      <TemplatePreviewSidebar />
      <div className="w-full p-[8px]">{children}</div>
    </div>
  )
}
