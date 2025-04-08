// Register module aliases for compiled JavaScript
import 'module-alias/register';

import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import config from '@/config';
import connectDB from '@/config/db';
import { IError } from '@/types';

// Import routes
import noteRoutes from '@/routes/note';
import userRoutes from '@/routes/user';
import authRoutes from '@/routes/auth';

// Connect to MongoDB
connectDB();

// Initialize Express app
const app = express();

// Middleware
app.use(express.json());

// Use a more permissive CORS configuration
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  preflightContinue: false,
  optionsSuccessStatus: 204
}));

app.use(morgan('dev'));

// Routes
app.use('/api/notes', noteRoutes);
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);

// Default route
app.get('/', (_req: Request, res: Response) => {
  res.json({ message: 'Welcome to the Note Taking API' });
});

// Error handling middleware
app.use((err: IError, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err.stack);
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({ message: err.message || 'Something went wrong!' });
});

// Start the server
const PORT = Number(config.port);
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running in ${config.nodeEnv} mode on port ${PORT}`);
  console.log(`Server available at http://localhost:${PORT}`);
});

export default app; 