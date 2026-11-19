import assert from 'node:assert/strict'
import test from 'node:test'
import { simulateMockMatching } from '../src/services/adminMatchingService.js'
import { addMockShortlistCandidate, clearIneligibleMockShortlistCandidates, getMockAdminShortlist, grantMockShortlistException, previewMockAdminShortlist, recordMockCandidateConsent, removeMockShortlistCandidate, revokeMockShortlistException } from '../src/services/adminShortlistService.js'
import { getMockAdminTalentById } from '../src/services/talentService.js'
import { getMockMissionCandidate, listMockMissionCandidates } from '../src/services/adminCandidateService.js'
import { getMockAdminInvitation, listMockAdminInvitations } from '../src/services/adminInvitationService.js'
import { getMockEngagements, respondToMockInvitation } from '../src/services/engagementService.js'
import { getAccessibleMission } from '../src/services/missionService.js'

const admin = { role: 'ADMIN', id: 'demo-admin' }
const premium = 'exemple-architecture-strategique'
const standard = 'exemple-cloud'

function withStorage(callback) {
  const previous = globalThis.localStorage
  const values = new Map()
  globalThis.localStorage = { getItem: (key) => values.get(key) ?? null, setItem: (key, value) => values.set(key, value) }
  try { callback(values) } finally {
    if (previous === undefined) delete globalThis.localStorage
    else globalThis.localStorage = previous
  }
}

test('matching déterministe, tri stable et inconnues sans points accordés', () => {
  const mission = { id: 'test', expertise: 'CLOUD', technologies: ['AWS', 'Terraform'], availability: 'WITHIN_MONTH', remote: 'HYBRID' }
  const talents = [
    { id: 'b', expertise: ['CLOUD'], technologies: ['AWS'], availability: 'IMMEDIATE', remotePreference: 'HYBRID' },
    { id: 'a', expertise: ['CLOUD'], technologies: ['AWS'], availability: 'IMMEDIATE', remotePreference: 'HYBRID' },
    { id: 'unknown', expertise: [], availability: 'UNKNOWN' },
    { id: 'a', expertise: ['CLOUD'], technologies: ['AWS'], availability: 'IMMEDIATE', remotePreference: 'HYBRID' },
  ]
  const results = simulateMockMatching('test', mission, talents)
  assert.deepEqual(results.map((row) => row.talent.id), ['a', 'b', 'unknown'])
  assert.equal(results[0].score, 85)
  assert.equal(results[2].score, 0)
  assert.match(results[2].explanation, /disponibilité inconnue.*préférence télétravail inconnue/)
  assert.deepEqual(simulateMockMatching('test', mission, talents), results)
  assert.throws(() => simulateMockMatching('absent', mission, talents), /introuvable/)
})

test('restrictions premium, exception motivée et aperçu sans identité', () => withStorage(() => {
  assert.throws(() => addMockShortlistCandidate(premium, 'exemple-talent-04', admin), /non éligible/)
  assert.throws(() => addMockShortlistCandidate(premium, 'exemple-talent-10', admin), /non éligible/)
  assert.throws(() => grantMockShortlistException(premium, 'exemple-talent-10', ' ', admin), /motif/)
  assert.equal(grantMockShortlistException(premium, 'exemple-talent-04', 'Présentation pour cette mission uniquement', admin).changed, true)
  assert.equal(getMockAdminShortlist(premium).exceptions['exemple-talent-04'].reason, 'Présentation pour cette mission uniquement')
  const result = grantMockShortlistException(premium, 'exemple-talent-10', 'Présentation exceptionnelle fictive', admin)
  assert.equal(result.persisted, true)
  assert.equal(getMockAdminTalentById('exemple-talent-10').qualificationStatus, 'NOT_EVALUATED')
  addMockShortlistCandidate(premium, 'exemple-talent-10', admin)
  addMockShortlistCandidate(premium, 'exemple-talent-01', admin)
  assert.equal(addMockShortlistCandidate(premium, 'exemple-talent-10', admin).changed, false)
  const shortlist = getMockAdminShortlist(premium)
  assert.deepEqual(shortlist.candidateIds, ['exemple-talent-10', 'exemple-talent-01'])
  assert.equal(shortlist.history.length, 4)
  assert.throws(() => previewMockAdminShortlist(premium), /accord/)
  recordMockCandidateConsent(premium, 'exemple-talent-10', { status: 'CONFIRMED', reason: 'Accord fictif', channel: 'PHONE' }, admin)
  recordMockCandidateConsent(premium, 'exemple-talent-01', { status: 'CONFIRMED', reason: 'Accord fictif', channel: 'VIDEO' }, admin)
  const preview = previewMockAdminShortlist(premium)
  assert.deepEqual(preview.map(({ label }) => label), ['Profil 1', 'Profil 2'])
  assert.equal(preview[0].exception, true)
  assert.equal(preview[0].qualificationStatus, 'NOT_EVALUATED')
  assert.equal('id' in preview[0], false)
  assert.equal('firstName' in preview[0], false)
  assert.equal('contact' in preview[0], false)
  assert.equal(JSON.stringify(preview).includes('Sarah'), false)
  revokeMockShortlistException(premium, 'exemple-talent-10', admin)
  assert.deepEqual(getMockAdminShortlist(premium).candidateIds, ['exemple-talent-01'])
  assert.equal(getMockAdminShortlist(premium).exceptions['exemple-talent-10'], undefined)
  assert.throws(() => addMockShortlistCandidate(premium, 'exemple-talent-10', admin), /non éligible/)
}))

