import assert from 'node:assert/strict'
import test from 'node:test'
import { getMockSession, mockAuthService, mockRegisterFreelance } from '../src/services/authService.js'
import { demoAccounts } from '../src/mocks/session.js'

test('le compte freelance de démonstration ouvre /espace sans conserver le mot de passe', async () => {
  const { session, destination } = await mockAuthService({
    accountId: 'demo-freelance',
    email: ' FREELANCE@DEMO.WENOVAT.FR ',
    password: 'saisie temporaire',
  }, true, demoAccounts)

  assert.equal(destination, '/espace')
  assert.deepEqual(session, { id: 'demo-freelance', email: 'freelance@demo.wenovat.fr', role: 'FREELANCE' })
  assert.deepEqual(getMockSession(), session)
  assert.equal('password' in getMockSession(), false)
})

test('le compte admin de démonstration ouvre /admin', async () => {
  const { session, destination } = await mockAuthService({
    accountId: 'demo-admin', email: 'admin@demo.wenovat.fr', password: 'saisie temporaire',
  }, true, demoAccounts)

  assert.equal(destination, '/admin')
  assert.equal(session.role, 'ADMIN')
})

test('les champs invalides et un compte différent sont refusés', async () => {
  await assert.rejects(mockAuthService({ accountId: 'demo-freelance', email: 'invalide', password: 'x' }, true, demoAccounts), /e-mail valide/)
  await assert.rejects(mockAuthService({ accountId: 'demo-freelance', email: 'freelance@demo.wenovat.fr', password: '  ' }, true, demoAccounts), /mot de passe/)
  await assert.rejects(mockAuthService({ accountId: 'demo-admin', email: 'freelance@demo.wenovat.fr', password: 'x' }, true, demoAccounts), /ne correspond pas/)
})

test('aucune connexion mock ne fonctionne hors du développement', async () => {
  await assert.rejects(mockAuthService({ accountId: 'demo-admin', email: 'admin@demo.wenovat.fr', password: 'x' }, false), /indisponible/)
})

test('inscription freelance de démonstration sans secret et sans qualification', async () => {
  const { session, destination } = await mockRegisterFreelance({
    lastName: ' Dupont ', firstName: ' Camille ', email: ' CAMILLE@EXEMPLE.FR ',
    password: 'mot de passe temporaire', consent: true, specialty: 'CLOUD',
  }, true)

  assert.equal(destination, '/espace/onboarding')
  assert.deepEqual(session, {
    id: session.id, lastName: 'Dupont', firstName: 'Camille',
    email: 'camille@exemple.fr', role: 'FREELANCE', source: 'WENOVAT',
    qualificationStatus: 'NOT_EVALUATED', specialty: 'CLOUD',
  })
  assert.deepEqual(getMockSession(), session)
  assert.match(session.id, /^demo-inscription-/)
  assert.equal(JSON.stringify(getMockSession()).includes('mot de passe temporaire'), false)
  assert.equal('password' in session, false)
  assert.equal('consent' in session, false)
})

test('inscription refuse identité, adresse e-mail, mot de passe et consentement invalides', async () => {
  const valid = { lastName: 'Dupont', firstName: 'Camille', email: 'camille@exemple.fr', password: 'x', consent: true }
  await assert.rejects(mockRegisterFreelance({ ...valid, lastName: ' ' }, true), /nom et votre prénom/)
  await assert.rejects(mockRegisterFreelance({ ...valid, firstName: ' ' }, true), /nom et votre prénom/)
  await assert.rejects(mockRegisterFreelance({ ...valid, email: 'invalide' }, true), /e-mail valide/)
  await assert.rejects(mockRegisterFreelance({ ...valid, password: ' ' }, true), /mot de passe simulé/)
  await assert.rejects(mockRegisterFreelance({ ...valid, consent: false }, true), /consentement/)
  await assert.rejects(mockRegisterFreelance(valid, false), /indisponible/)
})
