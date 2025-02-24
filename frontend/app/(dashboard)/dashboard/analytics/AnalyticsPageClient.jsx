'use client'

import AnalyticsDashboard from '@/app/components/analytics/AnalyticsDashboard'

export default function AnalyticsPageClient() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Analytics Dashboard</h1>
      <AnalyticsDashboard />
    </div>
  )
}