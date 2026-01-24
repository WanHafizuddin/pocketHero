// API Base URL configuration
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Fetch with token
export const fetchWithToken = async (url, options = {}) => {
  const token = localStorage.getItem('token');
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${url}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'API request failed');
  }

  return response.json();
};

// Transaction API calls
export const transactionAPI = {
  getAll: (filters = {}) => {
    const params = new URLSearchParams(filters);
    return fetchWithToken(`/transactions?${params}`);
  },
  getOne: (id) => fetchWithToken(`/transactions/${id}`),
  create: (data) => fetchWithToken('/transactions', { method: 'POST', body: JSON.stringify(data) }),
  update: (id, data) => fetchWithToken(`/transactions/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (id) => fetchWithToken(`/transactions/${id}`, { method: 'DELETE' }),
  getMonthlySummary: (year, month) =>
    fetchWithToken(`/transactions/summary/monthly?year=${year}&month=${month}`),
};

// Analytics API calls
export const analyticsAPI = {
  getAnalytics: (filters = {}) => {
    const params = new URLSearchParams(filters);
    return fetchWithToken(`/analytics?${params}`);
  },
  getWeekly: () => fetchWithToken('/analytics/weekly'),
  getInsights: () => fetchWithToken('/analytics/insights'),
};

// Auth API calls
export const authAPI = {
  register: (data) => fetchWithToken('/auth/register', { method: 'POST', body: JSON.stringify(data) }),
  login: (data) => fetchWithToken('/auth/login', { method: 'POST', body: JSON.stringify(data) }),
  getCurrentUser: () => fetchWithToken('/auth/me'),
};

// User API calls
export const userAPI = {
  getProfile: (id) => fetchWithToken(`/users/${id}`),
  updateProfile: (id, data) => fetchWithToken(`/users/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
};
