import SearchByParams from '@/components/search-by-params'
import AddFormTemplateButton from './add-form-template-button'

export default async function FormTemplatesPageToolbar() {
  return (
    <div className="mt-[8px] flex justify-end">
      <div className="flex gap-[12px]">
        <div className="w-[300px]">
          <SearchByParams placeholder="Search templates" />
        </div>
        <AddFormTemplateButton />
      </div>
    </div>
  )
}
