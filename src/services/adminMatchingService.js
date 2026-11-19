import { getMockAdminMission } from './adminMissionService.js'
import { listMockMissionCandidates } from './adminCandidateService.js'

const availabilityRank = { IMMEDIATE: 0, WITHIN_MONTH: 1, LATER: 2 }
const availabilityLabels = { IMMEDIATE: 'immédiate', WITHIN_MONTH: 'sous un mois', LATER: 'plus tard' }

export function simulateMockMatching(missionId, mission = getMockAdminMission(missionId), talents = listMockMissionCandidates()) {
  if (!mission || mission.id !== missionId) throw new Error('Mission fictive introuvable.')
  return [...new Map(talents.map((talent) => [talent.id, talent])).values()].map((talent) => {
    const expertise = Array.isArray(talent.expertise) && talent.expertise.includes(mission.expertise) ? 40 : 0
    const desired = Array.isArray(mission.technologies) ? mission.technologies : []
    const known = Array.isArray(talent.technologies) ? talent.technologies : []
    const matched = desired.filter((skill) => known.some((value) => value.toLocaleLowerCase('fr-FR') === skill.toLocaleLowerCase('fr-FR')))
    const technologies = desired.length ? Math.round(30 * matched.length / desired.length) : 0
    const availability = availabilityRank[talent.availability] === undefined || availabilityRank[mission.availability] === undefined
      ? 0 : availabilityRank[talent.availability] <= availabilityRank[mission.availability] ? 20 : 0
    const remote = !talent.remotePreference ? 0
      : mission.remote === 'REMOTE' && talent.remotePreference === 'ON_SITE' ? 0
        : mission.remote === 'ON_SITE' && talent.remotePreference === 'REMOTE' ? 0 : 10
    const details = [
      expertise ? 'domaine compatible' : 'domaine non confirmé',
      desired.length ? `${matched.length}/${desired.length} technologies déclarées` : 'technologies demandées non renseignées',
      availabilityRank[talent.availability] === undefined ? 'disponibilité inconnue' : `disponibilité ${availabilityLabels[talent.availability]} ${availability ? 'compatible' : 'à confirmer'}`,
      !talent.remotePreference ? 'préférence télétravail inconnue' : remote ? 'télétravail compatible' : 'télétravail à confirmer',
    ]
    return { talent, score: expertise + technologies + availability + remote, components: { expertise, technologies, availability, remote }, explanation: details.join(' · ') }
  }).sort((a, b) => b.score - a.score || a.talent.id.localeCompare(b.talent.id))
}
