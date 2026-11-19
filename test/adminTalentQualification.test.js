import assert from 'node:assert/strict'
import test from 'node:test'
import { adminTalentExamples } from '../src/mocks/talents.js'
import { decideMockAdminQualification, getMockAdminQualification } from '../src/services/qualificationService.js'
import { getMockAdminTalentById, listMockAdminTalents } from '../src/services/talentService.js'
import { getAccessibleMissions } from '../src/services/missionService.js'

const admin = { role: 'ADMIN', id: 'demo-admin' }

function memoryStorage() {
  const entries = new Map()
  return {
    entries,
    getItem: (key) => entries.get(key) ?? null,
    setItem: (key, value) => entries.set(key, value),
  }
}

test('une décision de chaque type met à jour la liste et historise la transition', () => {
  const previous = globalThis.localStorage
  const storage = memoryStorage()
  globalThis.localStorage = storage
  const id = 'exemple-talent-02'
  const statuses = ['SELECTED_FOR_REVIEW', 'INTERVIEW_SCHEDULED', 'QUALIFIED', 'NOT_QUALIFIED', 'NOT_EVALUATED']
  try {
    let before = 'NOT_EVALUATED'
    for (const status of statuses) {
      const { event, persisted } = decideMockAdminQualification(id, status, `  Motif ${status}  `, admin)
      assert.equal(persisted, true)
      assert.match(event.id, /^qualification:exemple-talent-02:/)
      assert.equal(event.previousStatus, before)
      assert.equal(event.nextStatus, status)
      assert.equal(event.reason, `Motif ${status}`)
      assert.equal(event.author, 'Admin démo')
      assert.ok(Number.isFinite(Date.parse(event.date)))
      assert.equal(getMockAdminTalentById(id).qualificationStatus, status)
      assert.equal(listMockAdminTalents().find((talent) => talent.id === id).qualificationStatus, status)
      before = status
    }
    const history = getMockAdminQualification(id).history
    assert.equal(history.length, statuses.length)
    assert.deepEqual(history.map((event) => event.nextStatus), [...statuses].reverse())
    history[0].reason = 'altéré'
    assert.equal(getMockAdminQualification(id).history[0].reason, 'Motif NOT_EVALUATED')
    assert.equal(adminTalentExamples.find((talent) => talent.id === id).qualificationStatus, 'NOT_EVALUATED')
  } finally {
    if (previous === undefined) delete globalThis.localStorage
    else globalThis.localStorage = previous
  }
})

test('refuse les décisions sans droit, motif, talent ou changement effectif', () => {
  const id = 'exemple-talent-12'
  assert.throws(() => decideMockAdminQualification(id, 'QUALIFIED', 'Essai', { role: 'FREELANCE' }), /administrateur/)
  assert.throws(() => decideMockAdminQualification('inconnu', 'QUALIFIED', 'Essai', admin), /introuvable/)
  assert.throws(() => decideMockAdminQualification(id, 'UNKNOWN', 'Essai', admin), /invalide/)
  assert.throws(() => decideMockAdminQualification(id, 'NOT_EVALUATED', 'Essai', admin), /déjà appliqué/)
  assert.throws(() => decideMockAdminQualification(id, 'QUALIFIED', ' ', admin), /motif/)
  assert.equal(getMockAdminQualification('inconnu'), null)
  assert.equal(getMockAdminQualification(id).history.length, 0)
})

test('un externe qualifié reste exclu du catalogue premium et sa source ne change pas', () => {
  const id = 'exemple-talent-03'
  decideMockAdminQualification(id, 'QUALIFIED', 'Décision locale de test', admin)
  const talent = getMockAdminTalentById(id)
  assert.equal(talent.source, 'EXTERNAL')
  assert.equal(talent.qualificationStatus, 'QUALIFIED')
  assert.equal(getAccessibleMissions(talent).length, 0)
  assert.equal(adminTalentExamples.find((entry) => entry.id === id).qualificationStatus, 'NOT_EVALUATED')
  assert.equal(getAccessibleMissions({ ...talent, source: 'WENOVAT' }).some((mission) => mission.access === 'PREMIUM'), true)
})

test('copies profondes, stockage corrompu ignoré et repli mémoire pendant la visite', () => {
  const previous = globalThis.localStorage
  const id = 'exemple-talent-01'
  const copy = getMockAdminTalentById(id)
  copy.experiences[0].title = 'Altéré'
  copy.cv.name = 'altéré.pdf'
  copy.contact.email = 'altéré'
  assert.notEqual(getMockAdminTalentById(id).experiences[0].title, 'Altéré')
  assert.notEqual(getMockAdminTalentById(id).cv.name, 'altéré.pdf')
  assert.notEqual(getMockAdminTalentById(id).contact.email, 'altéré')

  const storage = memoryStorage()
  globalThis.localStorage = storage
  const key = 'wenovat:admin-talent-qualification:v1:exemple-talent-09'
  try {
    storage.setItem(key, JSON.stringify({ status: 'QUALIFIED', history: [] }))
    assert.equal(getMockAdminQualification('exemple-talent-09').status, 'SELECTED_FOR_REVIEW')
    globalThis.localStorage = { getItem: () => null, setItem: () => { throw new Error('quota') } }
    const result = decideMockAdminQualification('exemple-talent-09', 'QUALIFIED', 'Repli mémoire', admin)
    assert.equal(result.persisted, false)
    assert.equal(getMockAdminQualification('exemple-talent-09').status, 'QUALIFIED')
  } finally {
    if (previous === undefined) delete globalThis.localStorage
    else globalThis.localStorage = previous
  }
})
