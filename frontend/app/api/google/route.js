// app/api/auth/google/route.js

import { NextResponse } from 'next/server'
import { OAuth2Client } from 'google-auth-library'

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)

export async function POST(request) {
  try {
    const { credential } = await request.json()

    // Verify the Google token
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID
    })

    const payload = ticket.getPayload()

    // Extract user information from payload
    const userData = {
      email: payload.email,
      name: payload.name,
      picture: payload.picture,
      // Add any other fields you need
    }

    // add logic for user authentication
    // 1. Check if user exists in your database
    // 2. If not, create a new user
    // 3. Generate your app's authentication token
    // 4. Return user data and token

    return NextResponse.json(userData)
  } catch (error) {
    console.error('Google authentication error:', error)
    return NextResponse.json(
      { error: 'Authentication failed' },
      { status: 401 }
    )
  }
}