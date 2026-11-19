import { demoEngagements } from '../mocks/engagements.js'
import { getMockInvitationResponses } from './engagementService.js'
import { listMockPublishedMissions } from './adminMissionService.js'
import { listMockAdminInvitations } from './adminInvitationService.js'

const applicationPrefix = 'wenovat:mission-applications:v1:'
const applications = new Map()
const publicFields = ['id', 'title', 'expertise', 'technologies', 'location', 'remote', 'dailyRate', 'startDate', 'availability', 'duration', 'publishedAt', 'summary', 'context', 'objectives', 'expectedSkills', 'access', 'visibility', 'status']

export function getMockMissionApplications(talentId) {
  if (!talentId) return []
  let stored = []
  try {
    const value = JSON.parse(globalThis.localStorage?.getItem(`${applicationPrefix}${talentId}`) ?? '[]')
    if (Array.isArray(value)) stored = value
  } catch {
    // Keep applications made during this visit when storage is unavailable.
  }
  const byMission = new Map()
  for (const entry of [...stored, ...(applications.get(talentId) ?? [])]) {
    if (entry?.talentId === talentId && typeof entry.missionId === 'string' && entry.missionId && entry.type === 'APPLICATION' && entry.status === 'RECEIVED') {
      const existing = byMission.get(entry.missionId)
      const createdAt = typeof entry.createdAt === 'string' ? entry.createdAt : existing?.createdAt
      byMission.set(entry.missionId, { id: `application:${talentId}:${entry.missionId}`, talentId, missionId: entry.missionId, type: 'APPLICATION', status: 'RECEIVED', ...(createdAt ? { createdAt } : {}) })
    }
  }
  return [...byMission.values()]
}

export function getAccessibleMissions(talent, missions = listMockPublishedMissions(), engagements = demoEngagements, responses = talent?.id ? getMockInvitationResponses(talent.id) : {}) {
  if (!talent?.id || talent.source !== 'WENOVAT') return []
  const invitations = talent.id === 'demo-freelance' ? [...engagements, ...listMockAdminInvitations(talent.id)] : engagements
  return missions
    .filter((mission) => {
      if (mission.status !== 'PUBLISHED' || !['STANDARD', 'PREMIUM'].includes(mission.access)) return false
      if (mission.access === 'PREMIUM' && talent.qualificationStatus !== 'QUALIFIED') return false
      if (mission.visibility === 'CATALOG') return true
      if (mission.visibility !== 'INVITE_ONLY') return false
      return invitations.some((engagement) =>
        engagement.talentId === talent.id && engagement.missionId === mission.id
        && engagement.type === 'INVITATION' && engagement.status === 'PENDING'
        && !['DECLINED', 'UNAVAILABLE'].includes(responses[engagement.id]?.status ?? responses[engagement.id])
      )
    })
    .map(getPublicMissionSnapshot)
}

export function getAccessibleMission(id, talent, missions = listMockPublishedMissions(), engagements = demoEngagements, responses) {
  return getAccessibleMissions(talent, missions, engagements, responses).find((mission) => mission.id === id) ?? null
}

export function getPublicMissionSnapshot(mission) {
  return mission ? Object.fromEntries(publicFields.filter((key) => key in mission).map((key) => [key, Array.isArray(mission[key]) ? [...mission[key]] : mission[key]])) : null
}

export function applyToMockMission(missionId, talent, missions = listMockPublishedMissions(), engagements = demoEngagements) {
  if (import.meta.env?.PROD || !talent?.id || talent.source !== 'WENOVAT') throw new Error('Candidature de démonstration indisponible.')
  if (!getAccessibleMission(missionId, talent, missions, engagements)) throw new Error('Cette mission n’est pas accessible.')

  const alreadyApplied = engagements.some((engagement) =>
    engagement.talentId === talent.id && engagement.missionId === missionId
    && engagement.type === 'APPLICATION' && ['IN_PROGRESS', 'RECEIVED', 'REJECTED', 'SHORTLISTED'].includes(engagement.status)
  ) || getMockMissionApplications(talent.id).some((entry) => entry.missionId === missionId)
  if (alreadyApplied) throw new Error('Vous avez déjà candidaté à cette mission de démonstration.')

  const entry = { id: `application:${talent.id}:${missionId}`, talentId: talent.id, missionId, type: 'APPLICATION', status: 'RECEIVED', createdAt: new Date().toISOString().slice(0, 10) }
  const updated = [...getMockMissionApplications(talent.id), entry]
  applications.set(talent.id, updated)
  try {
    globalThis.localStorage?.setItem(`${applicationPrefix}${talent.id}`, JSON.stringify(updated))
  } catch {
    // The application remains available in memory during this visit.
  }
  return { ...entry }
}
