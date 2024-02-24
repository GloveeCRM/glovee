'use client'

import { signIn } from 'next-auth/react'
import { FcGoogle } from 'react-icons/fc'

import { DEFAULT_ORG_ADMIN_LOGIN_REDIRECT } from '@/lib/constants/routes'

interface GoogleSignInButtonProps {
  className?: string
  disabled?: boolean
}

export default function GoogleSignInButton({ className, disabled }: GoogleSignInButtonProps) {
  const handleClick = () => {
    signIn('google', {
      callbackUrl: DEFAULT_ORG_ADMIN_LOGIN_REDIRECT,
    })
  }

  return (
    <button
      disabled={disabled}
      className={`${className} cursor-pointer rounded bg-sky-100 transition duration-200 hover:bg-sky-200 disabled:cursor-not-allowed disabled:bg-sky-50 disabled:hover:bg-sky-50`}
      onClick={handleClick}
    >
      <FcGoogle className="mx-auto h-[20px] w-[20px]" />
    </button>
  )
}
