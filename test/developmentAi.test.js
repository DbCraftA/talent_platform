import test from 'node:test'
import assert from 'node:assert/strict'
import { validateDevelopmentResult } from '../src/lib/developmentAi/contract.js'
import { callDevelopmentAssessment, shareDevelopmentStudy, buildDevelopmentSharePayload } from '../src/lib/developmentAi/assessmentApi.js'
import { isDevelopmentDemoEnabled } from '../src/lib/developmentAi/demoMode.js'
import { demoDevelopmentResult } from '../src/lib/developmentAi/demoFixture.js'
import { resolveDevelopmentAiFramework } from '../src/config/developmentAiFrameworks.js'
import { callInferenceApi, shareStudy } from '../src/lib/inference/inferenceApi.js'

function validResult() {
  return {
    diagnostic: { score: 0, level: 'Transmis', main_recommendation: 'Texte du service', dimensions: [{ id: 'd', title: 'D', score: 0 }] },
    scenarios: [{ id: 'z', name: 'Dernier' }, { id: 'a', name: 'Premier' }],
    frameworks: [{ id: 'c', name: 'C' }, { id: 'b', name: 'B' }, { id: 'a', name: 'A' }],
    journey: { steps: [{ id: 's2', title: 'Deux' }, { id: 's1', title: 'Un' }], strengths: [], improvements: [] },
    recommendations: [],
  }
}

function jsonResponse(body, status = 200) {
  return new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } })
}

async function withFetch(mock, callback) {
  const original = globalThis.fetch
  globalThis.fetch = mock
  try { await callback() } finally { globalThis.fetch = original }
}

test('réponse complète avec score zéro et listes vides, identité et ordre conservés', () => {
  const response = validResult()
  assert.strictEqual(validateDevelopmentResult(response), response)
  assert.deepEqual(response.scenarios.map(({ id }) => id), ['z', 'a'])
  assert.deepEqual(response.frameworks.map(({ id }) => id), ['c', 'b', 'a'])
  assert.deepEqual(response.journey.steps.map(({ id }) => id), ['s2', 's1'])
  const empty = { ...response, scenarios: [], frameworks: [], journey: { steps: [], strengths: [], improvements: [] } }
  assert.strictEqual(validateDevelopmentResult(empty), empty)
})

test('sections absentes, score invalide et entrées de liste malformées rejetés', () => {
  const valid = validResult()
  for (const bad of [
    {}, { ...valid, recommendations: undefined }, { ...valid, diagnostic: { ...valid.diagnostic, score: -1 } },
    { ...valid, diagnostic: { ...valid.diagnostic, score: '0' } },
    { ...valid, frameworks: [null] }, { ...valid, journey: { ...valid.journey, steps: undefined } },
    { ...valid, recommendations: [{ email_message: 'Non affiché dans la page' }] },
  ]) assert.throws(() => validateDevelopmentResult(bad), /Réponse incomplète/)
})

test('étude complète envoyée sans reconstruire ni trier la réponse', async () => {
  const study = validResult()
  const payload = buildDevelopmentSharePayload({ email: 'exemple@site.fr', name: 'Exemple', role: '' }, '', '', study)
  assert.strictEqual(payload.study, study)
  await withFetch(async (url, init) => {
    assert.equal(url, 'https://example.test/study')
    assert.equal(init.method, 'POST')
    assert.equal(init.headers['Content-Type'], 'application/json')
    assert.deepEqual(JSON.parse(init.body).study, study)
    return jsonResponse({ recipient: 'exemple@site.fr' })
  }, async () => assert.deepEqual(await shareDevelopmentStudy(payload, { url: 'https://example.test/study' }), { recipient: 'exemple@site.fr' }))
  assert.throws(() => buildDevelopmentSharePayload({}, '', '', {}), /Réponse incomplète/)
})

test('URL absente ne contacte jamais un service infrastructure', async () => {
  await withFetch(() => { throw new Error('fetch ne doit pas être appelé') }, async () => {
    await assert.rejects(callDevelopmentAssessment({}, { url: '' }), /VITE_DEV_AI_ASSESSMENT_API_URL/)
    await assert.rejects(shareDevelopmentStudy({ study: validResult() }, { url: '' }), /VITE_DEV_AI_STUDY_SHARE_API_URL/)
  })
})

