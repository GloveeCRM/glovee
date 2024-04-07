import SearchByParams from '@/components/search-by-params'
import CreateNewClientButton from './create-new-client-button'

export default function ClinetPageToolbar() {
  return (
    <div className="flex items-end justify-between">
      <SearchByParams placeholder="Search clients" className="w-1/3" />
      <CreateNewClientButton />
    </div>
  )
}
