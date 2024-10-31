'use client'

import { createContext, useContext, useEffect } from 'react'

import { DEFAULT_LOGOUT_REDIRECT } from '@/lib/constants/routes'
import { removeRefreshToken, removeSession } from '@/lib/auth/session'
import { refreshTokens } from '@/lib/actions/auth'

type AuthContextType = {
  accessToken: string | null
  sessionUserID: number | null
}

const authContextDefaultValues: AuthContextType = {
  accessToken: null,
  sessionUserID: null,
}

const AuthContext = createContext<AuthContextType>(authContextDefaultValues)

interface AuthProviderProps {
  accessToken: string | null
  sessionUserID: number | null
  children: React.ReactNode
}

export default function AuthProvider({ accessToken, sessionUserID, children }: AuthProviderProps) {
  const value = {
    accessToken,
    sessionUserID,
  }

  useEffect(() => {
    async function updateSession() {
      const { error } = await refreshTokens()
      if (error) {
        await removeSession()
        await removeRefreshToken()
        window.location.href = DEFAULT_LOGOUT_REDIRECT
      }
    }

    if (accessToken) {
      updateSession()
    }
  }, [accessToken])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuthContext() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuthContext must be used within a AuthProvider')
  }
  return context
}
