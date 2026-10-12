import { estimateInfrastructure } from './estimator.js'
import { useCases, modelProfiles } from '../../config/modelProfiles.js'

const round = (value, digits = 1) => Number.isFinite(value) ? Number(value.toFixed(digits)) : 0

const trafficProfileLabels = {
  1: 'Stable — estimation locale simplifiée',
  2: 'Journée de travail — stable — estimation locale simplifiée',
  3: 'Journée de travail — pics x3 — estimation locale simplifiée',
  5: 'Fortement variable — pics x5 — estimation locale simplifiée',
  continuous: 'Continu 24/7 — estimation locale simplifiée',
  business_stable: 'Journée de travail — stable — estimation locale simplifiée',
  business_peak_3x: 'Journée de travail — pics x3 — estimation locale simplifiée',
  bursty_5x: 'Fortement variable — pics x5 — estimation locale simplifiée',
}

function levelFromConfidence(confidence) {
  return String(confidence || '').toLowerCase() === 'high' ? 'medium' : 'low'
}

export function buildStaticApiFallback(form, payload, error) {
  const local = estimateInfrastructure(form)
  const useCase = useCases.find((item) => item.id === form.useCase)
  const modelProfile = modelProfiles.find((item) => item.id === form.modelProfileId)
  const monthlyRequests = local.workload.monthlyRequests
  const monthlyInputTokens = local.workload.monthlyInputTokens
  const monthlyOutputTokens = local.workload.monthlyOutputTokens
  const monthlyTokens = local.workload.monthlyTokens
  const candidateGpu = local.sizing.candidateGpu

  return {
    api_version: 'local-fallback-0.1.0',
    status: 'simplified_fallback',
    source: 'local_estimator',
    fallback_reason: error?.message || 'Inference API unavailable',
    request_payload: payload,
    summary: {
      use_case: useCase?.label || form.useCase,
      model_class: modelProfile?.label || form.modelProfileId,
      effective_requests_per_day: Number(form.requestsPerDay) || 0,
      monthly_requests: monthlyRequests,
      monthly_input_tokens: monthlyInputTokens,
      monthly_output_tokens: monthlyOutputTokens,
      monthly_tokens: monthlyTokens,
      traffic_profile: trafficProfileLabels[form.peakFactor] || trafficProfileLabels[Number(form.peakFactor)] || trafficProfileLabels.business_peak_3x,
      geography: 'france',
    },
    candidate_scenarios: local.scenarios.map((scenario) => scenario.toLowerCase().replaceAll(' ', '_')),
    decision_signals: {
      economics: {
        level: levelFromConfidence(local.confidence.economics),
        label: local.decisionSignals[0]?.indicator || 'Economics à valider',
        explanation: local.decisionSignals[0]?.text || 'Estimation locale indicative faute de réponse API.',
      },
      data_sovereignty: {
        level: 'low',
        label: local.decisionSignals[1]?.indicator || 'Souveraineté à qualifier',
        explanation: local.decisionSignals[1]?.text || 'La sensibilité des données doit être validée.',
      },
      elasticity: {
        level: Number(form.peakFactor) >= 3 ? 'medium' : 'low',
        label: local.decisionSignals[2]?.indicator || 'Profil de trafic à confirmer',
        explanation: local.decisionSignals[2]?.text || 'La dynamique de trafic doit être observée en production.',
      },
      operations: {
        level: local.sizing.haGpuCount > 1 ? 'medium' : 'low',
        label: local.decisionSignals[3]?.indicator || 'Operations à cadrer',
        explanation: local.decisionSignals[3]?.text || 'Le run GPU doit être validé avec un benchmark.',
      },
    },
    technical: {
      performance: {
        average_rps: local.performance.averageRps,
        peak_rps: local.performance.peakRps,
        peak_output_tokens_per_second: local.performance.requiredOutputTokensPerSecond,
        peak_concurrency: local.performance.peakConcurrency,
        peak_concurrency_estimated: !local.performance.concurrencyWasProvided,
        ttft_target_ms: payload.advanced?.ttft_target_ms || null,
        ttft_estimated: !payload.advanced?.ttft_target_ms,
        generation_speed_target_tps: payload.advanced?.generation_speed_target_tps || null,
        generation_speed_estimated: !payload.advanced?.generation_speed_target_tps,
      },
      memory: {
        effective_precision: form.precision === 'unknown' ? 'unknown' : form.precision,
        precision_estimated: form.precision === 'unknown',
        context_length: Number(form.contextLength) || modelProfile?.defaultContextLength || 32000,
        context_estimated: !Number(form.contextLength),
        effective_sequence_tokens: (Number(form.avgInputTokens) || 0) + (Number(form.avgOutputTokens) || 0),
        model_weights_gb: { min: round(local.memory.modelWeightGB * 0.9), max: round(local.memory.modelWeightGB * 1.1) },
        kv_cache_gb: { min: round(local.memory.kvCache.estimatedGB * 0.75), max: round(local.memory.kvCache.estimatedGB * 1.25) },
        runtime_overhead_gb: { min: round(local.memory.runtimeOverheadGB * 0.8), max: round(local.memory.runtimeOverheadGB * 1.2) },
        estimated_vram_gb: { min: round(local.memory.productionVramGB * 0.85), max: round(local.memory.productionVramGB * 1.25) },
        estimated_vram_point_gb: local.memory.productionVramGB,
        memory_headroom_percent: 20,
        confidence: 'low',
      },
      capacity: {
        reference_candidate: {
          gpu_class: candidateGpu.id,
          label: candidateGpu.label,
          vram_per_gpu_gb: candidateGpu.vramGB,
          reference_sustained_output_tps_per_gpu: candidateGpu.referenceSustainedThroughput,
          memory_gpu_count: local.sizing.sizingByGpu.find((gpu) => gpu.id === candidateGpu.id)?.memoryGpuCount || local.sizing.baseGpuCount,
          throughput_gpu_count: local.sizing.sizingByGpu.find((gpu) => gpu.id === candidateGpu.id)?.throughputGpuCount || local.sizing.baseGpuCount,
          base_gpu_count: local.sizing.baseGpuCount,
          production_gpu_count: local.sizing.productionGpuCount,
          ha_gpu_count: local.sizing.haGpuCount,
          estimated_peak_utilization: local.economics.estimatedGpuUtilization,
          confidence: 'low',
        },
        candidates: local.sizing.sizingByGpu.map((gpu) => ({
          gpu_class: gpu.id,
          label: gpu.label,
          vram_per_gpu_gb: gpu.vramGB,
          reference_sustained_output_tps_per_gpu: gpu.referenceSustainedThroughput,
          memory_gpu_count: gpu.memoryGpuCount,
          throughput_gpu_count: gpu.throughputGpuCount,
          base_gpu_count: gpu.baseGpuCount,
          production_gpu_count: Math.ceil(gpu.baseGpuCount * 1.25),
          ha_gpu_count: Math.max(Math.ceil(gpu.baseGpuCount * 1.25), local.sizing.haGpuCount),
          estimated_peak_utilization: round(local.performance.requiredOutputTokensPerSecond / Math.max(1, Math.ceil(gpu.baseGpuCount * 1.25) * gpu.referenceSustainedThroughput), 3),
          confidence: 'low',
        })),
        capacity_headroom_percent: 25,
        confidence: 'low',
        note: 'Fallback local simplifié : ces valeurs imitent le contrat API mais ne remplacent pas le sizing dynamique API.',
      },
    },
    cloud_comparison: {
      status: 'simplified_fallback',
      source: 'local_estimator',
      region_scope: 'france',
      billed_hours_per_month: 720,
      required: {
        estimated_vram_gib: local.memory.productionVramGB,
        peak_output_tokens_per_second: local.performance.requiredOutputTokensPerSecond,
        availability: payload.advanced?.availability || 'best_effort',
      },
      candidates: [],
      note: 'Comparaison catalogue cloud indisponible en fallback local. Relancer l’API pour obtenir les offres réelles.',
    },
    economics: {
      status: 'simplified_fallback',
      cloud_gpu: {
        provider: 'local_estimator',
        instance_type: candidateGpu.label,
        accelerator_name: candidateGpu.label,
        region: 'france',
        monthly_cost: local.economics.cloudGpuMonthlyCost,
        cost_per_million_tokens: local.economics.cloudCostPerMillionTokens,
        currency: 'EUR',
        basis: 'local simplified estimate',
        confidence: 'low',
      },
      api: null,
      on_prem: null,
      reason: 'Estimation simplifiée générée localement car l’API dynamique ne répond pas.',
    },
    confidence: { economics: 'low', sizing: 'low', latency: 'low' },
    assumptions: ['Fallback local basé sur des hypothèses génériques et sur le moteur historique du simulateur.'],
    next_validation: local.nextValidation,
    disclaimer: 'Estimation simplifiée générée localement car l’API ne répond pas. À utiliser uniquement comme pré-cadrage temporaire.',
  }
}

