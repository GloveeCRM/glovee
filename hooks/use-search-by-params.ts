'use client'

import { useEffect } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useDebouncedCallback } from 'use-debounce'

interface UseSearchByParamsProps {
  initialQuery?: string
  debounceTime?: number
}

export default function useSearchByParams({
  initialQuery = '',
  debounceTime = 500,
}: UseSearchByParamsProps = {}) {
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
  }, debounceTime)

  useEffect(() => {
    updateSearchParams(initialQuery)
  }, [updateSearchParams, initialQuery])

  return {
    updateSearchParams,
    initialValue: searchParams.get('query')?.toString() || '',
  }
}
