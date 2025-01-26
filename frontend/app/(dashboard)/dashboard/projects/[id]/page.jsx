import { Suspense } from 'react'
import { ProjectDetail } from '@/app/components/projects/ProjectDetail'
import { TaskBoard } from '@/app/components/tasks/TaskBoard'

export default function ProjectPage({ params }) {
  return (
    <div className="space-y-8">
      <Suspense fallback={<div>Loading project details...</div>}>
        <ProjectDetail id={params.id} />
      </Suspense>
      <Suspense fallback={<div>Loading tasks...</div>}>
        <TaskBoard projectId={params.id} />
      </Suspense>
    </div>
  )
}