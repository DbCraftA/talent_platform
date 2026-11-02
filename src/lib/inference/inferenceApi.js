import { postJson, readApiError } from '../http/postJson.js'

export const INFERENCE_API_URL = import.meta.env?.VITE_INFERENCE_API_URL || 'https://ocubaw95nd.execute-api.eu-west-3.amazonaws.com/dev/inference'
export const STUDY_SHARE_API_URL = import.meta.env?.VITE_STUDY_SHARE_API_URL || resolveStudyShareApiUrl(INFERENCE_API_URL)

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

export async function callInferenceApi(payload, { timeoutMs = 30000 } = {}) {
  return postJson(INFERENCE_API_URL, payload, {
    timeoutMs,
    createHttpError: async (response) => {
      const detail = await response.text().catch(() => '')
      return new Error(`Inference API returned ${response.status}${detail ? `: ${detail}` : ''}`)
    },
  })
}

export async function shareStudy(payload, { timeoutMs = 30000 } = {}) {
  return postJson(STUDY_SHARE_API_URL, payload, {
    timeoutMs,
    createHttpError: async (response) => {
      const message = await readApiError(response)
      const error = new Error(message || `Study share API returned ${response.status}`)
      error.status = response.status
      error.responseMessage = message
      return error
    },
  })
}
