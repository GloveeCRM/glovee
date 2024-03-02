import { NextResponse } from 'next/server'

import { UserRole } from '@prisma/client'
import { getAuthenticatedUserRole } from '@/auth'

export async function GET() {
  const role = await getAuthenticatedUserRole()

  if (role === UserRole.ORG_ADMIN) {
    return new NextResponse(null, { status: 200 })
  }
  return new NextResponse(null, { status: 403 })
}
