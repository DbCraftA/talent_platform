import { demoOrganizations, demoOrganizationServices, organizationCollaborationOptions, organizationProvenanceOptions } from '../mocks/organizations.js'
import { listMockAdminMissions, renameMockAdminMissionOrganization, setMockAdminMissionRelations } from './adminMissionService.js'

const storageKey = 'wenovat:admin-organizations:v1'
const exampleStorageKey = 'wenovat:admin-organization-overrides:v1'
let currentOrganizations = null
let currentExamples = null
let activeStorage

export { organizationCollaborationOptions, organizationProvenanceOptions }

const provenanceLabels = Object.fromEntries(organizationProvenanceOptions.map(({ value, label }) => [value, label]))
const legacyProvenances = {
  'Réseau professionnel (exemple)': 'PROFESSIONAL_NETWORK',
  'Recommandation (exemple)': 'REFERRAL',
  'Prise de contact directe (exemple)': 'DIRECT_CONTACT',
  'Prospection sortante (exemple)': 'OUTBOUND_PROSPECTING',
}
const collaborationStatuses = organizationCollaborationOptions.map(({ value }) => value)
const validRoles = ['ESN', 'CLIENT', 'PARTNER']
const normalizeName = (name) => name.trim().normalize('NFKC').toLocaleLowerCase('fr-FR').replace(/\s+/g, ' ')

export function organizationProvenanceLabel(organization) {
  const label = provenanceLabels[organization?.provenance]
  return label ? (organization.provenance === 'OTHER' && organization.provenanceDetail ? `${label} : ${organization.provenanceDetail}` : label) : 'Non renseignée'
}

function activeBrowserStorage() {
  let storage = null
  try { storage = globalThis.localStorage } catch { /* Browser storage can be unavailable. */ }
  if (storage !== activeStorage) { currentOrganizations = null; currentExamples = null; activeStorage = storage }
  return storage
}

function readStorage(key) {
  let stored
  try { stored = JSON.parse(activeBrowserStorage()?.getItem(key) ?? 'null') } catch { /* Ignore corrupt local data. */ }
  return stored
}

function persist(key, value) {
  try {
    if (activeStorage) { activeStorage.setItem(key, JSON.stringify(value)); return true }
  } catch { /* Keep the updated record in memory during this visit. */ }
  return false
}

function normalizeProvenance(value) {
  return legacyProvenances[value] ?? value
}

function validNotes(notes) {
  return Array.isArray(notes) && notes.length <= 200 && new Set(notes.map((note) => note?.id)).size === notes.length
    && notes.every((note) => typeof note?.id === 'string' && note.id.startsWith('note-')
      && typeof note.text === 'string' && !!note.text.trim() && note.text.length <= 1000
      && typeof note.createdAt === 'string' && Number.isFinite(Date.parse(note.createdAt))
      && note.author === 'Admin démo')
}

function normalizeStoredOrganization(value, example = false) {
  if (!value || typeof value !== 'object' || Array.isArray(value)
    || typeof value.id !== 'string' || !/^org-[a-z0-9-]+$/i.test(value.id)
    || typeof value.name !== 'string' || !value.name.trim() || value.name.length > 120
    || !Array.isArray(value.types) || !value.types.length || new Set(value.types).size !== value.types.length
    || !value.types.every((type) => validRoles.includes(type))
    || !Array.isArray(value.contacts) || value.contacts.length > 1
    || !value.contacts.every((contact) => typeof contact?.id === 'string' && typeof contact.name === 'string' && !!contact.name.trim() && contact.name.length <= 120 && typeof contact.role === 'string' && contact.role.length <= 120)
    || typeof value.provenance !== 'string' || value.provenance.length > 200
    || typeof (value.provenanceDetail ?? '') !== 'string' || (value.provenanceDetail ?? '').length > 200
    || !['', ...organizationProvenanceOptions.map(({ value: code }) => code)].includes(normalizeProvenance(value.provenance))
    || !collaborationStatuses.includes(value.collaborationStatus)
    || (value.notes !== undefined && !validNotes(value.notes))
    || (example && !demoOrganizations.some(({ id }) => id === value.id))
    || (!example && (value.agreement?.status !== 'NONE' || demoOrganizations.some(({ id }) => id === value.id)))) return null
  if (normalizeProvenance(value.provenance) === 'OTHER' && !(value.provenanceDetail ?? '').trim()) return null
  if (example) {
    const initial = demoOrganizations.find(({ id }) => id === value.id)
    if (JSON.stringify(value.agreement) !== JSON.stringify(initial.agreement)) return null
  }
  return {
    id: value.id, name: value.name.trim(), types: [...value.types],
    contacts: value.contacts.map((contact) => ({ ...contact })),
    provenance: normalizeProvenance(value.provenance), provenanceDetail: (value.provenanceDetail ?? '').trim(),
    collaborationStatus: value.collaborationStatus,
    agreement: example ? { ...demoOrganizations.find(({ id }) => id === value.id).agreement } : { status: 'NONE' },
    notes: (value.notes ?? []).map((note) => ({ ...note })),
  }
}

