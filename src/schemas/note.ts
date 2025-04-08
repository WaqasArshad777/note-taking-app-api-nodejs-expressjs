import { z } from 'zod';
import { NotePriority } from '../types';

// Schema for creating a note
export const createNoteSchema = z.object({
  body: z.object({
    title: z.string().min(1, 'Title is required').max(100, 'Title must be less than 100 characters'),
    description: z.string().min(1, 'Description is required'),
    priority: z.enum([NotePriority.LOW, NotePriority.NORMAL, NotePriority.HIGH, NotePriority.URGENT]).optional()
  })
});

// Schema for updating a note
export const updateNoteSchema = z.object({
  params: z.object({
    id: z.string().min(1, 'Note ID is required')
  }),
  body: z.object({
    title: z.string().min(1, 'Title is required').max(100, 'Title must be less than 100 characters'),
    description: z.string().min(1, 'Description is required'),
    priority: z.enum([NotePriority.LOW, NotePriority.NORMAL, NotePriority.HIGH, NotePriority.URGENT]).optional()
  })
});

// Schema for getting a note by ID
export const getNoteSchema = z.object({
  params: z.object({
    id: z.string().min(1, 'Note ID is required')
  })
});

export type CreateNoteInput = z.infer<typeof createNoteSchema>['body'];
export type UpdateNoteInput = z.infer<typeof updateNoteSchema>['body'];
export type GetNoteInput = z.infer<typeof getNoteSchema>['params']; 