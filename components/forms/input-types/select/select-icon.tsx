import Divider from '@/components/ui/divider'
import { MdOutlineKeyboardArrowDown } from 'react-icons/md'

export default function SelectIcon() {
  return (
    <div className="skew-x-0 rounded bg-n-200 px-[6px] py-[4px] text-[12px] text-n-600" draggable>
      <span className="text-[12px]">Select</span>
      <div className="mb-[2px] mt-[4px] flex flex-col gap-[2px]">
        <div className="flex w-[35px] items-center">
          <Divider className="mb-[2px] border-n-500" size={2} />
        </div>
        <div className="flex h-[20px] items-center justify-between rounded-sm border-[1px] border-n-600">
          <div className="ml-[5px] w-[20px]">
            <Divider className="border-n-500" size={2} />
          </div>
          <span>
            <MdOutlineKeyboardArrowDown className="h-[20px] w-[20px]" />
          </span>
        </div>
      </div>
    </div>
  )
}
