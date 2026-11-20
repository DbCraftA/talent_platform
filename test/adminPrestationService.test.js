import assert from 'node:assert/strict'
import test from 'node:test'
import { demoPrestations } from '../src/mocks/engagements.js'
import { calculateMockCommission, listMockAdminPrestations, transferMockCommercialOwner } from '../src/services/adminPrestationService.js'

const admin = { role: 'ADMIN' }

test('forfait acquis une seule fois au premier jour travaillé facturable, même après interruption', () => {
  const planned = demoPrestations.find(({ id }) => id === 'prestation-ia-latitude')
  const interrupted = demoPrestations.find(({ id }) => id === 'prestation-cyber-rivage')
  assert.deepEqual(calculateMockCommission(planned), { amount: 0, validatedDays: 0, acquired: false })
  assert.deepEqual(calculateMockCommission(interrupted), { amount: 1000, validatedDays: 5, acquired: true })
  assert.equal(calculateMockCommission({ ...planned, firstBillableWorkDate: '2026-12-02', monthlyStatements: [{ month: '2026-12', declaredDays: 4, validatedDays: 0 }] }).amount, 1000)
  assert.equal(calculateMockCommission({ ...interrupted, monthlyStatements: [{ month: '2026-09', declaredDays: 20, validatedDays: 20 }] }).amount, 1000)
})

test('règle par journée : tarif négocié × seules journées validées, sans recalcul selon statut', () => {
  const daily = demoPrestations.find(({ id }) => id === 'prestation-data-atlas')
  assert.deepEqual(calculateMockCommission(daily), { amount: 1875, validatedDays: 25, acquired: true })
  assert.equal(calculateMockCommission({ ...daily, commissionStatus: 'DISPUTED' }).amount, 1875)
  assert.equal(calculateMockCommission({ ...daily, monthlyStatements: [{ month: '2026-10', declaredDays: 12, validatedDays: 0 }] }).amount, 0)
  assert.throws(() => calculateMockCommission({ ...daily, remuneration: { model: 'SUBSCRIPTION' } }), /non pris en charge/)
})

test('prestations reliées aux fiches existantes et distinctes des invitations', () => {
  const items = listMockAdminPrestations()
  assert.equal(items.length, demoPrestations.length)
  assert.equal(new Set(items.map(({ id }) => id)).size, items.length)
  assert.ok(items.every(({ missionTitle, talentName, clientName }) => missionTitle && talentName && clientName))
  assert.equal(items.find(({ id }) => id === 'prestation-cloud-horizon').partnerOrganizationId, 'org-horizon')
  assert.equal(items.find(({ id }) => id === 'prestation-data-atlas').partnerName, null)
  items[0].monthlyStatements[0].validatedDays = 100
  assert.notEqual(listMockAdminPrestations()[0].monthlyStatements[0].validatedDays, 100)
})

test('transfert commercial validé et historisé sans modifier le contrat ni la commission', () => {
  const originalStorage = globalThis.localStorage
  const values = new Map()
  globalThis.localStorage = { getItem: (key) => values.get(key) ?? null, setItem: (key, value) => values.set(key, value) }
  try {
    const before = listMockAdminPrestations().find(({ id }) => id === 'prestation-data-atlas')
    assert.throws(() => transferMockCommercialOwner(before.id, '  ', admin), /responsable/)
    assert.throws(() => transferMockCommercialOwner(before.id, before.commercialOwner, admin), /différent/)
    assert.throws(() => transferMockCommercialOwner(before.id, 'Autre', { role: 'FREELANCE' }), /administrateur/)
    assert.throws(() => transferMockCommercialOwner('inconnu', 'Autre', admin), /introuvable/)
    const { prestation, persisted } = transferMockCommercialOwner(before.id, '  Julie Simon  ', admin)
    assert.equal(persisted, true)
    assert.equal(prestation.commercialOwner, 'Julie Simon')
    assert.deepEqual(prestation.transfers.at(-1).fromOwner, before.commercialOwner)
    assert.deepEqual(prestation.transfers.at(-1).toOwner, 'Julie Simon')
    assert.equal(prestation.transfers.length, before.transfers.length + 1)
    for (const key of ['remuneration', 'commission', 'commissionStatus', 'monthlyStatements', 'missionId', 'clientOrganizationId', 'partnerOrganizationId']) assert.deepEqual(prestation[key], before[key])
    const saved = JSON.parse(values.get('wenovat:admin-prestation-transfers:v1'))
    assert.deepEqual(Object.keys(saved[before.id]), ['commercialOwner', 'transfers'])
    assert.equal(transferMockCommercialOwner(before.id, 'Léa Petit', admin).prestation.transfers.length, before.transfers.length + 2)
    assert.equal(listMockAdminPrestations().find(({ id }) => id === before.id).commercialOwner, 'Léa Petit')
  } finally {
    if (originalStorage === undefined) delete globalThis.localStorage
    else globalThis.localStorage = originalStorage
  }
})
