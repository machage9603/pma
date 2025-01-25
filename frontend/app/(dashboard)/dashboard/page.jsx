'use client';

import React, { useState } from 'react';
import { Button } from "@/app/components/ui/button";
import ProfileSidebar from '@/app/(dashboard)/dashboard/profile/ProfileSidebar';
import { Avatar, AvatarFallback, AvatarImage } from "@/app/components/ui/avatar";
import { User } from 'lucide-react';
import { useRouter } from 'next/navigation';

const projectData = [
  { name: 'Jan', completed: 4, ongoing: 3 },
  { name: 'Feb', completed: 6, ongoing: 4 },
  { name: 'Mar', completed: 8, ongoing: 5 },
  { name: 'Apr', completed: 5, ongoing: 6 }
];

export default function DashboardPage() {
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [user, setUser] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    avatar: null
  });

  const handleUpdateUser = (updatedUser) => {
    setUser(updatedUser);
  };

  const handleLogout = () => {
    localStorage.removeItem('authtoken');
    localStorage.removeItem('user');
    router.push('/login');
    console.log('User logged out');
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div className="flex items-center space-x-4">
          <Button variant="outline">This Week</Button>
          <Button>Export</Button>
          <Avatar className="cursor-pointer" onClick={() => setIsSidebarOpen(true)}>
            {user.avatar ? (
              <AvatarImage src={user.avatar} alt="Profile" />
            ) : (
              <AvatarFallback>
                <User className="h-6 w-6" />
              </AvatarFallback>
            )}
          </Avatar>
        </div>
      </div>

      {/* Rest of your dashboard code */}

      <ProfileSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        user={user}
        onUpdateUser={handleUpdateUser}
        onLogout={handleLogout}
      />
    </div>
  );
}