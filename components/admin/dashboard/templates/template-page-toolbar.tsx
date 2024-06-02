import CreateNewTemplateButton from './create-new-template-button'

export default async function TemplatePageToolbar() {
  return (
    <div className="mt-[20px] flex justify-end">
      <div className="mr-[6px]">
        <CreateNewTemplateButton />
      </div>
    </div>
  )
}
