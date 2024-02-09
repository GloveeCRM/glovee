'use client'

import { ReactNode } from 'react'

import { useCurrentRole } from '@/hooks/use-current-role'
import { UserRole } from '@prisma/client'

interface RoleGateProps {
  children: ReactNode
  allowedRole: UserRole
}

export function RoleGate({ children, allowedRole }: RoleGateProps) {
  const role = useCurrentRole()

  if (role !== allowedRole) {
    return <p>You do not have permission to view this content</p>
  }

  return <>{children}</>
}
