import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Calendar, Users, ArrowUpRight } from 'lucide-react';
import { Button } from "@/app/components/ui/button";
import { Badge } from '@/app/components/ui/badge';

export const ProjectCard = ({ project }) => {
  const statusColors = {
    planning: 'bg-gray-100 text-gray-800',
    'in-progress': 'bg-blue-100 text-blue-800',
    completed: 'bg-green-100 text-green-800',
    'on-hold': 'bg-yellow-100 text-yellow-800'
  };

  const priorityColors = {
    low: 'bg-green-100 text-green-800',
    medium: 'bg-yellow-100 text-yellow-800',
    high: 'bg-red-100 text-red-800'
  };

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-lg font-semibold">{project.title}</CardTitle>
          <div className="flex gap-2 mt-2">
            <Badge className={statusColors[project.status]}>{project.status}</Badge>
            <Badge className={priorityColors[project.priority]}>{project.priority}</Badge>
          </div>
        </div>
        <Button variant="ghost" size="icon">
          <ArrowUpRight className="h-5 w-5" />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-gray-500" />
            <span className="text-sm text-gray-500">
              {new Date(project.endDate).toLocaleDateString()}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-gray-500" />
            <span className="text-sm text-gray-500">
              {project.members.length} members
            </span>
          </div>
        </div>
        <div className="mt-4">
          <p className="text-sm text-gray-600 line-clamp-3">
            {project.description}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};