import { Router } from 'express';
import { listFeedback, createFeedback } from '../controllers/feedbackController.js';
import { authenticate, authorize } from '../middleware/authMiddleware.js';

const router = Router();

const departmentOnly = authorize(['department']);

router.get('/', authenticate, departmentOnly, listFeedback);
router.post('/', authenticate, createFeedback);

export default router;


