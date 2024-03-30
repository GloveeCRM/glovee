import Divider from '@/components/ui/divider'
import { MdOutlineKeyboardArrowDown } from 'react-icons/md'

export default function DateInputQuestionIcon() {
  return (
    <div className="skew-x-0 rounded bg-n-200 px-[6px] py-[4px] text-[12px] text-n-600" draggable>
      <span className="text-[12px]">Date Input</span>
      <div className="mb-[2px] mt-[6px] flex gap-[6px]">
        <div className="w-full">
          <div className="flex w-[20px] items-center">
            <Divider className="mb-[2px] border-n-500" size={2} />
          </div>
          <div className="flex h-[20px] items-center justify-end rounded-sm border-[1px] border-n-600">
            <span>
              <MdOutlineKeyboardArrowDown className="h-[20px] w-[20px]" />
            </span>
          </div>
        </div>
        <div className="w-full">
          <div className="flex w-[20px] items-center">
            <Divider className="mb-[2px] border-n-500" size={2} />
          </div>
          <div className="flex h-[20px] items-center justify-end rounded-sm border-[1px] border-n-600">
            <span>
              <MdOutlineKeyboardArrowDown className="h-[20px] w-[20px]" />
            </span>
          </div>
        </div>
        <div className="w-full">
          <div className="flex w-[20px] items-center">
            <Divider className="mb-[2px] border-n-500" size={2} />
          </div>
          <div className="flex h-[20px] items-center justify-end rounded-sm border-[1px] border-n-600">
            <span>
              <MdOutlineKeyboardArrowDown className="h-[20px] w-[20px]" />
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
