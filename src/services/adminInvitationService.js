import { demoEngagements } from '../mocks/engagements.js'
import { getMockPublishedMission, listMockAdminMissions } from './adminMissionService.js'
import { getMockTalent } from './talentService.js'
import { getMockMissionApplications } from './missionService.js'
import { getMockInvitationResponses } from './engagementService.js'

const prefix = 'wenovat:admin-invitation:v1:'
const retained = new Map()
let activeStorage

function storage() {
  try { return globalThis.localStorage } catch { return null }
}

function valid(entry, missionId) {
  return entry && entry.id === `admin-invitation:demo-freelance:${missionId}`
    && entry.talentId === 'demo-freelance' && entry.missionId === missionId
    && entry.type === 'INVITATION' && ['PENDING', 'CANCELLED'].includes(entry.status)
    && typeof entry.createdAt === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(entry.createdAt)
}

export function getMockAdminInvitation(missionId) {
  if (import.meta.env?.PROD || typeof missionId !== 'string') return null
  let saved
  const target = storage()
  if (target !== activeStorage) { retained.clear(); activeStorage = target }
  try { saved = JSON.parse(target?.getItem(`${prefix}${missionId}`) ?? 'null') } catch { /* Ignore malformed local state. */ }
  const entry = valid(retained.get(missionId), missionId) ? retained.get(missionId) : valid(saved, missionId) ? saved : null
  return entry ? { ...entry } : null
}

export function getMockAdminInvitationResponse(missionId) {
  const invitation = getMockAdminInvitation(missionId)
  if (invitation?.status !== 'PENDING') return null
  const response = getMockInvitationResponses('demo-freelance')[invitation.id]
  return { id: invitation.id, status: response?.status ?? response ?? 'PENDING' }
}

export function listMockAdminInvitations(talentId) {
  if (talentId !== 'demo-freelance' || import.meta.env?.PROD) return []
  const target = storage()
  if (target !== activeStorage) { retained.clear(); activeStorage = target }
  return [...new Set([...listMockAdminMissions().map((mission) => mission.id), ...retained.keys()])]
    .map(getMockAdminInvitation).filter(Boolean)
}

function persist(entry) {
  const target = storage()
  if (target !== activeStorage) { retained.clear(); activeStorage = target }
  retained.set(entry.missionId, { ...entry })
  try { target?.setItem(`${prefix}${entry.missionId}`, JSON.stringify(entry)) } catch { /* In-memory fallback. */ }
  return { ...entry }
}

export function hasExistingMockEngagement(missionId) {
  return demoEngagements.some((entry) => entry.talentId === 'demo-freelance' && entry.missionId === missionId)
    || getMockMissionApplications('demo-freelance').some((entry) => entry.missionId === missionId)
}

export function createMockAdminInvitation(missionId, session) {
  if (import.meta.env?.PROD || session?.role !== 'ADMIN') throw new Error('Invitation réservée à l’administrateur de démonstration.')
  const mission = getMockPublishedMission(missionId)
  const talent = getMockTalent({ id: 'demo-freelance', role: 'FREELANCE' })
  if (!mission || talent?.source !== 'WENOVAT' || (mission.access === 'PREMIUM' && talent.qualificationStatus !== 'QUALIFIED')) return null
  if (hasExistingMockEngagement(missionId)) return null
  const previous = getMockAdminInvitation(missionId)
  if (previous?.status === 'PENDING') return previous
  if (previous?.status === 'CANCELLED') return null
  return persist({ id: `admin-invitation:demo-freelance:${missionId}`, talentId: 'demo-freelance', missionId, type: 'INVITATION', status: 'PENDING', createdAt: new Date().toISOString().slice(0, 10) })
}

export function cancelMockAdminInvitation(missionId, session) {
  if (import.meta.env?.PROD || session?.role !== 'ADMIN') throw new Error('Action réservée à l’administrateur de démonstration.')
  const previous = getMockAdminInvitation(missionId)
  return previous?.status === 'PENDING' ? persist({ ...previous, status: 'CANCELLED' }) : previous
}
