// app/components/analytics/AnalyticsDashboard.jsx
'use client'

import { useState, useEffect } from 'react'
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer
} from 'recharts'

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']

function MetricCard({ title, value, trend, icon }) {
  const trendColor = trend >= 0 ? 'text-green-500' : 'text-red-500'

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm text-gray-600">{title}</p>
          <h3 className="text-2xl font-bold mt-2">{value}</h3>
        </div>
        {icon}
      </div>
      <div className={`flex items-center mt-4 ${trendColor}`}>
        {trend >= 0 ? '↑' : '↓'} {Math.abs(trend)}%
        <span className="text-gray-600 text-sm ml-2">vs last month</span>
      </div>
    </div>
  )
}

export function AnalyticsDashboard() {
  const [data, setData] = useState(null)
  const [timeframe, setTimeframe] = useState('month')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchAnalytics()
  }, [timeframe])

  async function fetchAnalytics() {
    try {
      const response = await fetch(`/api/analytics?timeframe=${timeframe}`)
      const data = await response.json()
      setData(data)
    } catch (error) {
      console.error('Error fetching analytics:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <div>Loading analytics...</div>
  if (!data) return <div>No data available</div>

  return (
    <div className="space-y-6">
      {/* Timeframe Selector */}
      <div className="flex justify-end">
        <select
          value={timeframe}
          onChange={(e) => setTimeframe(e.target.value)}
          className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        >
          <option value="week">Last Week</option>
          <option value="month">Last Month</option>
          <option value="quarter">Last Quarter</option>
          <option value="year">Last Year</option>
        </select>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Total Projects"
          value={data.totalProjects}
          trend={data.projectTrend}
        />
        <MetricCard
          title="Active Tasks"
          value={data.activeTasks}
          trend={data.taskTrend}
        />
        <MetricCard
          title="Team Members"
          value={data.teamMembers}
          trend={data.memberTrend}
        />
        <MetricCard
          title="Completion Rate"
          value={`${data.completionRate}%`}
          trend={data.completionTrend}
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Project Status Distribution */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Project Status Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={data.statusDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {data.statusDistribution.map((entry, index) => (
                  <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Task Completion Trend */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Task Completion Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data.completionTrend}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="completed"
                stroke="#8884d8"
                name="Completed Tasks"
              />
              <Line
                type="monotone"
                dataKey="total"
                stroke="#82ca9d"
                name="Total Tasks"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Project Progress */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Project Progress</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data.projectProgress}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="completed" stackId="a" fill="#8884d8" name="Completed" />
              <Bar dataKey="remaining" stackId="a" fill="#82ca9d" name="Remaining" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Team Performance */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Team Performance</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data.teamPerformance}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="tasksCompleted" fill="#8884d8" name="Tasks Completed" />
              <Bar dataKey="projectsManaged" fill="#82ca9d" name="Projects Managed" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Detailed Metrics Table */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Detailed Metrics</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Metric
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Current
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Previous
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Change
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {data.detailedMetrics.map((metric) => (
                <tr key={metric.name}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {metric.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {metric.current}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {metric.previous}
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm ${
                    metric.change >= 0 ? 'text-green-500' : 'text-red-500'
                  }`}>
                    {metric.change >= 0 ? '+' : ''}{metric.change}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}