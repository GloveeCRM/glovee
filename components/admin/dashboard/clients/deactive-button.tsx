'use client'

import { UserStatusTypes } from '@/lib/types/user'
import { updateClientStatus } from '@/lib/actions/user'
import { useOrgContext } from '@/contexts/org-context'

export default function DeactiveButton({ clientID }: { clientID: number }) {
  const { orgName } = useOrgContext()

  async function handleClickDeactivate() {
    updateClientStatus(orgName, clientID, UserStatusTypes.INACTIVE).then((res) => {
      if (res.error) {
        alert(res.error)
      }
    })
  }

  return (
    <button
      onClick={handleClickDeactivate}
      className="rounded-md border-2 border-red-400 px-4 py-2 text-red-400"
    >
      Deactivate
    </button>
  )
}
