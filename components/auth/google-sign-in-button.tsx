'use client'

import { signIn } from 'next-auth/react'
import { FcGoogle } from 'react-icons/fc'

import { DEFAULT_ORG_ADMIN_LOGIN_REDIRECT } from '@/lib/constants/routes'

export default function GoogleSignInButton({ className }: { className?: string }) {
  const handleClick = () => {
    signIn('google', {
      callbackUrl: DEFAULT_ORG_ADMIN_LOGIN_REDIRECT,
    })
  }

  return (
    <div className={` ${className} bg-sky-100`}>
      <FcGoogle onClick={handleClick} className="mx-auto h-[20px] w-full cursor-pointer" />
    </div>
  )
}
