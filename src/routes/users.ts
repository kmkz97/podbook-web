import express from 'express';
import { authMiddleware } from '../middleware/auth';

const router = express.Router();

router.get('/profile', authMiddleware, (_req, res) => {
  res.json({ message: 'User profile endpoint' });
});

export default router;
