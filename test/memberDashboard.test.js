import assert from 'node:assert/strict'
import test from 'node:test'
import { getAccessibleMission, getAccessibleMissions } from '../src/services/missionService.js'
import { getMockEngagements, respondToMockInvitation } from '../src/services/engagementService.js'
import { getMockTalent, saveMockTalent } from '../src/services/talentService.js'
import { getMockQualification, setMockQualification } from '../src/services/qualificationService.js'
import { demoMissions } from '../src/mocks/missions.js'

const member = { id: 'demo-freelance', source: 'WENOVAT', qualificationStatus: 'NOT_EVALUATED' }

function memoryStorage() {
  const entries = new Map()
  return {
    getItem: (key) => entries.get(key) ?? null,
    setItem: (key, value) => entries.set(key, value),
    removeItem: (key) => entries.delete(key),
  }
}

test('un membre non qualifié ne reçoit que les missions standard accessibles et aucun détail premium', () => {
  assert.deepEqual(getAccessibleMissions(member).map(({ id }) => id), ['exemple-cloud', 'exemple-data', 'exemple-ia', 'exemple-cyber-invitation'])
  assert.equal(getAccessibleMission('exemple-architecture-strategique', member), null)
  assert.equal(getAccessibleMission('exemple-cloud-premium-invitation', member), null)
  assert.equal(getAccessibleMission('identifiant-inconnu', member), null)
  assert.equal(getAccessibleMissions({ ...member, source: 'EXTERNAL', qualificationStatus: 'QUALIFIED' }).length, 0)
  const qualified = { ...member, qualificationStatus: 'QUALIFIED' }
  assert.equal(getAccessibleMissions(qualified).length, 6)
  assert.equal(getAccessibleMission('exemple-architecture-strategique', qualified)?.access, 'PREMIUM')
  assert.equal(getAccessibleMission('exemple-cloud-premium-invitation', qualified)?.visibility, 'INVITE_ONLY')
  assert.equal(getAccessibleMission('exemple-cloud-premium-invitation', { ...qualified, id: 'nouvel-inscrit' }), null)
  assert.ok(demoMissions.every(({ status }) => status === 'PUBLISHED'))
})

test('les règles de publication et d’invitation s’appliquent aussi à l’accès direct', () => {
  const catalog = { ...demoMissions[0], id: 'fixture-catalog' }
  const inviteOnly = { ...catalog, id: 'fixture-invite', visibility: 'INVITE_ONLY' }
  const premium = { ...catalog, id: 'fixture-premium', access: 'PREMIUM' }
  const unpublished = { ...catalog, id: 'fixture-draft', status: 'DRAFT' }
  const unknownVisibility = { ...catalog, id: 'fixture-unknown', visibility: 'HIDDEN' }
  const missions = [catalog, inviteOnly, premium, unpublished, unknownVisibility]
  const invitations = [
    { id: 'invitation-fixture', talentId: member.id, missionId: inviteOnly.id, type: 'INVITATION', status: 'PENDING' },
    { id: 'invitation-autre', talentId: 'autre-compte', missionId: premium.id, type: 'INVITATION', status: 'PENDING' },
  ]
  assert.deepEqual(getAccessibleMissions(member, missions, invitations).map(({ id }) => id), ['fixture-catalog', 'fixture-invite'])
  assert.deepEqual(getAccessibleMissions({ ...member, qualificationStatus: 'QUALIFIED' }, missions, invitations).map(({ id }) => id), ['fixture-catalog', 'fixture-invite', 'fixture-premium'])
  assert.equal(getAccessibleMission(inviteOnly.id, { ...member, id: 'autre-compte' }, missions, invitations), null)
  assert.equal(getAccessibleMission(unpublished.id, member, missions, invitations), null)
  assert.equal(getAccessibleMission(premium.id, member, missions, invitations), null)
  assert.deepEqual(getAccessibleMissions(member, missions, invitations, { 'invitation-fixture': 'DECLINED' }).map(({ id }) => id), ['fixture-catalog'])
  assert.ok(getAccessibleMission(inviteOnly.id, member, missions, invitations, { 'invitation-fixture': 'ACCEPTED' }))
  assert.deepEqual(getAccessibleMissions({ ...member, source: 'EXTERNAL', qualificationStatus: 'QUALIFIED' }, missions, invitations), [])
})

test('les engagements restent propres au compte et aux missions accessibles', () => {
  const initial = getMockEngagements(member)
  assert.equal(initial.invitations.length, 2)
  assert.equal(initial.applications.length, 2)
  assert.deepEqual(getMockEngagements({ ...member, id: 'nouvel-inscrit' }), { invitations: [], applications: [] })
  const restricted = getMockEngagements(member, [
    { id: 'secret-invitation', talentId: member.id, missionId: 'exemple-architecture-strategique', type: 'INVITATION', status: 'PENDING' },
  ])
  assert.deepEqual(restricted, { invitations: [], applications: [] })
})

