# Project Management Platform

A full-stack project management application built with Node.js, Express, MongoDB, and Next.js. This platform allows teams to collaborate, manage projects, and track tasks efficiently.

## Features

### Core Features

- 👤 User Authentication & Authorization
- 📊 Project Management
- ✅ Task Tracking
- 👥 Team Collaboration
- 📁 File Sharing
- 🔔 Real-time Notifications

### Technical Features

- JWT-based authentication
- Role-based access control
- Real-time updates using Socket.io
- RESTful API
- MongoDB database
- Responsive design

## Tech Stack

### Backend

- Node.js
- Express.js
- MongoDB with Mongoose
- JSON Web Tokens (JWT)
- Socket.io

### Frontend

- Next.js
- React
- Tailwind CSS
- Redux/Context API

## Prerequisites

Before running this project, make sure you have:

- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

## Installation

1. Clone the repository

```bash
git clone https://github.com/your-username/project-management.git
cd project-management
```

2. Install backend dependencies

```bash
cd backend
npm install
```

3. Configure environment variables

```bash
cp .env.example .env
# Edit .env with your configuration
```

4. Install frontend dependencies

```bash
cd ../frontend
npm install
```

## Environment Variables

### Backend

```env
NODE_ENV=development
PORT=5000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
JWT_EXPIRE=24h
```

### Frontend

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

## Running the Application

### Development Mode

Backend:

```bash
cd backend
npm run dev
```

Frontend:

```bash
cd frontend
npm run dev
```

### Production Mode

Backend:

```bash
cd backend
npm start
```

Frontend:

```bash
cd frontend
npm run build
npm start
```

## API Documentation

### Authentication Routes

- POST `/api/auth/register` - Register a new user
- POST `/api/auth/login` - Login user
- GET `/api/auth/profile` - Get user profile

### Project Routes

- GET `/api/projects` - Get all projects
- POST `/api/projects` - Create a new project
- GET `/api/projects/:id` - Get project details
- PUT `/api/projects/:id` - Update project
- DELETE `/api/projects/:id` - Delete project

### Task Routes

- GET `/api/projects/:id/tasks` - Get project tasks
- POST `/api/projects/:id/tasks` - Create new task
- PUT `/api/projects/:id/tasks/:taskId` - Update task
- DELETE `/api/projects/:id/tasks/:taskId` - Delete task

## Testing

```bash
# Run backend tests
cd backend
npm test

# Run frontend tests
cd frontend
npm test
```

## Project Structure

```
project-management/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── middleware/
│   │   ├── config/
│   │   └── utils/
│   ├── tests/
│   └── package.json
│
└── frontend/
    ├── components/
    ├── pages/
    ├── public/
    ├── styles/
    ├── utils/
    └── package.json
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [READMEaker](https://readme.works) for this AI generated README
- MongoDB documentation
- Next.js documentation
