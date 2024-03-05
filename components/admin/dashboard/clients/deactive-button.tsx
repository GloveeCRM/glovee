'use client'

import { deactiveClientById } from '@/lib/data/clients'

export default function DeactiveButton({ CLientId }: { CLientId: string }) {
  async function handleClickDeactivate() {
    await deactiveClientById(CLientId)
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
