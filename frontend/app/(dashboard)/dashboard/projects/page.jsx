'use client';

import { Suspense, useEffect, useState } from 'react';
import { CreateProjectButton } from '@/app/components/projects/CreateProjectButton';
import { ProjectList } from '@/app/components/projects/ProjectList';

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/projects`, {
          headers: {
            'Authorization': `Bearer ${token}`
          },
          cache: 'no-store'
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch projects: ${response.statusText}`);
        }

        const data = await response.json();
        setProjects(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (error) {
    return <div className="text-red-500 p-4">Error: {error}</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Projects</h1>
        <CreateProjectButton />
      </div>
      <Suspense fallback={<div>Loading projects...</div>}>
        {loading ? (
          <div>Loading projects...</div>
        ) : (
          <ProjectList projects={projects} />
        )}
      </Suspense>
    </div>
  );
}