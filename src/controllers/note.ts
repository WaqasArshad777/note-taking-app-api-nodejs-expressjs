import { Response } from 'express';
import Note from '@/models/Note';
import { IRequest, NotePriority } from '@/types';
import { CreateNoteInput, UpdateNoteInput } from '@/schemas/note';

// Get all notes for the authenticated user
export const getNotes = async (req: IRequest, res: Response): Promise<void> => {
  try {
    const notes = await Note.find({ userId: req.userId })
      .sort({ updatedAt: -1 });
      
    res.json(notes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get a single note
export const getNoteById = async (req: IRequest, res: Response): Promise<void> => {
  try {
    const note = await Note.findById(req.params.id);
    
    // Check if note exists
    if (!note) {
      res.status(404).json({ message: 'Note not found' });
      return;
    }
    
    // Check if the note belongs to the authenticated user
    if (note.userId.toString() !== req.userId) {
      res.status(403).json({ message: 'Not authorized to access this note' });
      return;
    }
    
    res.json(note);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Create a new note
export const createNote = async (req: IRequest, res: Response): Promise<void> => {
  try {
    const { title, description, priority } = req.body as CreateNoteInput;
    
    // Create new note
    const newNote = new Note({
      title,
      description,
      priority: priority || NotePriority.NORMAL,
      userId: req.userId
    });
    
    const note = await newNote.save();
    res.status(201).json(note);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update a note
export const updateNote = async (req: IRequest, res: Response): Promise<void> => {
  try {
    const { title, description, priority } = req.body as UpdateNoteInput;
    
    // Find note
    let note = await Note.findById(req.params.id);
    
    // Check if note exists
    if (!note) {
      res.status(404).json({ message: 'Note not found' });
      return;
    }
    
    // Check if the note belongs to the authenticated user
    if (note.userId.toString() !== req.userId) {
      res.status(403).json({ message: 'Not authorized to update this note' });
      return;
    }
    
    // Update note
    note = await Note.findByIdAndUpdate(
      req.params.id,
      { 
        title, 
        description, 
        priority: priority || note.priority,
        updatedAt: Date.now()
      },
      { new: true }
    );
    
    res.json(note);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete a note
export const deleteNote = async (req: IRequest, res: Response): Promise<void> => {
  try {
    // Find note
    const note = await Note.findById(req.params.id);
    
    // Check if note exists
    if (!note) {
      res.status(404).json({ message: 'Note not found' });
      return;
    }
    
    // Check if the note belongs to the authenticated user
    if (note.userId.toString() !== req.userId) {
      res.status(403).json({ message: 'Not authorized to delete this note' });
      return;
    }
    
    await Note.findByIdAndDelete(req.params.id);
    
    res.json({ message: 'Note removed' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
}; 