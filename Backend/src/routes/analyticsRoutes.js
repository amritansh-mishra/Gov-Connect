import { Router } from 'express';
import { getAnalyticsData } from '../controllers/analyticsController.js';
import { authenticate, authorize } from '../middleware/authMiddleware.js';

const router = Router();

const departmentOnly = authorize(['department']);

router.get('/', authenticate, departmentOnly, getAnalyticsData);

export default router;