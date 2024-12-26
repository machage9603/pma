import { Suspense } from 'react'
import { ProjectsOverview } from '@/components/dashboard/ProjectsOverview'
import { RecentActivity } from '@/components/dashboard/RecentActivity'

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Suspense fallback={<div>Loading projects...</div>}>
          <ProjectsOverview />
        </Suspense>
        <Suspense fallback={<div>Loading activity...</div>}>
          <RecentActivity />
        </Suspense>
      </div>
    </div>
  )
}