import Transaction from '../models/Transaction.js';

// Get All Transactions for User
export const getTransactions = async (req, res) => {
  try {
    const { type, category, startDate, endDate } = req.query;
    let filter = { userId: req.userId };

    if (type) filter.type = type;
    if (category) filter.category = category;

    if (startDate || endDate) {
      filter.date = {};
      if (startDate) filter.date.$gte = new Date(startDate);
      if (endDate) filter.date.$lte = new Date(endDate);
    }

    const transactions = await Transaction.find(filter).sort({ date: -1 });
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Single Transaction
export const getTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);
    if (!transaction) {
      return res.status(404).json({ error: 'Transaction not found' });
    }

    if (transaction.userId.toString() !== req.userId) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    res.json(transaction);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create Transaction
export const createTransaction = async (req, res) => {
  try {
    const { name, category, amount, type, description, date } = req.body;

    if (!name || !category || !amount || !type) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const transaction = new Transaction({
      userId: req.userId,
      name,
      category,
      amount: parseFloat(amount),
      type,
      description: description || '',
      date: date ? new Date(date) : new Date(),
    });

    await transaction.save();
    res.status(201).json(transaction);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update Transaction
export const updateTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);
    if (!transaction) {
      return res.status(404).json({ error: 'Transaction not found' });
    }

    if (transaction.userId.toString() !== req.userId) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    const { name, category, amount, type, description, date } = req.body;

    if (name) transaction.name = name;
    if (category) transaction.category = category;
    if (amount) transaction.amount = parseFloat(amount);
    if (type) transaction.type = type;
    if (description !== undefined) transaction.description = description;
    if (date) transaction.date = new Date(date);
    transaction.updatedAt = new Date();

    await transaction.save();
    res.json(transaction);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete Transaction
export const deleteTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);
    if (!transaction) {
      return res.status(404).json({ error: 'Transaction not found' });
    }

    if (transaction.userId.toString() !== req.userId) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    await Transaction.findByIdAndDelete(req.params.id);
    res.json({ message: 'Transaction deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Monthly Summary
export const getMonthlySummary = async (req, res) => {
  try {
    const { year, month } = req.query;
    const startDate = new Date(`${year}-${month}-01`);
    const endDate = new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0);

    const transactions = await Transaction.find({
      userId: req.userId,
      date: { $gte: startDate, $lte: endDate },
    });

    const summary = {
      totalIncome: transactions
        .filter(t => t.type === 'income')
        .reduce((sum, t) => sum + t.amount, 0),
      totalExpense: transactions
        .filter(t => t.type === 'expense')
        .reduce((sum, t) => sum + t.amount, 0),
      balance: 0,
      byCategory: {},
    };

    summary.balance = summary.totalIncome - summary.totalExpense;

    transactions.forEach(t => {
      if (!summary.byCategory[t.category]) {
        summary.byCategory[t.category] = { amount: 0, count: 0 };
      }
      summary.byCategory[t.category].amount += t.amount;
      summary.byCategory[t.category].count += 1;
    });

    res.json(summary);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
