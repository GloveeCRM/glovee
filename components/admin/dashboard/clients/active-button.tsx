'use client'

import { updateClientStatus } from '@/lib/actions/user'
import { UserStatusTypes } from '@/lib/types/user'

export default function ActiveButton({ clientID }: { clientID: number }) {
  async function handleClickReactivate() {
    updateClientStatus(clientID, UserStatusTypes.ACTIVE).then((res) => {
      if (res.error) {
        alert(res.error)
      }
    })
  }
  return (
    <button
      onClick={handleClickReactivate}
      className="rounded-md border-2 border-green-400 px-4 py-2 text-green-400"
    >
      Reactivate
    </button>
  )
}
