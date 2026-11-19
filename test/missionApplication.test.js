import assert from 'node:assert/strict'
import test from 'node:test'
import { applyToMockMission, getAccessibleMission, getMockMissionApplications } from '../src/services/missionService.js'
import { getMockEngagements, respondToMockInvitation } from '../src/services/engagementService.js'
import { demoMissions } from '../src/mocks/missions.js'

function memoryStorage() {
  const values = new Map()
  return {
    getItem: (key) => values.get(key) ?? null,
    setItem: (key, value) => values.set(key, value),
    removeItem: (key) => values.delete(key),
  }
}

function withStorage(run) {
  const original = globalThis.localStorage
  globalThis.localStorage = memoryStorage()
  try { run() } finally {
    if (original === undefined) delete globalThis.localStorage
    else globalThis.localStorage = original
  }
}

test('une candidature est unique, persistée par compte et visible dans le suivi', () => withStorage(() => {
  const talent = { id: 'candidat-test-unique', source: 'WENOVAT', qualificationStatus: 'NOT_EVALUATED' }
  const other = { ...talent, id: 'candidat-test-autre' }
  const entry = applyToMockMission('exemple-cloud', talent)
  assert.deepEqual(entry, { id: `application:${talent.id}:exemple-cloud`, talentId: talent.id, missionId: 'exemple-cloud', type: 'APPLICATION', status: 'RECEIVED', createdAt: new Date().toISOString().slice(0, 10) })
  assert.deepEqual(getMockMissionApplications(talent.id), [entry])
  assert.equal(getMockEngagements(talent).applications.find(({ id }) => id === entry.id)?.mission.id, 'exemple-cloud')
  assert.equal(getMockEngagements(other).applications.length, 0)
  assert.throws(() => applyToMockMission('exemple-cloud', talent), /déjà candidaté/)
  assert.equal(JSON.parse(globalThis.localStorage.getItem(`wenovat:mission-applications:v1:${talent.id}`)).length, 1)
  globalThis.localStorage.setItem(`wenovat:mission-applications:v1:${talent.id}`, JSON.stringify([entry, entry]))
  assert.equal(getMockMissionApplications(talent.id).length, 1)
}))

test('une candidature initiale reste unique et un intérêt permet ensuite de candidater', () => withStorage(() => {
  const member = { id: 'demo-freelance', source: 'WENOVAT', qualificationStatus: 'NOT_EVALUATED' }
  assert.throws(() => applyToMockMission('exemple-data', member), /déjà candidaté/)
  respondToMockInvitation(member, 'exemple-invitation-cyber', 'INTERESTED')
  assert.equal(getMockEngagements(member).invitations.find(({ id }) => id === 'exemple-invitation-cyber').status, 'INTERESTED')
  assert.equal(applyToMockMission('exemple-cyber-invitation', member).status, 'RECEIVED')
  assert.equal(getMockEngagements(member).applications.filter(({ mission }) => mission.id === 'exemple-cyber-invitation').length, 1)
}))

test('aucune écriture ni lecture directe pour une mission non autorisée', () => withStorage(() => {
  const talent = { id: 'candidat-test-restrictions', source: 'WENOVAT', qualificationStatus: 'NOT_EVALUATED' }
  const qualified = { ...talent, qualificationStatus: 'QUALIFIED' }
  const external = { ...qualified, source: 'EXTERNAL' }
  const blocked = ['exemple-architecture-strategique', 'exemple-cloud-premium-invitation', 'exemple-cyber-invitation', 'inconnue']
  for (const id of blocked) {
    assert.equal(getAccessibleMission(id, talent), null)
    assert.throws(() => applyToMockMission(id, talent), /pas accessible/)
  }
  assert.equal(getAccessibleMission('exemple-cloud-premium-invitation', qualified), null)
  assert.throws(() => applyToMockMission('exemple-cloud-premium-invitation', qualified), /pas accessible/)
  assert.equal(getAccessibleMission('exemple-architecture-strategique', external), null)
  assert.throws(() => applyToMockMission('exemple-architecture-strategique', external), /indisponible/)
  const draft = [{ ...demoMissions[0], id: 'candidat-test-brouillon', status: 'DRAFT' }]
  assert.equal(getAccessibleMission(draft[0].id, talent, draft), null)
  assert.throws(() => applyToMockMission(draft[0].id, talent, draft), /pas accessible/)
  assert.deepEqual(getMockMissionApplications(talent.id), [])
}))

test('une invitation déclinée retire aussi la possibilité de candidater via la fiche', () => withStorage(() => {
  const member = { id: 'candidat-test-refus', source: 'WENOVAT', qualificationStatus: 'NOT_EVALUATED' }
  const invitation = { id: 'invitation-test-refus', talentId: member.id, missionId: 'exemple-cyber-invitation', type: 'INVITATION', status: 'PENDING' }
  assert.ok(getAccessibleMission(invitation.missionId, member, demoMissions, [invitation]))
  respondToMockInvitation(member, invitation.id, 'UNAVAILABLE', [invitation])
  assert.equal(getAccessibleMission(invitation.missionId, member, demoMissions, [invitation]), null)
  assert.throws(() => applyToMockMission(invitation.missionId, member, demoMissions, [invitation]), /pas accessible/)
}))

test('si le stockage est indisponible, la candidature reste unique pendant la visite', () => {
  const original = globalThis.localStorage
  globalThis.localStorage = { getItem: () => { throw new Error('blocked') }, setItem: () => { throw new Error('blocked') } }
  try {
    const talent = { id: 'candidat-test-sans-stockage', source: 'WENOVAT', qualificationStatus: 'NOT_EVALUATED' }
    applyToMockMission('exemple-ia', talent)
    assert.equal(getMockMissionApplications(talent.id).length, 1)
    assert.throws(() => applyToMockMission('exemple-ia', talent), /déjà candidaté/)
  } finally {
    if (original === undefined) delete globalThis.localStorage
    else globalThis.localStorage = original
  }
})
