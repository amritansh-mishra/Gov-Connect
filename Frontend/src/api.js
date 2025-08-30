const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000';

let token = null;

export const setToken = (newToken) => {
  token = newToken;
  if (token) {
    localStorage.setItem('token', token);
  } else {
    localStorage.removeItem('token');
  }
};

const apiFetch = async (endpoint, options = {}) => {
  const { body, ...restOptions } = options;
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...restOptions,
    headers,
    body: body ? JSON.stringify(body) : null,
  });

  const responseData = await response.json();
  if (!response.ok) {
    throw new Error(responseData.error || responseData.message || `HTTP error! status: ${response.status}`);
  }

  return responseData;
};

export const login = (credentials) => apiFetch('/api/auth/login', { method: 'POST', body: credentials });

export const register = (userData) => apiFetch('/api/auth/register', { method: 'POST', body: userData });

export const fetchProjects = () => apiFetch('/api/projects');

export const submitFeedback = (feedbackData) => apiFetch('/api/feedback', { method: 'POST', body: feedbackData });

export const getDashboardData = () => apiFetch('/api/dashboard');

export const getDepartments = () => apiFetch('/api/departments');

export const getEmployees = () => apiFetch('/api/employees');

export const getDocuments = () => apiFetch('/api/documents');
