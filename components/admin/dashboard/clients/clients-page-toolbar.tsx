import SearchByParams from '@/components/search-by-params'
import CreateNewClientButton from './create-new-client-button'

export default function ClinetPageToolbar() {
  return (
    <div className="mt-[8px] flex items-end justify-between">
      <div className="ml-[6px] w-[300px]">
        <SearchByParams placeholder="Search clients" />
      </div>
      <CreateNewClientButton />
    </div>
  )
}
