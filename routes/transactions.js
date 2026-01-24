import express from 'express';
import * as transactionController from '../controllers/transactionController.js';
import authMiddleware from '../middleware/auth.js';

const router = express.Router();

// All transaction routes require authentication
router.use(authMiddleware);

// Get all transactions for user
router.get('/', transactionController.getTransactions);

// Get monthly summary
router.get('/summary/monthly', transactionController.getMonthlySummary);

// Get single transaction
router.get('/:id', transactionController.getTransaction);

// Create new transaction
router.post('/', transactionController.createTransaction);

// Update transaction
router.put('/:id', transactionController.updateTransaction);

// Delete transaction
router.delete('/:id', transactionController.deleteTransaction);

export default router;
