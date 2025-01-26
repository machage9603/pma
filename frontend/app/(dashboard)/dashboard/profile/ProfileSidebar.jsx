'use client';

import React, { useState } from 'react';
import { User, LogOut, Settings, Upload } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/app/components/ui/avatar";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from "@/app/components/ui/dialog";

export default function ProfileSidebar({ isOpen, onClose, user, onUpdateUser, onLogout }) {
  const [avatarFile, setAvatarFile] = useState(null);
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);

  const handleAvatarUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarFile(reader.result);
        onUpdateUser({ ...user, avatar: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveChanges = () => {
    onUpdateUser({ ...user, name, email, avatar: avatarFile || user.avatar });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-96">
        <DialogHeader>
          <DialogTitle>Profile</DialogTitle>
        </DialogHeader>

        <DialogDescription className="sr-only">
          Manage your profile settings including avatar, name, and email
        </DialogDescription>

        <div className="mt-6 space-y-6">
          {/* Avatar Section */}
          <div className="flex flex-col items-center">
            <Avatar className="h-24 w-24 mb-4">
              <AvatarImage src={avatarFile || user.avatar} />
              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <label htmlFor="avatar-upload" className="cursor-pointer">
              <Button variant="outline" className="w-full">
                <Upload className="mr-2 h-4 w-4" /> Change Avatar
              </Button>
              <Input
                id="avatar-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleAvatarUpload}
              />
            </label>
          </div>

          {/* Name and Email Section */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <Input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1"
              />
            </div>
          </div>

          {/* Settings Section */}
          <div className="space-y-2">
            <Button variant="outline" className="w-full">
              <Settings className="mr-2 h-4 w-4" /> Settings
            </Button>
          </div>

          {/* Save and Logout Buttons */}
          <div className="space-y-2">
            <Button className="w-full" onClick={handleSaveChanges}>
              Save Changes
            </Button>
            <Button variant="destructive" className="w-full" onClick={onLogout}>
              <LogOut className="mr-2 h-4 w-4" /> Logout
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}