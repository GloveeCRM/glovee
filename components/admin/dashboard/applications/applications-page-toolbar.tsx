import ApplicationsSearch from './applications-search'
import CreateNewApplicationCard from './create-new-application-card'

export default function ApplicationPageToolbar() {
  return (
    <div className="flex items-end justify-between">
      <ApplicationsSearch placeholder="Search Applications" className="w-1/3" />
      <CreateNewApplicationCard />
    </div>
  )
}
