// useUserProfile.js
import { useState, useEffect } from 'react';
import { getUserProfile } from '@/app/lib/user';

export default function useUserProfile() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getUserProfile();
        setUser(data);
      } catch (err) {
        setError('Failed to load profile');
      }
    };
    fetchProfile();
  }, []);

  return { user, error };
}