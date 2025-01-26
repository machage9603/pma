'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Home,
  BarChart,
  Folder,
  UserPlus,
  Search,
  Bell,
  User,
  LogOut,
  Star,
  Users,
  Plus,
  Menu,
  X,
  List,
  ChevronLeft,
  ChevronRight,
  Settings
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/app/components/ui/avatar";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/app/components/ui/dialog";
import ProfileSidebar from '@/app/(dashboard)/dashboard/profile/ProfileSidebar';

export default function DashboardLayout({ children }) {
  const router = useRouter();
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [user, setUser] = useState({
    name: 'Loading...',
    email: 'loading@example.com',
    avatar: null
  });

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem('user'));
    if (savedUser) {
      setUser({
        name: savedUser.name || 'User',
        email: savedUser.email || 'user@example.com',
        avatar: savedUser.avatar || null
      });
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('authtoken');
    localStorage.removeItem('user');
    router.push('/login');
  };

  const handleUpdateUser = (updatedUser) => {
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Collapsible Sidebar */}
      <div className={`bg-white shadow-md transition-all duration-300 ${isSidebarOpen ? 'w-64' : 'w-16'}`}>
        <div className="p-4 border-b flex items-center justify-between">
          <h1 className={`text-xl font-bold text-blue-600 ${!isSidebarOpen && 'hidden'}`}>Manager</h1>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            {isSidebarOpen ? <ChevronLeft /> : <ChevronRight />}
          </Button>
        </div>

        <nav className="p-2 space-y-1">
          <SidebarLink href="/dashboard" icon={<Home />} label="Home" isOpen={isSidebarOpen} />
          <SidebarLink href="/analytics" icon={<BarChart />} label="Analytics" isOpen={isSidebarOpen} />
          <SidebarLink href="/projects" icon={<Folder />} label="Projects" isOpen={isSidebarOpen} />
          <SidebarLink href="/tasks" icon={<List />} label="Tasks" isOpen={isSidebarOpen} />

          <div className="pt-2 border-t">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="w-full justify-start">
                  <Star className="mr-2 h-4 w-4" />
                  {isSidebarOpen && 'Starred'}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>Project Alpha</DropdownMenuItem>
                <DropdownMenuItem>Project Beta</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="w-full justify-start">
                  <Users className="mr-2 h-4 w-4" />
                  {isSidebarOpen && 'Team'}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>Team A</DropdownMenuItem>
                <DropdownMenuItem>Team B</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button variant="outline" className="w-full justify-start">
              <Plus className="mr-2 h-4 w-4" />
              {isSidebarOpen && 'Create'}
            </Button>

            <Button variant="outline" className="w-full justify-start mt-2">
              <UserPlus className="mr-2 h-4 w-4" />
              {isSidebarOpen && 'Invite Team'}
            </Button>
          </div>
        </nav>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm">
          <div className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                className="md:hidden"
                onClick={() => setIsMobileSidebarOpen(true)}
              >
                <Menu />
              </Button>
              <div className="hidden md:block">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search..."
                    className="pl-10 w-48"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Button variant="ghost" size="sm" className="rounded-full">
                <Bell className="h-5 w-5" />
              </Button>

              <Avatar
                onClick={() => setIsProfileModalOpen(true)}
                className="cursor-pointer h-9 w-9"
              >
                <AvatarImage src={user?.avatar} />
                <AvatarFallback>
                  {user?.name?.charAt(0) || <User className="h-5 w-5" />}
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-auto p-4">
          {children}
        </main>
      </div>

      {/* Mobile Sidebar */}
      <Dialog open={isMobileSidebarOpen} onOpenChange={setIsMobileSidebarOpen}>
        <DialogContent className="h-full w-64 top-0 left-0 translate-x-0 rounded-none">
          <DialogHeader className="flex flex-row items-center justify-between">
            <DialogTitle>Manager</DialogTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileSidebarOpen(false)}
            >
              <X className="h-5 w-5" />
            </Button>
          </DialogHeader>
          <DialogDescription className="sr-only">Navigation menu</DialogDescription>
          <nav className="space-y-1">
            <SidebarLink href="/dashboard" icon={<Home />} label="Home" />
            <SidebarLink href="/analytics" icon={<BarChart />} label="Analytics" />
            <SidebarLink href="/projects" icon={<Folder />} label="Projects" />
            <SidebarLink href="/tasks" icon={<List />} label="Tasks" />
          </nav>
        </DialogContent>
      </Dialog>

      {/* Profile Sidebar */}
      <ProfileSidebar
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        user={user}
        onUpdateUser={handleUpdateUser}
        onLogout={handleLogout}
      />
    </div>
  );
}

function SidebarLink({ href, icon, label, isOpen = true, onClick }) {
  return (
    <Link
      href={href}
      className={`flex items-center p-2 rounded-md hover:bg-gray-100 transition-colors ${
        !isOpen ? 'justify-center' : ''
      }`}
      onClick={onClick}
    >
      {React.cloneElement(icon, { className: `h-5 w-5 ${isOpen ? 'mr-3' : ''}` })}
      {isOpen && <span className="text-sm">{label}</span>}
    </Link>
  );
}