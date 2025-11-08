// utils.js
// Utility functions for formatting, validation, and common operations

import { format, formatDistance, differenceInDays } from 'date-fns'

// ===== Date Formatting =====

export const formatDate = (date) => {
  if (!date) return 'N/A'
  return format(new Date(date), 'MMM dd, yyyy')
}

export const formatDateTime = (date) => {
  if (!date) return 'N/A'
  return format(new Date(date), 'MMM dd, yyyy HH:mm')
}

export const formatRelativeDate = (date) => {
  if (!date) return 'N/A'
  return formatDistance(new Date(date), new Date(), { addSuffix: true })
}

export const getDaysUntil = (date) => {
  if (!date) return null
  return differenceInDays(new Date(date), new Date())
}

// ===== Risk Calculations =====

export const calculateRiskScore = (criticalIssues = 0, moderateIssues = 0, redLineViolations = 0) => {
  return (criticalIssues * 3) + (moderateIssues * 1.5) + (redLineViolations * 5)
}

export const getRiskLevel = (score) => {
  if (score <= 5) return 'low'
  if (score <= 12) return 'medium'
  return 'high'
}

export const getRiskColor = (level) => {
  const colors = {
    low: 'text-green-700 bg-green-50 border-green-200',
    medium: 'text-yellow-700 bg-yellow-50 border-yellow-200',
    high: 'text-red-700 bg-red-50 border-red-200',
  }
  return colors[level] || colors.medium
}

// ===== Value Formatting =====

export const formatCurrency = (value) => {
  if (!value) return '$0'
  
  const num = typeof value === 'string' 
    ? parseInt(value.replace(/[^0-9]/g, '')) 
    : value

  if (num >= 1000000) {
    return `$${(num / 1000000).toFixed(1)}M`
  }
  if (num >= 1000) {
    return `$${(num / 1000).toFixed(0)}K`
  }
  return `$${num.toLocaleString()}`
}

export const parseContractValue = (valueString) => {
  if (!valueString) return 0
  const num = valueString.replace(/[^0-9]/g, '')
  return parseInt(num)
}

// ===== File Handling =====

export const getFileExtension = (filename) => {
  return filename.split('.').pop().toLowerCase()
}

export const isValidFileType = (filename, allowedTypes = ['pdf', 'jpg', 'jpeg', 'png', 'txt']) => {
  const ext = getFileExtension(filename)
  return allowedTypes.includes(ext)
}

export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i]
}

// ===== Text Processing =====

export const truncateText = (text, maxLength = 100) => {
  if (!text || text.length <= maxLength) return text
  return text.substring(0, maxLength) + '...'
}

export const highlightText = (text, query) => {
  if (!query) return text
  const regex = new RegExp(`(${query})`, 'gi')
  return text.replace(regex, '<mark>$1</mark>')
}

// ===== Contract Comparison Helpers =====

export const compareValues = (value1, value2, type = 'number') => {
  if (type === 'number') {
    return value1 - value2
  }
  if (type === 'string') {
    return value1.localeCompare(value2)
  }
  return 0
}

export const getBestContractByScore = (contracts) => {
  if (!contracts || contracts.length === 0) return null
  return contracts.reduce((best, current) => {
    const bestScore = best.riskScore?.score || 0
    const currentScore = current.riskScore?.score || 0
    return currentScore < bestScore ? current : best
  })
}

// ===== Validation =====

export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return regex.test(email)
}

export const validateRequired = (value) => {
  return value && value.toString().trim().length > 0
}

// ===== Storage Helpers =====

export const saveToLocalStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value))
    return true
  } catch (error) {
    console.error('Error saving to localStorage:', error)
    return false
  }
}

export const loadFromLocalStorage = (key, defaultValue = null) => {
  try {
    const item = localStorage.getItem(key)
    return item ? JSON.parse(item) : defaultValue
  } catch (error) {
    console.error('Error loading from localStorage:', error)
    return defaultValue
  }
}

// ===== Citation Helpers =====

export const parseCitation = (citationString) => {
  // Parse "Section 8.2, Page 4" into structured data
  const parts = citationString.split(',').map(p => p.trim())
  return {
    section: parts[0]?.replace('Section ', ''),
    page: parts[1]?.replace('Page ', ''),
    full: citationString,
  }
}

// ===== Export Helpers =====

export const downloadJSON = (data, filename = 'contract-analysis.json') => {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  link.click()
  URL.revokeObjectURL(url)
}

export const downloadCSV = (data, filename = 'contracts.csv') => {
  // Simple CSV export for arrays of objects
  if (!data || data.length === 0) return

  const headers = Object.keys(data[0])
  const csvContent = [
    headers.join(','),
    ...data.map(row => headers.map(header => JSON.stringify(row[header] || '')).join(','))
  ].join('\n')

  const blob = new Blob([csvContent], { type: 'text/csv' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  link.click()
  URL.revokeObjectURL(url)
}

export default {
  formatDate,
  formatDateTime,
  formatRelativeDate,
  getDaysUntil,
  calculateRiskScore,
  getRiskLevel,
  getRiskColor,
  formatCurrency,
  parseContractValue,
  getFileExtension,
  isValidFileType,
  formatFileSize,
  truncateText,
  highlightText,
  compareValues,
  getBestContractByScore,
  validateEmail,
  validateRequired,
  saveToLocalStorage,
  loadFromLocalStorage,
  parseCitation,
  downloadJSON,
  downloadCSV,
}
