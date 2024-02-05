'use client'

import { RoleGate } from '@/components/auth/role-gate'
import { admin } from '@/lib/actions/auth'
import { UserRole } from '@prisma/client'

export default function AdminPage() {
  const onServerActionClick = () => {
    admin().then((data) => {
      if (data.error) {
        alert(data.error)
      }

      if (data.success) {
        alert(data.success)
      }
    })
  }

  const onApiRouteClick = () => {
    fetch('/api/admin').then((response) => {
      if (response.ok) {
        alert('Allowed API Route!')
      } else {
        alert('Forbidden API Route!')
      }
    })
  }

  return (
    <div>
      <p>Admin</p>
      <div>
        <RoleGate allowedRole={UserRole.ADMIN}>
          <p>You are allowed to see this content!</p>
        </RoleGate>
      </div>
      <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-md">
        <p className="text-sm font-medium">Admin-only API Route</p>
        <button onClick={onApiRouteClick}>Click to test</button>
      </div>
      <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-md">
        <p className="text-sm font-medium">Admin-only Server Action</p>
        <button onClick={onServerActionClick}>Click to test</button>
      </div>
    </div>
  )
}
