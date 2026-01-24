import Transaction from '../models/Transaction.js';

// Get Analytics Data
export const getAnalytics = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    let filter = { userId: req.userId };

    if (startDate || endDate) {
      filter.date = {};
      if (startDate) filter.date.$gte = new Date(startDate);
      if (endDate) filter.date.$lte = new Date(endDate);
    }

    const transactions = await Transaction.find(filter);

    // Calculate totals
    const totalIncome = transactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);

    const totalExpense = transactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);

    // Group by category
    const byCategory = {};
    transactions.forEach(t => {
      if (!byCategory[t.category]) {
        byCategory[t.category] = 0;
      }
      if (t.type === 'expense') {
        byCategory[t.category] += t.amount;
      }
    });

    // Group by date (daily)
    const byDate = {};
    transactions.forEach(t => {
      const dateStr = new Date(t.date).toISOString().split('T')[0];
      if (!byDate[dateStr]) {
        byDate[dateStr] = 0;
      }
      if (t.type === 'expense') {
        byDate[dateStr] += t.amount;
      }
    });

    res.json({
      totalIncome,
      totalExpense,
      balance: totalIncome - totalExpense,
      byCategory,
      byDate,
      transactionCount: transactions.length,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Weekly Analytics
export const getWeeklyAnalytics = async (req, res) => {
  try {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 7);

    const transactions = await Transaction.find({
      userId: req.userId,
      date: { $gte: startDate },
    });

    const weekData = {};
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    // Initialize week data
    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(date.getDate() - (6 - i));
      const dayName = days[date.getDay()];
      weekData[dayName] = 0;
    }

    // Aggregate transactions by day
    transactions.forEach(t => {
      const date = new Date(t.date);
      const dayName = days[date.getDay()];
      if (dayName) {
        weekData[dayName] += t.type === 'expense' ? t.amount : 0;
      }
    });

    const result = Object.keys(weekData).map(day => ({
      name: day,
      amount: weekData[day],
    }));

    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Spending Insights
export const getInsights = async (req, res) => {
  try {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const recentTransactions = await Transaction.find({
      userId: req.userId,
      date: { $gte: thirtyDaysAgo },
      type: 'expense',
    });

    // Find highest spending category
    const categorySpending = {};
    recentTransactions.forEach(t => {
      categorySpending[t.category] = (categorySpending[t.category] || 0) + t.amount;
    });

    const topCategory = Object.entries(categorySpending).sort((a, b) => b[1] - a[1])[0];

    // Calculate trends
    const totalSpending = recentTransactions.reduce((sum, t) => sum + t.amount, 0);
    const avgDaily = totalSpending / 30;

    res.json({
      topCategory: topCategory ? { name: topCategory[0], amount: topCategory[1] } : null,
      totalSpending,
      avgDaily,
      transactionCount: recentTransactions.length,
      insights: [
        {
          type: 'spending',
          message: `You've spent RM ${totalSpending.toFixed(2)} in the last 30 days`,
        },
        {
          type: 'category',
          message: topCategory
            ? `Your top spending category is ${topCategory[0]}: RM ${topCategory[1].toFixed(2)}`
            : 'No spending data available',
        },
      ],
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
