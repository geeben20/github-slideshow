import { Router } from 'express';
import { getBookmarks, toggleBookmark } from '../controllers/bookmarkController.js';
import { authenticate } from '../middleware/auth.js';

const router = Router();
router.get('/', authenticate, getBookmarks);
router.post('/:articleId', authenticate, toggleBookmark);
export default router;
