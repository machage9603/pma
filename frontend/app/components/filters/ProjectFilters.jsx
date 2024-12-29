'use client'

import { useRouter, useSearchParams } from 'next/navigation'

export function ProjectFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const handleFilterChange = (key, value) => {
    const params = new URLSearchParams(searchParams)
    if (value) {
      params.set(key, value)
    } else {
      params.delete(key)
    }
    router.push(`?${params.toString()}`)
  }

  return (
    <div className="flex gap-4">
      <select
        className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        value={searchParams.get('status') || ''}
        onChange={(e) => handleFilterChange('status', e.target.value)}
      >
        <option value="">All Status</option>
        <option value="planning">Planning</option>
        <option value="in_progress">In Progress</option>
        <option value="completed">Completed</option>
      </select>

      <select
        className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        value={searchParams.get('priority') || ''}
        onChange={(e) => handleFilterChange('priority', e.target.value)}
      >
        <option value="">All Priorities</option>
        <option value="high">High</option>
        <option value="medium">Medium</option>
        <option value="low">Low</option>
      </select>
    </div>
  )
}