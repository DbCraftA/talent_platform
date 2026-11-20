import { adminMissionExamples, adminPendingMissionExamples, demoMissions } from '../mocks/missions.js'

const storageKey = 'wenovat:admin-mission-status:v1'
const currentStatuses = new Map()
const relationStorageKey = 'wenovat:admin-mission-relations:v1'
let currentRelations = null
let relationStorage
const publicMissions = new Map([...demoMissions, ...adminPendingMissionExamples].map(({ organizationId, organization, source, owner, receivedAt, ...mission }) => [mission.id, mission]))
const adminMissions = new Map([
  ...demoMissions.map((mission) => ({ ...mission, ...adminMissionExamples.find(({ id }) => id === mission.id) })),
  ...adminPendingMissionExamples,
].map((mission) => [mission.id, { ...mission, tier: mission.access }]))

function readStatuses() {
  let stored
  try {
    stored = JSON.parse(globalThis.localStorage?.getItem(storageKey) ?? 'null')
  } catch {
    // Memory state remains available if browser storage is blocked.
  }
  return stored && typeof stored === 'object' && !Array.isArray(stored) ? stored : {}
}

function statusFor(id) {
  const initial = adminMissions.get(id)?.status
  const validStatuses = initial === 'PENDING_REVIEW' ? ['APPROVED', 'PUBLISHED'] : initial === 'APPROVED' ? ['PUBLISHED'] : []
  const saved = currentStatuses.get(id) ?? readStatuses()[id]
  return validStatuses.includes(saved) ? saved : initial
}

function relations() {
  let storage = null
  try { storage = globalThis.localStorage } catch { /* Browser storage can be unavailable. */ }
  if (storage !== relationStorage) { currentRelations = null; relationStorage = storage }
  if (currentRelations) return currentRelations
  let saved
  try { saved = JSON.parse(storage?.getItem(relationStorageKey) ?? 'null') } catch { /* Ignore corrupt local data. */ }
  currentRelations = {}
  if (saved && typeof saved === 'object' && !Array.isArray(saved)) {
    for (const [id, entry] of Object.entries(saved)) {
      if (adminMissions.has(id) && entry && typeof entry === 'object' && !Array.isArray(entry)
        && typeof entry.organizationId === 'string' && entry.organizationId.startsWith('org-')
        && typeof entry.organization === 'string' && entry.organization.trim() && entry.organization.length <= 120) {
        currentRelations[id] = { organizationId: entry.organizationId, organization: entry.organization }
      }
    }
  }
  return currentRelations
}

function adminMission(mission) {
  return { ...mission, ...relations()[mission.id], status: statusFor(mission.id) }
}

export function listMockAdminMissions() {
  return [...adminMissions.values()].map(adminMission)
}

export function getMockAdminMission(id) {
  const mission = adminMissions.get(id)
  return mission ? adminMission(mission) : null
}

export function setMockAdminMissionRelations(missionIds, organization, session) {
  if (import.meta.env?.PROD || session?.role !== 'ADMIN') throw new Error('Action réservée à l’administrateur de démonstration.')
  if (!organization || typeof organization.id !== 'string' || !organization.id.startsWith('org-')
    || typeof organization.name !== 'string' || !organization.name.trim() || organization.name.length > 120
    || !Array.isArray(organization.types)) throw new Error('Organisation cible invalide.')
  if (!Array.isArray(missionIds) || !missionIds.every((id) => typeof id === 'string') || new Set(missionIds).size !== missionIds.length) throw new Error('Sélection de missions invalide ou en doublon.')
  for (const id of missionIds) {
    const mission = adminMissions.get(id)
    if (!mission) throw new Error('Mission fictive introuvable.')
    const requiredRole = mission.source === 'ESN' ? 'ESN' : 'CLIENT'
    if (!organization.types.includes(requiredRole)) throw new Error(`La mission « ${mission.title} » requiert le rôle ${requiredRole === 'ESN' ? 'ESN' : 'Client direct'}.`)
  }
  if (!missionIds.length) return { persisted: true, changed: false }
  const next = { ...relations() }
  let changed = false
  for (const id of missionIds) {
    const existing = getMockAdminMission(id)
    if (existing.organizationId !== organization.id || existing.organization !== organization.name) changed = true
    next[id] = { organizationId: organization.id, organization: organization.name }
  }
  if (!changed) return { persisted: false, changed: false }
  currentRelations = next
  let persisted = false
  try {
    if (relationStorage) { relationStorage.setItem(relationStorageKey, JSON.stringify(next)); persisted = true }
  } catch { /* Keep the changes in memory during this visit. */ }
  return { persisted, changed: true }
}

export function renameMockAdminMissionOrganization(id, name, session) {
  if (import.meta.env?.PROD || session?.role !== 'ADMIN') throw new Error('Action réservée à l’administrateur de démonstration.')
  if (typeof id !== 'string' || !id.startsWith('org-') || typeof name !== 'string' || !name.trim() || name.length > 120) throw new Error('Organisation cible invalide.')
  const missionIds = listMockAdminMissions().filter((mission) => mission.organizationId === id).map((mission) => mission.id)
  if (!missionIds.length) return { persisted: true, changed: false }
  const next = { ...relations() }
  for (const missionId of missionIds) next[missionId] = { organizationId: id, organization: name.trim() }
  currentRelations = next
  let persisted = false
  try {
    if (relationStorage) { relationStorage.setItem(relationStorageKey, JSON.stringify(next)); persisted = true }
  } catch { /* Keep the new labels in memory during this visit. */ }
  return { persisted, changed: true }
}

export function getMockPublishedMission(id) {
  const mission = publicMissions.get(id)
  return mission && statusFor(id) === 'PUBLISHED' ? { ...mission, status: 'PUBLISHED' } : null
}

export function listMockPublishedMissions() {
  return [...publicMissions.keys()].map(getMockPublishedMission).filter(Boolean)
}

function transition(id, from, to, session) {
  if (import.meta.env?.PROD || session?.role !== 'ADMIN') throw new Error('Action réservée à l’administrateur de démonstration.')
  const mission = getMockAdminMission(id)
  if (!mission) throw new Error('Mission fictive introuvable.')
  if (mission.status !== from) throw new Error(`Action indisponible pour une mission au statut ${mission.status}.`)
  currentStatuses.set(id, to)
  let persisted = false
  try {
    const target = globalThis.localStorage
    if (target) {
      target.setItem(storageKey, JSON.stringify({ ...readStatuses(), [id]: to }))
      persisted = true
    }
  } catch {
    // In-memory status remains available for this visit.
  }
  return { mission: getMockAdminMission(id), persisted }
}

export function validateMockMission(id, session) {
  return transition(id, 'PENDING_REVIEW', 'APPROVED', session)
}

export function publishMockMission(id, session) {
  return transition(id, 'APPROVED', 'PUBLISHED', session)
}
