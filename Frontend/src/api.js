const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000';

let authToken = '';

export function setAuthToken(token) {
  authToken = token || '';
}

function withAuthHeaders(init = {}) {
  const headers = new Headers(init.headers || {});
  if (!headers.has('Content-Type')) headers.set('Content-Type', 'application/json');
  if (authToken) headers.set('Authorization', `Bearer ${authToken}`);
  return { ...init, headers };
}

export async function register({ username, password, role }) {
  const res = await fetch(`${API_BASE_URL}/api/auth/register`, withAuthHeaders({
    method: 'POST',
    body: JSON.stringify({ username, password, role }),
  }));
  if (!res.ok) throw new Error((await res.json().catch(() => ({}))).error || 'Registration failed');
  const data = await res.json();
  if (data.token) setAuthToken(data.token);
  return data;
}

export async function login({ username, password }) {
  const res = await fetch(`${API_BASE_URL}/api/auth/login`, withAuthHeaders({
    method: 'POST',
    body: JSON.stringify({ username, password }),
  }));
  if (!res.ok) throw new Error((await res.json().catch(() => ({}))).error || 'Login failed');
  const data = await res.json();
  setAuthToken(data.token);
  return data;
}

export async function me() {
  const res = await fetch(`${API_BASE_URL}/api/auth/me`, withAuthHeaders());
  if (!res.ok) throw new Error('Not authenticated');
  return res.json();
}

export async function fetchProjects() {
  const res = await fetch(`${API_BASE_URL}/api/projects`);
  if (!res.ok) throw new Error('Failed to fetch projects');
  const body = await res.json();
  return body.data;
}

export async function submitFeedback(payload) {
  const res = await fetch(`${API_BASE_URL}/api/feedback`, withAuthHeaders({
    method: 'POST',
    body: JSON.stringify(payload),
  }));
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: 'Unknown error' }));
    throw new Error(err.error || 'Failed to submit feedback');
  }
  const body = await res.json();
  return body.data;
}

export async function fetchFeedback() {
  const res = await fetch(`${API_BASE_URL}/api/feedback`, withAuthHeaders());
  if (!res.ok) throw new Error('Failed to fetch feedback');
  const body = await res.json();
  return body.data;
}


