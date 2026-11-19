import assert from 'node:assert/strict'
import test from 'node:test'
import { getMockAdminMission, listMockAdminMissions, listMockPublishedMissions, publishMockMission, validateMockMission } from '../src/services/adminMissionService.js'
import { getAccessibleMission, getAccessibleMissions } from '../src/services/missionService.js'
import { getMockEngagements } from '../src/services/engagementService.js'

const admin = { role: 'ADMIN' }
const member = { id: 'test-admin-missions-member', source: 'WENOVAT', qualificationStatus: 'NOT_EVALUATED' }
const qualified = { ...member, qualificationStatus: 'QUALIFIED' }

test('les exemples admin couvrent les statuts, sources et niveaux, sans métadonnées client côté freelance', () => {
  const all = listMockAdminMissions()
  assert.equal(new Set(all.map(({ id }) => id)).size, all.length)
  for (const value of ['PENDING_REVIEW', 'APPROVED', 'PUBLISHED', 'MATCHING', 'CLOSED']) assert.ok(all.some(({ status }) => status === value))
  for (const value of ['ESN', 'DIRECT_CLIENT']) assert.ok(all.some(({ source }) => source === value))
  for (const value of ['STANDARD', 'PREMIUM']) assert.ok(all.some(({ tier }) => tier === value))
  assert.ok(all.every(({ organization, owner, receivedAt, visibility }) => organization && owner && receivedAt && ['CATALOG', 'INVITE_ONLY'].includes(visibility)))
  for (const mission of listMockPublishedMissions()) {
    assert.equal('organization' in mission, false)
    assert.equal('owner' in mission, false)
    assert.equal('source' in mission, false)
    assert.equal('receivedAt' in mission, false)
  }
  assert.equal(getMockAdminMission('mission-inconnue'), null)
  assert.throws(() => validateMockMission('mission-inconnue', admin), /introuvable/)
})

test('validation puis publication sont deux transitions distinctes et persistées', () => {
  const id = 'exemple-besoin-cloud'
  const initial = getMockAdminMission(id)
  assert.equal(initial.status, 'PENDING_REVIEW')
  assert.equal(initial.visibility, 'CATALOG')
  assert.equal(getAccessibleMission(id, member), null)
  assert.throws(() => publishMockMission(id, admin), /Action indisponible/)
  assert.throws(() => validateMockMission(id, { role: 'FREELANCE' }), /administrateur/)

  const storage = globalThis.localStorage
  const values = new Map()
  globalThis.localStorage = {
    getItem: (key) => values.get(key) ?? null,
    setItem: (key, value) => values.set(key, value),
  }
  try {
    assert.equal(validateMockMission(id, admin).mission.status, 'APPROVED')
    assert.equal(getMockAdminMission(id).visibility, 'CATALOG')
    assert.equal(getAccessibleMission(id, member), null)
    assert.throws(() => validateMockMission(id, admin), /Action indisponible/)
    const published = publishMockMission(id, admin)
    assert.equal(published.mission.status, 'PUBLISHED')
    assert.equal(published.persisted, true)
    assert.equal(getAccessibleMission(id, member)?.id, id)
    assert.equal(getAccessibleMission(id, member).organization, undefined)
    assert.equal(JSON.parse(values.get('wenovat:admin-mission-status:v1'))[id], 'PUBLISHED')
    assert.throws(() => publishMockMission(id, admin), /Action indisponible/)
  } finally {
    if (storage === undefined) delete globalThis.localStorage
    else globalThis.localStorage = storage
  }
})

test('une publication premium sur invitation ne donne pas accès au catalogue standard', () => {
  const id = 'exemple-besoin-cyber'
  assert.equal(getMockAdminMission(id).status, 'APPROVED')
  assert.equal(getAccessibleMission(id, qualified), null)
  publishMockMission(id, admin)
  assert.equal(getAccessibleMission(id, member), null)
  assert.equal(getAccessibleMission(id, qualified), null)
  const invitation = [{ id: 'invitation-test-cyber-admin', missionId: id, talentId: qualified.id, type: 'INVITATION', status: 'PENDING' }]
  assert.equal(getAccessibleMissions(qualified, listMockPublishedMissions(), invitation).find(({ id: missionId }) => missionId === id)?.id, id)
  assert.equal(getAccessibleMissions(member, listMockPublishedMissions(), invitation).some(({ id: missionId }) => missionId === id), false)
  assert.equal(getAccessibleMissions({ ...qualified, source: 'EXTERNAL' }, listMockPublishedMissions(), invitation).length, 0)
})

test('un objet enrichi transmis aux façades freelance ne révèle pas le client', () => {
  const enriched = { ...listMockPublishedMissions()[0], organization: 'Secret admin', owner: 'Responsable interne', source: 'ESN' }
  const displayed = getAccessibleMissions(member, [enriched])
  assert.equal(displayed.length, 1)
  for (const key of ['organization', 'owner', 'source']) assert.equal(key in displayed[0], false)
  const engagement = { id: 'invitation-test-sanitized', talentId: member.id, missionId: enriched.id, type: 'INVITATION', status: 'PENDING' }
  assert.equal('organization' in getMockEngagements(member, [engagement], [enriched]).invitations[0].mission, false)
})
