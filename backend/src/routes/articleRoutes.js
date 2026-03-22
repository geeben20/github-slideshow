import { Router } from 'express';
import { getArticleById, getArticles, toggleModeration } from '../controllers/articleController.js';
import { authenticate, authorize } from '../middleware/auth.js';

const router = Router();
router.get('/', getArticles);
router.get('/:id', getArticleById);
router.patch('/:id/moderate', authenticate, authorize('admin'), toggleModeration);
export default router;
