import { useSession } from 'next-auth/react'

export function useAuthenticatedUserRole() {
  const session = useSession()
  return session.data?.user?.role
}
