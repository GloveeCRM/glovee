export default function DependsOnQuestionSetIcon() {
  return (
    <div className="bg-b-500 flex skew-x-0 flex-col gap-[4px] rounded p-[4px] text-n-800" draggable>
      <div className="flex h-[30px] items-center justify-center rounded-sm bg-n-200">
        <span className="text-[12px] font-medium">Depends On</span>
      </div>
      <div className="bg-b-300 flex h-[20px] items-center justify-center">
        <span className="text-[8px]">Drop a question set here</span>
      </div>
    </div>
  )
}
