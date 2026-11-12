export async function readApiError(response) {
  const contentType = response.headers.get('content-type') || ''
  if (contentType.includes('application/json')) {
    const body = await response.json().catch(() => null)
    return body?.message || body?.error || ''
  }
  return response.text().catch(() => '')
}

export async function postJson(url, payload, { timeoutMs = 30000, createHttpError } = {}) {
  const controller = new AbortController()
  const timers = typeof window === 'undefined' ? globalThis : window
  const timeout = timers.setTimeout(() => controller.abort(), timeoutMs)

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal: controller.signal,
    })

    if (!response.ok) {
      throw createHttpError ? await createHttpError(response) : new Error(`HTTP ${response.status}`)
    }

    return response.json()
  } finally {
    timers.clearTimeout(timeout)
  }
}
