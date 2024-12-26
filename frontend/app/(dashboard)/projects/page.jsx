import { Suspense } from 'react'
import { ProjectList } from '@/components/projects/ProjectList'
import { CreateProjectButton } from '@/components/projects/CreateProjectButton'

export default function ProjectsPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Projects</h1>
        <CreateProjectButton />
      </div>
      <Suspense fallback={<div>Loading projects...</div>}>
        <ProjectList />
      </Suspense>
    </div>
  )
}