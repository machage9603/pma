'use client';

import React from 'react';
import { Button } from "@/app/components/ui/button";

const projectData = [
  { name: 'Jan', completed: 4, ongoing: 3 },
  { name: 'Feb', completed: 6, ongoing: 4 },
  { name: 'Mar', completed: 8, ongoing: 5 },
  { name: 'Apr', completed: 5, ongoing: 6 }
];

export default function DashboardPage() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div className="flex items-center space-x-4">
          <Button variant="outline">This Week</Button>
          <Button>Export</Button>
        </div>
      </div>

      {/* Rest of your dashboard code */}
    </div>
  );
}