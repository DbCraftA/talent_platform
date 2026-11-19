import { getMockAdminMission } from './adminMissionService.js'
import { getMockMissionCandidate } from './adminCandidateService.js'
import { cancelMockAdminInvitation, createMockAdminInvitation, getMockAdminInvitation, getMockAdminInvitationResponse } from './adminInvitationService.js'
import { demoEngagements } from '../mocks/engagements.js'
import { getMockInvitationResponses } from './engagementService.js'

const prefix = 'wenovat:admin-shortlist:v1:'
const retained = new Map()
let activeStorage
const empty = () => ({ candidateIds: [], exceptions: {}, attestations: {}, history: [] })
const clone = (record) => structuredClone(record)
const channels = ['PHONE', 'VIDEO', 'WRITTEN', 'OTHER']
const exceptionStatuses = ['NOT_EVALUATED', 'SELECTED_FOR_REVIEW', 'INTERVIEW_SCHEDULED']

function storage() {
  try { return globalThis.localStorage } catch { return null }
}

function eligible(mission, talent, exception) {
  if (!talent || !['WENOVAT', 'EXTERNAL'].includes(talent.source) || talent.qualificationStatus === 'NOT_QUALIFIED') return false
  if (mission.tier !== 'PREMIUM') return true
  if (talent.qualificationStatus === 'QUALIFIED') return true
  return exceptionStatuses.includes(talent.qualificationStatus) && typeof exception?.reason === 'string' && !!exception.reason.trim()
}

export function getMockShortlistEligibility(mission, talent, exception) {
  return Boolean(mission) && eligible(mission, talent, exception)
}

function valid(record, mission) {
  if (!record || !Array.isArray(record.candidateIds) || !record.exceptions || typeof record.exceptions !== 'object' || Array.isArray(record.exceptions) || !Array.isArray(record.history)) return false
  if (new Set(record.candidateIds).size !== record.candidateIds.length || record.candidateIds.length > 100) return false
  if (!record.candidateIds.every((id) => typeof id === 'string' && getMockMissionCandidate(id))) return false
  if (!Object.entries(record.exceptions).every(([id, item]) => {
    const talent = getMockMissionCandidate(id)
    return mission.tier === 'PREMIUM' && ['WENOVAT', 'EXTERNAL'].includes(talent?.source)
      && typeof item?.reason === 'string' && !!item.reason.trim() && item.reason.length <= 500
  })) return false
  if (record.attestations !== undefined && (!record.attestations || typeof record.attestations !== 'object' || Array.isArray(record.attestations))) return false
  if (record.attestations && !Object.entries(record.attestations).every(([id, item]) => getMockMissionCandidate(id)
    && ['CONFIRMED', 'REVOKED', 'UNAVAILABLE'].includes(item?.status)
    && typeof item.reason === 'string' && !!item.reason.trim() && item.reason.length <= 500
    && (item.status !== 'CONFIRMED' || channels.includes(item.channel))
    && typeof item.date === 'string' && Number.isFinite(Date.parse(item.date)) && item.author === 'Admin démo')) return false
  if (record.history.length > 500) return false
  const eventIds = new Set()
  return record.history.every((event) => {
    if (!event || eventIds.has(event.id)) return false
    eventIds.add(event.id)
    return typeof event?.id === 'string' && event.id.startsWith('shortlist:')
    && event.missionId === mission.id && ['EXCEPTION_GRANTED', 'EXCEPTION_REVOKED', 'CANDIDATE_ADDED', 'CANDIDATE_REMOVED', 'CONSENT_CONFIRMED', 'CONSENT_REVOKED', 'CANDIDATE_UNAVAILABLE'].includes(event.type)
    && typeof event.date === 'string' && Number.isFinite(Date.parse(event.date)) && event.author === 'Admin démo'
    && typeof event.talentId === 'string' && !!getMockMissionCandidate(event.talentId)
    && (['CONSENT_CONFIRMED', 'CONSENT_REVOKED', 'CANDIDATE_UNAVAILABLE'].includes(event.type)
      ? typeof event.reason === 'string' && !!event.reason.trim() && event.reason.length <= 500
      : event.reason === undefined)
    && (event.type === 'CONSENT_CONFIRMED' ? channels.includes(event.channel) : event.channel === undefined)
  })
}

function recordFor(mission) {
  if (import.meta.env?.PROD) return empty()
  const target = storage()
  if (target !== activeStorage) { retained.clear(); activeStorage = target }
  let saved
  try {
    const raw = target?.getItem(`${prefix}${mission.id}`)
    saved = raw == null ? null : JSON.parse(raw)
  } catch { /* Invalid browser state is ignored. */ }
  const record = valid(retained.get(mission.id), mission) ? retained.get(mission.id) : valid(saved, mission) ? saved : empty()
  return { ...clone(record), attestations: clone(record.attestations ?? {}) }
}

