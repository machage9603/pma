'use client';

import React, { useState } from 'react';
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@/app/components/ui/avatar";
import { LogOut, User, Mail, Edit, Trash } from 'lucide-react';
import useUserProfile from '@/app/lib/useUserProfile';

export default function ProfileSidebar({ isOpen, onClose, onLogout }) {
  const { user, error } = useUserProfile();
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [avatar, setAvatar] = useState(user?.avatar || null);

  if (error) return <div className="text-red-500">{error}</div>;
  if (!user) return <div>Loading...</div>;

  const handleSave = () => {
    // Update user data
    setEditing(false);
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveAvatar = () => {
    setAvatar(null);
  };

  return (
    <div className={`fixed inset-y-0 right-0 w-96 bg-white shadow-lg transform transition-transform ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Profile</h2>
          <Button variant="ghost" onClick={onClose}>
            <LogOut className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex flex-col items-center space-y-4">
          <Avatar className="h-24 w-24">
            {avatar ? (
              <AvatarImage src={avatar} alt="Profile" />
            ) : (
              <AvatarFallback>
                <User className="h-12 w-12" />
              </AvatarFallback>
            )}
          </Avatar>
          <div className="flex space-x-2">
            <input
              type="file"
              id="avatar-upload"
              className="hidden"
              onChange={handleAvatarChange}
            />
            <label htmlFor="avatar-upload" className="cursor-pointer">
              <Button variant="outline">
                <Edit className="h-4 w-4 mr-2" />
                Change Avatar
              </Button>
            </label>
            {avatar && (
              <Button variant="outline" onClick={handleRemoveAvatar}>
                <Trash className="h-4 w-4 mr-2" />
                Remove
              </Button>
            )}
          </div>
        </div>

        <div className="mt-6 space-y-4">
          <div>
            <label className="text-sm font-medium">Name</label>
            {editing ? (
              <Input value={name} onChange={(e) => setName(e.target.value)} />
            ) : (
              <div className="flex items-center space-x-2">
                <User className="h-4 w-4 text-gray-500" />
                <p>{name}</p>
              </div>
            )}
          </div>
          <div>
            <label className="text-sm font-medium">Email</label>
            {editing ? (
              <Input value={email} onChange={(e) => setEmail(e.target.value)} />
            ) : (
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-gray-500" />
                <p>{email}</p>
              </div>
            )}
          </div>
        </div>

        <div className="mt-6 flex justify-end space-x-2">
          {editing ? (
            <>
              <Button variant="outline" onClick={() => setEditing(false)}>
                Cancel
              </Button>
              <Button onClick={handleSave}>Save</Button>
            </>
          ) : (
            <Button onClick={() => setEditing(true)}>
              <Edit className="h-4 w-4 mr-2" />
              Edit Profile
            </Button>
          )}
        </div>

        <div className="mt-6">
          <Button variant="destructive" onClick={onLogout} className="w-full">
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
}