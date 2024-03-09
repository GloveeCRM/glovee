'use client'

import { deactivateClientById } from '@/lib/data/user'

export default function DeactiveButton({ CLientId }: { CLientId: string }) {
  async function handleClickDeactivate() {
    await deactivateClientById(CLientId)
  }
  return (
    <button
      onClick={handleClickDeactivate}
      className="rounded-md border-2 border-red-400 px-4 py-2 text-red-400"
    >
      Dectivate
    </button>
  )
}
