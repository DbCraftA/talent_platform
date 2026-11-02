import { postJson, readApiError } from '../http/postJson.js'
import { validateDevelopmentResult } from './contract.js'

function requireUrl(url, key) {
  if (typeof url !== 'string' || !url.trim()) throw new Error(`URL non configurée : ${key}`)
}

async function developmentHttpError(response, label) {
  const message = await readApiError(response)
  const error = new Error(message || `${label} returned ${response.status}`)
  error.status = response.status
  error.responseMessage = message
  return error
}

export async function callDevelopmentAssessment(payload, { timeoutMs = 30000, url = import.meta.env?.VITE_DEV_AI_ASSESSMENT_API_URL } = {}) {
  requireUrl(url, 'VITE_DEV_AI_ASSESSMENT_API_URL')
  const result = await postJson(url, payload, {
    timeoutMs,
    createHttpError: (response) => developmentHttpError(response, 'Development assessment API'),
  })
  return validateDevelopmentResult(result)
}

export function buildDevelopmentSharePayload(recipient, comment, website, study) {
  validateDevelopmentResult(study)
  return { recipient, comment: comment ?? '', website: website ?? '', study }
}

export async function shareDevelopmentStudy(payload, { timeoutMs = 30000, url = import.meta.env?.VITE_DEV_AI_STUDY_SHARE_API_URL } = {}) {
  requireUrl(url, 'VITE_DEV_AI_STUDY_SHARE_API_URL')
  validateDevelopmentResult(payload?.study)
  return postJson(url, payload, {
    timeoutMs,
    createHttpError: (response) => developmentHttpError(response, 'Development study share API'),
  })
}
