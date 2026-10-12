const trafficProfileByPeakFactor = {
  1: 'business_stable',
  2: 'business_stable',
  3: 'business_peak_3x',
  5: 'bursty_5x',
  continuous: 'continuous',
  business_stable: 'business_stable',
  business_peak_3x: 'business_peak_3x',
  bursty_5x: 'bursty_5x',
}

const modelClassById = {
  lt_10b: 'lt_10b',
  '10_30b': '10b_30b',
  '10b_30b': '10b_30b',
  '30_70b': '30b_70b',
  '30b_70b': '30b_70b',
  '70b_plus': '70b_plus',
}

const priorityById = {
  cost: 'cost',
  latency: 'latency',
  control: 'control',
  ops: 'simplicity',
  simplicity: 'simplicity',
}

const availabilityByTarget = {
  best_effort: 'best_effort',
  '99.5': '99_5',
  '99.9': '99_9',
  '99.95': '99_95',
  '99_5': '99_5',
  '99_9': '99_9',
  '99_95': '99_95',
}

const ttftTargetMsByValue = {
  500: 500,
  1000: 1000,
  2000: 2000,
  '<1s': 1000,
  '<2s': 2000,
  '<5s': 5000,
}

const toPositiveNumber = (value, fallback = undefined) => {
  const parsed = Number(value)
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback
}

const toRequiredPositiveNumber = (value) => {
  const parsed = Number(value)
  return Number.isFinite(parsed) && parsed >= 1 ? parsed : 1
}

const parseGenerationSpeedTarget = (value) => {
  if (!value || value === 'unknown' || value === 'none') return undefined
  const match = String(value).match(/\d+(?:\.\d+)?/)
  return match ? Number(match[0]) : undefined
}

const compactObject = (object) => Object.fromEntries(Object.entries(object).filter(([, value]) => value !== undefined && value !== null && value !== ''))

const useCaseOptionsFor = (form) => {
  if (form.useCase === 'rag') return compactObject({ rag_monthly_indexed_tokens: toPositiveNumber(form.ragMonthlyIndexedTokens, form.ragMonthlyIndexedTokens === '0' ? 0 : undefined) })
  if (form.useCase === 'agent') return compactObject({ agent_model_calls_per_task: toPositiveNumber(form.agentModelCallsPerTask) })
  if (form.useCase === 'batch') return compactObject({ batch_processing_window_hours: toPositiveNumber(form.batchProcessingWindowHours) })
  if (form.useCase === 'code_assistant') return { code_repo_aware: Boolean(form.codeRepoAware) }
  return {}
}

export function buildInferencePayload(form) {
  const advanced = compactObject({
    peak_concurrency: toPositiveNumber(form.peakConcurrency),
    context_length: toPositiveNumber(form.contextLength),
    precision: form.precision && form.precision !== 'unknown' ? form.precision : undefined,
    ttft_target_ms: ttftTargetMsByValue[form.ttftTarget],
    generation_speed_target_tps: parseGenerationSpeedTarget(form.generationSpeedTarget),
    availability: availabilityByTarget[form.availabilityTarget] || 'best_effort',
  })
  const useCaseOptions = useCaseOptionsFor(form)

  return compactObject({
    use_case: form.useCase,
    model_class: modelClassById[form.modelProfileId] || '70b_plus',
    requests_per_day: toRequiredPositiveNumber(form.requestsPerDay),
    avg_input_tokens: toRequiredPositiveNumber(form.avgInputTokens),
    avg_output_tokens: toRequiredPositiveNumber(form.avgOutputTokens),
    traffic_profile: trafficProfileByPeakFactor[form.peakFactor] || trafficProfileByPeakFactor[Number(form.peakFactor)] || 'business_peak_3x',
    data_sensitivity: form.dataSensitivity,
    priority: priorityById[form.priority] || 'cost',
    geography: form.geography || 'france',
    use_case_options: Object.keys(useCaseOptions).length ? useCaseOptions : undefined,
    advanced,
  })
}
