'use client'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/app/lib/api';

export const ProjectDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchProjectDetails();
    }
  }, [id]);

  const fetchProjectDetails = async () => {
    try {
      const response = await api.get(`/projects/${id}`);
      setProject(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching project:', error);
      setLoading(false);
    }
  };

  if (loading) return <div>Loading project details...</div>;
  if (!project) return <div>Project not found</div>;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">{project.name}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-xl font-semibold mb-2">Details</h2>
          <p className="text-gray-600 mb-4">{project.description}</p>
          <div className="space-y-2">
            <div>
              <span className="font-semibold">Status:</span> {project.status}
            </div>
            <div>
              <span className="font-semibold">Deadline:</span>{' '}
              {new Date(project.deadline).toLocaleDateString()}
            </div>
            <div>
              <span className="font-semibold">Priority:</span> {project.priority}
            </div>
          </div>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2">Team Members</h2>
          <div className="space-y-2">
            {project.members.map((member) => (
              <div key={member._id} className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                  {member.name.charAt(0)}
                </div>
                <span>{member.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};