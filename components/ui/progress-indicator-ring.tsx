import { BiCheck } from 'react-icons/bi'

interface ProgressIndicatorRingProps {
  completionRate: number
  className?: string
  baseCircleColor?: string
  progressCircleColor?: string
  completeGreen?: boolean
  completeCheck?: boolean
}

export default function ProgressIndicatorRing({
  completionRate,
  baseCircleColor = 'text-n-300',
  progressCircleColor = 'text-n-700',
  completeGreen = false,
  completeCheck = false,
}: ProgressIndicatorRingProps) {
  // Calculate the length of the circumference
  const circumference = Math.PI * 20 // Circumference of a circle with radius 10

  // Calculate the dash array and dash offset based on the completion rate
  const dashArray = circumference
  const dashOffset = circumference * (1 - completionRate / 100)

  return (
    <div className="relative h-[42px] w-[42px]">
      <svg className="h-full w-full" viewBox="0 0 24 24" fill="none">
        <circle
          className={`stroke-current ${baseCircleColor}`}
          cx="12"
          cy="12"
          r="10"
          strokeWidth="1"
          strokeLinecap="round"
        />
        <circle
          className={`stroke-current ${completeGreen && completionRate === 100 ? 'text-green-600' : progressCircleColor}`}
          cx="12"
          cy="12"
          r="10"
          strokeWidth="1"
          strokeDasharray={dashArray}
          strokeDashoffset={dashOffset}
          strokeLinecap="round"
          transform="rotate(-90 12 12)"
        />
      </svg>
      <div
        className={`absolute inset-0 flex items-center justify-center text-[9px] font-bold ${completeGreen && completionRate === 100 && 'text-green-600'}`}
      >
        {completeCheck && completionRate === 100 ? (
          <BiCheck className="h-[28px] w-[28px]" />
        ) : (
          `${completionRate}%`
        )}
      </div>
    </div>
  )
}
