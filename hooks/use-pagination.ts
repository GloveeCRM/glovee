'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'

export default function usePagination() {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()

  const updatePage = (page: number) => {
    const params = new URLSearchParams(searchParams)
    if (page > 0) {
      params.set('page', page.toString())
    } else {
      params.delete('page')
    }
    replace(`${pathname}?${params.toString()}`)
  }

  return {
    updatePage,
    currentPage: Number(searchParams.get('page')) || 1,
  }
}
