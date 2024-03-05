'use server'

import { prisma } from '@/prisma/prisma'
import { UserRole } from '@prisma/client'
import { UserStatus } from '@prisma/client'
import { revalidatePath } from 'next/cache'

export async function fetchClientsByOrgName(orgName: string) {
  try {
    const clients = await prisma.user.findMany({
      where: {
        role: UserRole.ORG_CLIENT,
        organization: {
          orgName: orgName,
        },
      },
    })

    return clients
  } catch {
    return []
  }
}

export async function deactivateClientById(id: string) {
  try {
    console.log('deactivating client')
    await prisma.user.update({
      where: { id: id },
      data: {
        status: UserStatus.INACTIVE,
      },
    })
    console.log('revalidating path')

    revalidatePath('/admin/clients')
    return { success: 'Client deactived!' }
  } catch (error) {
    console.log('error deactivating client', error)
    return { error: 'Client not found!' }
  }
}