function platformResponse(missionId, talentId) {
  if (talentId !== 'demo-freelance') return null
  const local = getMockAdminInvitationResponse(missionId)
  if (local) return local.status
  if (getMockAdminInvitation(missionId)?.status === 'CANCELLED') return null
  const invitation = demoEngagements.find((entry) => entry.talentId === talentId && entry.missionId === missionId && entry.type === 'INVITATION' && entry.status === 'PENDING')
  if (!invitation) return null
  const response = getMockInvitationResponses(talentId)[invitation.id]
  return response?.status ?? response ?? 'PENDING'
}

function consentFor(missionId, talentId, attestation) {
  if (attestation?.status === 'CONFIRMED') return { status: 'CONFIRMED', via: 'MANUAL' }
  if (attestation?.status === 'REVOKED' || attestation?.status === 'UNAVAILABLE') return { status: attestation.status, via: 'MANUAL' }
  const response = platformResponse(missionId, talentId)
  if (response === 'INTERESTED') return { status: 'CONFIRMED', via: 'PLATFORM' }
  if (response === 'UNAVAILABLE' || response === 'DECLINED') return { status: 'UNAVAILABLE', via: 'PLATFORM' }
  return { status: 'PENDING', via: response ? 'PLATFORM' : 'NONE' }
}

export function getMockAdminShortlist(missionId) {
  const mission = getMockAdminMission(missionId)
  if (!mission) return null
  const record = recordFor(mission)
  const candidateIds = record.candidateIds.filter((id) => eligible(mission, getMockMissionCandidate(id), record.exceptions[id]))
  const exceptions = Object.fromEntries(Object.entries(record.exceptions).filter(([id]) => {
    const talent = getMockMissionCandidate(id)
    return mission.tier === 'PREMIUM' && ['WENOVAT', 'EXTERNAL'].includes(talent?.source) && exceptionStatuses.includes(talent.qualificationStatus)
  }))
  const consent = Object.fromEntries(record.candidateIds.map((id) => [id, consentFor(missionId, id, record.attestations[id])]))
  return { ...record, exceptions, candidateIds, allCandidateIds: [...record.candidateIds], consent, history: [...record.history].reverse(), excludedCount: record.candidateIds.length - candidateIds.length }
}

