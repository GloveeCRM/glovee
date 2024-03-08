import ClientsSearch from './clients-search'
import CreateNewClient from './create-new-client'

export default function ClinetPageToolBar() {
  return (
    <div className="flex justify-between">
      <ClientsSearch placeholder="Search clients" className="w-1/3" />
      <CreateNewClient />
    </div>
  )
}
