import SearchByParams from '@/components/search-by-params'
import CreateNewApplicationButton from './create-new-application-button'

interface ApplicationPageToolbarProps {
  orgName: string
}

export default function ApplicationPageToolbar({ orgName }: ApplicationPageToolbarProps) {
  return (
    <div className="mt-[8px] flex items-end justify-between">
      <div className="ml-[6px] w-[300px]">
        <SearchByParams placeholder="Search Applications" />
      </div>
      <CreateNewApplicationButton orgName={orgName} />
    </div>
  )
}
