export const inferenceAssumptions = {
  activeHoursPerDayDefault: { value: 12, label: 'Active hours per day' },
  agentCallsPerRequestDefault: { value: 3, label: 'Agent calls per user request' },
  averageRequestDurationSeconds: { value: 8, label: 'Average request duration used to estimate concurrency' },
  weightMemoryOverhead: { value: 1.1, label: 'Model weights overhead' },
  runtimeOverheadGB: { value: 8, label: 'Runtime overhead' },
  memoryHeadroomPercent: { value: 0.2, label: 'Memory headroom' },
  capacityHeadroomPercent: { value: 0.25, label: 'Capacity headroom' },
  billedHoursPerDay: { value: 24, label: 'Cloud GPU billed hours per day' },
  cloudOpsOverheadMonthly: { value: 900, label: 'Cloud operations overhead' },
  apiPricing: {
    inputPricePerMillion: 2.5,
    outputPricePerMillion: 10,
    label: 'Indicative proprietary API pricing',
  },
  onPrem: {
    amortizationMonths: 36,
    monthlyPowerPerGpu: 90,
    monthlyHostingPerGpu: 180,
    monthlyMaintenancePerGpu: 220,
    monthlyFixedOpsCost: 2500,
  },
  kvCacheCoefficients: {
    unknown: 0.002,
    api: 0,
    small: 0.0012,
    medium: 0.0022,
    large: 0.004,
    xlarge: 0.006,
  },
  availabilityRules: {
    best_effort: { label: 'Best effort', minimumReplicas: 1, extraCapacity: 0 },
    '99.5': { label: '99.5%', minimumReplicas: 2, extraCapacity: 0 },
    '99.9': { label: '99.9%', minimumReplicas: 2, extraCapacity: 1 },
    '99.95': { label: '99.95%', minimumReplicas: 3, extraCapacity: 1 },
  },
  utilizationMessages: [
    { max: 0.3, text: 'Potential overcapacity. Elastic infrastructure may be economically preferable.' },
    { max: 0.6, text: 'Moderate utilization.' },
    { max: 0.8, text: 'Healthy utilization range for economic analysis.' },
    { max: 1.01, text: 'Limited capacity margin. Benchmark peak behavior carefully.' },
  ],
}

export const precisionProfiles = {
  fp16: { label: 'FP16', bytesPerParameter: 2 },
  bf16: { label: 'BF16', bytesPerParameter: 2 },
  fp8: { label: 'FP8', bytesPerParameter: 1 },
  int8: { label: 'INT8', bytesPerParameter: 1 },
  int4: { label: 'INT4', bytesPerParameter: 0.5 },
  unknown: { label: 'Je ne sais pas', bytesPerParameter: 1.5 },
}

