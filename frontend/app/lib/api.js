'use client'

const api = {
  post: async (endpoint, data) => {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('API request failed');
    }

    return {
      data: await response.json(),
    };
  },
};

export default api;