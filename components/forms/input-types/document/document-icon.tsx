import Divider from '@/components/ui/divider'
import { PiCheckBold } from 'react-icons/pi'

export default function DocumentIcon() {
  return (
    <div className="skew-x-0 rounded bg-n-200 px-[6px] py-[4px] text-[12px] text-n-600" draggable>
      <span className="text-[12px]">Document</span>
      <div className="mb-[2px] mt-[4px] flex flex-col gap-[2px]">
        <div className="flex w-[35px] items-center">
          <Divider className="mb-[2px] border-n-500" size={2} />
        </div>
        <div className="flex h-[20px] items-center rounded-sm border-[1px] border-n-600">
          <div className="ml-[2px] h-[14px] w-[14px] bg-n-400" />
          <div className="ml-[5px] w-[20px]">
            <Divider className="border-n-500" size={2} />
          </div>
        </div>
      </div>
    </div>
  )
}
