import ClientsSearch from './clients-search'
import CreateNewClientButton from './create-new-client-button'

export default function ClinetPageToolbar() {
  return (
    <div className="flex items-end justify-between">
      <ClientsSearch placeholder="Search clients" className="w-1/3" />
      <CreateNewClientButton />
    </div>
  )
}
