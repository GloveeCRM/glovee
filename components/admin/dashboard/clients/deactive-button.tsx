'use client'

import { UserStatusEnum } from '@/lib/types/user'
import { updateClientStatus } from '@/lib/actions/user'

export default function DeactiveButton({ CLientId }: { CLientId: string }) {
  async function handleClickDeactivate() {
    updateClientStatus(CLientId, UserStatusEnum.INACTIVE).then((res) => {
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
