'use client'

import { createContext, useContext, useEffect } from 'react'
import { updateSession } from '@/lib/auth/session'

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
    async function refreshToken() {
      await updateSession()
    }

    if (token) {
      refreshToken()
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
