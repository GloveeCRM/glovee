'use client'

import { useEffect } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useDebouncedCallback } from 'use-debounce'

export default function useSearchByParams(initialQuery = '') {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()

  const updateSearchParams = useDebouncedCallback((searchInput) => {
    const params = new URLSearchParams(searchParams)
    if (searchInput) {
      params.set('query', searchInput)
    } else {
      params.delete('query')
    }
    replace(`${pathname}?${params.toString()}`)
  }, 1000)

  useEffect(() => {
    updateSearchParams(initialQuery)
  }, [updateSearchParams, initialQuery])

  return {
    updateSearchParams,
    initialValue: searchParams.get('query')?.toString() || '',
  }
}
