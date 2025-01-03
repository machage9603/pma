'use client'

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

const api = {
  post: async (endpoint, data) => {
    try {
      console.log('Making request to:', `${BASE_URL}${endpoint}`);
      const response = await fetch(`${BASE_URL}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      return { data: result };
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }
};

export default api;