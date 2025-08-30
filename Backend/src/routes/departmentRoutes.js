import { Router } from 'express';
import { listDepartments, getDepartmentById } from '../controllers/departmentController.js';
import { authenticate, authorize } from '../middleware/authMiddleware.js';

const router = Router();

const departmentOnly = authorize(['department']);

router.get('/', authenticate, departmentOnly, listDepartments);
router.get('/:id', authenticate, departmentOnly, getDepartmentById);

export default router;