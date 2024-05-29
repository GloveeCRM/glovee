'use client'

import { IoSearch } from 'react-icons/io5'

import useSearchByParams from '@/hooks/use-search-by-params'
import { Input } from '@/components/ui/input'
import { useEffect, useState } from 'react'

interface SearchByParamsProps {
  placeholder: string
}

export default function SearchByParams({ placeholder = 'Search' }: SearchByParamsProps) {
  const { updateSearchParams, initialValue } = useSearchByParams()
  const [isSearching, setIsSearching] = useState<boolean>(false)

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    updateSearchParams(e.target.value)
  }

  return (
    <div
      className={`${isSearching && 'ring-1 ring-n-500'} border-n-2300 flex items-center gap-[4px] rounded border px-[6px]`}
    >
      <div>
        <IoSearch className="h-[18px] w-[18px] text-n-500 peer-focus:text-n-700" />
      </div>
      <Input
        onChange={handleChange}
        placeholder={placeholder}
        defaultValue={initialValue}
        onFocus={() => setIsSearching(true)}
        onBlur={() => setIsSearching(false)}
        className="border-none p-0 text-[16px] placeholder:text-[14px] focus-visible:ring-0"
      />
    </div>
  )
}
