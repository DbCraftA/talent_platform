import { expertiseOptions } from '../mocks/talents.js'

const storageKey = 'wenovat:admin-external-talents:v1'
const allowedExpertise = new Set(expertiseOptions.map(({ value }) => value))
const origins = new Set(['PROFESSIONAL_NETWORK', 'AUTHORIZED_SEARCH', 'REFERRAL', 'OTHER'])
const availabilities = new Set(['UNKNOWN', 'IMMEDIATE', 'WITHIN_MONTH', 'LATER'])
const contactStatuses = new Set(['NOT_CONTACTED', 'CONTACTED', 'DO_NOT_CONTACT'])
let retained = []
let activeStorage

const clean = (value) => typeof value === 'string' ? value.trim() : ''

function validTalent(entry) {
  return entry && typeof entry.id === 'string' && /^demo-external-[a-z0-9-]+$/i.test(entry.id)
    && entry.source === 'EXTERNAL' && entry.qualificationStatus === 'NOT_EVALUATED'
    && entry.profileStatus === 'SOURCED'
    && clean(entry.firstName) && clean(entry.lastName) && clean(entry.architectTitle)
    && origins.has(entry.originChannel) && (entry.originChannel !== 'OTHER' || clean(entry.originDetails))
    && Array.isArray(entry.expertise) && entry.expertise.length > 0
    && entry.expertise.every((item) => allowedExpertise.has(item))
    && typeof entry.location === 'string' && availabilities.has(entry.availability)
    && contactStatuses.has(entry.contactStatus)
    && typeof entry.contactNotes === 'string' && typeof entry.emailAuthorized === 'boolean'
    && typeof entry.contactAuthorizationStatus === 'string'
    && ['NOT_CONFIRMED', 'DEMO_AUTHORIZED'].includes(entry.contactAuthorizationStatus)
    && entry.contactAuthorizationStatus === (entry.emailAuthorized ? 'DEMO_AUTHORIZED' : 'NOT_CONFIRMED')
    && typeof entry.contact?.email === 'string'
    && (!entry.contact.email || (entry.emailAuthorized && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(entry.contact.email)))
    && (entry.contactStatus !== 'DO_NOT_CONTACT' || !entry.emailAuthorized)
    && (entry.contactStatus !== 'CONTACTED' || clean(entry.contactNotes))
}

export function listStoredExternalTalents() {
  if (import.meta.env?.PROD) return []
  let target
  try { target = globalThis.localStorage } catch { target = null }
  if (target !== activeStorage) {
    activeStorage = target
    retained = []
  }
  let stored = []
  try {
    const raw = target?.getItem(storageKey)
    if (raw !== null && raw !== undefined) {
      const entries = JSON.parse(raw)
      if (Array.isArray(entries)) {
        const ids = new Set()
        if (entries.every((entry) => {
          if (!validTalent(entry) || ids.has(entry.id)) return false
          ids.add(entry.id)
          return true
        })) stored = entries
      }
    }
  } catch {
    // Invalid or inaccessible browser storage falls back to this visit's records.
  }
  return structuredClone([...stored, ...retained.filter((entry) => !stored.some((item) => item.id === entry.id))])
}

export function getStoredExternalTalent(id) {
  if (!/^demo-external-[a-z0-9-]+$/i.test(id ?? '')) return null
  return listStoredExternalTalents().find((entry) => entry.id === id) ?? null
}

export function storeExternalTalent(talent) {
  if (!validTalent(talent)) throw new Error('Profil externe invalide.')
  const entries = listStoredExternalTalents()
  if (entries.some((entry) => entry.id === talent.id)) throw new Error('Identifiant de profil déjà utilisé.')
  entries.push(structuredClone(talent))
  retained = structuredClone(entries)
  let persisted = false
  try {
    if (activeStorage) {
      activeStorage.setItem(storageKey, JSON.stringify(entries))
      persisted = true
    }
  } catch {
    // In-memory records remain visible during this visit.
  }
  return persisted
}
