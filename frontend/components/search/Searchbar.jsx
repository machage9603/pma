'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import debounce from 'lodash/debounce'

export function SearchBar() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [search, setSearch] = useState(searchParams.get('q') || '')

  const debouncedSearch = debounce((value) => {
    const params = new URLSearchParams(searchParams)
    if (value) {
      params.set('q', value)
    } else {
      params.delete('q')
    }
    router.push(`?${params.toString()}`)
  }, 300)

  useEffect(() => {
    return () => {
      debouncedSearch.cancel()
    }
  }, [debouncedSearch])

  return (
    <div className="max-w-lg w-full">
      <input
        type="search"
        placeholder="Search projects..."
        className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value)
          debouncedSearch(e.target.value)
        }}
      />
    </div>
  )
}