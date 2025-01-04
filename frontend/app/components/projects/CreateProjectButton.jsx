import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { PlusCircle, Calendar, Users, ArrowUpRight } from 'lucide-react';
import { Button } from "@/app/components/ui/button";

export const CreateProjectButton = ({ onClick }) => {
  return (
    <Button
      onClick={onClick}
      className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700"
    >
      <PlusCircle className="h-5 w-5" />
      Create Project
    </Button>
  );
};


const ProjectCard = ({ project }) => {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-lg font-semibold">{project.name}</CardTitle>
          <p className="text-sm text-gray-500">{project.description}</p>
        </div>
        <Button variant="ghost" size="icon">
          <ArrowUpRight className="h-5 w-5" />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-gray-500" />
            <span className="text-sm text-gray-500">{project.dueDate}</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-gray-500" />
            <span className="text-sm text-gray-500">{project.members} members</span>
          </div>
        </div>
        <div className="mt-4">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full"
              style={{ width: `${project.progress}%` }}
            />
          </div>
          <div className="flex justify-between mt-1">
            <span className="text-xs text-gray-500">Progress</span>
            <span className="text-xs text-gray-500">{project.progress}%</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const ProjectsPage = () => {
  // Example projects data - in real app, fetch from API
  const projects = [
    {
      id: 1,
      name: "Website Redesign",
      description: "Modernizing company website UI/UX",
      dueDate: "Mar 15, 2024",
      members: 5,
      progress: 75
    },
    {
      id: 2,
      name: "Mobile App Development",
      description: "Building iOS and Android applications",
      dueDate: "Apr 30, 2024",
      members: 8,
      progress: 45
    },
    {
      id: 3,
      name: "Marketing Campaign",
      description: "Q2 Digital Marketing Initiative",
      dueDate: "May 1, 2024",
      members: 4,
      progress: 20
    }
  ];

  const handleCreateProject = () => {
    // Implement project creation logic or navigation
    console.log("Create project clicked");
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Projects</h1>
          <p className="text-gray-500">Manage and track your team projects</p>
        </div>
        <CreateProjectButton onClick={handleCreateProject} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
};

export default ProjectsPage;
