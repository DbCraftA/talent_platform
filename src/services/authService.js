let currentSession = null
const sessionKey = 'wenovat:demo-session:v1'

function persistSession() {
  try {
    globalThis.localStorage?.setItem(sessionKey, JSON.stringify(currentSession))
  } catch {
    // A demo session can still be used until this page is reloaded.
  }
}

export async function mockAuthService({ email, password, accountId }, isDev = import.meta.env.DEV, accounts) {
  if (!isDev) {
    throw new Error('La connexion de démonstration est indisponible hors du mode développement.')
  }

  const normalizedEmail = email?.trim().toLowerCase() ?? ''
  if (!normalizedEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
    throw new Error('Saisissez une adresse e-mail valide.')
  }
  if (!password?.trim()) {
    throw new Error('Saisissez un mot de passe pour continuer.')
  }

  const demoAccounts = accounts ?? (import.meta.env.DEV ? (await import('../mocks/session.js')).demoAccounts : [])
  const account = demoAccounts.find((entry) => entry.id === accountId && entry.email === normalizedEmail)
  if (!account) {
    throw new Error('Ce compte de démonstration ne correspond pas à l’adresse e-mail saisie.')
  }

  currentSession = { id: account.id, email: account.email, role: account.role }
  persistSession()
  return { session: { ...currentSession }, destination: account.destination }
}

export async function mockRegisterFreelance({ lastName, firstName, email, password, consent, specialty }, isDev = import.meta.env.DEV) {
  if (!isDev) {
    throw new Error('L’inscription de démonstration est indisponible hors du mode développement.')
  }

  const normalizedLastName = lastName?.trim() ?? ''
  const normalizedFirstName = firstName?.trim() ?? ''
  const normalizedEmail = email?.trim().toLowerCase() ?? ''
  if (!normalizedLastName || !normalizedFirstName) {
    throw new Error('Saisissez votre nom et votre prénom.')
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
    throw new Error('Saisissez une adresse e-mail valide.')
  }
  if (!password?.trim()) {
    throw new Error('Saisissez un mot de passe simulé.')
  }
  if (consent !== true) {
    throw new Error('Confirmez votre consentement au prototype.')
  }

  currentSession = {
    id: `demo-inscription-${globalThis.crypto?.randomUUID?.() ?? Math.random().toString(36).slice(2)}`,
    lastName: normalizedLastName,
    firstName: normalizedFirstName,
    email: normalizedEmail,
    role: 'FREELANCE',
    source: 'WENOVAT',
    qualificationStatus: 'NOT_EVALUATED',
    specialty: specialty?.trim() ?? '',
  }
  persistSession()
  return { session: { ...currentSession }, destination: '/espace/onboarding' }
}

export function getMockSession() {
  if (import.meta.env?.PROD) return null
  if (!currentSession) {
    try {
      const stored = JSON.parse(globalThis.localStorage?.getItem(sessionKey) ?? 'null')
      const knownAccount = (stored?.id === 'demo-freelance' && stored.role === 'FREELANCE' && stored.email === 'freelance@demo.wenovat.fr')
        || (stored?.id === 'demo-admin' && stored.role === 'ADMIN' && stored.email === 'admin@demo.wenovat.fr')
      const registered = stored?.role === 'FREELANCE' && typeof stored.id === 'string' && /^demo-inscription-[a-z0-9-]+$/i.test(stored.id)
        && typeof stored.firstName === 'string' && typeof stored.lastName === 'string'
      if ((knownAccount || registered) && typeof stored.email === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(stored.email)) {
        currentSession = {
          id: stored.id, email: stored.email, role: stored.role,
          ...(stored.role === 'FREELANCE' && stored.id.startsWith('demo-inscription-')
            ? { firstName: stored.firstName, lastName: stored.lastName, specialty: stored.specialty, source: 'WENOVAT', qualificationStatus: 'NOT_EVALUATED' }
            : {}),
        }
      }
    } catch {
      // Ignore corrupt or inaccessible browser state.
    }
  }
  return currentSession ? { ...currentSession } : null
}

export function clearMockSession() {
  currentSession = null
  try {
    globalThis.localStorage?.removeItem(sessionKey)
  } catch {
    // In-memory session is already cleared.
  }
}
