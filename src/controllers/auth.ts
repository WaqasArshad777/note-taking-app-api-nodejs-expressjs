import { Request, Response } from 'express';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '@/models/User';
import { IRequest, IUser } from '@/types';
import { RegisterInput, LoginInput } from '@/schemas/auth';
import config from '@/config';

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password, name } = req.body as RegisterInput;

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400).json({ message: 'User already exists' });
      return;
    }

    // Create new user
    const user = new User({
      email,
      password,
      name
    });

    await user.save();

    // Generate JWT token
    const userId = (user._id as mongoose.Types.ObjectId).toString();
    const token = jwt.sign({ id: userId }, config.jwtSecret, { expiresIn: '30d' });

    // Return user and token
    res.status(201).json({
      id: user._id,
      email: user.email,
      name: user.name,
      token
    });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body as LoginInput;

    // Find user
    const user = await User.findOne({ email }) as IUser;
    if (!user) {
      res.status(400).json({ message: 'Invalid credentials' });
      return;
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      res.status(400).json({ message: 'Invalid credentials' });
      return;
    }

    // Generate JWT token
    const userId = (user._id as mongoose.Types.ObjectId).toString();
    const token = jwt.sign({ id: userId }, config.jwtSecret, { expiresIn: '30d' });

    // Return user and token
    res.json({
      id: user._id,
      email: user.email,
      name: user.name,
      token
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get current user
// @route   GET /api/auth/me
// @access  Private
export const getCurrentUser = async (req: IRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    res.json({
      id: req.user._id,
      email: req.user.email,
      name: req.user.name
    });
  } catch (error) {
    console.error('Get current user error:', error);
    res.status(500).json({ message: 'Server error' });
  }
}; 