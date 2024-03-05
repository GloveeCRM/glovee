'use client'

import { activateClientById } from '@/lib/data/clients'

export default function ActiveButton({ CLientId }: { CLientId: string }) {
  async function handleClickReactivate() {
    await activateClientById(CLientId)
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
