import { inferenceAssumptions, precisionProfiles } from '../../config/inferenceAssumptions.js'
import { modelProfiles } from '../../config/modelProfiles.js'
import { gpuClasses } from '../../config/gpuClasses.js'

const n = (value, fallback = 0) => {
  const parsed = Number(value)
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : fallback
}

const ceil = (value, min = 1) => Math.max(min, Math.ceil(Number.isFinite(value) ? value : min))
const round = (value, digits = 1) => Number.isFinite(value) ? Number(value.toFixed(digits)) : 0
const clamp01 = (value) => Math.max(0, Math.min(1, Number.isFinite(value) ? value : 0))

export const formatCurrency = (value) => new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(Number.isFinite(value) ? value : 0)
export const formatNumber = (value) => new Intl.NumberFormat('fr-FR', { maximumFractionDigits: 1 }).format(Number.isFinite(value) ? value : 0)
export const formatTokens = (value) => {
  const safe = Number.isFinite(value) ? value : 0
  if (safe >= 1_000_000_000) return `${formatNumber(safe / 1_000_000_000)}B`
  if (safe >= 1_000_000) return `${formatNumber(safe / 1_000_000)}M`
  if (safe >= 1_000) return `${formatNumber(safe / 1_000)}k`
  return formatNumber(safe)
}

export function estimateKvCacheGB({ contextLength, concurrency, modelProfile, precision }) {
  const coefficient = inferenceAssumptions.kvCacheCoefficients[modelProfile.classId] || inferenceAssumptions.kvCacheCoefficients.unknown
  const precisionMultiplier = precision === 'int4' ? 0.7 : precision === 'int8' || precision === 'fp8' ? 0.85 : 1
  const estimatedGB = contextLength * concurrency * coefficient * precisionMultiplier
  const confidence = modelProfile.id === 'unknown' || modelProfile.id === 'api_proprietary' ? 'low' : 'medium'
  return {
    estimatedGB: round(estimatedGB, 1),
    confidence,
    explanation: 'KV cache approximated from model class, context length and peak concurrency. Architecture-specific benchmarks are required.',
  }
}

function useCaseMessage(useCase) {
  const messages = {
    chat: 'Interactive workload detected. TTFT and per-user generation speed should be validated under concurrent load.',
    rag: 'RAG workload detected. Long prompts increase prefill cost and memory pressure. Prefix caching and TTFT should be benchmarked.',
    agent: 'Agentic workload detected. One user action may generate multiple model calls. Validate calls-per-task before final TCO sizing.',
    batch: 'Batch workload detected. Throughput and GPU utilization should generally be optimized before interactive latency.',
    vision_multimodal: 'Multimodal workload detected. Memory and throughput estimates are less reliable without model-specific benchmarks.',
  }
  return messages[useCase] || 'Workload profile uses generic inference assumptions. Validate model-specific behavior before production sizing.'
}

function selectGpuClass(productionVramGB) {
  return gpuClasses.find((gpu) => gpu.vramGB >= productionVramGB) || gpuClasses[gpuClasses.length - 1]
}

function estimateBreakEven(base, candidateGpu, productionGpuCount) {
  const volumes = [10e6, 25e6, 50e6, 100e6, 250e6, 500e6, 1e9, 2.5e9, 5e9, 10e9, 25e9, 50e9, 100e9]
  const inputRatio = base.monthlyTokens > 0 ? base.monthlyInputTokens / base.monthlyTokens : 0.5
  const outputRatio = 1 - inputRatio
  let cloudGpuBreakEvenTokens
  let onPremBreakEvenTokens
  const cloudMonthly = productionGpuCount * inferenceAssumptions.billedHoursPerDay.value * 30 * candidateGpu.cloudHourlyPrice + inferenceAssumptions.cloudOpsOverheadMonthly.value
  const onPremMonthly = productionGpuCount * candidateGpu.onPremCapex / inferenceAssumptions.onPrem.amortizationMonths + productionGpuCount * (inferenceAssumptions.onPrem.monthlyPowerPerGpu + inferenceAssumptions.onPrem.monthlyHostingPerGpu + inferenceAssumptions.onPrem.monthlyMaintenancePerGpu) + inferenceAssumptions.onPrem.monthlyFixedOpsCost
  for (const volume of volumes) {
    const apiCost = (volume * inputRatio / 1_000_000 * inferenceAssumptions.apiPricing.inputPricePerMillion) + (volume * outputRatio / 1_000_000 * inferenceAssumptions.apiPricing.outputPricePerMillion)
    if (!cloudGpuBreakEvenTokens && cloudMonthly <= apiCost) cloudGpuBreakEvenTokens = volume
    if (!onPremBreakEvenTokens && onPremMonthly <= apiCost) onPremBreakEvenTokens = volume
  }
  return { cloudGpuBreakEvenTokens, onPremBreakEvenTokens }
}

