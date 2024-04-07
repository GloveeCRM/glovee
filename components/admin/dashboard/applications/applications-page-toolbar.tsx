import SearchByParams from '@/components/search-by-params'
import CreateNewApplicationButton from './create-new-application-button'

interface ApplicationPageToolbarProps {
  orgName: string
}

export default function ApplicationPageToolbar({ orgName }: ApplicationPageToolbarProps) {
  return (
    <div className="flex items-end justify-between">
      <SearchByParams placeholder="Search Applications" className="w-1/3" />
      <CreateNewApplicationButton orgName={orgName} />
    </div>
  )
}
