// Utility functions for calculations
export const calculateTotalBalance = (initialBalance, transactions) => {
  return initialBalance + transactions.reduce((sum, t) => {
    return sum + (t.type === 'income' ? t.amount : -t.amount);
  }, 0);
};

export const calculateCategoryTotal = (transactions, category) => {
  return transactions
    .filter(t => t.category === category)
    .reduce((sum, t) => sum + t.amount, 0);
};

export const calculateMonthlyStats = (transactions) => {
  const stats = {
    income: 0,
    expenses: 0,
    balance: 0,
    transactionCount: 0,
  };

  transactions.forEach(t => {
    if (t.type === 'income') {
      stats.income += t.amount;
    } else {
      stats.expenses += t.amount;
    }
    stats.transactionCount += 1;
  });

  stats.balance = stats.income - stats.expenses;
  return stats;
};

export const getTopCategories = (transactions, limit = 5) => {
  const categoryTotals = {};

  transactions.forEach(t => {
    if (t.type === 'expense') {
      categoryTotals[t.category] = (categoryTotals[t.category] || 0) + t.amount;
    }
  });

  return Object.entries(categoryTotals)
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([category, amount]) => ({ category, amount }));
};

export const getDailyAverage = (transactions, days = 30) => {
  const total = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);
  return total / days;
};

export const getSpendingTrend = (transactions, days = 7) => {
  const trend = {};
  const now = new Date();

  for (let i = 0; i < days; i++) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    const dateStr = date.toISOString().split('T')[0];
    trend[dateStr] = 0;
  }

  transactions.forEach(t => {
    const dateStr = new Date(t.date).toISOString().split('T')[0];
    if (trend.hasOwnProperty(dateStr) && t.type === 'expense') {
      trend[dateStr] += t.amount;
    }
  });

  return Object.entries(trend)
    .reverse()
    .map(([date, amount]) => ({ date, amount }));
};

export const groupTransactionsByDate = (transactions) => {
  const grouped = {};

  transactions.forEach(t => {
    const date = new Date(t.date).toISOString().split('T')[0];
    if (!grouped[date]) {
      grouped[date] = [];
    }
    grouped[date].push(t);
  });

  return grouped;
};
