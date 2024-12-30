import SearchByParams from '@/components/search-by-params'
import AddClientButton from './add-client-button'

export default async function ClinetPageToolbar() {
  return (
    <div className="mt-[8px] flex justify-end">
      <div className="flex gap-[12px]">
        <div className="w-[300px]">
          <SearchByParams placeholder="Search clients" />
        </div>
        <AddClientButton />
      </div>
    </div>
  )
}
