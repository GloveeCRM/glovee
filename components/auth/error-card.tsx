import Link from 'next/link'

import { BsArrowUpRightCircle } from 'react-icons/bs'
import Divider from '../ui/divider'

export default function ErrorCard() {
  return (
    <div className="flex flex-col items-center">
      <p className="text-2xl font-bold">Something went wrong!</p>
      <Divider className="my-[20px] border-n-400" size={2} />
      <Link href={'/login'}>
        <div className="group flex w-[205px] items-center justify-center gap-[20px] rounded-full bg-n-700 py-[8px] pl-[6px] text-[21px] text-n-100">
          <span>Back to login!</span>
          <BsArrowUpRightCircle className="group-hover:text-o-500 h-[35px] w-[35px] transition" />
        </div>
      </Link>
    </div>
  )
}
