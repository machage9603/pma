'use client';

import UserProfile from '@/app/components/profile/UserProfile';
import { Suspense } from 'react';

export default function ProfilePage() {
  return (
    <main className="min-h-screen py-8">
      <Suspense fallback={<div>Loading...</div>}>
        <UserProfile />
      </Suspense>
    </main>
  );
}
