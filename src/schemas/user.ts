import { z } from 'zod';

// Schema for creating a user
export const createUserSchema = z.object({
  body: z.object({
    clerkId: z.string().min(1, 'Clerk ID is required'),
    email: z.string().email('Invalid email format'),
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    profileImage: z.string().url('Invalid profile image URL').optional()
  })
});

// Schema for getting a user by ID
export const getUserSchema = z.object({
  params: z.object({
    id: z.string().min(1, 'User ID is required')
  })
});

// Schema for getting a user by Clerk ID
export const getUserByClerkIdSchema = z.object({
  params: z.object({
    clerkId: z.string().min(1, 'Clerk ID is required')
  })
});

// Schema for updating user name
export const updateNameSchema = z.object({
  body: z.object({
    name: z.string().min(1, 'Name is required')
  })
});

// Schema for changing user password
export const changePasswordSchema = z.object({
  body: z.object({
    currentPassword: z.string().min(1, 'Current password is required'),
    newPassword: z.string().min(6, 'Password must be at least 6 characters')
  })
});

export type CreateUserInput = z.infer<typeof createUserSchema>['body'];
export type GetUserInput = z.infer<typeof getUserSchema>['params'];
export type GetUserByClerkIdInput = z.infer<typeof getUserByClerkIdSchema>['params'];
export type UpdateNameInput = z.infer<typeof updateNameSchema>['body'];
export type ChangePasswordInput = z.infer<typeof changePasswordSchema>['body']; 