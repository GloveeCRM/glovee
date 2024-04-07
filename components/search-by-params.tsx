'use client'

import { IoSearch } from 'react-icons/io5'

import useSearchByParams from '@/hooks/use-search-by-params'

interface SearchByParamsProps {
  placeholder?: string
}

export default function SearchByParams({ placeholder }: SearchByParamsProps) {
  const { updateSearchParams, initialValue } = useSearchByParams()

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    updateSearchParams(e.target.value)
  }

  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <input
        type="text"
        className="block h-[40px] w-full rounded border border-n-400 py-[9px] pl-[35px] text-[14px] placeholder:text-gray-500 focus:border-n-500 focus:outline-none"
        onChange={handleChange}
        placeholder={placeholder}
        defaultValue={initialValue}
      />
      <IoSearch className="absolute left-[10px] top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
    </div>
  )
}
