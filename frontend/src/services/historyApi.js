import { buildApiUrl } from './apiConfig'
import { getAuthHeaders, requestJson } from './authApi'

const HISTORY_AUTH_ERROR_MESSAGE = 'Oturumunuzun süresi doldu. Geçmişe erişmek için tekrar giriş yapın.'

function buildQueryString(params = {}) {
  const searchParams = new URLSearchParams()

  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined || value === null || value === '') {
      return
    }

    searchParams.set(key, String(value))
  })

  const queryString = searchParams.toString()

  return queryString ? `?${queryString}` : ''
}

export async function getHistoryList(params = {}) {
  const result = await requestJson(
    buildApiUrl(`/history${buildQueryString(params)}`),
    {
      method: 'GET',
      headers: {
        ...getAuthHeaders(),
      },
    },
    'Geçmiş kayıtları alınamadı.',
    {
      authErrorMessage: HISTORY_AUTH_ERROR_MESSAGE,
      emitUnauthorizedEvent: true,
    },
  )

  return result.data
}

export async function getHistoryDetail(id) {
  const result = await requestJson(
    buildApiUrl(`/history/${id}`),
    {
      method: 'GET',
      headers: {
        ...getAuthHeaders(),
      },
    },
    'Kayıt detayı alınamadı.',
    {
      authErrorMessage: HISTORY_AUTH_ERROR_MESSAGE,
      emitUnauthorizedEvent: true,
    },
  )

  return result.data
}

export async function deleteHistory(id) {
  const result = await requestJson(
    buildApiUrl(`/history/${id}`),
    {
      method: 'DELETE',
      headers: {
        ...getAuthHeaders(),
      },
    },
    'Kayıt silinemedi.',
    {
      authErrorMessage: HISTORY_AUTH_ERROR_MESSAGE,
      emitUnauthorizedEvent: true,
    },
  )

  return result.data
}

export async function sendHistoryFeedback(id, feedbackType) {
  const result = await requestJson(
    buildApiUrl(`/history/${id}/feedback`),
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeaders(),
      },
      body: JSON.stringify({ feedbackType }),
    },
    'Geri bildirim gönderilemedi.',
    {
      authErrorMessage: HISTORY_AUTH_ERROR_MESSAGE,
      emitUnauthorizedEvent: true,
    },
  )

  return result.data
}
