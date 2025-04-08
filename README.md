# Note-Taking App

A full-stack application for taking and managing notes with JWT authentication.

![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=json-web-tokens&logoColor=white)

## Features

- User authentication with JWT
- Create, read, update, and delete notes
- Rich text editing for notes
- Categorize and organize notes
- Modern and responsive UI
- Type-safe development with TypeScript and Zod
- Secure password hashing with bcryptjs

## Setup and Running

### Backend

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file with the following content:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/note-taking-app
   JWT_SECRET=your_jwt_secret_key
   JWT_EXPIRES_IN=1d
   NODE_ENV=development
   ```

   ⚠️ Make sure to replace `your_jwt_secret_key` with a secure random string in production.

4. Build the backend:
   ```bash
   npm run build
   ```

5. Run the backend:
   ```bash
   npm run start
   ```

   For development with auto-reload:
   ```bash
   npm run dev
   ```

## API Documentation

### Public Routes

- `GET /` - Welcome message and API info

### Authentication Routes (Public)

- `POST /api/auth/register` - Register a new user
  - Required fields: `email`, `name`, `password`
- `POST /api/auth/login` - Login and get JWT token
  - Required fields: `email`, `password`
- `GET /api/auth/me` - Get current user information (requires authentication)

### Protected Routes (Requires Authentication)

To access protected routes, include the JWT token in the Authorization header:
```
Authorization: Bearer your_jwt_token
```

#### Notes

- `GET /api/notes` - Get all notes for authenticated user
- `GET /api/notes/:id` - Get a specific note
- `POST /api/notes` - Create a new note
  - Required fields: `title`, `content`
  - Optional fields: `category`
- `PUT /api/notes/:id` - Update a note
- `DELETE /api/notes/:id` - Delete a note

#### User Management

- `GET /api/users/profile` - Get user profile (returns id, email, name)
- `PUT /api/users/profile` - Update user profile (can update name and password)
  - Optional fields: `name`
  - For password change: `currentPassword`, `newPassword`

- Node.js with Express
- TypeScript
- MongoDB with Mongoose
- JWT Authentication
- Express Validator & Zod for validation
- bcryptjs for password hashing
- Morgan for logging
- CORS enabled

## Data Models

### User Model
- `email` (string, required, unique)
- `name` (string, required)
- `password` (string, required, hashed)

### Note Model
- `title` (string, required)
- `content` (string, required)
- `category` (string)
- `user` (reference to User)
- `createdAt` (date)
- `updatedAt` (date)

## Type Safety

This project emphasizes type safety through:
- TypeScript for static type checking
- Zod for runtime validation and type inference
- Mongoose types for database models