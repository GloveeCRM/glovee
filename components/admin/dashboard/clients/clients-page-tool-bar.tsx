import ClientsSearch from './clients-search'

export default function ClinetPageToolBar() {
  return (
    <div className="flex justify-between bg-yellow-500">
      <ClientsSearch placeholder="Search clients" className="w-1/3" />
      <div>Add new client</div>
    </div>
  )
}
