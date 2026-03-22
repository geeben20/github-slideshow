import { Router } from 'express';
import { getAnalytics, runIngestion } from '../controllers/adminController.js';
import { authenticate, authorize } from '../middleware/auth.js';

const router = Router();
router.get('/analytics', authenticate, authorize('admin'), getAnalytics);
router.post('/ingest', authenticate, authorize('admin'), runIngestion);
export default router;
