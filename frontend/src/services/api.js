// api.js
// Central API service for all backend communication
// Handles: contract upload, analysis, comparison, settings

import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor for adding auth tokens (if needed)
api.interceptors.request.use(
  (config) => {
    // Add auth token if available
    const token = localStorage.getItem('authToken')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message)
    return Promise.reject(error)
  }
)

// ===== Contract Analysis APIs =====

export const analyzeContract = async (formData) => {
  const response = await api.post('/contracts/analyze', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
  return response.data
}

export const analyzeTextContract = async (text) => {
  const response = await api.post('/contracts/analyze-text', { text })
  return response.data
}

// ===== Chat APIs =====

export const sendChatMessage = async (contractId, message) => {
  const response = await api.post('/chat/message', {
    contractId,
    message,
  })
  return response.data
}

export const getChatHistory = async (contractId) => {
  const response = await api.get(`/chat/history/${contractId}`)
  return response.data
}

// ===== Contract Library APIs =====

export const getAllContracts = async () => {
  const response = await api.get('/contracts')
  return response.data
}

export const getContractById = async (contractId) => {
  const response = await api.get(`/contracts/${contractId}`)
  return response.data
}

export const deleteContract = async (contractId) => {
  const response = await api.delete(`/contracts/${contractId}`)
  return response.data
}

export const searchContracts = async (query) => {
  const response = await api.get('/contracts/search', {
    params: { q: query },
  })
  return response.data
}

// ===== Comparison APIs =====

export const compareContracts = async (contractIds) => {
  const response = await api.post('/contracts/compare', {
    contractIds,
  })
  return response.data
}

export const getRecommendation = async (contractIds, weights = null) => {
  const response = await api.post('/contracts/recommendation', {
    contractIds,
    weights,
  })
  return response.data
}

// ===== Settings APIs =====

export const getSettings = async () => {
  const response = await api.get('/settings')
  return response.data
}

export const updateSettings = async (settings) => {
  const response = await api.put('/settings', settings)
  return response.data
}

export const updateRedLines = async (redLines) => {
  const response = await api.put('/settings/red-lines', { redLines })
  return response.data
}

// ===== Portfolio APIs =====

export const getPortfolioMetrics = async () => {
  const response = await api.get('/portfolio/metrics')
  return response.data
}

export const portfolioQuery = async (query) => {
  const response = await api.post('/portfolio/query', { query })
  return response.data
}

export default api
