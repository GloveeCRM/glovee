'use client'

import { useState } from 'react'
import { IoSearch } from 'react-icons/io5'

import useSearchByParams from '@/hooks/use-search-by-params'

interface SearchByParamsProps {
  placeholder: string
}

export default function SearchByParams({ placeholder = 'Search' }: SearchByParamsProps) {
  const { updateSearchParams, initialValue } = useSearchByParams({ debounceTime: 0 })
  const [isSearching, setIsSearching] = useState<boolean>(false)

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    updateSearchParams(e.target.value)
  }

  return (
    <div
      className={`${isSearching && 'ring-1 ring-zinc-500'} flex items-center gap-[4px] rounded-md border border-zinc-300 px-[6px]`}
    >
      <div>
        <IoSearch className="h-[18px] w-[18px] text-zinc-500 peer-focus:text-zinc-700" />
      </div>
      <input
        onChange={handleChange}
        placeholder={placeholder}
        defaultValue={initialValue}
        onFocus={() => setIsSearching(true)}
        onBlur={() => setIsSearching(false)}
        className="h-[34px] border-none bg-transparent p-0 text-[14px] placeholder:text-[14px] focus-visible:outline-none focus-visible:ring-0"
      />
    </div>
  )
}
