const Note = require('../models/Note');

// Get all notes for the authenticated user
exports.getNotes = async (req, res) => {
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
exports.getNoteById = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    
    // Check if note exists
    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }
    
    // Check if the note belongs to the authenticated user
    if (note.userId !== req.userId) {
      return res.status(403).json({ message: 'Not authorized to access this note' });
    }
    
    res.json(note);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Create a new note
exports.createNote = async (req, res) => {
  try {
    const { title, content, tags } = req.body;
    
    // Create new note
    const newNote = new Note({
      title,
      content,
      tags: tags || [],
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
exports.updateNote = async (req, res) => {
  try {
    const { title, content, tags } = req.body;
    
    // Find note
    let note = await Note.findById(req.params.id);
    
    // Check if note exists
    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }
    
    // Check if the note belongs to the authenticated user
    if (note.userId !== req.userId) {
      return res.status(403).json({ message: 'Not authorized to update this note' });
    }
    
    // Update note
    note = await Note.findByIdAndUpdate(
      req.params.id,
      { 
        title, 
        content, 
        tags: tags || note.tags,
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
exports.deleteNote = async (req, res) => {
  try {
    // Find note
    const note = await Note.findById(req.params.id);
    
    // Check if note exists
    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }
    
    // Check if the note belongs to the authenticated user
    if (note.userId !== req.userId) {
      return res.status(403).json({ message: 'Not authorized to delete this note' });
    }
    
    await Note.findByIdAndDelete(req.params.id);
    
    res.json({ message: 'Note removed' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
}; 