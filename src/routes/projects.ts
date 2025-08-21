import express from 'express';
import { authMiddleware } from '../middleware/auth';

const router = express.Router();

router.get('/', (_req, res) => {
  res.json({ message: 'Project endpoints' });
});

export default router;
