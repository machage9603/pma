'use client';

import React, { useState, useEffect } from 'react';
import {
  Home,
  Columns,
  Folder,
  Users,
  Settings,
  LogOut,
  PlusCircle
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  getCurrentUser,
  getUserProjects,
  getUserTeams
} from '@/lib/db/queries';
import { DEFAULT_USER } from './constants';
import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown';

export default function DashboardLayout({ children }) {
  const [user, setUser] = useState(DEFAULT_USER);
  const [projects, setProjects] = useState([]);
  const [teams, setTeams] = useState([]);
  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      try {
        const userData = await getCurrentUser();
        const projectsData = await getUserProjects(userData.id);
        const teamsData = await getUserTeams(userData.id);

        setUser(userData);
        setProjects(projectsData);
        setTeams(teamsData);
      } catch (error) {
        router.push('/login');
      }
    }

    fetchData();
  }, []);

  const handleLogout = () => {
    // Implement logout logic
    router.push('/login');
  };

  if (!user.id) return <div>Loading...</div>;

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md">
        <div className="p-6 border-b flex items-center justify-between">
          <h1 className="text-2xl font-bold text-blue-600">WorkFlow</h1>
          <Button variant="ghost" size="icon">
            <PlusCircle />
          </Button>
        </div>

        <nav className="p-4 space-y-2">
          <SidebarItem
            href="/dashboard"
            icon={<Home />}
            label="Home"
          />
          <SidebarItem
            href="/boards"
            icon={<Columns />}
            label="Boards"
          />
          <SidebarItem
            href="/projects"
            icon={<Folder />}
            label="Projects"
            count={projects.length}
          />
          <SidebarItem
            href="/team"
            icon={<Users />}
            label="Team"
            count={teams.length}
          />

          <div className="pt-4 border-t">
            <SidebarItem
              href="/settings"
              icon={<Settings />}
              label="Settings"
            />
          </div>
        </nav>

        {/* User Profile Footer */}
        <div className="p-4 border-t flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Avatar src={user.avatar} fallback={user.name[0]} />
            <div>
              <div className="font-medium">{user.name}</div>
              <div className="text-xs text-gray-500">{user.role}</div>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleLogout}
          >
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {children}
      </div>
    </div>
  );
}

function SidebarItem({ href, icon, label, count }) {
  return (
    <Link
      href={href}
      className="flex items-center justify-between p-2 hover:bg-blue-50 rounded-md"
    >
      <div className="flex items-center space-x-2">
        {React.cloneElement(icon, {
          className: "h-5 w-5 text-gray-500"
        })}
        <span>{label}</span>
      </div>
      {count !== undefined && (
        <span className="text-xs bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full">
          {count}
        </span>
      )}
    </Link>
  );
}