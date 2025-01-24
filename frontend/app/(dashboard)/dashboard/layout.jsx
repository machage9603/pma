'use client';

import React, { useState } from 'react';
import Link from 'next/link';
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
  X
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/app/components/ui/avatar";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/app/components/ui/dialog";

export default function DashboardLayout({ children }) {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md hidden md:block">
        <div className="p-6 border-b">
          <h1 className="text-2xl font-bold text-blue-600">ProManager</h1>
        </div>
        <nav className="p-4 space-y-2">
          <SidebarLink href="/dashboard" icon={<Home />} label="Home" />
          <SidebarLink href="/reports" icon={<BarChart />} label="Reports" />
          <SidebarLink href="/projects" icon={<Folder />} label="Projects" />
          <div className="pt-4 border-t">
            <Button className="w-full" variant="outline">
              <UserPlus className="mr-2 h-4 w-4" /> Invite Team
            </Button>
          </div>
        </nav>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Navbar */}
        <header className="bg-white shadow-sm">
          <div className="flex items-center justify-between p-4">
            {/* Left Side - Mobile Menu & Dropdowns */}
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                className="md:hidden"
                onClick={() => setIsMobileSidebarOpen(true)}
              >
                <Menu />
              </Button>

              {/* Dropdowns */}
              <div className="hidden md:flex space-x-4">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost">
                      <Star className="mr-2 h-4 w-4" /> Starred
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>Project Alpha</DropdownMenuItem>
                    <DropdownMenuItem>Project Beta</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost">
                      <Users className="mr-2 h-4 w-4" /> Team
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>Team A</DropdownMenuItem>
                    <DropdownMenuItem>Team B</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                <Button variant="outline">
                  <Plus className="mr-2 h-4 w-4" /> Create
                </Button>
              </div>
            </div>

            {/* Right Side - Search, Notifications, Avatar */}
            <div className="flex items-center space-x-4">
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                <Input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 w-64"
                />
              </div>

              <Button variant="ghost" size="icon">
                <Bell className="h-5 w-5" />
              </Button>

              <Avatar onClick={() => setIsProfileModalOpen(true)} className="cursor-pointer">
                <AvatarImage src="/placeholder-avatar.jpg" />
                <AvatarFallback>SJ</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto">
          {children}
        </main>
      </div>

      {/* Mobile Sidebar Modal */}
      <Dialog open={isMobileSidebarOpen} onOpenChange={setIsMobileSidebarOpen}>
        <DialogContent className="h-full w-64 top-0 left-0 right-auto translate-x-0 rounded-none">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              ProManager
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMobileSidebarOpen(false)}
              >
                <X className="h-5 w-5" />
              </Button>
            </DialogTitle>
          </DialogHeader>
          <nav className="mt-6 space-y-2">
            <SidebarLink
              href="/dashboard"
              icon={<Home />}
              label="Home"
              onClick={() => setIsMobileSidebarOpen(false)}
            />
            <SidebarLink
              href="/reports"
              icon={<BarChart />}
              label="Reports"
              onClick={() => setIsMobileSidebarOpen(false)}
            />
            <SidebarLink
              href="/projects"
              icon={<Folder />}
              label="Projects"
              onClick={() => setIsMobileSidebarOpen(false)}
            />
            <Button className="w-full mt-4" variant="outline">
              <UserPlus className="mr-2 h-4 w-4" /> Invite Team
            </Button>
          </nav>
        </DialogContent>
      </Dialog>

      {/* Profile Modal */}
      <Dialog open={isProfileModalOpen} onOpenChange={setIsProfileModalOpen}>
        <DialogContent className="w-80">
          <DialogHeader>
            <DialogTitle>Profile</DialogTitle>
          </DialogHeader>
          <div className="mt-6 text-center">
            <Avatar className="h-24 w-24 mx-auto mb-4">
              <AvatarImage src="/placeholder-avatar.jpg" />
              <AvatarFallback>SJ</AvatarFallback>
            </Avatar>
            <h2 className="text-xl font-bold">Sarah Johnson</h2>
            <p className="text-gray-500">Project Manager</p>

            <div className="mt-6 space-y-2">
              <Button variant="outline" className="w-full">
                <User className="mr-2 h-4 w-4" /> My Profile
              </Button>
              <Button variant="destructive" className="w-full">
                <LogOut className="mr-2 h-4 w-4" /> Logout
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// Sidebar Link Component
function SidebarLink({ href, icon, label, onClick }) {
  return (
    <Link
      href={href}
      className="flex items-center p-2 hover:bg-blue-50 rounded-md transition-colors"
      onClick={onClick}
    >
      {React.cloneElement(icon, { className: "mr-3 h-5 w-5 text-gray-500" })}
      <span className="text-gray-700">{label}</span>
    </Link>
  );
}