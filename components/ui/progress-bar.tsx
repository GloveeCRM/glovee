export function ProgressBar() {
  const customStyle = {
    transition: 'stroke-dashoffset 0.35s',
    transform: 'rotate(-90deg)',
    transformOrigin: '50% 50%',
  }

  return (
    <div className="relative h-40 w-40">
      <svg className="h-full w-full" viewBox="0 0 100 100">
        {/* background-circle */}
        <circle
          className="text-n-200"
          strokeWidth="10"
          cx="50"
          cy="50"
          r="40"
          fill="transparent"
        ></circle>
        {/* progress-circle */}
        <circle
          className={`stroke-current text-indigo-500 ${customStyle} `}
          strokeWidth="10"
          strokeLinecap="round"
          cx="50"
          cy="50"
          r="40"
          fill="transparent"
          strokeDasharray="251.2"
          stroke-dashoffset="calc(251.2 - (251.2 * 70) / 100)"
        ></circle>

        {/* Center text */}
        <text
          x="50"
          y="50"
          fontFamily="Verdana"
          fontSize="12"
          textAnchor="middle"
          alignmentBaseline="middle"
        >
          70%
        </text>
      </svg>
    </div>
  )
}
