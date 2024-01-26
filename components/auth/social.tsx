'use client'

import { signIn } from 'next-auth/react'
import { FcGoogle } from 'react-icons/fc'

import { DEFAULT_LOGIN_REDIRECT } from '@/routes'

export function Social() {
  const onClick = (provider: 'google') => {
    signIn(provider, {
      callbackUrl: DEFAULT_LOGIN_REDIRECT,
    })
  }

  return (
    <div>
      <FcGoogle onClick={() => onClick('google')} />
    </div>
  )
}