function update(missionId, session, change) {
  if (import.meta.env?.PROD || session?.role !== 'ADMIN') throw new Error('Action réservée à l’administrateur de démonstration.')
  const mission = getMockAdminMission(missionId)
  if (!mission) throw new Error('Mission fictive introuvable.')
  const record = recordFor(mission)
  const event = change(record, mission)
  if (!event) return { shortlist: getMockAdminShortlist(missionId), persisted: false, changed: false }
  if (record.history.length >= 500) throw new Error('Historique local plein pour cette mission fictive.')
  record.history.push({ id: `shortlist:${globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(36).slice(2)}`}`, missionId, talentId: event.talentId, type: event.type, date: new Date().toISOString(), author: 'Admin démo', ...(event.reason ? { reason: event.reason } : {}), ...(event.channel ? { channel: event.channel } : {}) })
  retained.set(missionId, clone(record))
  let persisted = false
  try {
    const target = storage()
    if (target) { target.setItem(`${prefix}${missionId}`, JSON.stringify(record)); persisted = true }
  } catch { /* The record remains in memory this visit. */ }
  return { shortlist: getMockAdminShortlist(missionId), persisted, changed: true }
}

export function grantMockShortlistException(missionId, talentId, reason, session) {
  return update(missionId, session, (record, mission) => {
    const talent = getMockMissionCandidate(talentId)
    if (mission.tier !== 'PREMIUM' || !['WENOVAT', 'EXTERNAL'].includes(talent?.source) || !exceptionStatuses.includes(talent.qualificationStatus)) throw new Error('Exception réservée à un profil en cours d’évaluation sur une mission premium.')
    if (typeof reason !== 'string' || !reason.trim() || reason.trim().length > 500) throw new Error('Renseignez un motif d’exception de 500 caractères maximum.')
    if (record.exceptions[talentId]?.reason === reason.trim()) return null
    record.exceptions[talentId] = { reason: reason.trim() }
    return { type: 'EXCEPTION_GRANTED', talentId }
  })
}

export function revokeMockShortlistException(missionId, talentId, session) {
  return update(missionId, session, (record) => {
    if (!record.exceptions[talentId]) return null
    delete record.exceptions[talentId]
    record.candidateIds = record.candidateIds.filter((id) => id !== talentId)
    if (talentId === 'demo-freelance') cancelMockAdminInvitation(missionId, session)
    return { type: 'EXCEPTION_REVOKED', talentId }
  })
}

export function addMockShortlistCandidate(missionId, talentId, session) {
  return update(missionId, session, (record, mission) => {
    const talent = getMockMissionCandidate(talentId)
    if (!eligible(mission, talent, record.exceptions[talentId])) throw new Error('Profil non éligible : qualification Wenovat ou exception administrateur requise.')
    if (record.candidateIds.includes(talentId)) return null
    record.candidateIds.push(talentId)
    if (talentId === 'demo-freelance' && (mission.tier !== 'PREMIUM' || talent.qualificationStatus === 'QUALIFIED') && !record.attestations[talentId]) createMockAdminInvitation(missionId, session)
    return { type: 'CANDIDATE_ADDED', talentId }
  })
}

export function removeMockShortlistCandidate(missionId, talentId, session) {
  return update(missionId, session, (record) => {
    if (!record.candidateIds.includes(talentId)) return null
    record.candidateIds = record.candidateIds.filter((id) => id !== talentId)
    if (talentId === 'demo-freelance') cancelMockAdminInvitation(missionId, session)
    return { type: 'CANDIDATE_REMOVED', talentId }
  })
}

export function clearIneligibleMockShortlistCandidates(missionId, session) {
  if (import.meta.env?.PROD || session?.role !== 'ADMIN') throw new Error('Action réservée à l’administrateur de démonstration.')
  const shortlist = getMockAdminShortlist(missionId)
  if (!shortlist) throw new Error('Mission fictive introuvable.')
  const mission = getMockAdminMission(missionId)
  const record = recordFor(mission)
  const obsolete = record.candidateIds.filter((id) => !eligible(mission, getMockMissionCandidate(id), record.exceptions[id]))
  let result = { shortlist, persisted: false, changed: false }
  for (const id of obsolete) result = removeMockShortlistCandidate(missionId, id, session)
  return result
}

export function recordMockCandidateConsent(missionId, talentId, { status, reason, channel } = {}, session) {
  return update(missionId, session, (record, mission) => {
    if (!record.candidateIds.includes(talentId)) throw new Error('Sélectionnez ce profil avant de consigner son accord.')
    if (!eligible(mission, getMockMissionCandidate(talentId), record.exceptions[talentId])) throw new Error('Profil non éligible pour cette mission.')
    if (!['CONFIRMED', 'REVOKED', 'UNAVAILABLE'].includes(status)) throw new Error('Statut de consentement invalide.')
    const note = typeof reason === 'string' ? reason.trim() : ''
    if (!note || note.length > 500) throw new Error('Renseignez un motif de 500 caractères maximum.')
    if (status === 'CONFIRMED' && !channels.includes(channel)) throw new Error('Choisissez le moyen de confirmation manuelle.')
    if (record.attestations[talentId]?.status === status && record.attestations[talentId]?.reason === note && record.attestations[talentId]?.channel === (status === 'CONFIRMED' ? channel : undefined)) return null
    record.attestations[talentId] = { status, reason: note, ...(status === 'CONFIRMED' ? { channel } : {}), date: new Date().toISOString(), author: 'Admin démo' }
    return { type: status === 'CONFIRMED' ? 'CONSENT_CONFIRMED' : status === 'UNAVAILABLE' ? 'CANDIDATE_UNAVAILABLE' : 'CONSENT_REVOKED', talentId, reason: note, ...(status === 'CONFIRMED' ? { channel } : {}) }
  })
}

export function previewMockAdminShortlist(missionId) {
  const shortlist = getMockAdminShortlist(missionId)
  if (!shortlist) throw new Error('Mission fictive introuvable.')
  const mission = getMockAdminMission(missionId)
  if (mission.status === 'CLOSED') throw new Error('Mission clôturée : aperçu indisponible.')
  if (shortlist.excludedCount) throw new Error('La qualification de certains profils a changé : vérifiez la sélection avant de prévisualiser.')
  if (!shortlist.candidateIds.length) throw new Error('Sélectionnez au moins un profil pour prévisualiser la shortlist.')
  const ready = shortlist.candidateIds.filter((id) => shortlist.consent[id]?.status === 'CONFIRMED')
  if (!ready.length) throw new Error('Aucun profil éligible avec accord de présentation confirmé à prévisualiser.')
  return ready.map((id, index) => {
    const talent = getMockMissionCandidate(id)
    const publicExpertise = Array.isArray(talent.expertise) ? talent.expertise.filter((value) => ['CLOUD', 'DATA', 'IA', 'CYBER', 'ENTERPRISE_ARCHITECTURE'].includes(value)) : []
    const publicTechnologies = (Array.isArray(talent.technologies) ? talent.technologies : []).filter((value) => typeof value === 'string' && (mission.technologies ?? []).some((skill) => skill.toLocaleLowerCase('fr-FR') === value.toLocaleLowerCase('fr-FR')))
    return {
      label: `Profil ${index + 1}`,
      expertise: publicExpertise,
      technologies: publicTechnologies,
      availability: talent.availability ?? 'UNKNOWN',
      qualificationStatus: talent.qualificationStatus,
      exception: Boolean(shortlist.exceptions[id]),
    }
  })
}
