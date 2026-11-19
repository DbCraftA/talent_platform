import { getMockAdminTalentById, getMockTalent, listMockAdminTalents } from './talentService.js'

export function getMockMissionCandidate(id) {
  if (id === 'demo-freelance') {
    const talent = getMockTalent({ id, role: 'FREELANCE' })
    return talent ? {
      ...talent,
      firstName: talent.firstName || 'Compte freelance',
      lastName: talent.lastName || 'de démonstration',
      architectTitle: talent.architectTitle || 'Profil de démonstration',
      demoAccount: true,
    } : null
  }
  return getMockAdminTalentById(id)
}

export function listMockMissionCandidates() {
  return [...listMockAdminTalents(), getMockMissionCandidate('demo-freelance')].filter(Boolean)
}
