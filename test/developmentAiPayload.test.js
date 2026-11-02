import test from 'node:test'
import assert from 'node:assert/strict'
import { createDevelopmentFormState, validateDevelopmentForm, buildDevelopmentPayload } from '../src/lib/developmentAi/payload.js'
import { demoDevelopmentForm } from '../src/lib/developmentAi/demoFixture.js'

function answeredForm() {
  return {
    ...createDevelopmentFormState(),
    projectType: 'new_application', projectMaturity: 'framing', projectDomain: 'business_application', estimatedSize: 'medium',
    teamSize: '4_10', methodology: 'agile_scrum', documentation: 'partial', aiUsage: 'copilot_ide',
    priority: 'delivery_speed', codeSensitivity: 'internal', aiConstraints: 'saas_allowed',
    developmentEnvironment: 'github', primaryIde: 'vscode', cicd: 'partial',
  }
}

test('formulaire vide non envoyé, champs requis sans sélection par défaut', () => {
  const blank = createDevelopmentFormState()
  assert.equal(blank.projectType, '')
  assert.deepEqual(blank.languages, [])
  assert.ok(Object.keys(validateDevelopmentForm(blank)).length >= 14)
  assert.throws(() => buildDevelopmentPayload(blank), /invalides/)
})

test('réponses de démonstration valides sans modifier les départs normaux', () => {
  const blank = createDevelopmentFormState()
  assert.deepEqual(validateDevelopmentForm(demoDevelopmentForm), {})
  assert.equal(buildDevelopmentPayload(demoDevelopmentForm).project.type, 'new_application')
  assert.equal(Object.hasOwn(buildDevelopmentPayload(demoDevelopmentForm), 'advanced'), false)
  assert.equal(blank.projectType, '')
  assert.deepEqual(blank.profiles, [])
})

test('payload fidèle aux choix multiples, avec avancés omis et aucun score', () => {
  const form = answeredForm()
  form.profiles = ['po', 'dev', 'tech_lead', 'qa']
  form.assistedStages = ['framing', 'testing']
  form.languages = ['java', 'python']
  assert.deepEqual(validateDevelopmentForm(form), {})
  const payload = buildDevelopmentPayload(form)
  assert.equal(payload.project.type, 'new_application')
  assert.deepEqual(payload.organization.profiles, ['po', 'dev', 'tech_lead', 'qa'])
  assert.deepEqual(payload.objectives.assisted_stages, ['framing', 'testing'])
  assert.deepEqual(payload.constraints.languages, ['java', 'python'])
  assert.equal(Object.hasOwn(payload, 'advanced'), false)
  assert.equal(JSON.stringify(payload).includes('score'), false)
  form.profiles.push('designer')
  assert.deepEqual(payload.organization.profiles, ['po', 'dev', 'tech_lead', 'qa'])
})

test('unknown choisi explicitement conservé ; avancés vides omis individuellement', () => {
  const form = answeredForm()
  form.projectMaturity = 'unknown'
  form.assistedStages = ['unknown']
  form.languages = ['unknown']
  form.technicalComplexity = 'unknown'
  form.automatedTests = 'partial'
  const payload = buildDevelopmentPayload(form)
  assert.equal(payload.project.maturity, 'unknown')
  assert.deepEqual(payload.objectives.assisted_stages, ['unknown'])
  assert.deepEqual(payload.constraints.languages, ['unknown'])
  assert.deepEqual(payload.advanced, { technical_complexity: 'unknown', automated_tests: 'partial' })
})

test('choix inconnus, duplications et unknown mélangé rejetés', () => {
  const form = answeredForm()
  form.profiles = ['dev', 'unknown']
  assert.ok(validateDevelopmentForm(form).profiles)
  form.profiles = ['dev', 'dev']
  assert.ok(validateDevelopmentForm(form).profiles)
  form.profiles = []
  form.projectType = 'unauthorized'
  assert.ok(validateDevelopmentForm(form).projectType)
  form.projectType = 'new_application'
  form.targetTimeline = 'unauthorized'
  assert.ok(validateDevelopmentForm(form).targetTimeline)
})