test('standard accepte un non évalué, refuse non qualifié et contrôle le rôle', () => withStorage(() => {
  assert.throws(() => addMockShortlistCandidate(standard, 'exemple-talent-02', { role: 'FREELANCE' }), /administrateur/)
  assert.throws(() => addMockShortlistCandidate(standard, 'exemple-talent-06', admin), /non éligible/)
  addMockShortlistCandidate(standard, 'exemple-talent-02', admin)
  assert.equal(removeMockShortlistCandidate(standard, 'exemple-talent-02', admin).changed, true)
  assert.equal(removeMockShortlistCandidate(standard, 'exemple-talent-02', admin).changed, false)
  assert.throws(() => previewMockAdminShortlist(standard), /Sélectionnez/)
}))

test('stockage corrompu ignoré, écriture refusée avec repli mémoire', () => withStorage((values) => {
  values.set('wenovat:admin-shortlist:v1:exemple-data', JSON.stringify({ candidateIds: ['exemple-talent-02', 'exemple-talent-02'], exceptions: {}, history: [] }))
  assert.deepEqual(getMockAdminShortlist('exemple-data').candidateIds, [])
  globalThis.localStorage = { getItem: () => null, setItem: () => { throw new Error('quota') } }
  assert.equal(addMockShortlistCandidate('exemple-data', 'exemple-talent-02', admin).persisted, false)
  assert.deepEqual(getMockAdminShortlist('exemple-data').candidateIds, ['exemple-talent-02'])
  assert.equal(getMockAdminShortlist('exemple-data').history.length, 1)
}))

test('qualification modifiée invalide un profil et impose son retrait avant aperçu', () => withStorage((values) => {
  const id = 'exemple-cloud-premium-invitation'
  const talentId = 'exemple-talent-01'
  addMockShortlistCandidate(id, talentId, admin)
  values.set(`wenovat:admin-talent-qualification:v1:${talentId}`, JSON.stringify({
    status: 'NOT_QUALIFIED', history: [{ id: 'qualification:test', talentId, previousStatus: 'QUALIFIED', nextStatus: 'NOT_QUALIFIED', date: new Date().toISOString(), reason: 'Décision de test', author: 'Admin démo' }],
  }))
  assert.equal(getMockAdminShortlist(id).excludedCount, 1)
  assert.deepEqual(getMockAdminShortlist(id).candidateIds, [])
  assert.throws(() => previewMockAdminShortlist(id), /qualification/)
  assert.equal(clearIneligibleMockShortlistCandidates(id, admin).changed, true)
  assert.equal(getMockAdminShortlist(id).excludedCount, 0)
}))

test('le compte freelance démo est un candidat distinct avec données et qualification actuelles', () => withStorage(() => {
  const candidate = getMockMissionCandidate('demo-freelance')
  assert.equal(candidate.source, 'WENOVAT')
  assert.equal(candidate.demoAccount, true)
  assert.equal(candidate.qualificationStatus, 'NOT_EVALUATED')
  assert.ok(candidate.firstName && candidate.lastName)
  assert.equal(listMockMissionCandidates().filter(({ id }) => id === candidate.id).length, 1)
  assert.equal(simulateMockMatching(standard).filter(({ talent }) => talent.id === candidate.id).length, 1)
}))

