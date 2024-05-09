interface ProgressIndicatorRingProps {
  completionRate: number
}

export default function ProgressIndicatorRing({ completionRate }: ProgressIndicatorRingProps) {
  return (
    <div className="relative h-[50px] w-[50px]">
      <svg
        className="h-full w-full"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          className="text-primary-500 stroke-current"
          cx="12"
          cy="12"
          r="10"
          strokeWidth="4"
          strokeDasharray="31.41592653589793"
          strokeDashoffset={31.41592653589793 - (completionRate / 100) * 31.41592653589793}
          strokeLinecap="round"
        />
      </svg>
      <div className="text-primary-500 absolute inset-0 flex items-center justify-center text-[10px] font-bold">
        {completionRate}%
      </div>
    </div>
  )
}