function savedExamples() {
  activeBrowserStorage()
  if (currentExamples) return currentExamples
  currentExamples = {}
  const stored = readStorage(exampleStorageKey)
  if (stored && typeof stored === 'object' && !Array.isArray(stored)) {
    for (const [id, value] of Object.entries(stored)) {
      const normalized = normalizeStoredOrganization(value, true)
      if (normalized?.id === id) currentExamples[id] = normalized
    }
  }
  const names = new Set()
  for (const example of demoOrganizations) {
    const name = normalizeName(currentExamples[example.id]?.name ?? example.name)
    if (names.has(name)) delete currentExamples[example.id]
    names.add(normalizeName(currentExamples[example.id]?.name ?? example.name))
  }
  return currentExamples
}

function savedOrganizations() {
  activeBrowserStorage()
  if (currentOrganizations) return currentOrganizations
  const stored = readStorage(storageKey)
  currentOrganizations = []
  if (!Array.isArray(stored)) return currentOrganizations
  const usedIds = new Set(demoOrganizations.map(({ id }) => id))
  const usedNames = new Set(demoOrganizations.map(({ id, name }) => normalizeName(savedExamples()[id]?.name ?? name)))
  for (const value of stored) {
    const normalized = normalizeStoredOrganization(value)
    if (!normalized || usedIds.has(normalized.id) || usedNames.has(normalizeName(normalized.name))) continue
    currentOrganizations.push(normalized)
    usedIds.add(normalized.id)
    usedNames.add(normalizeName(normalized.name))
  }
  return currentOrganizations
}

function requireAdmin(session) {
  if (import.meta.env?.PROD || session?.role !== 'ADMIN') throw new Error('Action réservée à l’administrateur de démonstration.')
}

function validateFields({ name, types, contactName = '', contactRole = '', provenance, provenanceDetail = '', collaborationStatus }, excludeId = null) {
  const cleanName = typeof name === 'string' ? name.trim() : ''
  if (!cleanName || cleanName.length > 120) throw new Error('Renseignez un nom d’entreprise de 120 caractères maximum.')
  if (!Array.isArray(types) || !types.length || new Set(types).size !== types.length || !types.every((type) => validRoles.includes(type))) throw new Error('Sélectionnez au moins un rôle valide, sans doublon.')
  if (typeof contactName !== 'string' || contactName.length > 120 || typeof contactRole !== 'string' || contactRole.length > 120) throw new Error('Contact invalide.')
  if (!contactName.trim() && contactRole.trim()) throw new Error('Renseignez le nom du contact si vous indiquez sa fonction.')
  if (!provenanceLabels[provenance]) throw new Error('Sélectionnez une provenance.')
  if (typeof provenanceDetail !== 'string' || provenanceDetail.length > 200 || (provenance === 'OTHER' && !provenanceDetail.trim())) throw new Error('Précisez la provenance « Autre » (200 caractères maximum).')
  if (!collaborationStatuses.includes(collaborationStatus)) throw new Error('Sélectionnez un stade de collaboration valide.')
  if (listMockOrganizations().some((entry) => entry.id !== excludeId && normalizeName(entry.name) === normalizeName(cleanName))) throw new Error('Une entreprise portant ce nom existe déjà.')
  return { name: cleanName, types: [...types], contactName: contactName.trim(), contactRole: contactRole.trim(), provenance, provenanceDetail: provenance === 'OTHER' ? provenanceDetail.trim() : '', collaborationStatus }
}

