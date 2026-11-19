import { adminTalentExamples, demoTalent, expertiseOptions } from '../mocks/talents.js'
import { getMockAdminQualification, getMockQualification } from './qualificationService.js'
import { getStoredExternalTalent, listStoredExternalTalents, storeExternalTalent } from './externalTalentStore.js'

const storagePrefix = 'wenovat:talent-onboarding:v1:'
const drafts = new Map()
const allowedExpertise = new Set(expertiseOptions.map(({ value }) => value))
const remoteOptions = new Set(['ON_SITE', 'HYBRID', 'REMOTE'])
const availabilityOptions = new Set(['IMMEDIATE', 'WITHIN_MONTH', 'LATER'])

function storage() {
  try {
    return globalThis.localStorage
  } catch {
    return null
  }
}

function cleanString(value) {
  return typeof value === 'string' ? value.trim() : ''
}

function normalize(input, id, defaults) {
  const cv = input?.cv
  const experiences = Array.isArray(input?.experiences) ? input.experiences : defaults.experiences
  return {
    id,
    source: 'WENOVAT',
    qualificationStatus: 'NOT_EVALUATED',
    firstName: cleanString(input?.firstName ?? defaults.firstName),
    lastName: cleanString(input?.lastName ?? defaults.lastName),
    architectTitle: cleanString(input?.architectTitle),
    professionalSummary: cleanString(input?.professionalSummary),
    technologies: [...new Set((Array.isArray(input?.technologies) ? input.technologies : []).map(cleanString).filter(Boolean))],
    linkedinUrl: cleanString(input?.linkedinUrl),
    cv: typeof cv?.name === 'string' && Number.isFinite(cv.size) && cv.size >= 0
      ? { name: cv.name.slice(0, 255), size: cv.size }
      : null,
    experiences: experiences.filter((entry) => entry && typeof entry === 'object').map((entry, index) => ({
      id: cleanString(entry.id) || `experience-${index + 1}`,
      title: cleanString(entry.title),
      description: cleanString(entry.description),
      startDate: cleanString(entry.startDate),
      endDate: cleanString(entry.endDate),
    })),
    expertise: [...new Set((Array.isArray(input?.expertise) ? input.expertise : defaults.expertise).filter((item) => allowedExpertise.has(item)))],
    dailyRate: input?.dailyRate === '' || input?.dailyRate == null ? '' : Number(input.dailyRate),
    remotePreference: remoteOptions.has(input?.remotePreference) ? input.remotePreference : '',
    location: cleanString(input?.location),
    availability: availabilityOptions.has(input?.availability) ? input.availability : '',
    onboardingStep: Number.isInteger(input?.onboardingStep) && input.onboardingStep >= 1 && input.onboardingStep <= 4 ? input.onboardingStep : 1,
    onboardingStatus: input?.onboardingStatus === 'COMPLETED' ? 'COMPLETED' : 'IN_PROGRESS',
  }
}

export function getMockTalent(session = null) {
  if (session?.role && session.role !== 'FREELANCE') return null
  const id = session?.id || demoTalent.id
  const defaults = {
    ...demoTalent,
    firstName: session?.firstName || '',
    lastName: session?.lastName || '',
    expertise: allowedExpertise.has(session?.specialty) ? [session.specialty] : [],
  }
  let saved
  try {
    const raw = storage()?.getItem(`${storagePrefix}${id}`)
    if (raw) saved = JSON.parse(raw)
  } catch {
    // An unavailable or invalid local draft must not prevent a new draft.
  }
  saved ??= drafts.get(id)
  return { ...normalize(saved || defaults, id, defaults), qualificationStatus: getMockQualification(id) }
}

export function saveMockTalent(talent) {
  if (!talent?.id || talent.id === 'demo-admin') throw new Error('Profil freelance de démonstration invalide.')
  const normalized = normalize(talent, talent.id, demoTalent)
  drafts.set(normalized.id, normalized)
  let persisted = false
  try {
    const target = storage()
    if (target) {
      target.setItem(`${storagePrefix}${normalized.id}`, JSON.stringify(normalized))
      persisted = true
    }
  } catch {
    // The in-memory draft remains available for this visit.
  }
  return { talent: normalize(normalized, normalized.id, demoTalent), persisted }
}

export function listMockAdminTalents() {
  return [...adminTalentExamples, ...listStoredExternalTalents()].map((talent) => getMockAdminTalentById(talent.id))
}

export function getMockAdminTalentById(id) {
  const talent = adminTalentExamples.find((entry) => entry.id === id) ?? getStoredExternalTalent(id)
  return talent ? {
    ...structuredClone(talent),
    qualificationStatus: getMockAdminQualification(id).status,
  } : null
}

export function createMockExternalTalent(input, session) {
  if (import.meta.env?.PROD || session?.role !== 'ADMIN') throw new Error('Création réservée à l’administrateur de démonstration.')
  const firstName = cleanString(input?.firstName)
  const lastName = cleanString(input?.lastName)
  const architectTitle = cleanString(input?.architectTitle)
  const originChannel = cleanString(input?.originChannel)
  const originDetails = cleanString(input?.originDetails)
  const location = cleanString(input?.location)
  const contactNotes = cleanString(input?.contactNotes)
  const email = cleanString(input?.email).toLowerCase()
  const expertise = input?.expertise
  if (!firstName || !lastName || !architectTitle) throw new Error('Renseignez le prénom, le nom et le titre d’architecte.')
  if (!['PROFESSIONAL_NETWORK', 'AUTHORIZED_SEARCH', 'REFERRAL', 'OTHER'].includes(originChannel)) throw new Error('Choisissez un canal d’origine.')
  if (originChannel === 'OTHER' && !originDetails) throw new Error('Précisez le canal d’origine.')
  if (!Array.isArray(expertise) || !expertise.length || expertise.some((item) => !allowedExpertise.has(item))) throw new Error('Choisissez au moins une spécialité valide.')
  if (!['UNKNOWN', ...availabilityOptions].includes(input?.availability)) throw new Error('Précisez la disponibilité déclarée, ou indiquez qu’elle est inconnue.')
  if (!['NOT_CONTACTED', 'CONTACTED', 'DO_NOT_CONTACT'].includes(input?.contactStatus)) throw new Error('Choisissez un statut de contact.')
  if (typeof input?.emailAuthorized !== 'boolean') throw new Error('Précisez si l’utilisation de l’email est autorisée.')
  if (input.contactStatus === 'DO_NOT_CONTACT' && input.emailAuthorized) throw new Error('Un contact refusé ne peut pas autoriser l’utilisation de l’email.')
  if (email && !input.emailAuthorized) throw new Error('L’email requiert une autorisation explicite de conservation et de contact.')
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new Error('Saisissez une adresse e-mail valide.')
  if (input.contactStatus === 'CONTACTED' && !contactNotes) throw new Error('Précisez dans les notes le contact effectué manuellement.')

  const talent = {
    id: `demo-external-${globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(36).slice(2)}`}`,
    source: 'EXTERNAL', qualificationStatus: 'NOT_EVALUATED', profileStatus: 'SOURCED',
    firstName, lastName, architectTitle, originChannel, originDetails, expertise: [...new Set(expertise)],
    location, availability: input.availability, contactStatus: input.contactStatus,
    contactNotes, emailAuthorized: input.emailAuthorized,
    contactAuthorizationStatus: input.emailAuthorized ? 'DEMO_AUTHORIZED' : 'NOT_CONFIRMED',
    contact: { email },
    dailyRate: null,
  }
  const persisted = storeExternalTalent(talent)
  return { talent: structuredClone(talent), persisted }
}
