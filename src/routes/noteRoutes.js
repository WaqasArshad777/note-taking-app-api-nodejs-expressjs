const express = require('express');
const router = express.Router();
const noteController = require('../controllers/noteController');
const { requireAuth } = require('../middleware/auth');
const { noteValidationRules, validate } = require('../middleware/validators');

// All routes here are protected with Clerk authentication
router.use(requireAuth);

// @route   GET /api/notes
// @desc    Get all notes for the authenticated user
// @access  Private
router.get('/', noteController.getNotes);

// @route   GET /api/notes/:id
// @desc    Get a single note by ID
// @access  Private
router.get('/:id', noteController.getNoteById);

// @route   POST /api/notes
// @desc    Create a new note
// @access  Private
router.post('/', noteValidationRules, validate, noteController.createNote);

// @route   PUT /api/notes/:id
// @desc    Update a note
// @access  Private
router.put('/:id', noteValidationRules, validate, noteController.updateNote);

// @route   DELETE /api/notes/:id
// @desc    Delete a note
// @access  Private
router.delete('/:id', noteController.deleteNote);

module.exports = router; 