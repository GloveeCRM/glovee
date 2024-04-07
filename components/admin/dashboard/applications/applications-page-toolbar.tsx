import SearchByParams from '@/components/search-by-params'
import CreateNewApplicationButton from './create-new-application-button'

interface ApplicationPageToolbarProps {
  orgName: string
}

export default function ApplicationPageToolbar({ orgName }: ApplicationPageToolbarProps) {
  return (
    <div className="flex items-end justify-between">
      <div className="w-[300px]">
        <SearchByParams placeholder="Search Applications" />
      </div>
      <CreateNewApplicationButton orgName={orgName} />
    </div>
  )
}