test('POST, réponse malformée, HTTP, réseau et expiration', async () => {
  const study = validResult()
  await withFetch(async (url, init) => {
    assert.equal(url, 'https://example.test/assessment')
    assert.deepEqual(JSON.parse(init.body), { project: { type: 'test' } })
    assert.ok(init.signal)
    return jsonResponse(study)
  }, async () => {
    const result = await callDevelopmentAssessment({ project: { type: 'test' } }, { url: 'https://example.test/assessment' })
    assert.deepEqual(result, study)
  })
  await withFetch(async () => jsonResponse({ diagnostic: { score: 0 } }), async () => {
    await assert.rejects(callDevelopmentAssessment({}, { url: '/assessment' }), /Réponse incomplète/)
  })
  await withFetch(async () => jsonResponse({ message: 'Erreur API' }, 503), async () => {
    await assert.rejects(callDevelopmentAssessment({}, { url: '/assessment' }), (error) => error.status === 503 && error.responseMessage === 'Erreur API')
  })
  await withFetch(async () => { throw new TypeError('Network failure') }, async () => {
    await assert.rejects(callDevelopmentAssessment({}, { url: '/assessment' }), /Network failure/)
  })
  await withFetch((_url, { signal }) => new Promise((_resolve, reject) => {
    signal.addEventListener('abort', () => reject(Object.assign(new Error('aborted'), { name: 'AbortError' })), { once: true })
  }), async () => {
    await assert.rejects(callDevelopmentAssessment({}, { url: '/assessment', timeoutMs: 5 }), { name: 'AbortError' })
  })
})

test('démonstration strictement locale', () => {
  assert.equal(isDevelopmentDemoEnabled({ DEV: true, VITE_DEV_AI_DEMO: 'true' }), true)
  assert.equal(isDevelopmentDemoEnabled({ DEV: false, VITE_DEV_AI_DEMO: 'true' }), false)
  assert.equal(isDevelopmentDemoEnabled({ DEV: true, VITE_DEV_AI_DEMO: 'false' }), false)
})

test('registre local : IDs, alias explicites, inconnus et AutoGen', () => {
  const cases = [
    ['bmad', 'https://github.com/bmad-code-org/BMAD-METHOD'],
    ['spec-kit', 'https://github.com/github/spec-kit'],
    ['crewai', 'https://docs.crewai.com/'],
    ['microsoft-agent-framework', 'https://github.com/microsoft/agent-framework'],
  ]
  for (const [id, url] of cases) {
    const entry = resolveDevelopmentAiFramework({ id, name: id })
    assert.equal(entry.url, url)
    assert.equal(entry.logo, id)
  }
  for (const [id, name, expected] of [
    ['BMAD-METHOD', 'BMAD', cases[0][1]],
    ['other', 'Speckit', cases[1][1]],
    ['other', 'Crew AI', cases[2][1]],
    ['MAF', 'MAF', cases[3][1]],
  ]) assert.equal(resolveDevelopmentAiFramework({ id, name })?.url, expected)
  for (const framework of [
    { id: 'other', name: 'Unknown' },
    { id: 'autogen', name: 'Microsoft Agent Framework' },
    { id: 'microsoft/autogen', name: 'AutoGen' },
    { id: 'other', name: 'AutoGen' },
  ]) assert.equal(resolveDevelopmentAiFramework(framework), null)
})

test('fixture frameworks : ordre, scores, statuts et réponse complète', () => {
  assert.strictEqual(validateDevelopmentResult(demoDevelopmentResult), demoDevelopmentResult)
  assert.deepEqual(demoDevelopmentResult.frameworks.map(({ id }) => id), ['bmad', 'spec-kit', 'crewai', 'microsoft-agent-framework'])
  assert.deepEqual(demoDevelopmentResult.frameworks.map(({ relevance_score }) => relevance_score), [85, 80, 75, 65])
  assert.deepEqual(demoDevelopmentResult.frameworks.map(({ status_label }) => status_label), ['Recommandé', 'Pertinent', 'Pertinent', 'À considérer'])
  assert.ok(demoDevelopmentResult.frameworks.every(({ strengths }) => strengths.length === 3))
})

test('fixture scénarios : cartes détaillées, comparatif et recommandation explicite', () => {
  const study = demoDevelopmentResult
  assert.strictEqual(validateDevelopmentResult(study), study)
  assert.deepEqual(study.scenarios.map(({ id }) => id), ['assess', 'pilot', 'scale'])
  assert.deepEqual(study.scenarios.map(({ duration }) => duration), ['1 à 2 semaines', '4 à 6 semaines', '2 à 3 mois'])
  assert.deepEqual(study.scenarios.filter(({ recommendation_status }) => recommendation_status === 'Recommandé').map(({ id }) => id), ['pilot'])
  for (const scenario of study.scenarios) {
    assert.equal(scenario.actions.length, 4)
    assert.ok(scenario.deliverables.length >= 3)
    assert.deepEqual(Object.keys(scenario.comparison), ['duration', 'scope', 'objective', 'teams', 'investment', 'outcome'])
  }
  assert.strictEqual(buildDevelopmentSharePayload({ email: 'exemple@site.fr', name: 'Exemple' }, '', '', study).study, study)
})

test('erreurs infrastructure inchangées : texte estimation, JSON + statut partage', async () => {
  await withFetch(async () => new Response('échec texte', { status: 500 }), async () => {
    await assert.rejects(callInferenceApi({}), (error) => error.message === 'Inference API returned 500: échec texte' && error.status === undefined)
  })
  await withFetch(async () => jsonResponse({ message: 'Message partagé' }, 400), async () => {
    await assert.rejects(shareStudy({}), (error) => error.status === 400 && error.responseMessage === 'Message partagé')
  })
})
