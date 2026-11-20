import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'
import { compileScript, parse } from '@vue/compiler-sfc'

const source = readFileSync(new URL('../src/pages/AdminDemo.vue', import.meta.url), 'utf8')
const { descriptor } = parse(source, { filename: 'AdminDemo.vue' })
const script = compileScript(descriptor, { id: 'admin-overview-test' }).content
const imports = {
  'vue': { onActivated: () => {}, onMounted: () => {}, ref: (value) => ({ value }) },
}

function dashboard({ talents = [], missions = [], organizations = [], shortlists = {} } = {}) {
  const services = {
    '../services/talentService.js': { listMockAdminTalents: () => talents },
    '../services/adminMissionService.js': { listMockAdminMissions: () => missions },
    '../services/adminShortlistService.js': { getMockAdminShortlist: (id) => shortlists[id] ?? { candidateIds: [], allCandidateIds: [], consent: {} } },
    '../services/businessService.js': { listMockOrganizations: () => organizations },
  }
  const names = []
  const values = []
  let moduleSource = script.replace(/^import\s+\{([^}]+)\}\s+from\s+'([^']+)'\s*$/gm, (_, bindings, path) => {
    const name = `module${names.length}`
    names.push(name)
    values.push(services[path] ?? imports[path])
    return `const { ${bindings} } = ${name}`
  })
  moduleSource = moduleSource.replace('export default', 'return')
  const component = Function(...names, moduleSource)(...values)
  const instance = component.setup({}, { expose() {} })
  instance.refresh()
  return instance.counts.value
}

test('les compteurs vides ne suggèrent aucune transmission', () => {
  assert.deepEqual(dashboard(), {
    wenovatQualified: 0, externalQualified: 0, missions: 0, pendingReview: 0,
    approved: 0, shortlistReady: 0, profilesSent: 0, agreementPending: 0,
    talentsToQualify: 0, consentToFollowUp: 0,
  })
})

test('qualification, statuts de missions et accords actifs sont distincts', () => {
  const counts = dashboard({
    talents: [
      { source: 'WENOVAT', qualificationStatus: 'QUALIFIED' },
      { source: 'EXTERNAL', qualificationStatus: 'QUALIFIED' },
      { source: 'WENOVAT', qualificationStatus: 'NOT_EVALUATED' },
      { source: 'EXTERNAL', qualificationStatus: 'SELECTED_FOR_REVIEW' },
      { source: 'WENOVAT', qualificationStatus: 'INTERVIEW_SCHEDULED' },
      { source: 'WENOVAT', qualificationStatus: 'NOT_QUALIFIED' },
    ],
    missions: ['PENDING_REVIEW', 'APPROVED', 'PUBLISHED', 'MATCHING', 'CLOSED'].map((status, index) => ({ id: `m${index}`, status })),
    organizations: [
      { collaborationStatus: 'ACTIVE', agreement: { status: 'NONE' } },
      { collaborationStatus: 'ACTIVE', agreement: { status: 'EXPIRED' } },
      { collaborationStatus: 'ACTIVE', agreement: { status: 'ACTIVE' } },
      { collaborationStatus: 'PROSPECT', agreement: { status: 'NONE' } },
      { collaborationStatus: 'PAUSED', agreement: { status: 'EXPIRED' } },
    ],
  })
  assert.equal(counts.wenovatQualified, 1)
  assert.equal(counts.externalQualified, 1)
  assert.equal(counts.talentsToQualify, 2)
  assert.equal(counts.missions, 5)
  assert.equal(counts.pendingReview, 1)
  assert.equal(counts.approved, 1)
  assert.equal(counts.agreementPending, 2)
  assert.equal(counts.profilesSent, 0)
})

test('une shortlist partielle est prête mais nécessite encore un accord ; une mission clôturée est exclue', () => {
  const ready = { candidateIds: ['a', 'b'], allCandidateIds: ['a', 'b'], consent: { a: { status: 'CONFIRMED' }, b: { status: 'PENDING' } } }
  const revoked = { candidateIds: ['c'], allCandidateIds: ['c'], consent: { c: { status: 'REVOKED' } } }
  const unavailable = { candidateIds: ['d'], allCandidateIds: ['d'], consent: { d: { status: 'UNAVAILABLE' } } }
  const ineligible = { candidateIds: [], allCandidateIds: ['e'], consent: { e: { status: 'CONFIRMED' } } }
  const confirmed = { candidateIds: ['f'], allCandidateIds: ['f'], consent: { f: { status: 'CONFIRMED' } } }
  const counts = dashboard({
    missions: ['partial', 'revoked', 'unavailable', 'ineligible', 'confirmed', 'closed'].map((id) => ({ id, status: id === 'closed' ? 'CLOSED' : 'MATCHING' })),
    shortlists: { partial: ready, revoked, unavailable, ineligible, confirmed, closed: ready },
  })
  assert.equal(counts.shortlistReady, 2)
  assert.equal(counts.consentToFollowUp, 4)
  assert.equal(counts.profilesSent, 0)
})
