import express from 'express';
import * as noteController from '@/controllers/note';
import { requireAuth } from '@/middleware/auth';
import validate from '@/middleware/validate';
import { createNoteSchema, updateNoteSchema, getNoteSchema } from '@/schemas/note';

const router = express.Router();

// All routes here are protected with JWT authentication
router.use(requireAuth);

// @route   GET /api/notes
// @desc    Get all notes for the authenticated user
// @access  Private
router.get('/', noteController.getNotes);

// @route   GET /api/notes/:id
// @desc    Get a single note by ID
// @access  Private
router.get('/:id', validate(getNoteSchema), noteController.getNoteById);

// @route   POST /api/notes
// @desc    Create a new note
// @access  Private
router.post('/', validate(createNoteSchema), noteController.createNote);

// @route   PUT /api/notes/:id
// @desc    Update a note
// @access  Private
router.put('/:id', validate(updateNoteSchema), noteController.updateNote);

// @route   DELETE /api/notes/:id
// @desc    Delete a note
// @access  Private
router.delete('/:id', validate(getNoteSchema), noteController.deleteNote);

export default router; 