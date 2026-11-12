const frameworks = {
  bmad: { logo: 'bmad', url: 'https://github.com/bmad-code-org/BMAD-METHOD' },
  'spec-kit': { logo: 'spec-kit', url: 'https://github.com/github/spec-kit' },
  crewai: { logo: 'crewai', url: 'https://docs.crewai.com/' },
  'microsoft-agent-framework': { logo: 'microsoft-agent-framework', url: 'https://github.com/microsoft/agent-framework' },
}

const aliases = {
  'bmad-method': 'bmad',
  speckit: 'spec-kit',
  'crew-ai': 'crewai',
  maf: 'microsoft-agent-framework',
}

function normalize(value) {
  return typeof value === 'string' ? value.trim().toLowerCase().replace(/[\s_\/]+/g, '-') : ''
}

export function resolveDevelopmentAiFramework(framework) {
  const id = normalize(framework?.id)
  if (id === 'autogen' || id === 'microsoft-autogen') return null
  const byId = frameworks[id] || frameworks[aliases[id]]
  if (byId) return byId
  const name = normalize(framework?.name)
  if (name === 'autogen' || name === 'microsoft-autogen') return null
  return frameworks[name] || frameworks[aliases[name]] || null
}
