import { Response } from 'express';
import bcrypt from 'bcryptjs';
import User from '@/models/User';
import { IRequest } from '@/types';
import { UpdateNameInput, ChangePasswordInput } from '@/schemas/user';

// Get user profile
export const getProfile = async (req: IRequest, res: Response): Promise<void> => {
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
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update user name
export const updateName = async (req: IRequest, res: Response): Promise<void> => {
  try {
    const { name } = req.body as UpdateNameInput;
    
    if (!req.userId) {
      res.status(401).json({ message: 'Not authenticated' });
      return;
    }

    // Find user
    const user = await User.findById(req.userId);
    
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }
    
    // Update name
    if (name) {
      user.name = name;
      await user.save();
    }
    
    res.json({
      id: user._id,
      email: user.email,
      name: user.name
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Change password
export const changePassword = async (req: IRequest, res: Response): Promise<void> => {
  try {
    const { currentPassword, newPassword } = req.body as ChangePasswordInput;
    
    if (!req.userId) {
      res.status(401).json({ message: 'Not authenticated' });
      return;
    }

    // Find user
    const user = await User.findById(req.userId);
    
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }
    
    // Verify current password
    const isMatch = await user.comparePassword(currentPassword);
    if (!isMatch) {
      res.status(400).json({ message: 'Current password is incorrect' });
      return;
    }
    
    // Hash new password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    
    await user.save();
    
    res.json({ message: 'Password updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
}; 