function determineCandidateScenarios({ dataSensitivity, peakFactor, utilization, apiMonthlyCost, cloudGpuMonthlyCost, onPremMonthlyEquivalent }) {
  const scenarios = new Set(['API'])
  if (dataSensitivity === 'sensitive' || dataSensitivity === 'highly_sensitive') scenarios.add('Managed inference')
  if (apiMonthlyCost > cloudGpuMonthlyCost * 0.8 || utilization > 0.3) scenarios.add('Cloud GPU')
  if ((dataSensitivity === 'highly_sensitive' || apiMonthlyCost > onPremMonthlyEquivalent * 0.8) && utilization > 0.45) scenarios.add('On-Prem')
  if (peakFactor >= 3 && utilization < 0.4) scenarios.add('Managed inference')
  return Array.from(scenarios)
}

function whatToBenchmarkNext(useCase) {
  const lists = {
    rag: ['TTFT under production prompt sizes', 'prefix cache hit rate', 'concurrency behavior', 'KV cache pressure', 'P95 / P99 latency'],
    agent: ['average model calls per task', 'tool-call latency', 'request burstiness', 'token amplification', 'P95 task duration'],
    batch: ['sustained throughput', 'maximum batch size', 'GPU utilization', 'spot/preemptible suitability'],
    vision_multimodal: ['model-specific memory footprint', 'image/video preprocessing cost', 'throughput under real payloads', 'latency distribution'],
    chat: ['TTFT under concurrent load', 'per-user generation speed', 'streaming behavior', 'P95 / P99 latency'],
  }
  return lists[useCase] || ['sustained throughput', 'concurrency behavior', 'P95 / P99 latency', 'runtime and quantization impact']
}

