import assert from 'node:assert/strict'
import test from 'node:test'
import { demoOrganizationServices } from '../src/mocks/organizations.js'
import { addMockOrganizationNote, attachMockOrganizationMissions, createMockOrganization, getMockOrganizationById, listMockAttachableMissions, listMockOrganizationMissions, listMockOrganizations, listMockOrganizationServices, organizationProvenanceLabel, updateMockOrganization } from '../src/services/businessService.js'
import { getMockAdminMission, getMockPublishedMission, listMockAdminMissions, listMockPublishedMissions } from '../src/services/adminMissionService.js'

test('les rôles des entreprises sont multiples et indépendants des accords commerciaux', () => {
  const organizations = listMockOrganizations()
  assert.equal(new Set(organizations.map(({ id }) => id)).size, organizations.length)
  assert.ok(organizations.some(({ types }) => types.includes('ESN') && types.includes('PARTNER')))
  assert.ok(organizations.some(({ types }) => types.includes('CLIENT') && types.includes('PARTNER')))
  assert.ok(organizations.some(({ types, agreement }) => types.includes('PARTNER') && agreement.status === 'NONE'))
  for (const status of ['NONE', 'ACTIVE', 'EXPIRED']) assert.ok(organizations.some(({ agreement }) => agreement.status === status))
  assert.ok(organizations.every(({ types, contacts, collaborationStatus, provenance }) => types.length && contacts.length && collaborationStatus && provenance))

  organizations[0].contacts[0].name = 'Modification locale'
  organizations[0].types.pop()
  assert.notEqual(listMockOrganizations()[0].contacts[0].name, 'Modification locale')
  assert.equal(listMockOrganizations()[0].types.length, 2)
})

test('les missions admin et prestations fictives sont associées par identifiant stable', () => {
  const missions = listMockAdminMissions()
  const organizations = listMockOrganizations()
  assert.ok(missions.every(({ organizationId }) => organizations.some(({ id }) => id === organizationId)))
  assert.equal(organizations.reduce((total, { missionCount }) => total + missionCount, 0), missions.length)
  for (const organization of organizations) {
    const related = listMockOrganizationMissions(organization.id)
    assert.equal(organization.missionCount, related.length)
    assert.ok(related.every(({ organizationId }) => organizationId === organization.id))
    assert.ok(listMockOrganizationServices(organization.id).every(({ organizationId }) => organizationId === organization.id))
    assert.equal(getMockOrganizationById(organization.id)?.missionCount, related.length)
  }
  assert.equal(new Set(demoOrganizationServices.map(({ id }) => id)).size, demoOrganizationServices.length)
  assert.ok(demoOrganizationServices.every(({ organizationId }) => organizations.some(({ id }) => id === organizationId)))
  assert.equal(getMockOrganizationById('org-inconnue'), null)
  assert.deepEqual(listMockOrganizationMissions('org-inconnue'), [])
  assert.deepEqual(listMockOrganizationServices('org-inconnue'), [])
})

test('les identifiants des entreprises restent hors des missions côté freelance', () => {
  for (const mission of listMockPublishedMissions()) assert.equal('organizationId' in mission, false)
  for (const mission of listMockAdminMissions()) {
    assert.equal(getMockAdminMission(mission.id).organizationId, mission.organizationId)
    if (getMockPublishedMission(mission.id)) assert.equal('organizationId' in getMockPublishedMission(mission.id), false)
  }
})

const admin = { role: 'ADMIN' }
const directProvenance = { provenance: 'DIRECT_CONTACT' }
const editFields = (organization, changes = {}) => ({
  name: organization.name, types: organization.types,
  contactName: organization.contacts[0]?.name ?? '', contactRole: organization.contacts[0]?.role ?? '',
  provenance: organization.provenance, provenanceDetail: organization.provenanceDetail,
  collaborationStatus: organization.collaborationStatus, ...changes,
})

