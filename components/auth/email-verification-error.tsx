import Link from 'next/link'
import { AiOutlineExclamationCircle } from 'react-icons/ai'
import { FiExternalLink } from 'react-icons/fi'

export default function EmailVerificationError({ error }: { error: string }) {
  return (
    <div id="email-verification-error">
      <div className="flex items-start gap-[6px] text-n-700">
        <AiOutlineExclamationCircle className="h-[40px] w-[40px] text-red-700" />
        <h2 className="mb-[10px] text-3xl font-bold">{error}</h2>
      </div>
      <Link
        href="/login"
        className="mx-auto flex w-fit items-center gap-[4px] font-semibold text-sky-500 hover:underline"
      >
        Go to login page
        <FiExternalLink className="h-[18px] w-[18px]" />
      </Link>
    </div>
  )
}
