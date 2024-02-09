'use client'

import { verifyUserEmail } from '@/lib/actions/auth'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import { ImSpinner2 } from 'react-icons/im'

export function NewVerificationForm() {
  const [error, setError] = useState<string | undefined>()
  const [success, setSuccess] = useState<string | undefined>()

  const searchParams = useSearchParams()
  const token = searchParams.get('token')

  const onSubmit = useCallback(() => {
    if (success || error) return

    if (!token) {
      setError('Missing token!')
      return
    }

    verifyUserEmail(token)
      .then((data) => {
        if (data?.error) {
          setError(data.error)
        }
        if (data?.success) {
          setSuccess(data.success)
        } else {
          setError('Something went wrong!')
        }
      })
      .catch(() => {
        setError('Something went wrong!')
      })
  }, [token, success, error])

  useEffect(() => {
    onSubmit()
  }, [onSubmit])

  return (
    <div>
      <div className="flex w-full items-center justify-center">
        <ImSpinner2 className="animate-spin text-teal-500" size={50} />
      </div>
      {!error && !success && <p>Verifying...</p>}
      <div>{success}</div>
      {!success && <div>{error}</div>}
      <Link href={'/login'} className="text-sky-400 hover:underline">
        Login Now!
      </Link>
    </div>
  )
}
