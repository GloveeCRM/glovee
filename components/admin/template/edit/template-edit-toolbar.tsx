import SaveTemplateButton from './save-template-button'

export default function TemplateEditToolbar() {
  return (
    <div className="sticky top-0 flex h-screen w-[240px] flex-shrink-0 flex-col bg-n-700 p-[8px] text-n-100">
      <SaveTemplateButton />
    </div>
  )
}
