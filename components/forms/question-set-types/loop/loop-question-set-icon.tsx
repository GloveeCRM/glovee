import { FiPlus } from 'react-icons/fi'

export default function LoopQuestionSetIcon() {
  return (
    <div className="bg-r-500 skew-x-0 rounded p-[4px] text-n-800" draggable>
      <div className="bg-r-200 flex h-[38px] items-center justify-center rounded-sm">
        <span className="text-[12px] font-medium">Loop</span>
      </div>
      <div className="mt-[4px] flex items-center justify-center">
        <span>
          <FiPlus className="h-[12px] w-[12px]" />
        </span>
        <span className="text-[8px]">Add another one</span>
      </div>
    </div>
  )
}
