import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import {
  getNotes,
  createNote,
} from '../controllers/noteController.js';

const router = express.Router();

router.route('/')
  .get(protect, getNotes)
  .post(protect, createNote);

export default router;
