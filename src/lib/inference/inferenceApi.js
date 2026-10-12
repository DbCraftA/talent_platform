export const INFERENCE_API_URL = import.meta.env.VITE_INFERENCE_API_URL || 'https://ocubaw95nd.execute-api.eu-west-3.amazonaws.com/dev/inference'
export const STUDY_SHARE_API_URL = import.meta.env.VITE_STUDY_SHARE_API_URL || resolveStudyShareApiUrl(INFERENCE_API_URL)

const apiHeaders = {
  'Content-Type': 'application/json',
}

function resolveStudyShareApiUrl(inferenceApiUrl) {
  if (inferenceApiUrl === '/api/inference') return '/api/study'
  if (inferenceApiUrl.startsWith('/')) return '/study'

  try {
    const url = new URL(inferenceApiUrl)
    if (url.pathname.endsWith('/v1/inference/estimate')) {
      url.pathname = url.pathname.replace(/\/v1\/inference\/estimate$/, '/v1/study')
      return url.toString()
    }
    if (url.pathname.endsWith('/inference/estimate')) {
      url.pathname = url.pathname.replace(/\/inference\/estimate$/, '/study')
      return url.toString()
    }
    if (url.pathname.endsWith('/inference')) {
      url.pathname = url.pathname.replace(/\/inference$/, '/study')
      return url.toString()
    }
    url.pathname = '/study'
    return url.toString()
  } catch {
    return '/study'
  }
}

async function parseApiError(response) {
  const contentType = response.headers.get('content-type') || ''
  if (contentType.includes('application/json')) {
    const body = await response.json().catch(() => null)
    return body?.message || body?.error || ''
  }
  return response.text().catch(() => '')
}

export async function callInferenceApi(payload, { timeoutMs = 30000 } = {}) {
  const controller = new AbortController()
  const timeout = window.setTimeout(() => controller.abort(), timeoutMs)

  try {
    const response = await fetch(INFERENCE_API_URL, {
      method: 'POST',
      headers: apiHeaders,
      body: JSON.stringify(payload),
      signal: controller.signal,
    })

    if (!response.ok) {
      const detail = await response.text().catch(() => '')
      throw new Error(`Inference API returned ${response.status}${detail ? `: ${detail}` : ''}`)
    }

    return response.json()
  } finally {
    window.clearTimeout(timeout)
  }
}

export async function shareStudy(payload, { timeoutMs = 30000 } = {}) {
  const controller = new AbortController()
  const timeout = window.setTimeout(() => controller.abort(), timeoutMs)

  try {
    const response = await fetch(STUDY_SHARE_API_URL, {
      method: 'POST',
      headers: apiHeaders,
      body: JSON.stringify(payload),
      signal: controller.signal,
    })

    if (!response.ok) {
      const message = await parseApiError(response)
      const error = new Error(message || `Study share API returned ${response.status}`)
      error.status = response.status
      error.responseMessage = message
      throw error
    }

    return response.json()
  } finally {
    window.clearTimeout(timeout)
  }
}
