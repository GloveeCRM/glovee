import Link from 'next/link'
import { FiExternalLink } from 'react-icons/fi'

export default function EmailVerificationNotFoundPage() {
  return (
    <div>
      <div className="mb-[30px]">
        <h2 className="mb-[10px] text-center text-3xl font-semibold">404 Not Found</h2>
        <p>Could not find the requested email verification.</p>
      </div>
      <div className="flex justify-center gap-[30px]">
        <Link
          href="/login"
          className="flex w-fit items-center gap-[4px] font-semibold text-sky-500 hover:underline"
        >
          Login Page
          <FiExternalLink className="h-[18px] w-[18px]" />
        </Link>
        <Link
          href="/"
          className="text-o-600 flex w-fit items-center gap-[4px] font-semibold hover:underline"
        >
          Home Page
          <FiExternalLink className="h-[18px] w-[18px]" />
        </Link>
      </div>
    </div>
  )
}
