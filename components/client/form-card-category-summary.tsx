import { Divider } from '@/components/ui/divider'
import ProgressIndicatorRing from '../ui/progress-indicator-ring'

interface FormCardCategorySummaryProps {
  name: string
  completionRate: number
  showLeftDivider: boolean
  showRightDivider: boolean
}

export default function FormCardCategorySummary({
  name,
  completionRate,
  showLeftDivider,
  showRightDivider,
}: FormCardCategorySummaryProps) {
  return (
    <div className="mt-[16px] flex w-full flex-col items-center">
      <div className="flex w-full items-center">
        <Divider size={2} className={`border-n-300 ${!showLeftDivider && 'invisible'}`} />
        <div>
          <ProgressIndicatorRing completionRate={completionRate} />
        </div>
        <Divider size={2} className={`border-n-300 ${!showRightDivider && 'invisible'}`} />
      </div>
      <div className="line-clamp-2 px-[6px] text-[12px]">{name}</div>
    </div>
  )
}
