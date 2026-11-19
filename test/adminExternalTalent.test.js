import assert from 'node:assert/strict'
import test from 'node:test'
import { createMockExternalTalent, getMockAdminTalentById, listMockAdminTalents } from '../src/services/talentService.js'
import { decideMockAdminQualification, getMockAdminQualification } from '../src/services/qualificationService.js'
import { getAccessibleMissions } from '../src/services/missionService.js'

const admin = { id: 'demo-admin', role: 'ADMIN' }
const example = {
  firstName: 'Exemple', lastName: 'Fictif', architectTitle: 'Architecte Cloud',
  originChannel: 'AUTHORIZED_SEARCH', originDetails: '', expertise: ['CLOUD'], location: 'Lyon',
  availability: 'UNKNOWN', contactStatus: 'NOT_CONTACTED', contactNotes: '',
  emailAuthorized: false, email: '',
}

function memoryStorage() {
  const records = new Map()
  return {
    records,
    getItem: (key) => records.get(key) ?? null,
    setItem: (key, value) => records.set(key, value),
  }
}

test('création externe fictive distincte du membre et de sa qualification', () => {
  const previous = globalThis.localStorage
  const storage = memoryStorage()
  globalThis.localStorage = storage
  try {
    const first = createMockExternalTalent(example, admin)
    const second = createMockExternalTalent({ ...example, originChannel: 'PROFESSIONAL_NETWORK' }, admin)
    assert.equal(first.persisted, true)
    assert.notEqual(first.talent.id, second.talent.id)
    assert.match(first.talent.id, /^demo-external-[a-z0-9-]+$/)
    assert.equal(first.talent.source, 'EXTERNAL')
    assert.equal(first.talent.qualificationStatus, 'NOT_EVALUATED')
    assert.equal(first.talent.profileStatus, 'SOURCED')
    assert.equal(first.talent.contactStatus, 'NOT_CONTACTED')
    assert.equal(first.talent.contactAuthorizationStatus, 'NOT_CONFIRMED')
    assert.equal(first.talent.contact.email, '')
    assert.equal(getMockAdminQualification(first.talent.id).status, 'NOT_EVALUATED')
    assert.equal(listMockAdminTalents().length, 14)
    first.talent.expertise.push('IA')
    assert.deepEqual(getMockAdminTalentById(first.talent.id).expertise, ['CLOUD'])
    decideMockAdminQualification(first.talent.id, 'QUALIFIED', 'Décision fictive', admin)
    const qualified = getMockAdminTalentById(first.talent.id)
    assert.equal(qualified.source, 'EXTERNAL')
    assert.equal(qualified.qualificationStatus, 'QUALIFIED')
    assert.equal(getAccessibleMissions(qualified).length, 0)
    assert.equal(getMockAdminTalentById(second.talent.id).qualificationStatus, 'NOT_EVALUATED')
  } finally {
    if (previous === undefined) delete globalThis.localStorage
    else globalThis.localStorage = previous
  }
})

test('validation service des droits, champs, canal, contact et email', () => {
  assert.throws(() => createMockExternalTalent(example, { role: 'FREELANCE' }), /administrateur/)
  assert.throws(() => createMockExternalTalent({ ...example, lastName: ' ' }, admin), /prénom, le nom/)
  assert.throws(() => createMockExternalTalent({ ...example, originChannel: 'OTHER' }, admin), /Précisez le canal/)
  assert.throws(() => createMockExternalTalent({ ...example, originChannel: 'UNKNOWN' }, admin), /canal/)
  assert.throws(() => createMockExternalTalent({ ...example, expertise: ['INVALID'] }, admin), /spécialité/)
  assert.throws(() => createMockExternalTalent({ ...example, availability: 'INVALID' }, admin), /disponibilité/)
  assert.throws(() => createMockExternalTalent({ ...example, email: 'test@example.invalid' }, admin), /autorisation/)
  assert.throws(() => createMockExternalTalent({ ...example, emailAuthorized: true, email: 'invalid' }, admin), /e-mail valide/)
  assert.throws(() => createMockExternalTalent({ ...example, contactStatus: 'DO_NOT_CONTACT', emailAuthorized: true }, admin), /refusé/)
  assert.throws(() => createMockExternalTalent({ ...example, contactStatus: 'CONTACTED' }, admin), /notes/)
})

test('stockage local relu, email fictif conditionnel et données invalides ignorées', () => {
  const previous = globalThis.localStorage
  const storage = memoryStorage()
  globalThis.localStorage = storage
  try {
    const { talent } = createMockExternalTalent({ ...example, contactStatus: 'CONTACTED', contactNotes: 'Contact manuel fictif', emailAuthorized: true, email: '  TEST@EXAMPLE.INVALID  ' }, admin)
    assert.equal(getMockAdminTalentById(talent.id).contact.email, 'test@example.invalid')
    assert.equal(getMockAdminTalentById(talent.id).contactAuthorizationStatus, 'DEMO_AUTHORIZED')
    assert.equal(JSON.parse(storage.getItem('wenovat:admin-external-talents:v1'))[0].contact.email, 'test@example.invalid')
    storage.setItem('wenovat:admin-external-talents:v1', JSON.stringify([{ ...talent, source: 'WENOVAT' }]))
    assert.equal(getMockAdminTalentById(talent.id).source, 'EXTERNAL')
    storage.setItem('wenovat:admin-external-talents:v1', JSON.stringify([{ ...talent, contact: { email: 'unauthorized@example.invalid' }, emailAuthorized: false }]))
    assert.equal(getMockAdminTalentById(talent.id).contact.email, 'test@example.invalid')
  } finally {
    if (previous === undefined) delete globalThis.localStorage
    else globalThis.localStorage = previous
  }
})

test('stockage bloqué : profil disponible durant la visite sans prétendre persister', () => {
  const previous = globalThis.localStorage
  globalThis.localStorage = { getItem: () => null, setItem: () => { throw new Error('quota') } }
  try {
    const { talent, persisted } = createMockExternalTalent(example, admin)
    assert.equal(persisted, false)
    assert.equal(getMockAdminTalentById(talent.id).profileStatus, 'SOURCED')
  } finally {
    if (previous === undefined) delete globalThis.localStorage
    else globalThis.localStorage = previous
  }
})
