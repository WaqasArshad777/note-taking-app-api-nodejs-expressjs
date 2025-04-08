import express from 'express';
import * as userController from '@/controllers/user';
import { requireAuth } from '@/middleware/auth';
import validate from '@/middleware/validate';
import { updateNameSchema, changePasswordSchema } from '@/schemas/user';

const router = express.Router();

// All routes are protected
router.use(requireAuth);

// @route   GET /api/users/profile
// @desc    Get current user profile
// @access  Private
router.get('/profile', userController.getProfile);

// @route   PUT /api/users/profile/edit
// @desc    Update user name
// @access  Private
router.put('/profile/edit', validate(updateNameSchema), userController.updateName);

// @route   PUT /api/users/profile/change-password
// @desc    Change user password
// @access  Private
router.put('/profile/change-password', validate(changePasswordSchema), userController.changePassword);

export default router; 