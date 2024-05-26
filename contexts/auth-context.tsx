'use client'

import { createContext, useContext, useEffect } from 'react'

import { DEFAULT_LOGOUT_REDIRECT } from '@/lib/constants/routes'
import { removeSession } from '@/lib/auth/session'
import { refreshToken } from '@/lib/actions/auth'

type AuthContextType = {
  token: string | null
}

const authContextDefaultValues: AuthContextType = {
  token: null,
}

const AuthContext = createContext<AuthContextType>(authContextDefaultValues)

interface AuthProviderProps {
  orgName: string
  token: string | null
  children: React.ReactNode
}

export default function AuthProvider({ orgName, token, children }: AuthProviderProps) {
  const value = {
    token,
  }

  useEffect(() => {
    async function updateSession() {
      refreshToken(orgName)
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
