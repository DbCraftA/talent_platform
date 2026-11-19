import { adminMissionExamples, adminPendingMissionExamples, demoMissions } from '../mocks/missions.js'

const storageKey = 'wenovat:admin-mission-status:v1'
const currentStatuses = new Map()
const publicMissions = new Map([...demoMissions, ...adminPendingMissionExamples].map(({ organization, source, owner, receivedAt, ...mission }) => [mission.id, mission]))
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

export function listMockAdminMissions() {
  return [...adminMissions.values()].map((mission) => ({ ...mission, status: statusFor(mission.id) }))
}

export function getMockAdminMission(id) {
  const mission = adminMissions.get(id)
  return mission ? { ...mission, status: statusFor(id) } : null
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
