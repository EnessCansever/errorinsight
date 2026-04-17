import { buildApiUrl } from './apiConfig'

const NETWORK_ERROR_MESSAGE = 'Sunucuya ulaşılamadı. İnternet bağlantınızı veya ağ erişimini kontrol edin.'
const INVALID_RESPONSE_MESSAGE = 'Sunucudan geçersiz bir yanıt alındı.'

async function parseResponseBody(response) {
  const rawBody = await response.text()

  if (!rawBody) {
    return null
  }

  try {
    return JSON.parse(rawBody)
  } catch {
    return null
  }
}

function getErrorMessageFromBody(body, fallbackMessage) {
  if (!body || typeof body !== 'object') {
    return fallbackMessage
  }

  if (typeof body.error === 'string' && body.error.trim()) {
    return body.error
  }

  if (typeof body.message === 'string' && body.message.trim()) {
    return body.message
  }

  return fallbackMessage
}

async function requestJson(url, options, fallbackMessage) {
  let response

  try {
    response = await fetch(url, options)
  } catch {
    throw new Error(NETWORK_ERROR_MESSAGE)
  }

  const result = await parseResponseBody(response)

  if (!response.ok) {
    throw new Error(getErrorMessageFromBody(result, fallbackMessage))
  }

  if (result === null) {
    throw new Error(INVALID_RESPONSE_MESSAGE)
  }

  return result
}

export async function registerUser(name, email, password) {
  const result = await requestJson(
    buildApiUrl('/auth/register'),
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }),
    },
    'Kayıt işlemi sırasında bir hata oluştu.',
  )

  return result.data
}

export async function loginUser(email, password) {
  const result = await requestJson(
    buildApiUrl('/auth/login'),
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    },
    'Giriş işlemi sırasında bir hata oluştu.',
  )

  return result.data
}

export async function getCurrentUser(token) {
  const result = await requestJson(
    buildApiUrl('/auth/me'),
    {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    },
    'Kullanıcı bilgisi alınamadı.',
  )

  return result.data
}
