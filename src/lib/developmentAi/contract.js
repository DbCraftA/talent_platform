// Proposed response shape; the Lambda's schema and enum values are not yet confirmed.
const isObject = (value) => value !== null && typeof value === 'object' && !Array.isArray(value)
const hasOwn = (value, key) => Object.prototype.hasOwnProperty.call(value, key)
const isText = (value) => typeof value === 'string' && value.trim().length > 0
const isScore = (value) => Number.isFinite(value) && value >= 0 && value <= 100

function requireValue(valid, path) {
  if (!valid) throw new Error(`Réponse incomplète : ${path}`)
}

function requireArray(value, path, validateItem) {
  requireValue(Array.isArray(value), path)
  value.forEach((item, index) => validateItem(item, `${path}[${index}]`))
}

function optionalArray(object, key, path, validateItem) {
  if (hasOwn(object, key)) requireArray(object[key], `${path}.${key}`, validateItem)
}

function optionalObject(object, key, path, validate) {
  if (hasOwn(object, key)) {
    requireValue(isObject(object[key]), `${path}.${key}`)
    validate(object[key], `${path}.${key}`)
  }
}

function optionalScore(object, key, path) {
  if (hasOwn(object, key)) requireValue(isScore(object[key]), `${path}.${key}`)
}

function optionalText(object, key, path) {
  if (hasOwn(object, key)) requireValue(typeof object[key] === 'string', `${path}.${key}`)
}

function optionalTexts(object, keys, path) {
  for (const key of keys) optionalText(object, key, path)
}

function optionalDisplayValue(object, key, path) {
  if (hasOwn(object, key)) {
    requireValue(typeof object[key] === 'string' || Number.isFinite(object[key]), `${path}.${key}`)
  }
}

function validateTitled(item, path) {
  requireValue(isObject(item) && isText(item.title), `${path}.title`)
  optionalText(item, 'description', path)
}

function validateText(item, path) {
  requireValue(isText(item), path)
}

function validateDiagnostic(diagnostic) {
  requireValue(isObject(diagnostic), 'diagnostic')
  requireValue(isScore(diagnostic.score), 'diagnostic.score')
  requireValue(isText(diagnostic.level), 'diagnostic.level')
  requireValue(isText(diagnostic.main_recommendation), 'diagnostic.main_recommendation')

  optionalArray(diagnostic, 'dimensions', 'diagnostic', (item, path) => {
    requireValue(isObject(item), path)
    requireValue(isText(item.id) || isText(item.title), `${path}.id/title`)
    optionalTexts(item, ['id', 'title', 'status_label', 'status_tone', 'description'], path)
    optionalScore(item, 'score', path)
    optionalArray(item, 'findings', path, (finding, findingPath) => {
      requireValue(isObject(finding) && isText(finding.text), `${findingPath}.text`)
      optionalText(finding, 'status_tone', findingPath)
    })
  })
  optionalArray(diagnostic, 'maturity_legend', 'diagnostic', (item, path) => {
    requireValue(isObject(item) && isText(item.label), `${path}.label`)
    optionalText(item, 'range_label', path)
    optionalText(item, 'tone', path)
  })
  optionalArray(diagnostic, 'strengths', 'diagnostic', validateTitled)
  optionalArray(diagnostic, 'improvements', 'diagnostic', validateTitled)
}

function validateScenario(item, path) {
  requireValue(isObject(item) && isText(item.id), `${path}.id`)
  requireValue(isText(item.name), `${path}.name`)
  optionalTexts(item, ['description', 'recommendation_status'], path)
  optionalDisplayValue(item, 'duration', path)
  optionalArray(item, 'actions', path, validateText)
  optionalArray(item, 'deliverables', path, validateText)
  optionalObject(item, 'comparison', path, (comparison, comparisonPath) => {
    for (const key of ['duration', 'scope', 'objective', 'teams', 'investment', 'outcome']) {
      optionalDisplayValue(comparison, key, comparisonPath)
    }
  })
  optionalObject(item, 'details', path, (details, detailsPath) => {
    optionalTexts(details, ['description', 'reason'], detailsPath)
    optionalArray(details, 'steps', detailsPath, validateText)
    optionalArray(details, 'risks', detailsPath, validateText)
  })
}

function validateFramework(item, path) {
  requireValue(isObject(item) && isText(item.id), `${path}.id`)
  requireValue(isText(item.name), `${path}.name`)
  optionalTexts(item, ['logo_url', 'positioning', 'description', 'status_label', 'status_tone', 'ideal_use_case', 'setup_level'], path)
  optionalScore(item, 'relevance_score', path)
  optionalArray(item, 'strengths', path, validateText)
  optionalObject(item, 'details', path, (details, detailsPath) => {
    optionalText(details, 'reason', detailsPath)
    optionalArray(details, 'use_cases', detailsPath, validateText)
    optionalArray(details, 'prerequisites', detailsPath, validateText)
  })
}

function validateJourney(journey) {
  requireValue(isObject(journey), 'journey')
  requireArray(journey.steps, 'journey.steps', (item, path) => {
    requireValue(isObject(item) && isText(item.id), `${path}.id`)
    requireValue(isText(item.title), `${path}.title`)
    optionalTexts(item, ['description', 'status_label', 'status_tone', 'tip'], path)
  })
  requireArray(journey.strengths, 'journey.strengths', validateTitled)
  requireArray(journey.improvements, 'journey.improvements', validateTitled)
}

function validateRecommendation(item, path) {
  requireValue(isObject(item), path)
  if (hasOwn(item, 'id')) requireValue(isText(item.id), `${path}.id`)
  const displayFields = ['title', 'web_message', 'email_message', 'reason', 'topic', 'text', 'message', 'description']
  requireValue(['title', 'web_message', 'reason'].some((key) => isText(item[key])), `${path}.title/web_message/reason`)
  optionalTexts(item, [...displayFields, 'pool', 'category'], path)
  if (hasOwn(item, 'rank')) requireValue(Number.isFinite(item.rank), `${path}.rank`)
  if (hasOwn(item, 'score')) requireValue(Number.isFinite(item.score), `${path}.score`)
  optionalArray(item, 'sources', path, (source, sourcePath) => {
    requireValue(isText(source) || isObject(source), sourcePath)
  })
}

/** Validate the proposed display contract without copying, sorting or modifying the response. */
export function validateDevelopmentResult(raw) {
  requireValue(isObject(raw), 'racine')
  validateDiagnostic(raw.diagnostic)
  requireArray(raw.scenarios, 'scenarios', validateScenario)
  requireArray(raw.frameworks, 'frameworks', validateFramework)
  validateJourney(raw.journey)
  requireArray(raw.recommendations, 'recommendations', validateRecommendation)
  return raw
}
