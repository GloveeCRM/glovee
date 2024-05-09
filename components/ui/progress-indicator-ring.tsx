interface ProgressIndicatorRingProps {
  completionRate: number
}

export default function ProgressIndicatorRing({ completionRate }: ProgressIndicatorRingProps) {
  // Calculate the length of the circumference
  const circumference = Math.PI * 20 // Circumference of a circle with radius 10

  // Calculate the dash array and dash offset based on the completion rate
  const dashArray = circumference
  const dashOffset = circumference * (1 - completionRate / 100)

  return (
    <div className="relative h-[40px] w-[40px]">
      <svg className="h-full w-full" viewBox="0 0 24 24" fill="none">
        <circle
          className="stroke-current text-n-300"
          cx="12"
          cy="12"
          r="10"
          strokeWidth="1"
          strokeLinecap="round"
        />
        <circle
          className="stroke-current text-n-700"
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
      <div className="absolute inset-0 flex items-center justify-center text-[10px] font-bold">
        {completionRate}%
      </div>
    </div>
  )
}
