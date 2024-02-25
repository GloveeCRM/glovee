import { ImSpinner2 } from 'react-icons/im'

export default function EmailVerificationLoading() {
  return (
    <div>
      <div className="mb-[10px] flex w-full items-center justify-center">
        <ImSpinner2 className="h-[60px] w-[60px] animate-spin text-teal-500" />
      </div>
      <h2 className="text-2xl font-semibold text-n-700">Verifying...</h2>
    </div>
  )
}
