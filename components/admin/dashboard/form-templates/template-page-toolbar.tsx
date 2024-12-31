import SearchByParams from '@/components/search-by-params'
import CreateNewTemplateButton from './create-new-template-button'

export default async function TemplatePageToolbar() {
  return (
    <div className="mt-[8px] flex justify-end">
      <div className="flex gap-[12px]">
        <div className="w-[300px]">
          <SearchByParams placeholder="Search templates" />
        </div>
        <CreateNewTemplateButton />
      </div>
    </div>
  )
}
