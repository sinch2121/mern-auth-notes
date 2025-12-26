import asyncHandler from 'express-async-handler';
import Note from '../models/noteModel.js';
import { encryptText, decryptText } from '../utils/encryption.js';

// @desc    Create new note
// @route   POST /api/notes
// @access  Private
export const createNote = asyncHandler(async (req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
    res.status(400);
    throw new Error('Title and content are required');
  }

  const encryptedContent = encryptText(content);

  const note = await Note.create({
    user: req.user._id,
    title,
    encryptedContent,
  });

  res.status(201).json(note);
});

// @desc    Get user notes
// @route   GET /api/notes
// @access  Private
export const getNotes = asyncHandler(async (req, res) => {
  const notes = await Note.find({ user: req.user._id }).sort({ createdAt: -1 });

  const decryptedNotes = notes.map((note) => ({
    _id: note._id,
    title: note.title,
    content: decryptText(note.encryptedContent),
    createdAt: note.createdAt,
  }));

  res.json(decryptedNotes);
});

// @desc    Delete note
// @route   DELETE /api/notes/:id
// @access  Private
export const deleteNote = asyncHandler(async (req, res) => {
  const note = await Note.findById(req.params.id);

  if (!note || note.user.toString() !== req.user._id.toString()) {
    res.status(404);
    throw new Error('Note not found');
  }

  await note.deleteOne();
  res.json({ message: 'Note deleted' });
});
