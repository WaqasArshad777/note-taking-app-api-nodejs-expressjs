import mongoose, { Schema } from 'mongoose';
import { INote, NotePriority } from '@/types';

const NoteSchema: Schema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  priority: {
    type: String,
    enum: Object.values(NotePriority),
    default: NotePriority.NORMAL
  },
}, { timestamps: true });

// Update the updatedAt timestamp before saving
NoteSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

export default mongoose.model<INote>('Note', NoteSchema); 