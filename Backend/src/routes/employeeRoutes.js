import { Router } from 'express';
import { listEmployees, getEmployeeById } from '../controllers/employeeController.js';
import { authenticate, authorize } from '../middleware/authMiddleware.js';

const router = Router();

const departmentOnly = authorize(['department']);

router.get('/', authenticate, departmentOnly, listEmployees);
router.get('/:id', authenticate, departmentOnly, getEmployeeById);

export default router;