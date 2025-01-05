'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { BarChart, Activity, Users, CheckCircle, Calendar, Clock, Mail } from 'lucide-react';
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const projectData = [
  { name: 'Jan', completed: 4, ongoing: 3 },
  { name: 'Feb', completed: 6, ongoing: 4 },
  { name: 'Mar', completed: 8, ongoing: 5 },
  { name: 'Apr', completed: 5, ongoing: 6 }
];

export default function DashboardPage() {
  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Profile</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center space-y-4">
              <div className="h-24 w-24 rounded-full bg-blue-100 flex items-center justify-center">
                <Users className="h-12 w-12 text-blue-600" />
              </div>
              <div className="text-center">
                <h2 className="text-xl font-bold">Sarah Johnson</h2>
                <p className="text-gray-500">Project Manager</p>
              </div>
              <div className="w-full space-y-2">
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4 text-gray-500" />
                  <span className="text-sm">sarah@example.com</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-gray-500" />
                  <span className="text-sm">Joined Jan 2024</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <span className="text-sm">12 Active Projects</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Grid */}
        <div className="lg:col-span-2 grid grid-cols-2 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">My Projects</CardTitle>
              <BarChart className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">28</div>
              <p className="text-xs text-gray-500">+2 from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Active Tasks</CardTitle>
              <Activity className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">145</div>
              <p className="text-xs text-gray-500">+12 new tasks</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Team Members</CardTitle>
              <Users className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-gray-500">+3 this week</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
              <CheckCircle className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">89%</div>
              <p className="text-xs text-gray-500">+4% from last month</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Charts and Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Project Timeline</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsBarChart data={projectData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="completed" fill="#4F46E5" name="Completed" />
                  <Bar dataKey="ongoing" fill="#818CF8" name="Ongoing" />
                </RechartsBarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {icon: <CheckCircle />, text: "Completed Task: Update Homepage UI", time: "2 hours ago"},
                {icon: <Users />, text: "New team member joined Project X", time: "4 hours ago"},
                {icon: <Activity />, text: "Updated milestone: Backend API", time: "Yesterday"},
                {icon: <Calendar />, text: "New project deadline set", time: "2 days ago"}
              ].map((item, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
                    {React.cloneElement(item.icon, { className: "h-5 w-5 text-gray-500" })}
                  </div>
                  <div>
                    <p className="text-sm font-medium">{item.text}</p>
                    <p className="text-xs text-gray-500">{item.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}