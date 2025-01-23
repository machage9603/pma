
import { NextResponse } from 'next/server'
import { OAuth2Client } from 'google-auth-library'

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)

export async function POST(request) {
  try {
    const { credential } = await request.json()

    // Verify the Google toke
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
    }

    // add logic:
    // 1. Check if user exists in your database
    // 2. If user doesn't exist, you might want to redirect to registration
    // 3. Generate your app's authentication token
    // 4. Update last login timestamp
    // 5. Return user data and token

    // database check (implement according to database setup)
    const user = await findUserByEmail(userData.email)

    if (!user) {
      return NextResponse.json(
        { error: 'User not found. Please register first.' },
        { status: 404 }
      )
    }

    // Generate authentication token (implement according to your auth setup)
    const authToken = generateAuthToken(user)

    return NextResponse.json({
      user: userData,
      token: authToken
    })
  } catch (error) {
    console.error('Google authentication error:', error)
    return NextResponse.json(
      { error: 'Authentication failed' },
      { status: 401 }
    )
  }
}

// Example helper functions (implement these according to your setup)
async function findUserByEmail(email) {
  // Implement database lookup
  return null
}

function generateAuthToken(user) {
  // Implement token generation
  return 'your-auth-token'
}