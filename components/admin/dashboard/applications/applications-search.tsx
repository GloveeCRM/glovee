'use client'

import { useSearchParams, usePathname, useRouter } from 'next/navigation'
import { useDebouncedCallback } from 'use-debounce'
import { IoSearch } from 'react-icons/io5'
import { useEffect } from 'react'

export default function ApplicationsSearch({
  placeholder,
  className,
}: {
  placeholder: string
  className?: string
}) {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()

  const handleApplicationSearch = useDebouncedCallback((searchInput) => {
    const params = new URLSearchParams(searchParams)
    if (searchInput) {
      params.set('query', searchInput)
    } else {
      params.delete('query')
    }
    replace(`${pathname}?${params.toString()}`)
  }, 1000)

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    handleApplicationSearch(e.target.value)
  }

  useEffect(() => {
    handleApplicationSearch('')
  }, [handleApplicationSearch])

  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        type="text"
        className={`${className} block h-[40px] w-[300px] rounded border border-n-400 py-[9px] pl-[35px] text-[14px] placeholder:text-gray-500 focus:border-n-500 focus:outline-none`}
        onChange={handleChange}
        placeholder={placeholder}
        defaultValue={searchParams.get('query')?.toString()}
      />
      <IoSearch className="absolute left-[10px] top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
    </div>
  )
}