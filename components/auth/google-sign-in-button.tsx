'use client'

import { signIn } from 'next-auth/react'
import { FcGoogle } from 'react-icons/fc'

import { DEFAULT_LOGIN_REDIRECT } from '@/routes'

export default function GoogleSignInButton() {
  const handleClick = () => {
    signIn('google', {
      callbackUrl: DEFAULT_LOGIN_REDIRECT,
    })
  }

  return (
    <div>
      <FcGoogle onClick={handleClick} />
    </div>
  )
}
