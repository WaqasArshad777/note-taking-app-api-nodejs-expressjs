import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '@/models/User';
import { IRequest } from '@/types';
import config from '@/config';

interface JwtPayload {
  id: string;
}

// Middleware to protect routes
export const requireAuth = async (req: IRequest, res: Response, next: NextFunction): Promise<void> => {
  // Get token from header
  const token = req.header('Authorization')?.replace('Bearer ', '');

  // Check if token exists
  if (!token) {
    res.status(401).json({ message: 'No token, authorization denied' });
    return;
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, config.jwtSecret) as JwtPayload;
    
    // Set user ID in request
    req.userId = decoded.id;
    
    // Find user (optional - if you need the user data in your requests)
    const user = await User.findById(decoded.id).select('-password');
    if (!user) {
      res.status(401).json({ message: 'User not found' });
      return;
    }
    
    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

// Generate JWT token
export const generateToken = (userId: string): string => {
  return jwt.sign(
    { userId },
    config.jwtSecret
  );
}; 