function newNote(text) {
  if (typeof text !== 'string' || !text.trim() || text.trim().length > 1000) throw new Error('Renseignez un commentaire de 1000 caractères maximum.')
  return { id: `note-${globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(36).slice(2)}`}`, text: text.trim(), createdAt: new Date().toISOString(), author: 'Admin démo' }
}

function saveOrganization(organization) {
  if (demoOrganizations.some(({ id }) => id === organization.id)) {
    currentExamples = { ...savedExamples(), [organization.id]: organization }
    return persist(exampleStorageKey, currentExamples)
  }
  currentOrganizations = savedOrganizations().map((item) => item.id === organization.id ? organization : item)
  return persist(storageKey, currentOrganizations)
}

function validMissionSelection(ids, types, targetId, confirmed) {
  if (!Array.isArray(ids) || !ids.every((id) => typeof id === 'string') || new Set(ids).size !== ids.length) throw new Error('Sélection de missions invalide ou en doublon.')
  const missions = new Map(listMockAdminMissions().map((mission) => [mission.id, mission]))
  const transfers = []
  for (const id of ids) {
    const mission = missions.get(id)
    if (!mission) throw new Error('Mission fictive introuvable.')
    const role = mission.source === 'ESN' ? 'ESN' : 'CLIENT'
    if (!types.includes(role)) throw new Error(`La mission « ${mission.title} » requiert le rôle ${role === 'ESN' ? 'ESN' : 'Client direct'}.`)
    if (mission.organizationId && mission.organizationId !== targetId) transfers.push(mission)
  }
  if (transfers.length && !confirmed) throw new Error('Confirmez le transfert des missions déjà rattachées à une autre entreprise.')
  return transfers
}

export function listMockAttachableMissions() {
  return listMockAdminMissions().map((mission) => ({
    id: mission.id, title: mission.title, source: mission.source,
    organizationId: mission.organizationId ?? null, organization: mission.organization ?? '',
  }))
}

export function createMockOrganization({ name, types, contactName = '', contactRole = '', provenance = '', provenanceDetail = '', collaborationStatus = 'PROSPECTING', comment = '', missionIds = [], confirmTransfers = false } = {}, session) {
  requireAdmin(session)
  const fields = validateFields({ name, types, contactName, contactRole, provenance, provenanceDetail, collaborationStatus })
  if (typeof comment !== 'string') throw new Error('Commentaire invalide.')
  const notes = comment.trim() ? [newNote(comment)] : []
  validMissionSelection(missionIds, fields.types, null, confirmTransfers)
  const organization = {
    id: `org-${globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(36).slice(2)}`}`,
    name: fields.name, types: fields.types,
    contacts: fields.contactName ? [{ id: 'contact-1', name: fields.contactName, role: fields.contactRole }] : [],
    provenance: fields.provenance, provenanceDetail: fields.provenanceDetail,
    collaborationStatus: fields.collaborationStatus, agreement: { status: 'NONE' }, notes,
  }
  const previous = savedOrganizations()
  currentOrganizations = [...previous, organization]
  try {
    if (missionIds.length) setMockAdminMissionRelations(missionIds, organization, session)
  } catch (error) { currentOrganizations = previous; throw error }
  const persisted = persist(storageKey, currentOrganizations)
  return { organization: getMockOrganizationById(organization.id), persisted }
}

export function updateMockOrganization(id, changes, session) {
  requireAdmin(session)
  const previous = getMockOrganizationById(id)
  if (!previous) throw new Error('Entreprise fictive introuvable.')
  const fields = validateFields(changes ?? {}, id)
  for (const mission of listMockOrganizationMissions(id)) {
    const role = mission.source === 'ESN' ? 'ESN' : 'CLIENT'
    if (!fields.types.includes(role)) throw new Error(`Transférez d’abord les missions liées au rôle ${role === 'ESN' ? 'ESN' : 'Client direct'} avant de le retirer.`)
  }
  const updated = {
    ...previous, name: fields.name, types: fields.types,
    contacts: fields.contactName ? [{ id: previous.contacts[0]?.id ?? 'contact-1', name: fields.contactName, role: fields.contactRole }] : [],
    provenance: fields.provenance, provenanceDetail: fields.provenanceDetail, collaborationStatus: fields.collaborationStatus,
  }
  const renamed = updated.name !== previous.name
  const persisted = saveOrganization(updated)
  const relationResult = renamed ? renameMockAdminMissionOrganization(id, updated.name, session) : { persisted: true }
  return { organization: getMockOrganizationById(id), persisted: persisted && relationResult.persisted }
}

export function addMockOrganizationNote(id, text, session) {
  requireAdmin(session)
  const organization = getMockOrganizationById(id)
  if (!organization) throw new Error('Entreprise fictive introuvable.')
  if (organization.notes.length >= 200) throw new Error('Le journal local est plein pour cette entreprise.')
  const updated = { ...organization, notes: [newNote(text), ...organization.notes] }
  const persisted = saveOrganization(updated)
  return { organization: getMockOrganizationById(id), persisted }
}

export function attachMockOrganizationMissions(id, missionIds, session, confirmTransfers = false) {
  requireAdmin(session)
  const organization = getMockOrganizationById(id)
  if (!organization) throw new Error('Entreprise fictive introuvable.')
  const requested = validMissionSelection(missionIds, organization.types, id, confirmTransfers)
  const result = setMockAdminMissionRelations(missionIds, organization, session)
  return { ...result, transferredCount: requested.length, organization: getMockOrganizationById(id) }
}

export function listMockOrganizations() {
  const counts = new Map()
  for (const mission of listMockAdminMissions()) {
    counts.set(mission.organizationId, (counts.get(mission.organizationId) ?? 0) + 1)
  }
  return [...demoOrganizations.map((organization) => savedExamples()[organization.id] ?? organization), ...savedOrganizations()].map((organization) => ({
    ...organization,
    types: [...organization.types],
    contacts: organization.contacts.map((contact) => ({ ...contact })),
    agreement: { ...organization.agreement },
    notes: (organization.notes ?? []).map((note) => ({ ...note })),
    missionCount: counts.get(organization.id) ?? 0,
  }))
}

export function getMockOrganizationById(id) {
  return listMockOrganizations().find((organization) => organization.id === id) ?? null
}

export function listMockOrganizationMissions(id) {
  if (!getMockOrganizationById(id)) return []
  return listMockAdminMissions().filter((mission) => mission.organizationId === id)
}

export function listMockOrganizationServices(id) {
  if (!getMockOrganizationById(id)) return []
  return demoOrganizationServices.filter((service) => service.organizationId === id).map((service) => ({ ...service }))
}
