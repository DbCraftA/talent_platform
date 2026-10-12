export const modelProfiles = [
  { id: 'lt_10b', label: '< 10B', parameterCountB: 8, architecture: 'dense', defaultContextLength: 8192, classId: 'small' },
  { id: '10_30b', apiId: '10b_30b', label: '10B–30B', parameterCountB: 20, architecture: 'dense', defaultContextLength: 8192, classId: 'medium' },
  { id: '30_70b', apiId: '30b_70b', label: '30B–70B', parameterCountB: 55, architecture: 'dense', defaultContextLength: 8192, classId: 'large' },
  { id: '70b_plus', label: '70B+', parameterCountB: 70, architecture: 'unknown', defaultContextLength: 8192, classId: 'xlarge' },
]

export const useCases = [
  { id: 'chat', label: 'Assistant / chatbot' },
  { id: 'rag', label: 'RAG / recherche documentaire' },
  { id: 'agent', label: 'Agent IA' },
  { id: 'content_generation', label: 'Génération de contenu' },
  { id: 'extraction', label: 'Extraction / classification' },
  { id: 'code_assistant', label: 'Code assistant' },
  { id: 'vision_multimodal', label: 'Vision / multimodal' },
  { id: 'batch', label: 'Batch processing' },
  { id: 'other', label: 'Autre' },
]

