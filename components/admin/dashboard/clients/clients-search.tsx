'use client'
import { useSearchParams, usePathname, useRouter } from 'next/navigation'
import { useDebouncedCallback } from 'use-debounce'
import { IoSearch } from 'react-icons/io5'

export default function ClientsSearch({
  placeholder,
  className,
}: {
  placeholder: string
  className?: string
}) {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()

  const handleClientSearch = useDebouncedCallback((searchInput) => {
    console.log(`Searching... ${searchInput}`)

    const params = new URLSearchParams(searchParams)
    if (searchInput) {
      params.set('query', searchInput)
    } else {
      params.delete('query')
    }
    replace(`${pathname}?${params.toString()}`)
  }, 1000)

  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        type="text"
        className={`${className} peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500`}
        onChange={(e) => handleClientSearch(e.target.value)}
        placeholder={placeholder}
        defaultValue={searchParams.get('query')?.toString()}
      />
      <IoSearch className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
    </div>
  )
}
