import { demoEngagements } from '../mocks/engagements.js'
import { getAccessibleMissions, getMockMissionApplications, getPublicMissionSnapshot } from './missionService.js'
import { listMockPublishedMissions } from './adminMissionService.js'
import { listMockAdminInvitations } from './adminInvitationService.js'

const storagePrefix = 'wenovat:engagements:v1:'
const responses = new Map()

export function getMockInvitationResponses(talentId) {
  let stored
  try {
    const raw = globalThis.localStorage?.getItem(`${storagePrefix}${talentId}`)
    if (raw) stored = JSON.parse(raw)
  } catch {
    // Keep the current visit functional if browser storage is unavailable.
  }
  const values = { ...(stored && typeof stored === 'object' && !Array.isArray(stored) ? stored : {}), ...(responses.get(talentId) ?? {}) }
  return Object.fromEntries(Object.entries(values).map(([id, value]) => [id, value === 'ACCEPTED' ? 'INTERESTED' : value === 'DECLINED' ? 'UNAVAILABLE' : value]))
}

export function getMockEngagements(talent, engagements = demoEngagements, missions) {
  if (!talent?.id) return { invitations: [], applications: [] }
  const localInvitations = talent.id === 'demo-freelance' ? listMockAdminInvitations(talent.id) : []
  const allEngagements = [...engagements, ...localInvitations]
  const savedResponses = getMockInvitationResponses(talent.id)
  const accessible = new Map(getAccessibleMissions(talent, missions, allEngagements, savedResponses).map((mission) => [mission.id, mission]))
  const listedMissions = new Map((missions ?? listMockPublishedMissions()).map((mission) => [mission.id, mission]))
  const invitations = []
  const applications = []
  const applicationMissionIds = new Set()
  const invitationIds = new Set()

  for (const engagement of [...allEngagements, ...getMockMissionApplications(talent.id)]) {
    if (engagement.talentId !== talent.id) continue
    const mission = accessible.get(engagement.missionId)
    const inaccessibleMission = listedMissions.get(engagement.missionId)
    if (!mission && !(engagement.type === 'INVITATION' && !engagement.id.startsWith('admin-invitation:') && ['UNAVAILABLE', 'DECLINED'].includes(savedResponses[engagement.id]?.status ?? savedResponses[engagement.id]) && inaccessibleMission?.status === 'PUBLISHED' && inaccessibleMission.access === 'STANDARD' && inaccessibleMission.visibility === 'INVITE_ONLY' && talent.source === 'WENOVAT')) continue
    if (engagement.type === 'INVITATION' && engagement.status === 'CANCELLED' && engagement.id.startsWith('admin-invitation:') && mission) {
      if (invitationIds.has(engagement.id)) continue
      invitationIds.add(engagement.id)
      invitations.push({ ...engagement, mission })
    } else if (engagement.type === 'INVITATION' && engagement.status === 'PENDING') {
      if (invitationIds.has(engagement.id)) continue
      invitationIds.add(engagement.id)
      const savedStatus = savedResponses[engagement.id]?.status ?? savedResponses[engagement.id]
      invitations.push({ ...engagement, status: savedStatus === 'ACCEPTED' ? 'INTERESTED' : savedStatus === 'DECLINED' ? 'UNAVAILABLE' : savedStatus ?? 'PENDING', question: savedResponses[engagement.id]?.question ?? '', mission: mission ?? getPublicMissionSnapshot(inaccessibleMission) })
    } else if (engagement.type === 'APPLICATION' && ['IN_PROGRESS', 'RECEIVED', 'REJECTED', 'SHORTLISTED'].includes(engagement.status)) {
      if (!applicationMissionIds.has(mission.id)) applications.push({ ...engagement, mission })
      applicationMissionIds.add(mission.id)
    }
  }
  return { invitations, applications }
}

export function respondToMockInvitation(talent, invitationId, answer, engagements = demoEngagements, missions, question = '') {
  if (import.meta.env?.PROD || !['INTERESTED', 'UNAVAILABLE', 'QUESTION'].includes(answer)) throw new Error('Réponse indisponible.')
  if (answer === 'QUESTION' && (typeof question !== 'string' || !question.trim())) throw new Error('Saisissez votre question avant de l’enregistrer.')
  const { invitations } = getMockEngagements(talent, engagements, missions)
  if (!invitations.some((item) => item.id === invitationId && item.status === 'PENDING')) throw new Error('Invitation indisponible.')
  const updated = { ...getMockInvitationResponses(talent.id), [invitationId]: answer === 'QUESTION' ? { status: answer, question: question.trim() } : answer }
  responses.set(talent.id, updated)
  try {
    globalThis.localStorage?.setItem(`${storagePrefix}${talent.id}`, JSON.stringify(updated))
  } catch {
    // The in-memory response remains available during this visit.
  }
  return getMockEngagements(talent, engagements, missions)
}