test('exprimer son intérêt conserve l’invitation sans créer de candidature', () => {
  const previous = globalThis.localStorage
  globalThis.localStorage = memoryStorage()
  try {
    const accepted = respondToMockInvitation(member, 'exemple-invitation-cloud', 'INTERESTED')
    assert.equal(accepted.invitations.length, 2)
    assert.equal(accepted.invitations.find(({ id }) => id === 'exemple-invitation-cloud').status, 'INTERESTED')
    assert.equal(accepted.applications.length, 2)
    assert.equal(getMockEngagements(member).applications.length, 2)
    assert.equal(getMockEngagements({ ...member, id: 'autre-compte' }).applications.length, 0)
    assert.throws(() => respondToMockInvitation(member, 'exemple-invitation-cloud', 'UNAVAILABLE'), /indisponible/)

    const other = { ...member, id: 'demo-autre' }
    const pending = { id: 'invitation-autre', talentId: other.id, missionId: 'exemple-cloud', type: 'INVITATION', status: 'PENDING' }
    assert.equal(getMockEngagements(other, [pending]).invitations.length, 1)
  } finally {
    if (previous === undefined) delete globalThis.localStorage
    else globalThis.localStorage = previous
  }
})

test('une invitation refusée ferme la liste et la fiche, une acceptation les conserve', () => {
  const previous = globalThis.localStorage
  globalThis.localStorage = memoryStorage()
  try {
    const qualified = { ...member, qualificationStatus: 'QUALIFIED' }
    assert.ok(getAccessibleMission('exemple-cloud-premium-invitation', qualified))
    const accepted = respondToMockInvitation(qualified, 'exemple-invitation-premium', 'INTERESTED')
    assert.ok(accepted.invitations.some(({ mission, status }) => mission.id === 'exemple-cloud-premium-invitation' && status === 'INTERESTED'))
    assert.ok(getAccessibleMission('exemple-cloud-premium-invitation', qualified))
    respondToMockInvitation(member, 'exemple-invitation-cyber', 'UNAVAILABLE')
    assert.equal(getAccessibleMission('exemple-cyber-invitation', member), null)
    assert.ok(!getAccessibleMissions(member).some(({ id }) => id === 'exemple-cyber-invitation'))
  } finally {
    if (previous === undefined) delete globalThis.localStorage
    else globalThis.localStorage = previous
  }
})

test('indiquer son indisponibilité ferme la mission sans ajouter de candidature', () => {
  const previous = globalThis.localStorage
  globalThis.localStorage = memoryStorage()
  try {
    const otherMember = { ...member, id: 'demo-refus' }
    const invitation = { id: 'invitation-refus', talentId: otherMember.id, missionId: 'exemple-cloud', type: 'INVITATION', status: 'PENDING' }
    const declined = respondToMockInvitation(otherMember, invitation.id, 'UNAVAILABLE', [invitation])
    assert.equal(declined.invitations[0].status, 'UNAVAILABLE')
    assert.equal(declined.applications.length, 0)
    assert.equal(getMockEngagements(otherMember, [invitation]).invitations[0].status, 'UNAVAILABLE')
  } finally {
    if (previous === undefined) delete globalThis.localStorage
    else globalThis.localStorage = previous
  }
})

test('la décision admin ne peut pas être modifiée par la sauvegarde du profil freelance', () => {
  const previous = globalThis.localStorage
  globalThis.localStorage = memoryStorage()
  try {
    assert.throws(() => setMockQualification('demo-freelance', 'QUALIFIED', { role: 'FREELANCE' }), /indisponible/)
    assert.equal(setMockQualification('demo-freelance', 'QUALIFIED', { role: 'ADMIN' }), 'QUALIFIED')
    assert.equal(getMockQualification('demo-freelance'), 'QUALIFIED')
    const profile = getMockTalent({ id: 'demo-freelance', role: 'FREELANCE' })
    assert.equal(profile.qualificationStatus, 'QUALIFIED')
    const saved = saveMockTalent({ ...profile, qualificationStatus: 'NOT_QUALIFIED' })
    assert.equal(saved.talent.qualificationStatus, 'NOT_EVALUATED')
    assert.equal(getMockTalent({ id: 'demo-freelance', role: 'FREELANCE' }).qualificationStatus, 'QUALIFIED')
  } finally {
    if (previous === undefined) delete globalThis.localStorage
    else globalThis.localStorage = previous
  }
})
