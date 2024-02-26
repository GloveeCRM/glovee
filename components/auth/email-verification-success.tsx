'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { TbCheckbox } from 'react-icons/tb'

export default function EmailVerificationSuccess({ success }: { success: string }) {
  const [countdown, setCountdown] = useState(2)

  const router = useRouter()

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prevCountdown) => prevCountdown - 1)
    }, 1000)

    setTimeout(() => {
      router.push('/login')
    }, 2000)

    return () => {
      clearInterval(timer)
    }
  }, [router])

  return (
    <div>
      <div className="mb-[10px] flex items-center gap-[10px] text-teal-600">
        <TbCheckbox className="h-[40px] w-[40px]" />
        <h2 className="text-3xl font-semibold">{success}</h2>
      </div>
      <div className="flex flex-col items-center">
        <p>Redirecting to Login in {countdown} seconds...</p>
      </div>
    </div>
  )
}