test('création valide sans mission, contact facultatif et persistance locale', () => {
  const originalStorage = globalThis.localStorage
  const values = new Map()
  globalThis.localStorage = { getItem: (key) => values.get(key) ?? null, setItem: (key, value) => values.set(key, value) }
  try {
    const { organization, persisted } = createMockOrganization({ name: '  Exemple Nouvel Horizon  ', types: ['PARTNER'], ...directProvenance }, admin)
    assert.equal(persisted, true)
    assert.equal(organization.name, 'Exemple Nouvel Horizon')
    assert.equal(organization.missionCount, 0)
    assert.deepEqual(organization.agreement, { status: 'NONE' })
    assert.deepEqual(organization.contacts, [])
    assert.equal(organization.collaborationStatus, 'PROSPECTING')
    assert.equal(JSON.parse(values.get('wenovat:admin-organizations:v1'))[0].id, organization.id)
    assert.equal(getMockOrganizationById(organization.id).name, organization.name)
    assert.throws(() => createMockOrganization({ name: 'exemple nouvel horizon', types: ['ESN'], ...directProvenance }, admin), /existe déjà/)
  } finally {
    if (originalStorage === undefined) delete globalThis.localStorage
    else globalThis.localStorage = originalStorage
  }
})

test('création avec missions transférées met à jour les deux entreprises, sans exposer le client au freelance', () => {
  const originalStorage = globalThis.localStorage
  const values = new Map()
  globalThis.localStorage = { getItem: (key) => values.get(key) ?? null, setItem: (key, value) => values.set(key, value) }
  try {
    const before = getMockOrganizationById('org-horizon').missionCount
    const initial = getMockAdminMission('exemple-cloud')
    const input = { name: 'Entreprise cloud fictive', types: ['ESN', 'PARTNER'], ...directProvenance, missionIds: ['exemple-cloud', 'exemple-architecture-strategique'] }
    assert.throws(() => createMockOrganization(input, admin), /Confirmez le transfert/)
    assert.equal(listMockOrganizations().length, 4)
    const { organization } = createMockOrganization({ ...input, confirmTransfers: true }, admin)
    assert.equal(organization.missionCount, 2)
    assert.equal(getMockOrganizationById('org-horizon').missionCount, before - 2)
    assert.equal(getMockAdminMission('exemple-cloud').organizationId, organization.id)
    assert.equal(getMockAdminMission('exemple-cloud').organization, organization.name)
    assert.equal(getMockAdminMission('exemple-cloud').source, initial.source)
    assert.equal(getMockAdminMission('exemple-cloud').status, initial.status)
    assert.equal(getMockAdminMission('exemple-cloud').access, initial.access)
    assert.equal('organizationId' in getMockPublishedMission('exemple-cloud'), false)
    assert.equal('organization' in getMockPublishedMission('exemple-cloud'), false)
    assert.equal(listMockAttachableMissions().find(({ id }) => id === 'exemple-cloud').organization, organization.name)
    assert.equal(JSON.parse(values.get('wenovat:admin-mission-relations:v1'))['exemple-cloud'].organizationId, organization.id)
  } finally {
    if (originalStorage === undefined) delete globalThis.localStorage
    else globalThis.localStorage = originalStorage
  }
})

test('rattachement depuis une fiche : validation de tout le lot avant mutation et confirmation requise', () => {
  const originalStorage = globalThis.localStorage
  const values = new Map()
  globalThis.localStorage = { getItem: (key) => values.get(key) ?? null, setItem: (key, value) => values.set(key, value) }
  try {
    const previous = getMockAdminMission('exemple-data')
    assert.throws(() => attachMockOrganizationMissions('org-rivage', ['exemple-data'], admin), /Confirmez le transfert/)
    assert.throws(() => attachMockOrganizationMissions('org-rivage', ['exemple-data', 'exemple-cloud'], admin, true), /rôle ESN/)
    assert.equal(getMockAdminMission('exemple-data').organizationId, previous.organizationId)
    assert.throws(() => attachMockOrganizationMissions('org-rivage', ['exemple-data', 'exemple-data'], admin, true), /doublon/)
    assert.throws(() => attachMockOrganizationMissions('org-inconnue', [], admin), /introuvable/)
    const result = attachMockOrganizationMissions('org-rivage', ['exemple-data'], admin, true)
    assert.equal(result.transferredCount, 1)
    assert.equal(result.organization.missionCount, 3)
    assert.equal(getMockOrganizationById('org-atlas').missionCount, 2)
    assert.equal(getMockAdminMission('exemple-data').organization, 'Client direct fictif Rivage')
  } finally {
    if (originalStorage === undefined) delete globalThis.localStorage
    else globalThis.localStorage = originalStorage
  }
})

