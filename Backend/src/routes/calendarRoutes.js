import { Router } from 'express';
import { getCalendarEvents } from '../controllers/calendarController.js';
import { authenticate, authorize } from '../middleware/authMiddleware.js';

const router = Router();

const departmentOnly = authorize(['department']);

router.get('/', authenticate, departmentOnly, getCalendarEvents);

export default router;