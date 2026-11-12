import { developmentAiOptions } from '../../config/developmentAiOptions.js'

const requiredSelectFields = [
  'projectType', 'projectMaturity', 'projectDomain', 'estimatedSize',
  'teamSize', 'methodology', 'documentation', 'aiUsage', 'priority',
  'codeSensitivity', 'aiConstraints', 'developmentEnvironment', 'primaryIde', 'cicd',
]

const multipleFields = ['profiles', 'assistedStages', 'languages']

const advancedFields = {
  technicalComplexity: 'technical_complexity',
  automatedTests: 'automated_tests',
  documentationQuality: 'documentation_quality',
  architectureStandards: 'architecture_standards',
  regulatoryConstraints: 'regulatory_constraints',
  targetTimeline: 'target_timeline',
}

export function createDevelopmentFormState() {
  return {
    projectType: '',
    projectMaturity: '',
    projectDomain: '',
    estimatedSize: '',
    teamSize: '',
    profiles: [],
    methodology: '',
    documentation: '',
    aiUsage: '',
    priority: '',
    assistedStages: [],
    codeSensitivity: '',
    aiConstraints: '',
    developmentEnvironment: '',
    primaryIde: '',
    cicd: '',
    languages: [],
    technicalComplexity: '',
    automatedTests: '',
    documentationQuality: '',
    architectureStandards: '',
    regulatoryConstraints: '',
    targetTimeline: '',
  }
}

const isOption = (field, value) => developmentAiOptions[field].some((option) => option.value === value)

export function validateDevelopmentForm(form) {
  const errors = {}

  for (const field of requiredSelectFields) {
    const value = form?.[field]
    if (value === '' || value == null) errors[field] = 'Sélectionnez une réponse, ou « Je ne sais pas ».'
    else if (!isOption(field, value)) errors[field] = 'Sélectionnez une option proposée.'
  }

  for (const field of multipleFields) {
    const values = form?.[field]
    if (!Array.isArray(values) || values.some((value) => !isOption(field, value)) || new Set(values).size !== values.length || (values.includes('unknown') && values.length > 1)) {
      errors[field] = 'Sélectionnez uniquement les options proposées, sans associer « Je ne sais pas » à d’autres réponses.'
    }
  }

  for (const field of Object.keys(advancedFields)) {
    const value = form?.[field]
    if (value !== '' && value != null && !isOption(field, value)) errors[field] = 'Sélectionnez une option proposée.'
  }

  return errors
}

export function buildDevelopmentPayload(form) {
  if (Object.keys(validateDevelopmentForm(form)).length) {
    throw new Error('Le formulaire de développement assisté par IA contient des réponses manquantes ou invalides.')
  }

  const advanced = Object.fromEntries(Object.entries(advancedFields)
    .filter(([field]) => form[field] !== '' && form[field] != null)
    .map(([field, key]) => [key, form[field]]))

  return {
    project: {
      type: form.projectType,
      maturity: form.projectMaturity,
      domain: form.projectDomain,
      estimated_size: form.estimatedSize,
    },
    organization: {
      team_size: form.teamSize,
      profiles: [...form.profiles],
      methodology: form.methodology,
      documentation: form.documentation,
      ai_usage: form.aiUsage,
    },
    objectives: {
      priority: form.priority,
      assisted_stages: [...form.assistedStages],
    },
    constraints: {
      code_sensitivity: form.codeSensitivity,
      ai_constraints: form.aiConstraints,
      development_environment: form.developmentEnvironment,
      primary_ide: form.primaryIde,
      cicd: form.cicd,
      languages: [...form.languages],
    },
    ...(Object.keys(advanced).length ? { advanced } : {}),
  }
}
