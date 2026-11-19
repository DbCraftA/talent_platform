import { adminTalentExamples } from '../mocks/talents.js'
import { getStoredExternalTalent } from './externalTalentStore.js'

const storagePrefix = 'wenovat:qualification:v1:'
const decisions = new Map()
const adminStoragePrefix = 'wenovat:admin-talent-qualification:v1:'
const adminDecisions = new Map()
const validStatuses = new Set(['NOT_EVALUATED', 'SELECTED_FOR_REVIEW', 'INTERVIEW_SCHEDULED', 'QUALIFIED', 'NOT_QUALIFIED'])

function initialStatus(talentId) {
  return adminTalentExamples.find((entry) => entry.id === talentId)?.qualificationStatus
    ?? getStoredExternalTalent(talentId)?.qualificationStatus
}

function validHistory(history, talentId, initial) {
  if (!Array.isArray(history)) return false
  let previous = initial
  const ids = new Set()
  return history.every((event) => {
    if (!event || typeof event.id !== 'string' || !event.id || ids.has(event.id)
      || event.talentId !== talentId || event.previousStatus !== previous
      || !validStatuses.has(event.nextStatus) || previous === event.nextStatus
      || typeof event.date !== 'string' || !Number.isFinite(Date.parse(event.date))
      || typeof event.reason !== 'string' || !event.reason.trim() || event.author !== 'Admin démo') return false
    ids.add(event.id)
    previous = event.nextStatus
    return true
  })
}

function adminRecord(talentId) {
  const initial = initialStatus(talentId)
  if (!initial) return null
  if (import.meta.env?.PROD) return { status: initial, history: [] }
  try {
    const raw = globalThis.localStorage?.getItem(`${adminStoragePrefix}${talentId}`)
    if (raw !== null && raw !== undefined) {
      const parsed = JSON.parse(raw)
      if (validHistory(parsed?.history, talentId, initial)
        && validStatuses.has(parsed.status)
        && parsed.status === (parsed.history.at(-1)?.nextStatus ?? initial)) {
        return parsed
      }
    }
  } catch {
    // Use the decision retained for this visit.
  }
  const retained = adminDecisions.get(talentId)
  return retained && validHistory(retained.history, talentId, initial)
    && retained.status === (retained.history.at(-1)?.nextStatus ?? initial)
    ? retained
    : { status: initial, history: [] }
}

export function getMockAdminQualification(talentId) {
  const record = adminRecord(talentId)
  return record ? { status: record.status, history: record.history.map((event) => ({ ...event })).reverse() } : null
}

export function decideMockAdminQualification(talentId, status, reason, session) {
  if (import.meta.env?.PROD || session?.role !== 'ADMIN') throw new Error('Décision réservée à l’administrateur de démonstration.')
  const record = adminRecord(talentId)
  if (!record) throw new Error('Talent introuvable.')
  if (!validStatuses.has(status)) throw new Error('Statut de qualification invalide.')
  if (record.status === status) throw new Error('Ce statut est déjà appliqué.')
  if (typeof reason !== 'string' || !reason.trim()) throw new Error('Renseignez un motif pour confirmer la décision.')

  const event = {
    id: `qualification:${talentId}:${globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(36).slice(2)}`}`,
    talentId, previousStatus: record.status, nextStatus: status,
    date: new Date().toISOString(), reason: reason.trim(), author: 'Admin démo',
  }
  const updated = { status, history: [...record.history, event] }
  adminDecisions.set(talentId, updated)
  let persisted = false
  try {
    if (globalThis.localStorage) {
      globalThis.localStorage.setItem(`${adminStoragePrefix}${talentId}`, JSON.stringify(updated))
      persisted = true
    }
  } catch {
    // The decision remains available in memory during this visit.
  }
  return { event: { ...event }, persisted }
}

export function getMockQualification(talentId) {
  if (import.meta.env?.PROD) return 'NOT_EVALUATED'
  try {
    const stored = globalThis.localStorage?.getItem(`${storagePrefix}${talentId}`)
    if (stored === 'QUALIFIED') return 'QUALIFIED'
    if (stored === 'NOT_EVALUATED') return 'NOT_EVALUATED'
  } catch {
    // Use the decision retained for this visit.
  }
  return decisions.get(talentId) ?? 'NOT_EVALUATED'
}

export function setMockQualification(talentId, status, session) {
  if (import.meta.env?.PROD || session?.role !== 'ADMIN' || talentId !== 'demo-freelance' || !['QUALIFIED', 'NOT_EVALUATED'].includes(status)) {
    throw new Error('Décision administrateur de démonstration indisponible.')
  }
  decisions.set(talentId, status)
  try {
    globalThis.localStorage?.setItem(`${storagePrefix}${talentId}`, status)
  } catch {
    // The decision remains visible during this visit.
  }
  return status
}
