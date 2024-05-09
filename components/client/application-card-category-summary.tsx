import Divider from '../ui/divider'
import ProgressIndicatorRing from '../ui/progress-indicator-ring'

interface ApplicationCardCategorySummaryProps {
  name: string
  completionRate: number
  showLeftDivider: boolean
  showRightDivider: boolean
}

export default function ApplicationCardCategorySummary({
  name,
  completionRate,
  showLeftDivider,
  showRightDivider,
}: ApplicationCardCategorySummaryProps) {
  return (
    <div className="flex w-full flex-col items-center">
      <div className="flex w-full items-center">
        <Divider size={2} className={`border-n-400 ${!showLeftDivider && 'invisible'}`} />
        <div>
          <ProgressIndicatorRing completionRate={completionRate} />
        </div>
        <Divider size={2} className={`border-n-400 ${!showRightDivider && 'invisible'}`} />
      </div>
      <div className="line-clamp-2 px-[6px] text-[12px]">{name}</div>
    </div>
  )
}
