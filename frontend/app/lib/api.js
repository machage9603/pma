import { cookies } from 'next/headers'

async function fetchApi(endpoint, options = {}) {
  const cookieStore = cookies()
  const token = cookieStore.get('token')

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${endpoint}`, {
    ...options,
    headers: {
      ...options.headers,
      'Authorization': `Bearer ${token?.value}`,
      'Content-Type': 'application/json',
    },
  })

  if (!response.ok) {
    throw new Error('API request failed')
  }

  return response.json()
}