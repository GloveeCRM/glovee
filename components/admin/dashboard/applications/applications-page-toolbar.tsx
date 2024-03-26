import ApplicationsSearch from './applications-search'
import CreateNewApplicationButton from './create-new-application-button'

interface ApplicationPageToolbarProps {
  orgName: string
}

export default function ApplicationPageToolbar({ orgName }: ApplicationPageToolbarProps) {
  return (
    <div className="flex items-end justify-between">
      <ApplicationsSearch placeholder="Search Applications" className="w-1/3" />
      <CreateNewApplicationButton orgName={orgName} />
    </div>
  )
}
