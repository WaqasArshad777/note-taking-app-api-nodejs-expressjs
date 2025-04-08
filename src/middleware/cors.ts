import cors from 'cors';
import { Request, Response, NextFunction } from 'express';

// CORS configuration with options to allow frontend requests
const corsMiddleware = cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  maxAge: 86400 // 24 hours in seconds
});

// Middleware to handle CORS preflight requests
export const setupCORS = (req: Request, res: Response, next: NextFunction) => {
  // Handle OPTIONS method
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Max-Age', '86400');
    return res.status(204).send();
  }
  
  corsMiddleware(req, res, next);
};

export default corsMiddleware; 