test('invitation locale idempotente, intérêt lié à la mission, retrait non actionnable', () => withStorage((values) => {
  const id = 'exemple-besoin-cloud'
  const talent = getMockMissionCandidate('demo-freelance')
  assert.equal(getMockAdminInvitation(id), null)
  assert.throws(() => previewMockAdminShortlist(id), /Sélectionnez/)
  values.set('wenovat:admin-mission-status:v1', JSON.stringify({ [id]: 'PUBLISHED' }))
  addMockShortlistCandidate(id, talent.id, admin)
  const invitation = getMockAdminInvitation(id)
  assert.equal(invitation.status, 'PENDING')
  assert.equal(getMockEngagements(talent).invitations.filter(({ id: key }) => key === invitation.id).length, 1)
  assert.equal(getMockAdminShortlist(id).consent[talent.id].status, 'PENDING')
  assert.throws(() => previewMockAdminShortlist(id), /accord/)
  assert.equal(addMockShortlistCandidate(id, talent.id, admin).changed, false)
  assert.equal(getMockEngagements(talent).invitations.filter(({ id: key }) => key === invitation.id).length, 1)
  respondToMockInvitation(talent, invitation.id, 'INTERESTED')
  assert.deepEqual(getMockAdminShortlist(id).consent[talent.id], { status: 'CONFIRMED', via: 'PLATFORM' })
  assert.equal(previewMockAdminShortlist(id).length, 1)
  removeMockShortlistCandidate(id, talent.id, admin)
  assert.equal(getMockAdminInvitation(id).status, 'CANCELLED')
  assert.equal(getMockEngagements(talent).invitations.find(({ id: key }) => key === invitation.id)?.status, 'CANCELLED')
  assert.throws(() => respondToMockInvitation(talent, invitation.id, 'INTERESTED'), /indisponible/)
}))

test('une candidature existante ne crée pas de seconde invitation ni un accord', () => withStorage(() => {
  addMockShortlistCandidate('exemple-data', 'demo-freelance', admin)
  assert.equal(getMockAdminInvitation('exemple-data'), null)
  assert.equal(getMockAdminShortlist('exemple-data').consent['demo-freelance'].status, 'PENDING')
}))

test('accord manuel motivé, refus, rectification et reprise dans un aperçu partiel', () => withStorage(() => {
  const id = 'exemple-cloud'
  addMockShortlistCandidate(id, 'exemple-talent-01', admin)
  addMockShortlistCandidate(id, 'exemple-talent-02', admin)
  assert.throws(() => recordMockCandidateConsent(id, 'exemple-talent-01', { status: 'CONFIRMED', reason: ' ', channel: 'PHONE' }, admin), /motif/)
  assert.throws(() => recordMockCandidateConsent(id, 'exemple-talent-01', { status: 'CONFIRMED', reason: 'Démo' }, admin), /moyen/)
  recordMockCandidateConsent(id, 'exemple-talent-01', { status: 'CONFIRMED', reason: 'Appel fictif', channel: 'PHONE' }, admin)
  assert.equal(previewMockAdminShortlist(id).length, 1)
  recordMockCandidateConsent(id, 'exemple-talent-02', { status: 'UNAVAILABLE', reason: 'Indisponibilité fictive' }, admin)
  assert.equal(getMockAdminShortlist(id).consent['exemple-talent-02'].status, 'UNAVAILABLE')
  recordMockCandidateConsent(id, 'exemple-talent-01', { status: 'REVOKED', reason: 'Rétractation fictive' }, admin)
  assert.throws(() => previewMockAdminShortlist(id), /accord/)
  recordMockCandidateConsent(id, 'exemple-talent-02', { status: 'CONFIRMED', reason: 'Changement fictif', channel: 'WRITTEN' }, admin)
  assert.deepEqual(previewMockAdminShortlist(id).map(({ label }) => label), ['Profil 1'])
  assert.equal(getMockAdminShortlist(id).history.filter(({ type }) => type.startsWith('CONSENT_')).length, 3)
  assert.equal('reason' in previewMockAdminShortlist(id)[0], false)
}))

