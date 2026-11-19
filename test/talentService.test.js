import assert from 'node:assert/strict'
import test from 'node:test'
import { getMockTalent, saveMockTalent } from '../src/services/talentService.js'

function memoryStorage() {
  const entries = new Map()
  return {
    getItem: (key) => entries.get(key) ?? null,
    setItem: (key, value) => entries.set(key, value),
    entries,
  }
}

test('préremplit un profil freelance sans qualifier automatiquement', () => {
  const profile = getMockTalent({ id: 'registration-test', role: 'FREELANCE', firstName: 'Camille', lastName: 'Dupont', specialty: 'DATA' })
  assert.equal(profile.id, 'registration-test')
  assert.equal(profile.firstName, 'Camille')
  assert.deepEqual(profile.expertise, ['DATA'])
  assert.equal(profile.source, 'WENOVAT')
  assert.equal(profile.qualificationStatus, 'NOT_EVALUATED')
  assert.equal(profile.onboardingStatus, 'IN_PROGRESS')
  assert.equal(getMockTalent({ id: 'demo-admin', role: 'ADMIN' }), null)
})

test('reprend un brouillon local par session, sans mélanger les comptes ni enregistrer le fichier', () => {
  const originalStorage = globalThis.localStorage
  const store = memoryStorage()
  globalThis.localStorage = store
  try {
    const first = getMockTalent({ id: 'profile-a', role: 'FREELANCE' })
    const saved = saveMockTalent({
      ...first,
      firstName: 'Alex',
      architectTitle: 'Architecte Cloud',
      experiences: [{ id: 'experience-17', title: 'Migration cloud', description: 'Prototype' }],
      cv: { name: 'cv.pdf', size: 2048, content: 'secret', rawFile: { data: 'secret' } },
      onboardingStep: 3,
      onboardingStatus: 'COMPLETED',
      source: 'EXTERNAL',
      qualificationStatus: 'QUALIFIED',
      password: 'secret',
    })
    assert.equal(saved.persisted, true)
    assert.equal(saved.talent.qualificationStatus, 'NOT_EVALUATED')
    assert.equal(saved.talent.source, 'WENOVAT')
    assert.deepEqual(saved.talent.cv, { name: 'cv.pdf', size: 2048 })
    assert.equal(saved.talent.onboardingStep, 3)
    assert.equal(saved.talent.onboardingStatus, 'COMPLETED')
    const stored = [...store.entries.values()][0]
    assert.equal(stored.includes('secret'), false)
    assert.equal(stored.includes('QUALIFIED'), false)

    saved.talent.experiences[0].title = 'Modifié uniquement dans la copie'
    const resumed = getMockTalent({ id: 'profile-a', role: 'FREELANCE' })
    assert.equal(resumed.experiences[0].title, 'Migration cloud')
    assert.equal(resumed.firstName, 'Alex')
    assert.equal(getMockTalent({ id: 'profile-b', role: 'FREELANCE' }).firstName, '')
  } finally {
    if (originalStorage === undefined) delete globalThis.localStorage
    else globalThis.localStorage = originalStorage
  }
})

test('repli mémoire quand localStorage refuse les écritures', () => {
  const originalStorage = globalThis.localStorage
  globalThis.localStorage = { getItem: () => null, setItem: () => { throw new Error('quota') } }
  try {
    const result = saveMockTalent({ ...getMockTalent({ id: 'profile-offline', role: 'FREELANCE' }), location: 'Lyon' })
    assert.equal(result.persisted, false)
    assert.equal(getMockTalent({ id: 'profile-offline', role: 'FREELANCE' }).location, 'Lyon')
  } finally {
    if (originalStorage === undefined) delete globalThis.localStorage
    else globalThis.localStorage = originalStorage
  }
})

test('conserve le profil enrichi et les anciennes expériences sans modifier la qualification', () => {
  const originalStorage = globalThis.localStorage
  const store = memoryStorage()
  globalThis.localStorage = store
  try {
    const id = 'profile-rich-test'
    store.setItem(`wenovat:talent-onboarding:v1:${id}`, JSON.stringify({
      firstName: 'Alex', lastName: 'Test', architectTitle: 'Architecte Data',
      experiences: [{ id: 'legacy-1', title: 'Architecture SI', description: 'Ancien brouillon' }],
      onboardingStep: 2, onboardingStatus: 'IN_PROGRESS',
    }))
    const legacy = getMockTalent({ id, role: 'FREELANCE' })
    assert.equal(legacy.professionalSummary, '')
    assert.deepEqual(legacy.technologies, [])
    assert.equal(legacy.experiences[0].startDate, '')
    const { persisted } = saveMockTalent({
      ...legacy,
      professionalSummary: 'Architecture de plateformes de données',
      technologies: ['Terraform', ' Kubernetes ', 'Terraform'],
      linkedinUrl: 'https://www.linkedin.com/in/exemple',
      experiences: [{ ...legacy.experiences[0], startDate: '2023-03', endDate: '2024-10' }],
      source: 'EXTERNAL', qualificationStatus: 'QUALIFIED', qualificationDate: '2024-01-01',
    })
    assert.equal(persisted, true)
    const stored = store.getItem(`wenovat:talent-onboarding:v1:${id}`)
    assert.equal(stored.includes('QUALIFIED'), false)
    assert.equal(stored.includes('2024-01-01'), false)
    const reloaded = getMockTalent({ id, role: 'FREELANCE' })
    assert.equal(reloaded.professionalSummary, 'Architecture de plateformes de données')
    assert.deepEqual(reloaded.technologies, ['Terraform', 'Kubernetes'])
    assert.equal(reloaded.linkedinUrl, 'https://www.linkedin.com/in/exemple')
    assert.deepEqual(reloaded.experiences[0], { id: 'legacy-1', title: 'Architecture SI', description: 'Ancien brouillon', startDate: '2023-03', endDate: '2024-10' })
    assert.equal(reloaded.onboardingStep, 2)
    assert.equal(reloaded.onboardingStatus, 'IN_PROGRESS')
    assert.equal(reloaded.qualificationStatus, 'NOT_EVALUATED')
    assert.equal(reloaded.source, 'WENOVAT')
    assert.deepEqual(getMockTalent({ id: 'other-rich-test', role: 'FREELANCE' }).technologies, [])
  } finally {
    if (originalStorage === undefined) delete globalThis.localStorage
    else globalThis.localStorage = originalStorage
  }
})
