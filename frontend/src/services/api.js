import axios from 'axios'

// All requests go to /api which Vite proxies to the PHP backend
const http = axios.create({
  baseURL: '/api',
  headers: { 'Content-Type': 'application/json' },
})

// Attach JWT token from localStorage on every request
http.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

// ─── Scans ────────────────────────────────────────────────────────────────────
export const scanApi = {
  getAll: (params = {}) => http.get('/scans', { params }),   // ?page&limit&search&category
  getOne: (slug)         => http.get(`/scans/${slug}`),
  create: (data)         => http.post('/scans', data),
  update: (slug, data)   => http.put(`/scans/${slug}`, data),
  remove: (slug)         => http.delete(`/scans/${slug}`),
}

// ─── Articles ─────────────────────────────────────────────────────────────────
export const articleApi = {
  getAll: (params = {}) => http.get('/articles', { params }), // ?page&limit&search&category&featured
  getOne: (slug)         => http.get(`/articles/${slug}`),
  create: (data)         => http.post('/articles', data),
  update: (slug, data)   => http.put(`/articles/${slug}`, data),
  remove: (slug)         => http.delete(`/articles/${slug}`),
}

// ─── Auth ─────────────────────────────────────────────────────────────────────
export const authApi = {
  login:  (credentials) => http.post('/auth/login', credentials),
  logout: ()            => http.post('/auth/logout'),
  me:     ()            => http.get('/auth/me'),
}

// ─── Comments ─────────────────────────────────────────────────────────────────
export const commentApi = {
  getAll:  (params = {}) => http.get('/comments', { params }), // ?entity_type&entity_id
  create:  (data)        => http.post('/comments', data),
  approve: (id)          => http.put(`/comments/${id}/approve`),
  remove:  (id)          => http.delete(`/comments/${id}`),
}

export default http