test('validation des entrées, rôles incompatibles et absence de droits administrateur', () => {
  const originalStorage = globalThis.localStorage
  globalThis.localStorage = { getItem: () => null, setItem: () => {} }
  try {
    const valid = { name: 'Entreprise test fictive', types: ['ESN'], ...directProvenance }
    assert.throws(() => createMockOrganization(valid, { role: 'FREELANCE' }), /administrateur/)
    assert.throws(() => createMockOrganization({ ...valid, name: '   ' }, admin), /nom/)
    assert.throws(() => createMockOrganization({ ...valid, types: [] }, admin), /rôle/)
    assert.throws(() => createMockOrganization({ ...valid, types: ['ESN', 'ESN'] }, admin), /doublon/)
    assert.throws(() => createMockOrganization({ ...valid, types: ['UNKNOWN'] }, admin), /rôle/)
    assert.throws(() => createMockOrganization({ ...valid, missionIds: ['exemple-data'], confirmTransfers: true }, admin), /Client direct/)
    assert.throws(() => createMockOrganization({ ...valid, missionIds: ['mission-inconnue'] }, admin), /introuvable/)
    assert.throws(() => createMockOrganization({ ...valid, missionIds: ['exemple-cloud', 'exemple-cloud'] }, admin), /doublon/)
    assert.throws(() => createMockOrganization({ ...valid, contactRole: 'Responsable' }, admin), /nom du contact/)
    assert.equal(listMockOrganizations().length, 4)
    assert.throws(() => attachMockOrganizationMissions('org-horizon', ['exemple-cloud'], { role: 'FREELANCE' }), /administrateur/)
    assert.throws(() => attachMockOrganizationMissions('org-horizon', ['exemple-data'], admin, true), /Client direct/)
    assert.throws(() => attachMockOrganizationMissions('org-horizon', ['mission-inconnue'], admin), /introuvable/)
  } finally {
    if (originalStorage === undefined) delete globalThis.localStorage
    else globalThis.localStorage = originalStorage
  }
})

test('données enregistrées invalides ignorées et stockage bloqué : repli mémoire', () => {
  const originalStorage = globalThis.localStorage
  const values = new Map([['wenovat:admin-organizations:v1', JSON.stringify([{ id: 'org-corrupt', name: 'Fausse entreprise', types: ['OTHER'], contacts: [], provenance: '', collaborationStatus: 'PROSPECT', agreement: { status: 'NONE' } }])]])
  globalThis.localStorage = { getItem: (key) => values.get(key) ?? null, setItem: () => { throw new Error('blocked') } }
  try {
    assert.equal(listMockOrganizations().length, 4)
    const { organization, persisted } = createMockOrganization({ name: 'Entreprise éphémère', types: ['CLIENT'], ...directProvenance, missionIds: ['exemple-data'], confirmTransfers: true }, admin)
    assert.equal(persisted, false)
    assert.equal(getMockOrganizationById(organization.id).missionCount, 1)
    assert.equal(getMockAdminMission('exemple-data').organizationId, organization.id)
    assert.equal(attachMockOrganizationMissions('org-atlas', ['exemple-data'], admin, true).persisted, false)
  } finally {
    if (originalStorage === undefined) delete globalThis.localStorage
    else globalThis.localStorage = originalStorage
  }
})

