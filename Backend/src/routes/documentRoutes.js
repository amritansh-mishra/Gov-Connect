import { Router } from 'express';
import { listDocuments, getDocumentById } from '../controllers/documentController.js';
import { authenticate, authorize } from '../middleware/authMiddleware.js';

const router = Router();

const departmentOnly = authorize(['department']);

router.get('/', authenticate, departmentOnly, listDocuments);
router.get('/:id', authenticate, departmentOnly, getDocumentById);

export default router;