import ApplicationsSearch from './applications-search'
import CreateNewApplicationButton from './create-new-application-button'

export default function ApplicationPageToolbar() {
  return (
    <div className="flex items-end justify-between">
      <ApplicationsSearch placeholder="Search Applications" className="w-1/3" />
      <CreateNewApplicationButton />
    </div>
  )
}
