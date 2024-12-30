import SearchByParams from '@/components/search-by-params'
import AddApplicationButton from './add-application-button'

export default function ApplicationPageToolbar() {
  return (
    <div className="mt-[8px] flex justify-end">
      <div className="flex gap-[12px]">
        <div className="w-[300px]">
          <SearchByParams placeholder="Search applications" />
        </div>
        <AddApplicationButton />
      </div>
    </div>
  )
}
