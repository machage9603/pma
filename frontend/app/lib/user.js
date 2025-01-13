// lib/user.js
export const getUserProfile = async () => {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('No auth token found');
        }

        const response = await fetch('http://localhost:5000/api/auth/profile', {
            credentials: 'include',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) throw new Error('failed to fetch profile');
        return response.json();
    } catch (error) {
        console.error('Error fetching profile:', error);
        throw error;
    }
};