test('mission non publiée et accès premium révoqué masquent invitation et détail', () => withStorage((values) => {
  const approvedId = 'exemple-besoin-cyber'
  assert.equal(getMockAdminInvitation(approvedId), null)
  const premiumId = approvedId
  values.set('wenovat:qualification:v1:demo-freelance', 'QUALIFIED')
  addMockShortlistCandidate(premiumId, 'demo-freelance', admin)
  assert.equal(getMockAdminInvitation(premiumId), null)
  values.set('wenovat:admin-mission-status:v1', JSON.stringify({ [premiumId]: 'PUBLISHED' }))
  removeMockShortlistCandidate(premiumId, 'demo-freelance', admin)
  addMockShortlistCandidate(premiumId, 'demo-freelance', admin)
  const invitation = getMockAdminInvitation(premiumId)
  assert.equal(invitation.status, 'PENDING')
  const qualified = getMockMissionCandidate('demo-freelance')
  assert.ok(getAccessibleMission(premiumId, qualified))
  values.set('wenovat:qualification:v1:demo-freelance', 'NOT_EVALUATED')
  const unqualified = getMockMissionCandidate('demo-freelance')
  assert.equal(getAccessibleMission(premiumId, unqualified), null)
  assert.equal(getMockEngagements(unqualified).invitations.some(({ id }) => id === invitation.id), false)
  assert.equal(getMockAdminShortlist(premiumId).excludedCount, 1)
}))

test('une réponse indisponible bloque la préparation, un nouvel accord manuel la rétablit', () => withStorage((values) => {
  const id = 'exemple-cloud'
  addMockShortlistCandidate(id, 'demo-freelance', admin)
  const invitationId = 'exemple-invitation-cloud'
  respondToMockInvitation(getMockMissionCandidate('demo-freelance'), invitationId, 'UNAVAILABLE')
  assert.equal(getMockAdminShortlist(id).consent['demo-freelance'].status, 'UNAVAILABLE')
  assert.throws(() => previewMockAdminShortlist(id), /accord/)
  recordMockCandidateConsent(id, 'demo-freelance', { status: 'CONFIRMED', reason: 'Situation changée (démo)', channel: 'VIDEO' }, admin)
  assert.deepEqual(getMockAdminShortlist(id).consent['demo-freelance'], { status: 'CONFIRMED', via: 'MANUAL' })
  recordMockCandidateConsent(id, 'demo-freelance', { status: 'REVOKED', reason: 'Rectification fictive' }, admin)
  assert.equal(getMockAdminShortlist(id).consent['demo-freelance'].status, 'REVOKED')
  assert.throws(() => previewMockAdminShortlist(id), /accord/)
  recordMockCandidateConsent(id, 'demo-freelance', { status: 'CONFIRMED', reason: 'Nouvel accord fictif', channel: 'PHONE' }, admin)
  assert.equal(previewMockAdminShortlist(id).length, 1)
}))

test('ancien stockage shortlist v1 relu sans accord implicite', () => withStorage((values) => {
  const id = 'exemple-besoin-data'
  values.set(`wenovat:admin-shortlist:v1:${id}`, JSON.stringify({ candidateIds: ['exemple-talent-02'], exceptions: {}, history: [] }))
  assert.equal(getMockAdminShortlist(id).consent['exemple-talent-02'].status, 'PENDING')
  assert.throws(() => previewMockAdminShortlist(id), /accord/)
  assert.equal(recordMockCandidateConsent(id, 'exemple-talent-02', { status: 'CONFIRMED', reason: 'Confirmation fictive', channel: 'WRITTEN' }, admin).persisted, true)
  assert.equal(previewMockAdminShortlist(id).length, 1)
}))

test('exception externe premium et accord manuel ne donnent jamais accès au portail premium', () => withStorage(() => {
  const id = 'exemple-architecture-strategique'
  grantMockShortlistException(id, 'exemple-talent-10', 'Présentation exceptionnelle fictive', admin)
  addMockShortlistCandidate(id, 'exemple-talent-10', admin)
  recordMockCandidateConsent(id, 'exemple-talent-10', { status: 'CONFIRMED', reason: 'Démo seulement', channel: 'PHONE' }, admin)
  assert.equal(previewMockAdminShortlist(id)[0].exception, true)
  assert.equal(getAccessibleMission(id, getMockAdminTalentById('exemple-talent-10')), null)
  assert.equal(listMockAdminInvitations('exemple-talent-10').length, 0)
}))

test('une invitation locale est masquée si son ancien état devient inaccessible', () => withStorage((values) => {
  const id = 'exemple-besoin-cyber'
  values.set('wenovat:qualification:v1:demo-freelance', 'QUALIFIED')
  values.set('wenovat:admin-mission-status:v1', JSON.stringify({ [id]: 'PUBLISHED' }))
  addMockShortlistCandidate(id, 'demo-freelance', admin)
  const invitation = getMockAdminInvitation(id)
  assert.equal(invitation.status, 'PENDING')
  assert.equal(getMockEngagements(getMockMissionCandidate('demo-freelance')).invitations.some(({ id: key }) => key === invitation.id), true)
  values.set('wenovat:qualification:v1:demo-freelance', 'NOT_EVALUATED')
  assert.equal(getMockEngagements(getMockMissionCandidate('demo-freelance')).invitations.some(({ id: key }) => key === invitation.id), false)
}))

