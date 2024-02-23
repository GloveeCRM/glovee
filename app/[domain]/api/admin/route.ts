import { NextResponse } from 'next/server'

import { currentRole } from '@/lib/utils/user'
import { UserRole } from '@prisma/client'

export async function GET() {
  const role = await currentRole()

  if (role === UserRole.ORG_ADMIN) {
    return new NextResponse(null, { status: 200 })
  }
  return new NextResponse(null, { status: 403 })
}
