import { Router } from 'express';
import { listProjects } from '../controllers/projectController.js';
import { authenticate } from '../middleware/authMiddleware.js';

const router = Router();

router.get('/', authenticate, listProjects);

export default router;