test('exception PREMIUM Wenovat en attente sans qualification ni accès au portail', () => withStorage((values) => {
  const missionId = 'exemple-besoin-cyber'
  values.set('wenovat:admin-mission-status:v1', JSON.stringify({ [missionId]: 'PUBLISHED' }))
  assert.throws(() => addMockShortlistCandidate(missionId, 'demo-freelance', admin), /non éligible/)
  assert.throws(() => grantMockShortlistException(missionId, 'demo-freelance', ' ', admin), /motif/)
  grantMockShortlistException(missionId, 'demo-freelance', 'Présentation exceptionnelle fictive', admin)
  addMockShortlistCandidate(missionId, 'demo-freelance', admin)
  assert.equal(getMockMissionCandidate('demo-freelance').qualificationStatus, 'NOT_EVALUATED')
  assert.equal(getMockAdminInvitation(missionId), null)
  assert.equal(getAccessibleMission(missionId, getMockMissionCandidate('demo-freelance')), null)
  assert.equal(getMockEngagements(getMockMissionCandidate('demo-freelance')).invitations.some(({ missionId: id }) => id === missionId), false)
  recordMockCandidateConsent(missionId, 'demo-freelance', { status: 'CONFIRMED', reason: 'Accord fictif hors portail', channel: 'PHONE' }, admin)
  const preview = previewMockAdminShortlist(missionId)
  assert.equal(preview[0].exception, true)
  assert.equal(preview[0].qualificationStatus, 'NOT_EVALUATED')
  assert.equal('id' in preview[0], false)
  assert.equal(revokeMockShortlistException(missionId, 'demo-freelance', admin).changed, true)
  assert.deepEqual(getMockAdminShortlist(missionId).candidateIds, [])
  assert.equal(getMockAdminShortlist(missionId).exceptions['demo-freelance'], undefined)
}))

test('NOT_QUALIFIED reste interdit et une qualification modifiée retire un ancien profil prêt', () => withStorage((values) => {
  assert.throws(() => grantMockShortlistException(premium, 'exemple-talent-06', 'Même avec un motif', admin), /en cours d’évaluation/)
  assert.throws(() => addMockShortlistCandidate(premium, 'exemple-talent-06', admin), /non éligible/)
  const missionId = 'exemple-cloud-premium-invitation'
  grantMockShortlistException(missionId, 'exemple-talent-04', 'Présentation provisoire fictive', admin)
  addMockShortlistCandidate(missionId, 'exemple-talent-04', admin)
  recordMockCandidateConsent(missionId, 'exemple-talent-04', { status: 'CONFIRMED', reason: 'Accord fictif', channel: 'VIDEO' }, admin)
  assert.equal(previewMockAdminShortlist(missionId).length, 1)
  values.set('wenovat:admin-talent-qualification:v1:exemple-talent-04', JSON.stringify({
    status: 'NOT_QUALIFIED', history: [{ id: 'qualification:shortlist', talentId: 'exemple-talent-04', previousStatus: 'SELECTED_FOR_REVIEW', nextStatus: 'NOT_QUALIFIED', date: new Date().toISOString(), reason: 'Décision fictive', author: 'Admin démo' }],
  }))
  assert.equal(getMockAdminShortlist(missionId).excludedCount, 1)
  assert.throws(() => previewMockAdminShortlist(missionId), /qualification/)
}))

test('ancienne exception externe PREMIUM v1 reste lisible et révocable', () => withStorage((values) => {
  values.set(`wenovat:admin-shortlist:v1:${premium}`, JSON.stringify({
    candidateIds: ['exemple-talent-10'], exceptions: { 'exemple-talent-10': { reason: 'Dérogation fictive précédente' } }, history: [],
  }))
  assert.equal(getMockAdminShortlist(premium).candidateIds.length, 1)
  assert.equal(getMockAdminShortlist(premium).exceptions['exemple-talent-10'].reason, 'Dérogation fictive précédente')
  revokeMockShortlistException(premium, 'exemple-talent-10', admin)
  assert.deepEqual(getMockAdminShortlist(premium).candidateIds, [])
}))
