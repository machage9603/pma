'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function TaskForm({ projectId, task, onSuccess }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: task?.title || '',
    description: task?.description || '',
    deadline: task?.deadline?.split('T')[0] || '',
    status: task?.status || 'todo',
    assignee: task?.assignee || ''
  })

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)

    try {
      const url = task?._id
        ? `/api/tasks/${task._id}`
        : `/api/projects/${projectId}/tasks`

      const response = await fetch(url, {
        method: task?._id ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      if (!response.ok) throw new Error('Failed to save task')

      router.refresh()
      if (onSuccess) onSuccess()
    } catch (error) {
      console.error('Error saving task:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Task Title
        </label>
        <input
          type="text"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          value={formData.title}
          onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
        />
      </div>

      {/* Similar fields as ProjectForm, adapted for tasks */}
    </form>
  )
}