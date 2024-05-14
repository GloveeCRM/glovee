'use client'

import { refreshToken } from '@/lib/actions/auth'
import { removeSession } from '@/lib/auth/session'
import { DEFAULT_LOGOUT_REDIRECT } from '@/lib/constants/routes'
import { redirect } from 'next/navigation'
import { createContext, useContext, useEffect } from 'react'

type AuthContextType = {
  token: string | null
}

const authContextDefaultValues: AuthContextType = {
  token: null,
}

const AuthContext = createContext<AuthContextType>(authContextDefaultValues)

interface AuthProviderProps {
  token: string | null
  children: React.ReactNode
}

export default function AuthProvider({ token, children }: AuthProviderProps) {
  const value = {
    token,
  }

  useEffect(() => {
    async function updateSession() {
      refreshToken()
        .then(async (data) => {
          if (data.error) {
            await removeSession()
            window.location.href = DEFAULT_LOGOUT_REDIRECT
          }
        })
        .catch(async () => {
          await removeSession()
          window.location.href = DEFAULT_LOGOUT_REDIRECT
        })
    }

    if (token) {
      updateSession()
    }
  }, [token])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuthContext() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuthContext must be used within a AuthProvider')
  }
  return context
}
