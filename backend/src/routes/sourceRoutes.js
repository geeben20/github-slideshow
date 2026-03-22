import { Router } from 'express';
import { createSource, deleteSource, getSources } from '../controllers/sourceController.js';
import { authenticate, authorize } from '../middleware/auth.js';

const router = Router();
router.get('/', getSources);
router.post('/', authenticate, authorize('admin'), createSource);
router.delete('/:id', authenticate, authorize('admin'), deleteSource);
export default router;
