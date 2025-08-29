import { Router } from 'express';
import { listFeedback, createFeedback } from '../controllers/feedbackController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = Router();

router.get('/', authMiddleware, listFeedback);
router.post('/', authMiddleware, createFeedback);

export default router;


