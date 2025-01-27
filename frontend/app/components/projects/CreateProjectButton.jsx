'use client';

import { useRouter } from 'next/navigation';
import { PlusCircle } from 'lucide-react';
import { Button } from "@/app/components/ui/button";

export const CreateProjectButton = () => {
  const router = useRouter();

  const handleCreateProject = () => {
    router.push('/projects/create');
  };

  return (
    <Button
      onClick={handleCreateProject}
      className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700"
    >
      <PlusCircle className="h-5 w-5" />
      Create Project
    </Button>
  );
};