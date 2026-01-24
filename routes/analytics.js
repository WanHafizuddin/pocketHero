import express from 'express';
import * as analyticsController from '../controllers/analyticsController.js';
import authMiddleware from '../middleware/auth.js';

const router = express.Router();

// All analytics routes require authentication
router.use(authMiddleware);

// Get general analytics
router.get('/', analyticsController.getAnalytics);

// Get weekly analytics
router.get('/weekly', analyticsController.getWeeklyAnalytics);

// Get spending insights
router.get('/insights', analyticsController.getInsights);

export default router;
