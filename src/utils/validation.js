// Data validation utilities
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password) => {
  return password && password.length >= 6;
};

export const validateTransaction = (transaction) => {
  const errors = [];

  if (!transaction.name || transaction.name.trim() === '') {
    errors.push('Transaction name is required');
  }

  if (!transaction.category || transaction.category.trim() === '') {
    errors.push('Category is required');
  }

  if (!transaction.amount || parseFloat(transaction.amount) <= 0) {
    errors.push('Amount must be greater than 0');
  }

  if (!transaction.type || !['expense', 'income'].includes(transaction.type)) {
    errors.push('Type must be either expense or income');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

export const formatCurrency = (amount, currency = 'RM') => {
  return `${currency} ${parseFloat(amount).toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
};

export const formatDate = (date) => {
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(date).toLocaleDateString('en-US', options);
};

export const getTimeAgo = (date) => {
  const now = new Date();
  const seconds = Math.floor((now - new Date(date)) / 1000);

  if (seconds < 60) return 'Just now';
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  if (days < 30) return `${Math.floor(days / 7)}w ago`;
  return formatDate(date);
};

export const getCategoryIcon = (category) => {
  const icons = {
    'Food & Drinks': '🍔',
    Transport: '🚗',
    Shopping: '🛍️',
    Health: '💊',
    Entertainment: '🎬',
    Utilities: '💡',
    Rent: '🏠',
    Job: '💼',
    Gifts: '🎁',
    Other: '📦',
  };
  return icons[category] || '📌';
};

export const calculatePercentage = (part, total) => {
  if (total === 0) return 0;
  return Math.round((part / total) * 100);
};

export const generateMonthYear = () => {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
};