test('provenance et stade sont obligatoires, Autre requiert une précision et le commentaire initial crée une note', () => {
  const originalStorage = globalThis.localStorage
  globalThis.localStorage = { getItem: () => null, setItem: () => {} }
  try {
    const base = { name: 'Entreprise du journal', types: ['PARTNER'] }
    assert.throws(() => createMockOrganization(base, admin), /provenance/)
    assert.throws(() => createMockOrganization({ ...base, provenance: 'OTHER' }, admin), /Précisez/)
    assert.throws(() => createMockOrganization({ ...base, provenance: 'INCONNUE' }, admin), /provenance/)
    assert.throws(() => createMockOrganization({ ...base, ...directProvenance, collaborationStatus: 'UNKNOWN' }, admin), /stade/)
    assert.throws(() => createMockOrganization({ ...base, ...directProvenance, comment: 'x'.repeat(1001) }, admin), /1000/)
    const { organization } = createMockOrganization({ ...base, provenance: 'OTHER', provenanceDetail: 'Salon professionnel', collaborationStatus: 'PAUSED', comment: ' Premier échange de démonstration ' }, admin)
    assert.equal(organizationProvenanceLabel(organization), 'Autre : Salon professionnel')
    assert.equal(organization.collaborationStatus, 'PAUSED')
    assert.equal(organization.notes.length, 1)
    assert.equal(organization.notes[0].text, 'Premier échange de démonstration')
    assert.equal(organization.notes[0].author, 'Admin démo')
    assert.ok(Number.isFinite(Date.parse(organization.notes[0].createdAt)))
  } finally {
    if (originalStorage === undefined) delete globalThis.localStorage
    else globalThis.localStorage = originalStorage
  }
})

test('édition des exemples : renommage des missions admin, stade, accord immuable et rôles compatibles', () => {
  const originalStorage = globalThis.localStorage
  const values = new Map()
  globalThis.localStorage = { getItem: (key) => values.get(key) ?? null, setItem: (key, value) => values.set(key, value) }
  try {
    const before = getMockOrganizationById('org-horizon')
    assert.throws(() => updateMockOrganization(before.id, editFields(before, { types: ['PARTNER'] }), admin), /Transférez d’abord/)
    assert.throws(() => updateMockOrganization(before.id, editFields(before, { name: 'Client direct fictif Atlas' }), admin), /existe déjà/)
    assert.throws(() => updateMockOrganization(before.id, editFields(before), { role: 'FREELANCE' }), /administrateur/)
    assert.throws(() => updateMockOrganization(before.id, editFields(before, { agreement: { status: 'NONE' }, provenance: '' }), admin), /provenance/)
    const renamed = 'ESN Horizon Renommée'
    const result = updateMockOrganization(before.id, editFields(before, { name: renamed, collaborationStatus: 'PROSPECTING', provenance: 'OUTBOUND_PROSPECTING' }), admin)
    assert.equal(result.persisted, true)
    assert.equal(result.organization.collaborationStatus, 'PROSPECTING')
    assert.deepEqual(result.organization.agreement, before.agreement)
    assert.equal(getMockAdminMission('exemple-cloud').organization, renamed)
    assert.equal(getMockAdminMission('exemple-cloud').organizationId, before.id)
    assert.equal('organization' in getMockPublishedMission('exemple-cloud'), false)
    assert.equal(JSON.parse(values.get('wenovat:admin-organization-overrides:v1'))[before.id].name, renamed)
  } finally {
    if (originalStorage === undefined) delete globalThis.localStorage
    else globalThis.localStorage = originalStorage
  }
})

test('notes datées ajoutées une à une, copies isolées et écriture refusée en repli mémoire', () => {
  const originalStorage = globalThis.localStorage
  globalThis.localStorage = { getItem: () => null, setItem: () => { throw new Error('blocked') } }
  try {
    assert.throws(() => addMockOrganizationNote('org-horizon', ' ', admin), /commentaire/)
    assert.throws(() => addMockOrganizationNote('org-horizon', 'a'.repeat(1001), admin), /1000/)
    assert.throws(() => addMockOrganizationNote('org-horizon', 'Texte', { role: 'FREELANCE' }), /administrateur/)
    const first = addMockOrganizationNote('org-horizon', 'Premier commentaire', admin)
    assert.equal(first.persisted, false)
    const second = addMockOrganizationNote('org-horizon', 'Deuxième commentaire', admin)
    assert.equal(second.organization.notes.length, 2)
    assert.equal(second.organization.notes[0].text, 'Deuxième commentaire')
    assert.notEqual(second.organization.notes[0].id, second.organization.notes[1].id)
    second.organization.notes[0].text = 'Modifié hors service'
    assert.equal(getMockOrganizationById('org-horizon').notes[0].text, 'Deuxième commentaire')
  } finally {
    if (originalStorage === undefined) delete globalThis.localStorage
    else globalThis.localStorage = originalStorage
  }
})

