import Link from 'next/link'
import { BsArrowUpRightCircle } from 'react-icons/bs'

import { Divider } from '@/components/ui/divider'

export default function AuthErrorPage() {
  return (
    <div className="flex flex-col items-center">
      <p className="text-2xl font-bold">Something went wrong!</p>
      <Divider className="my-[26px] border-n-300" size={2} />
      <Link
        href="/login"
        className="group flex w-[205px] items-center justify-center gap-[20px] rounded-full bg-n-700 py-[8px] pl-[6px] text-[21px] text-n-100"
      >
        <span>Back to login!</span>
        <BsArrowUpRightCircle className="h-[35px] w-[35px] transition group-hover:text-o-500" />
      </Link>
    </div>
  )
}
