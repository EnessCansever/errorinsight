const rawApiBaseUrl = import.meta.env.VITE_API_BASE_URL?.trim()
const isProduction = import.meta.env.PROD

if (isProduction && !rawApiBaseUrl) {
  throw new Error('VITE_API_BASE_URL eksik. Production ortamında API adresi zorunludur.')
}

const fallbackApiBaseUrl = 'http://localhost:5000/api'

export const API_BASE_URL = (rawApiBaseUrl || fallbackApiBaseUrl).replace(/\/+$/, '')

export function buildApiUrl(path) {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`
  return `${API_BASE_URL}${normalizedPath}`
}