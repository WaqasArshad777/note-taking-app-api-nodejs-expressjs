import express from 'express';
import * as authController from '@/controllers/auth';
import { requireAuth } from '@/middleware/auth';
import validate from '@/middleware/validate';
import { registerSchema, loginSchema } from '@/schemas/auth';

const router = express.Router();

// @route   POST /api/auth/register
// @desc    Register a new user
// @access  Public
router.post('/register', validate(registerSchema), authController.register);

// @route   POST /api/auth/login
// @desc    Login user and get token
// @access  Public
router.post('/login', validate(loginSchema), authController.login);

// @route   GET /api/auth/me
// @desc    Get current user profile
// @access  Private
router.get('/me', requireAuth, authController.getCurrentUser);

export default router; 