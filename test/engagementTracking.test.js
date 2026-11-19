import assert from 'node:assert/strict'
import test from 'node:test'
import { getMockEngagements, respondToMockInvitation } from '../src/services/engagementService.js'
import { getAccessibleMission, getMockMissionApplications } from '../src/services/missionService.js'
import { demoMissions } from '../src/mocks/missions.js'

function storage() {
  const values = new Map()
  return {
    getItem: (key) => values.get(key) ?? null,
    setItem: (key, value) => values.set(key, value),
  }
}

test('une réponse à invitation reste distincte des candidatures et persiste par compte', () => {
  const previous = globalThis.localStorage
  globalThis.localStorage = storage()
  try {
    const talent = { id: 'suivi-test', source: 'WENOVAT', qualificationStatus: 'NOT_EVALUATED' }
    const invitations = [{ id: 'suivi-invitation', talentId: talent.id, missionId: 'exemple-cloud', type: 'INVITATION', status: 'PENDING', createdAt: '2026-11-10' }]
    const before = getMockEngagements(talent, invitations)
    assert.equal(before.invitations[0].status, 'PENDING')
    assert.deepEqual(before.applications, [])
    assert.throws(() => respondToMockInvitation(talent, invitations[0].id, 'QUESTION', invitations), /question/)
    assert.equal(getMockEngagements(talent, invitations).invitations[0].status, 'PENDING')
    const after = respondToMockInvitation(talent, invitations[0].id, 'QUESTION', invitations, undefined, '  Quel calendrier ?  ')
    assert.equal(after.invitations[0].status, 'QUESTION')
    assert.equal(after.invitations[0].question, 'Quel calendrier ?')
    assert.deepEqual(after.applications, [])
    assert.equal(getMockEngagements(talent, invitations).invitations[0].status, 'QUESTION')
    assert.equal(getMockEngagements({ ...talent, id: 'autre' }, invitations).invitations.length, 0)
    assert.throws(() => respondToMockInvitation(talent, invitations[0].id, 'INTERESTED', invitations), /indisponible/)
    assert.equal(JSON.parse(globalThis.localStorage.getItem(`wenovat:engagements:v1:${talent.id}`))[invitations[0].id].status, 'QUESTION')
  } finally {
    if (previous === undefined) delete globalThis.localStorage
    else globalThis.localStorage = previous
  }
})

test('les réponses historiques et les candidatures enregistrées sont reprises sans duplication', () => {
  const previous = globalThis.localStorage
  globalThis.localStorage = storage()
  try {
    const talent = { id: 'reprise-test', source: 'WENOVAT', qualificationStatus: 'NOT_EVALUATED' }
    const invitations = [{ id: 'reprise-invitation', talentId: talent.id, missionId: 'exemple-cyber-invitation', type: 'INVITATION', status: 'PENDING' }]
    globalThis.localStorage.setItem(`wenovat:engagements:v1:${talent.id}`, JSON.stringify({ 'reprise-invitation': 'ACCEPTED' }))
    const entry = { id: `application:${talent.id}:exemple-cloud`, talentId: talent.id, missionId: 'exemple-cloud', type: 'APPLICATION', status: 'RECEIVED' }
    globalThis.localStorage.setItem(`wenovat:mission-applications:v1:${talent.id}`, JSON.stringify([entry, entry]))
    assert.equal(getMockEngagements(talent, invitations).invitations[0].status, 'INTERESTED')
    assert.deepEqual(getMockMissionApplications(talent.id), [entry])
    assert.equal(getMockEngagements(talent, invitations).applications.length, 1)
    assert.ok(getAccessibleMission('exemple-cyber-invitation', talent, demoMissions, invitations))
  } finally {
    if (previous === undefined) delete globalThis.localStorage
    else globalThis.localStorage = previous
  }
})

test('une invitation premium ne révèle ni détail ni réponse à un membre non qualifié', () => {
  const talent = { id: 'premium-test', source: 'WENOVAT', qualificationStatus: 'NOT_EVALUATED' }
  const invitations = [{ id: 'premium-test-invitation', talentId: talent.id, missionId: 'exemple-cloud-premium-invitation', type: 'INVITATION', status: 'PENDING' }]
  assert.deepEqual(getMockEngagements(talent, invitations), { invitations: [], applications: [] })
  assert.equal(getAccessibleMission('exemple-cloud-premium-invitation', talent, demoMissions, invitations), null)
  assert.throws(() => respondToMockInvitation(talent, invitations[0].id, 'INTERESTED', invitations), /indisponible/)
  assert.equal(getMockEngagements({ ...talent, qualificationStatus: 'QUALIFIED' }, invitations).invitations.length, 1)
})

test('les statuts de candidature restent distincts et non modifiables via la réponse invitation', () => {
  const talent = { id: 'statuts-test', source: 'WENOVAT', qualificationStatus: 'NOT_EVALUATED' }
  const entries = ['RECEIVED', 'IN_PROGRESS', 'REJECTED', 'SHORTLISTED'].map((status, index) => ({
    id: `statut-${index}`, talentId: talent.id, missionId: 'exemple-cloud', type: 'APPLICATION', status,
  }))
  assert.equal(getMockEngagements(talent, entries).applications.length, 1)
  for (const entry of entries) {
    assert.equal(getMockEngagements(talent, [entry]).applications[0].status, entry.status)
    assert.throws(() => respondToMockInvitation(talent, entry.id, 'INTERESTED', [entry]), /indisponible/)
  }
})