test('ancienne entreprise locale sans provenance conservée mais non enregistrable avant régularisation', () => {
  const originalStorage = globalThis.localStorage
  const legacy = { id: 'org-ancien', name: 'Entreprise ancienne', types: ['CLIENT'], contacts: [], provenance: '', collaborationStatus: 'PROSPECT', agreement: { status: 'NONE' } }
  const values = new Map([['wenovat:admin-organizations:v1', JSON.stringify([legacy])]])
  globalThis.localStorage = { getItem: (key) => values.get(key) ?? null, setItem: (key, value) => values.set(key, value) }
  try {
    const organization = getMockOrganizationById(legacy.id)
    assert.equal(organization.name, legacy.name)
    assert.equal(organizationProvenanceLabel(organization), 'Non renseignée')
    assert.deepEqual(organization.notes, [])
    assert.throws(() => updateMockOrganization(legacy.id, editFields(organization), admin), /provenance/)
    const updated = updateMockOrganization(legacy.id, editFields(organization, { provenance: 'REFERRAL', collaborationStatus: 'PROSPECTING' }), admin)
    assert.equal(updated.organization.provenance, 'REFERRAL')
    assert.equal(JSON.parse(values.get('wenovat:admin-organizations:v1'))[0].provenance, 'REFERRAL')
  } finally {
    if (originalStorage === undefined) delete globalThis.localStorage
    else globalThis.localStorage = originalStorage
  }
})

test('migration des anciennes provenances textuelles et édition d’une entreprise créée', () => {
  const originalStorage = globalThis.localStorage
  const legacy = { id: 'org-ancienne-esn', name: 'Ancienne ESN locale', types: ['ESN'], contacts: [], provenance: 'Réseau professionnel (exemple)', collaborationStatus: 'PROSPECT', agreement: { status: 'NONE' } }
  const values = new Map([['wenovat:admin-organizations:v1', JSON.stringify([legacy])]])
  globalThis.localStorage = { getItem: (key) => values.get(key) ?? null, setItem: (key, value) => values.set(key, value) }
  try {
    const restored = getMockOrganizationById(legacy.id)
    assert.equal(restored.provenance, 'PROFESSIONAL_NETWORK')
    assert.equal(restored.collaborationStatus, 'PROSPECT')
    assert.equal(organizationProvenanceLabel(restored), 'Réseau professionnel')
    const edited = updateMockOrganization(legacy.id, editFields(restored, { collaborationStatus: 'ACTIVE', contactName: 'Contact local', contactRole: 'Direction' }), admin)
    assert.equal(edited.organization.collaborationStatus, 'ACTIVE')
    assert.equal(edited.organization.contacts[0].name, 'Contact local')
    assert.equal(addMockOrganizationNote(legacy.id, 'Note de suivi', admin).organization.notes[0].text, 'Note de suivi')
    assert.equal(JSON.parse(values.get('wenovat:admin-organizations:v1'))[0].provenance, 'PROFESSIONAL_NETWORK')
  } finally {
    if (originalStorage === undefined) delete globalThis.localStorage
    else globalThis.localStorage = originalStorage
  }
})

test('enregistrements de notes corrompus ignorés sans interrompre la lecture des autres entreprises', () => {
  const originalStorage = globalThis.localStorage
  const broken = { id: 'org-note-invalide', name: 'Entreprise corrompue', types: ['PARTNER'], contacts: [], provenance: 'REFERRAL', collaborationStatus: 'PROSPECT', agreement: { status: 'NONE' }, notes: [null] }
  globalThis.localStorage = { getItem: (key) => key === 'wenovat:admin-organizations:v1' ? JSON.stringify([broken]) : null, setItem: () => {} }
  try {
    assert.equal(getMockOrganizationById(broken.id), null)
    assert.equal(listMockOrganizations().length, 4)
  } finally {
    if (originalStorage === undefined) delete globalThis.localStorage
    else globalThis.localStorage = originalStorage
  }
})
