import { demoPrestations } from '../mocks/engagements.js'
import { getMockAdminMission } from './adminMissionService.js'
import { getMockAdminTalentById } from './talentService.js'
import { getMockOrganizationById } from './businessService.js'

const storageKey = 'wenovat:admin-prestation-transfers:v1'
let activeStorage
let overrides

function transfersByPrestation() {
  let storage = null
  try { storage = globalThis.localStorage } catch { /* Browser storage may be unavailable. */ }
  if (storage === activeStorage && overrides) return overrides
  activeStorage = storage
  overrides = {}
  let saved
  try { saved = JSON.parse(storage?.getItem(storageKey) ?? 'null') } catch { /* Ignore corrupt local data. */ }
  if (!saved || typeof saved !== 'object' || Array.isArray(saved)) return overrides
  for (const prestation of demoPrestations) {
    const entry = saved[prestation.id]
    if (!entry || typeof entry !== 'object' || Array.isArray(entry) || !Array.isArray(entry.transfers) || entry.transfers.length > 100) continue
    let previousOwner = prestation.commercialOwner
    const ids = new Set(prestation.transfers.map(({ id }) => id))
    const valid = entry.transfers.every((transfer) => {
      const ok = transfer && typeof transfer.id === 'string' && /^transfert-[a-z0-9-]+$/i.test(transfer.id) && !ids.has(transfer.id)
        && transfer.fromOwner === previousOwner && typeof transfer.toOwner === 'string'
        && transfer.toOwner.trim() === transfer.toOwner && transfer.toOwner.length <= 120
        && !!transfer.toOwner && transfer.toOwner !== previousOwner
        && typeof transfer.transferredAt === 'string' && Number.isFinite(Date.parse(transfer.transferredAt))
      if (ok) { ids.add(transfer.id); previousOwner = transfer.toOwner }
      return ok
    })
    if (valid && entry.commercialOwner === previousOwner) overrides[prestation.id] = {
      commercialOwner: previousOwner, transfers: entry.transfers.map((transfer) => ({ ...transfer })),
    }
  }
  return overrides
}

export function calculateMockCommission(prestation) {
  const validatedDays = prestation.monthlyStatements.reduce((sum, statement) => sum + statement.validatedDays, 0)
  const { model } = prestation.remuneration
  if (model === 'FIXED_SUCCESS_FEE') return {
    amount: prestation.firstBillableWorkDate ? prestation.remuneration.fixedAmount : 0,
    validatedDays, acquired: Boolean(prestation.firstBillableWorkDate),
  }
  if (model === 'PER_BILLABLE_DAY') return {
    amount: prestation.remuneration.negotiatedDailyRate * validatedDays, validatedDays,
    acquired: validatedDays > 0,
  }
  throw new Error('Modèle de rémunération non pris en charge.')
}

export function listMockAdminPrestations() {
  const saved = transfersByPrestation()
  return demoPrestations.map((prestation) => {
    const mission = getMockAdminMission(prestation.missionId)
    const talent = getMockAdminTalentById(prestation.talentId)
    const client = getMockOrganizationById(prestation.clientOrganizationId)
    const partner = prestation.partnerOrganizationId ? getMockOrganizationById(prestation.partnerOrganizationId) : null
    const item = {
      ...structuredClone(prestation), ...structuredClone(saved[prestation.id] ?? {}),
      transfers: [...structuredClone(prestation.transfers), ...structuredClone(saved[prestation.id]?.transfers ?? [])],
      missionTitle: mission?.title ?? 'Mission fictive indisponible',
      talentName: talent ? `${talent.firstName} ${talent.lastName}` : 'Architecte fictif indisponible',
      clientName: client?.name ?? 'Client fictif indisponible',
      partnerName: prestation.partnerOrganizationId ? partner?.name ?? 'Partenaire fictif indisponible' : null,
    }
    return { ...item, commission: calculateMockCommission(item) }
  })
}

export function transferMockCommercialOwner(id, newOwner, session) {
  if (import.meta.env?.PROD || session?.role !== 'ADMIN') throw new Error('Action réservée à l’administrateur de démonstration.')
  const prestation = listMockAdminPrestations().find((item) => item.id === id)
  if (!prestation) throw new Error('Prestation fictive introuvable.')
  if (typeof newOwner !== 'string' || !newOwner.trim() || newOwner.trim().length > 120) throw new Error('Renseignez un responsable commercial (120 caractères maximum).')
  const cleanOwner = newOwner.trim()
  if (cleanOwner === prestation.commercialOwner) throw new Error('Choisissez un responsable différent du responsable actuel.')
  if (prestation.transfers.length >= 100) throw new Error('Le journal des transferts de démonstration est plein.')
  const transfer = {
    id: `transfert-${globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(36).slice(2)}`}`,
    fromOwner: prestation.commercialOwner, toOwner: cleanOwner, transferredAt: new Date().toISOString(),
  }
  const saved = transfersByPrestation()
  overrides = { ...saved, [id]: {
    commercialOwner: cleanOwner,
    transfers: [...(saved[id]?.transfers ?? []), transfer],
  } }
  let persisted = false
  try {
    if (activeStorage) { activeStorage.setItem(storageKey, JSON.stringify(overrides)); persisted = true }
  } catch { /* Keep the transfer in memory during this visit. */ }
  return { prestation: listMockAdminPrestations().find((item) => item.id === id), persisted }
}