export function estimateInfrastructure(input) {
  const modelProfile = modelProfiles.find((model) => model.id === input.modelProfileId) || modelProfiles[5]
  const precision = input.precision || 'unknown'
  const precisionProfile = precisionProfiles[precision] || precisionProfiles.unknown
  const requestsPerDay = n(input.requestsPerDay, 0)
  const avgInputTokens = n(input.avgInputTokens, 0)
  const avgOutputTokens = n(input.avgOutputTokens, 0)
  const peakFactor = n(input.peakFactor, 1) || 1
  const agentCallsPerRequest = input.useCase === 'agent' ? n(input.agentCallsPerRequest, inferenceAssumptions.agentCallsPerRequestDefault.value) : 1
  const effectiveRequestsPerDay = requestsPerDay * agentCallsPerRequest
  const monthlyRequests = requestsPerDay * 30
  const effectiveMonthlyRequests = effectiveRequestsPerDay * 30
  const monthlyInputTokens = effectiveMonthlyRequests * avgInputTokens
  const monthlyOutputTokens = effectiveMonthlyRequests * avgOutputTokens
  const monthlyTokens = monthlyInputTokens + monthlyOutputTokens
  const activeHoursPerDay = n(input.activeHoursPerDay, inferenceAssumptions.activeHoursPerDayDefault.value) || inferenceAssumptions.activeHoursPerDayDefault.value
  const averageRps = effectiveRequestsPerDay / (activeHoursPerDay * 3600)
  const peakRps = averageRps * peakFactor
  const requiredOutputTokensPerSecond = peakRps * avgOutputTokens
  const concurrencyWasProvided = n(input.peakConcurrency, 0) > 0
  const estimatedConcurrency = peakRps * inferenceAssumptions.averageRequestDurationSeconds.value
  const peakConcurrency = concurrencyWasProvided ? n(input.peakConcurrency, 1) : Math.max(1, round(estimatedConcurrency, 1))
  const contextLength = n(input.contextLength, modelProfile.defaultContextLength || 32000) || 32000
  const modelWeightGB = modelProfile.parameterCountB ? modelProfile.parameterCountB * precisionProfile.bytesPerParameter * inferenceAssumptions.weightMemoryOverhead.value : 0
  const kvCache = estimateKvCacheGB({ contextLength, concurrency: peakConcurrency, modelProfile, precision })
  const requiredVramGB = modelWeightGB + kvCache.estimatedGB + inferenceAssumptions.runtimeOverheadGB.value
  const productionVramGB = requiredVramGB * (1 + inferenceAssumptions.memoryHeadroomPercent.value)
  const candidateGpu = selectGpuClass(productionVramGB)
  const sizingByGpu = gpuClasses.map((gpu) => {
    const memoryGpuCount = ceil(productionVramGB / gpu.vramGB)
    const throughputGpuCount = ceil(requiredOutputTokensPerSecond / gpu.referenceSustainedThroughput)
    const baseGpuCount = Math.max(memoryGpuCount, throughputGpuCount)
    return { ...gpu, memoryGpuCount, throughputGpuCount, baseGpuCount, fit: gpu.vramGB >= productionVramGB ? 'Candidate' : 'Multi-GPU required' }
  })
  const selectedSizing = sizingByGpu.find((gpu) => gpu.id === candidateGpu.id) || sizingByGpu[sizingByGpu.length - 1]
  const baseGpuCount = selectedSizing.baseGpuCount
  const productionGpuCount = ceil(baseGpuCount * (1 + inferenceAssumptions.capacityHeadroomPercent.value))
  const availability = inferenceAssumptions.availabilityRules[input.availabilityTarget || 'best_effort'] || inferenceAssumptions.availabilityRules.best_effort
  const haGpuCount = Math.max(productionGpuCount + availability.extraCapacity, availability.minimumReplicas)
  const finalGpuCount = Math.max(productionGpuCount, haGpuCount)
  const apiMonthlyCost = monthlyInputTokens / 1_000_000 * inferenceAssumptions.apiPricing.inputPricePerMillion + monthlyOutputTokens / 1_000_000 * inferenceAssumptions.apiPricing.outputPricePerMillion
  const cloudGpuMonthlyCost = finalGpuCount * inferenceAssumptions.billedHoursPerDay.value * 30 * candidateGpu.cloudHourlyPrice + inferenceAssumptions.cloudOpsOverheadMonthly.value
  const monthlyHardwareAmortization = finalGpuCount * candidateGpu.onPremCapex / inferenceAssumptions.onPrem.amortizationMonths
  const onPremMonthlyEquivalent = monthlyHardwareAmortization + finalGpuCount * (inferenceAssumptions.onPrem.monthlyPowerPerGpu + inferenceAssumptions.onPrem.monthlyHostingPerGpu + inferenceAssumptions.onPrem.monthlyMaintenancePerGpu) + inferenceAssumptions.onPrem.monthlyFixedOpsCost
  const initialCapex = finalGpuCount * candidateGpu.onPremCapex
  const denominator = Math.max(monthlyTokens / 1_000_000, 0.000001)
  const utilization = clamp01(requiredOutputTokensPerSecond / (finalGpuCount * candidateGpu.referenceSustainedThroughput))
  const breakEven = estimateBreakEven({ monthlyTokens, monthlyInputTokens }, candidateGpu, finalGpuCount)
  const scenarios = determineCandidateScenarios({ dataSensitivity: input.dataSensitivity, peakFactor, utilization, apiMonthlyCost, cloudGpuMonthlyCost, onPremMonthlyEquivalent })
  const confidenceSizing = modelProfile.id === 'unknown' || !concurrencyWasProvided || input.useCase === 'vision_multimodal' ? 'LOW' : 'MEDIUM'
  return {
    input,
    modelProfile,
    precisionProfile,
    useCaseMessage: useCaseMessage(input.useCase),
    workload: { monthlyRequests, effectiveMonthlyRequests, monthlyInputTokens, monthlyOutputTokens, monthlyTokens, peakFactor, agentCallsPerRequest },
    performance: { averageRps: round(averageRps, 3), peakRps: round(peakRps, 3), requiredOutputTokensPerSecond: round(requiredOutputTokensPerSecond, 1), peakConcurrency, concurrencyWasProvided, ttftTarget: input.ttftTarget || 'unknown', generationSpeedTarget: input.generationSpeedTarget || 'unknown' },
    memory: { modelWeightGB: round(modelWeightGB, 1), kvCache, runtimeOverheadGB: inferenceAssumptions.runtimeOverheadGB.value, requiredVramGB: round(requiredVramGB, 1), productionVramGB: round(productionVramGB, 1) },
    sizing: { candidateGpu, sizingByGpu, baseGpuCount, productionGpuCount, haGpuCount: finalGpuCount, availability: availability.label },
    economics: {
      apiMonthlyCost: round(apiMonthlyCost, 0),
      cloudGpuMonthlyCost: round(cloudGpuMonthlyCost, 0),
      onPremMonthlyEquivalent: round(onPremMonthlyEquivalent, 0),
      initialCapex: round(initialCapex, 0),
      apiCostPerMillionTokens: round(apiMonthlyCost / denominator, 2),
      cloudCostPerMillionTokens: round(cloudGpuMonthlyCost / denominator, 2),
      onPremCostPerMillionTokens: round(onPremMonthlyEquivalent / denominator, 2),
      estimatedGpuUtilization: utilization,
      utilizationMessage: inferenceAssumptions.utilizationMessages.find((item) => utilization <= item.max)?.text || inferenceAssumptions.utilizationMessages[3].text,
    },
    breakEven,
    decisionSignals: [
      { label: 'Economics', indicator: apiMonthlyCost > cloudGpuMonthlyCost ? 'Dedicated capacity worth validating' : 'Elastic API still plausible', text: utilization > 0.6 ? 'Votre utilisation estimée rend une capacité dédiée intéressante à étudier.' : 'Le niveau d’utilisation doit être validé avant d’engager une capacité dédiée.' },
      { label: 'Data & sovereignty', indicator: input.dataSensitivity === 'highly_sensitive' ? 'High control pressure' : 'Standard control pressure', text: input.dataSensitivity === 'sensitive' || input.dataSensitivity === 'highly_sensitive' ? 'La sensibilité des données augmente l’intérêt des scénarios contrôlés ou managés.' : 'La sensibilité déclarée permet de conserver des options très élastiques.' },
      { label: 'Elasticity', indicator: peakFactor >= 3 ? 'Bursty workload' : 'Stable workload', text: peakFactor >= 3 && utilization < 0.5 ? 'Les pics de trafic favorisent une infrastructure élastique ou hybride.' : 'Un trafic stable facilite l’analyse économique de capacité dédiée.' },
      { label: 'Operations', indicator: finalGpuCount > 1 ? 'GPU operations required' : 'Limited GPU footprint', text: finalGpuCount > 1 || input.availabilityTarget !== 'best_effort' ? 'La complexité opérationnelle doit inclure HA, monitoring, runtime et exploitation GPU.' : 'La complexité opérationnelle reste limitée mais doit être validée au benchmark.' },
    ],
    scenarios,
    confidence: { economics: modelProfile.id !== 'unknown' && requestsPerDay > 0 ? 'HIGH' : 'MEDIUM', sizing: confidenceSizing, latency: input.ttftTarget && input.ttftTarget !== 'unknown' ? 'MEDIUM' : 'LOW' },
    nextValidation: whatToBenchmarkNext(input.useCase),
  }
}

