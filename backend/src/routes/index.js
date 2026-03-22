import { Router } from 'express';
import adminRoutes from './adminRoutes.js';
import articleRoutes from './articleRoutes.js';
import authRoutes from './authRoutes.js';
import bookmarkRoutes from './bookmarkRoutes.js';
import sourceRoutes from './sourceRoutes.js';
import trendRoutes from './trendRoutes.js';
import videoRoutes from './videoRoutes.js';

const router = Router();
router.use('/auth', authRoutes);
router.use('/articles', articleRoutes);
router.use('/videos', videoRoutes);
router.use('/sources', sourceRoutes);
router.use('/trends', trendRoutes);
router.use('/admin', adminRoutes);
router.use('/bookmarks', bookmarkRoutes);
export default router;
