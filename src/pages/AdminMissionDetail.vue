<script setup>
import { computed, nextTick, onActivated, onMounted, onUnmounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { expertiseOptions } from '../mocks/talents.js'
import { getMockAdminMission } from '../services/adminMissionService.js'
import { getMockSession } from '../services/authService.js'
import { simulateMockMatching } from '../services/adminMatchingService.js'
import { getMockAdminInvitation, hasExistingMockEngagement } from '../services/adminInvitationService.js'
import { getMockAdminTalentById } from '../services/talentService.js'
import { addMockShortlistCandidate, clearIneligibleMockShortlistCandidates, getMockAdminShortlist, getMockShortlistEligibility, grantMockShortlistException, previewMockAdminShortlist, recordMockCandidateConsent, removeMockShortlistCandidate, revokeMockShortlistException } from '../services/adminShortlistService.js'

const route = useRoute()
const mission = ref(null)
const results = ref(null)
const shortlist = ref(null)
const notice = ref('')
const error = ref('')
const dialogType = ref('')
const dialogId = ref('')
const reason = ref('')
const channel = ref('')
const preview = ref(null)
const dialogElement = ref(null)
const firstInput = ref(null)
const menuId = ref('')
const expandedColumns = ref({})
const expandedMissionFacts = ref(false)
const visibleLimit = 6
const scoreDetail = ref(null)
let trigger
let movedFocusId = ''

const statuses = { PENDING_REVIEW: 'À valider', APPROVED: 'Validée, non publiée', PUBLISHED: 'Publiée', MATCHING: 'Mise en relation', CLOSED: 'Clôturée' }
const sources = { ESN: 'ESN', DIRECT_CLIENT: 'Client direct' }
const visibility = { CATALOG: 'Catalogue', INVITE_ONLY: 'Sur invitation' }
const remote = { REMOTE: 'À distance', HYBRID: 'Hybride', ON_SITE: 'Sur site' }
const availability = { IMMEDIATE: 'Immédiate', WITHIN_MONTH: 'Sous un mois', LATER: 'Plus tard', UNKNOWN: 'Inconnue' }
const qualifications = { NOT_EVALUATED: 'Non évalué par Wenovat', SELECTED_FOR_REVIEW: 'Sélectionné pour revue', INTERVIEW_SCHEDULED: 'Entretien planifié', QUALIFIED: 'Qualifié Wenovat', NOT_QUALIFIED: 'Non qualifié' }
const origins = { PROFESSIONAL_NETWORK: 'Réseau professionnel', AUTHORIZED_SEARCH: 'Recherche autorisée', REFERRAL: 'Recommandation', OTHER: 'Autre canal autorisé' }
const expertise = Object.fromEntries(expertiseOptions.map(({ value, label }) => [value, label]))
const dateLabel = (value) => value ? new Intl.DateTimeFormat('fr-FR', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(new Date(`${value}T00:00:00Z`)) : 'Non renseignée'
const columns = [
  { id: 'MATCHING', title: 'Matching', description: 'Profils fictifs non sélectionnés', accent: 'bg-indigo-500' },
  { id: 'PENDING', title: 'Accord à confirmer', description: 'Sélectionnés · réponse ou validation requise', accent: 'bg-sky-500' },
  { id: 'READY', title: 'Prêts pour préparation', description: 'Présentation pseudonymisée possible', accent: 'bg-emerald-500' },
]
const groupedColumns = computed(() => columns.map((column) => ({
  ...column,
  entries: (results.value ?? []).filter(({ talent }) => {
    const selected = shortlist.value?.allCandidateIds.includes(talent.id)
    if (column.id === 'MATCHING') return !selected
    if (!selected) return false
    const ready = mission.value.status !== 'CLOSED' && getMockShortlistEligibility(mission.value, talent, shortlist.value.exceptions[talent.id]) && shortlist.value.consent[talent.id]?.status === 'CONFIRMED'
    return column.id === (ready ? 'READY' : 'PENDING')
  }),
})))
const readyCount = computed(() => groupedColumns.value.find(({ id }) => id === 'READY')?.entries.length ?? 0)
const shownCount = (column) => expandedColumns.value[column.id] ? column.entries.length : Math.min(visibleLimit, column.entries.length)
const missingChecks = computed(() => [
  ...(!shortlist.value?.allCandidateIds.length ? ['Au moins un profil doit être sélectionné.'] : []),
  ...(shortlist.value?.excludedCount ? ['Certains profils ne sont plus éligibles.'] : []),
  ...(shortlist.value?.allCandidateIds.length && readyCount.value < shortlist.value.allCandidateIds.length ? ['Consentement absent, révoqué ou candidat indisponible pour certains profils.'] : []),
  ...(mission.value?.status === 'CLOSED' ? ['Mission clôturée : préparation indisponible.'] : []),
  ...(mission.value?.source === 'ESN' ? ['Accord commercial ESN non vérifié.'] : []),
])

watch(menuId, (id) => {
  if (id) nextTick(() => document.querySelector('[role="menu"] [role="menuitem"]')?.focus())
})

function refresh() {
  mission.value = getMockAdminMission(route.params.id)
  shortlist.value = mission.value ? getMockAdminShortlist(mission.value.id) : null
  if (mission.value && (results.value || shortlist.value?.allCandidateIds.length)) results.value = simulateMockMatching(mission.value.id)
  if (!mission.value) results.value = null
  if (preview.value && mission.value) {
    try { preview.value = previewMockAdminShortlist(mission.value.id) } catch { preview.value = null }
  }
  if (scoreDetail.value && mission.value) scoreDetail.value = results.value?.find(({ talent }) => talent.id === scoreDetail.value.talent.id) ?? null
}
watch(() => route.params.id, () => { results.value = null; preview.value = null; scoreDetail.value = null; dialogType.value = ''; menuId.value = ''; expandedColumns.value = {}; expandedMissionFacts.value = false; notice.value = ''; error.value = ''; refresh() }, { immediate: true })
onActivated(refresh)
function onDocumentClick(event) {
  if (menuId.value && (!(event.target instanceof Element) || !event.target.closest('[data-candidate-menu]'))) menuId.value = ''
}
function onDocumentKeydown(event) {
  if (event.key === 'Escape' && menuId.value) {
    const button = document.querySelector('[aria-haspopup="menu"][aria-expanded="true"]')
    menuId.value = ''
    button?.focus()
    event.stopPropagation()
  }
}
function onMenuKeydown(event) {
  if (event.key === 'Escape') { event.preventDefault(); event.stopPropagation(); closeMenu(event); return }
  if (!['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)) return
  const items = [...event.currentTarget.querySelectorAll('[role="menuitem"]')]
  const index = items.indexOf(document.activeElement)
  const next = event.key === 'Home' ? 0 : event.key === 'End' ? items.length - 1
    : (index + (event.key === 'ArrowDown' ? 1 : -1) + items.length) % items.length
  if (items[next]) { event.preventDefault(); items[next].focus() }
}
function onMenuFocusout(event) {
  const wrapper = event.currentTarget.closest('[data-candidate-menu]')
  if (!wrapper?.contains(event.relatedTarget)) menuId.value = ''
}
onMounted(() => { document.addEventListener('click', onDocumentClick); document.addEventListener('keydown', onDocumentKeydown) })
onUnmounted(() => { document.removeEventListener('click', onDocumentClick); document.removeEventListener('keydown', onDocumentKeydown) })

function runMatching() {
  try {
    refresh()
    results.value = simulateMockMatching(mission.value.id)
    error.value = ''
    notice.value = 'Matching fictif recalculé. Le score ne constitue ni une évaluation humaine ni un accord de présentation.'
  } catch (cause) { error.value = cause.message }
}

function eligibility(talent) {
  if (talent.qualificationStatus === 'NOT_QUALIFIED') return 'Profil non qualifié : sélection indisponible.'
  if (mission.value.tier !== 'PREMIUM') return ''
  if (!getMockShortlistEligibility(mission.value, talent, shortlist.value?.exceptions[talent.id])) return 'Exception administrateur motivée requise pour ce profil en cours d’évaluation.'
  return ''
}

function canRequestException(talent) {
  return mission.value?.tier === 'PREMIUM' && ['WENOVAT', 'EXTERNAL'].includes(talent.source)
    && ['NOT_EVALUATED', 'SELECTED_FOR_REVIEW', 'INTERVIEW_SCHEDULED'].includes(talent.qualificationStatus)
    && !shortlist.value?.exceptions[talent.id]
}

function canLinkProfile(talent) {
  return !talent.demoAccount && Boolean(getMockAdminTalentById(talent.id))
}

function consentBadge(talent, columnId) {
  if (columnId === 'MATCHING') return { label: 'Non sélectionné', color: 'bg-gray-100 text-gray-600' }
  if (mission.value.status === 'CLOSED') return { label: 'Mission clôturée', color: 'bg-rose-50 text-rose-800' }
  if (!getMockShortlistEligibility(mission.value, talent, shortlist.value.exceptions[talent.id])) return { label: 'Inéligible', color: 'bg-rose-50 text-rose-800' }
  const consent = shortlist.value.consent[talent.id]
  if (consent?.status === 'UNAVAILABLE') return { label: 'Indisponible', color: 'bg-rose-50 text-rose-800' }
  if (consent?.status === 'REVOKED') return { label: 'Accord révoqué', color: 'bg-rose-50 text-rose-800' }
  if (consent?.status === 'CONFIRMED') return { label: consent.via === 'PLATFORM' ? 'Intérêt confirmé' : 'Accord consigné', color: 'bg-emerald-50 text-emerald-800' }
  return { label: 'Accord à confirmer', color: 'bg-sky-50 text-sky-800' }
}

function toggleMenu(id) {
  menuId.value = menuId.value === id ? '' : id
}

function showScore(row, event) {
  trigger = event.currentTarget.closest('[data-candidate-menu]')?.querySelector('[aria-haspopup="menu"]')
  menuId.value = ''
  scoreDetail.value = row
  nextTick(() => firstInput.value?.focus())
}

function showAllInColumn(columnId) {
  expandedColumns.value = { ...expandedColumns.value, [columnId]: true }
}

function revealMovedCandidate(id) {
  const target = groupedColumns.value.find(({ entries }) => entries.some(({ talent }) => talent.id === id))
  if (target && target.entries.findIndex(({ talent }) => talent.id === id) >= visibleLimit) showAllInColumn(target.id)
}

function collapseColumn(columnId) {
  expandedColumns.value = { ...expandedColumns.value, [columnId]: false }
  menuId.value = ''
}

function originLabel(talent) {
  return talent.source === 'WENOVAT' ? 'Communauté Wenovat (exemple)' : origins[talent.originChannel] || 'Non renseignée'
}

function invitationNote(talent) {
  if (talent.id !== 'demo-freelance') return 'Profil sans session portail démo : accord à consigner manuellement.'
  const invitation = getMockAdminInvitation(mission.value.id)
  if (invitation?.status === 'PENDING') return 'Invitation locale visible dans « Mes candidatures » ; aucun email envoyé.'
  if (invitation?.status === 'CANCELLED') return 'Invitation locale annulée ; confirmation manuelle possible.'
  if (hasExistingMockEngagement(mission.value.id)) return 'Invitation ou candidature préexistante : aucun doublon créé.'
  return mission.value.status === 'PUBLISHED' ? 'Invitation indisponible : vérifiez l’accès de ce compte.' : 'Mission non publiée : aucune invitation créée.'
}

function action(operation, message) {
  error.value = ''
  try {
    const result = operation()
    shortlist.value = result.shortlist
    notice.value = result.changed ? `${message} ${result.persisted ? 'Enregistré localement.' : 'Disponible pour cette visite uniquement.'}` : 'Aucun changement.'
  } catch (cause) { error.value = cause.message }
}

function toggleCandidate(talent) {
  menuId.value = ''
  if (shortlist.value.allCandidateIds.includes(talent.id)) action(() => removeMockShortlistCandidate(mission.value.id, talent.id, getMockSession()), 'Profil retiré de la shortlist fictive.')
  else action(() => addMockShortlistCandidate(mission.value.id, talent.id, getMockSession()), 'Profil ajouté à la shortlist fictive ; aucune notification envoyée.')
  if (!error.value) {
    revealMovedCandidate(talent.id)
    nextTick(() => document.querySelector(`[data-talent-id="${talent.id}"] [aria-haspopup="menu"]`)?.focus())
  }
}

function openDialog(type, id, event) {
  trigger = event.currentTarget.closest('[data-candidate-menu]')?.querySelector('[aria-haspopup="menu"]') ?? event.currentTarget
  menuId.value = ''
  dialogType.value = type
  dialogId.value = id
  reason.value = ''
  channel.value = ''
  error.value = ''
  nextTick(() => firstInput.value?.focus())
}

function closeMenu(event) {
  const button = event.currentTarget.closest('[data-candidate-menu]')?.querySelector('[aria-haspopup="menu"]')
  menuId.value = ''
  nextTick(() => button?.focus())
}

function closeDialog() {
  dialogType.value = ''
  preview.value = null
  scoreDetail.value = null
  error.value = ''
  nextTick(() => {
    const target = movedFocusId ? document.querySelector(`[data-talent-id="${movedFocusId}"] [aria-haspopup="menu"]`) : null
    if (target) target.focus()
    else trigger?.focus()
    movedFocusId = ''
  })
}

function confirmDialog() {
  if (!reason.value.trim() || (dialogType.value === 'CONFIRMED' && !channel.value)) {
    error.value = 'Renseignez un motif et, pour un accord, le moyen de confirmation.'
    return
  }
  if (dialogType.value === 'EXCEPTION') action(() => grantMockShortlistException(mission.value.id, dialogId.value, reason.value, getMockSession()), 'Exception de présentation premium accordée, sans accès au portail.')
  else action(() => recordMockCandidateConsent(mission.value.id, dialogId.value, { status: dialogType.value, reason: reason.value, channel: channel.value }, getMockSession()), dialogType.value === 'CONFIRMED' ? 'Accord manuel fictif consigné, sans preuve réelle.' : 'Rétractation ou indisponibilité consignée localement.')
  if (!error.value) { revealMovedCandidate(dialogId.value); movedFocusId = dialogId.value; closeDialog() }
}

function revokeException(talentId) {
  menuId.value = ''
  action(() => revokeMockShortlistException(mission.value.id, talentId, getMockSession()), 'Exception révoquée et profil retiré.')
  if (!error.value) { revealMovedCandidate(talentId); nextTick(() => document.querySelector(`[data-talent-id="${talentId}"] [aria-haspopup="menu"]`)?.focus()) }
}

function clearIneligible() {
  action(() => clearIneligibleMockShortlistCandidates(mission.value.id, getMockSession()), 'Profils inéligibles retirés.')
  if (!error.value) { expandedColumns.value = { ...expandedColumns.value, MATCHING: true }; menuId.value = '' }
}

function openPreview(event) {
  error.value = ''
  try {
    refresh()
    preview.value = previewMockAdminShortlist(mission.value.id)
    trigger = event.currentTarget
    nextTick(() => firstInput.value?.focus())
  } catch (cause) { error.value = cause.message }
}

function onDialogKeydown(event) {
  if (event.key === 'Escape') { closeDialog(); return }
  if (event.key !== 'Tab') return
  const focusable = [...(dialogElement.value?.querySelectorAll('button, textarea, select') ?? [])]
  const first = focusable[0]
  const last = focusable.at(-1)
  if (!first) return
  if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus() }
  else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus() }
}
</script>

<template>
  <section class="space-y-6 font-aspekta text-gray-900">
    <router-link to="/admin/missions" class="inline-flex min-h-10 items-center rounded-lg border border-gray-200 bg-white px-3 text-sm font-semibold text-indigo-700 hover:bg-indigo-50 focus-visible:outline-2 focus-visible:outline-indigo-600">← Retour aux missions</router-link>
    <div v-if="!mission" class="rounded-xl border border-gray-200 bg-white p-8 shadow-sm"><h1 class="font-cabinet-grotesk text-3xl font-bold">Mission introuvable</h1><p class="mt-3 text-gray-600">Aucune mission fictive ne correspond à cet identifiant.</p></div>

    <template v-else>
      <header class="rounded-xl border border-gray-200 bg-white px-5 py-4 shadow-sm sm:px-6">
        <p class="text-xs font-bold uppercase tracking-wider text-indigo-700">Administration · mission fictive · {{ mission.id }}</p>
        <h1 class="mt-1 font-cabinet-grotesk text-3xl font-bold">{{ mission.title }}</h1>
        <p class="mt-2 max-w-3xl text-sm leading-relaxed text-gray-600">{{ mission.summary }}</p>
        <div class="mt-3 flex flex-wrap gap-2 text-xs font-semibold"><span class="rounded-full bg-indigo-50 px-3 py-1.5 text-indigo-800">{{ statuses[mission.status] }}</span><span class="rounded-full bg-amber-100 px-3 py-1.5 text-amber-900">{{ mission.tier === 'PREMIUM' ? 'Premium' : 'Standard' }}</span><span class="rounded-full bg-gray-100 px-3 py-1.5 text-gray-700">{{ visibility[mission.visibility] }}</span></div>
      </header>

      <div class="grid gap-4 lg:grid-cols-[minmax(0,1fr)_20rem]">
        <section class="rounded-xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6" aria-labelledby="mission-context">
          <h2 id="mission-context" class="font-cabinet-grotesk text-lg font-bold">Le besoin</h2>
          <p class="mt-2 text-sm leading-relaxed text-gray-700">{{ mission.context || 'Contexte non renseigné.' }}</p>
          <div class="mt-3 grid gap-3 sm:grid-cols-2"><div><h3 class="text-sm font-bold">Objectifs</h3><ul class="mt-1 list-disc space-y-0.5 pl-5 text-sm text-gray-700"><li v-for="item in mission.objectives ?? []" :key="item">{{ item }}</li></ul></div><div><h3 class="text-sm font-bold">Compétences attendues</h3><ul class="mt-1 list-disc space-y-0.5 pl-5 text-sm text-gray-700"><li v-for="item in mission.expectedSkills ?? []" :key="item">{{ item }}</li></ul></div></div>
          <div class="mt-3 flex flex-wrap gap-2"><span v-for="item in mission.technologies ?? []" :key="item" class="rounded-md bg-indigo-50 px-2.5 py-1 text-xs font-semibold text-indigo-800">{{ item }}</span></div>
        </section>
        <aside class="rounded-xl border border-gray-200 bg-white p-5 shadow-sm" aria-labelledby="mission-facts">
          <h2 id="mission-facts" class="font-cabinet-grotesk text-lg font-bold">Mission en bref</h2>
          <dl class="mt-3 space-y-2 border-t border-gray-100 pt-3 text-sm">
            <div><dt class="text-xs text-gray-500">Client · source</dt><dd class="font-semibold">{{ mission.organization }} · {{ sources[mission.source] }}</dd></div>
            <div><dt class="text-xs text-gray-500">Statut · offre · visibilité</dt><dd class="font-semibold">{{ statuses[mission.status] }} · {{ mission.tier === 'PREMIUM' ? 'Premium' : 'Standard' }} · {{ visibility[mission.visibility] }}</dd></div>
            <div><dt class="text-xs text-gray-500">Démarrage · durée</dt><dd class="font-semibold">{{ dateLabel(mission.startDate) }} · {{ mission.duration || 'Non renseignée' }}</dd></div>
            <div><dt class="text-xs text-gray-500">TJM · organisation</dt><dd class="font-semibold">{{ mission.dailyRate != null ? `${mission.dailyRate} € / jour` : 'Non communiqué' }} · {{ remote[mission.remote] || 'Remote non renseigné' }} · {{ mission.location || 'Lieu non renseigné' }}</dd></div>
            <div><dt class="text-xs text-gray-500">Sourcing</dt><dd class="font-semibold">{{ mission.owner }}</dd></div>
          </dl>
          <button type="button" class="mt-3 text-xs font-semibold text-indigo-700 underline underline-offset-4" :aria-expanded="expandedMissionFacts" aria-controls="mission-extra-facts" @click="expandedMissionFacts = !expandedMissionFacts">{{ expandedMissionFacts ? 'Masquer les détails' : 'Voir tous les détails' }}</button>
          <dl v-if="expandedMissionFacts" id="mission-extra-facts" class="mt-2 space-y-2 border-t border-gray-100 pt-2 text-xs"><div><dt class="text-gray-500">Reçue le</dt><dd class="font-semibold">{{ dateLabel(mission.receivedAt) }}</dd></div><div><dt class="text-gray-500">Disponibilité demandée</dt><dd class="font-semibold">{{ availability[mission.availability] || 'Non renseignée' }}</dd></div></dl>
        </aside>
      </div>

      <section aria-labelledby="matching-title" class="space-y-5">
        <div class="flex flex-wrap items-start justify-between gap-4"><div><p class="text-xs font-bold uppercase tracking-wider text-indigo-700">Parcours interne · mode démo</p><h2 id="matching-title" class="mt-2 font-cabinet-grotesk text-2xl font-bold sm:text-3xl">Matching, accord et préparation</h2><p class="mt-2 max-w-3xl text-sm text-gray-600">Score indicatif fictif, non une évaluation technique ni un accord. Chaque carte donne accès au détail des critères via « ⋯ ».</p></div><button type="button" class="min-h-11 rounded-lg bg-indigo-700 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-800" @click="runMatching">Simuler le matching</button></div>
        <div class="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-indigo-100 bg-indigo-50 px-5 py-4 text-sm text-indigo-950"><p><strong>Shortlist fictive :</strong> {{ shortlist.allCandidateIds.length }} profil(s) sélectionné(s) · {{ readyCount }} prêt(s) pour la préparation pseudonymisée.</p><button v-if="shortlist.excludedCount" type="button" class="min-h-10 font-semibold text-indigo-800 underline" @click="clearIneligible">Retirer {{ shortlist.excludedCount }} profil(s) inéligible(s)</button></div>
        <p v-if="!results" class="rounded-xl border border-gray-200 bg-white p-5 text-sm text-gray-600">Lancez le matching pour afficher le suivi Kanban des profils fictifs.</p>
        <template v-else>
          <p class="text-sm text-gray-600">{{ results.length }} profils fictifs · Faites défiler les colonnes horizontalement sur petit écran. Une sélection ne contacte pas le candidat.</p>
          <div class="-mx-4 overflow-x-auto px-4 pb-4 sm:-mx-8 sm:px-8"><div class="grid min-w-[54rem] grid-cols-3 items-start gap-4 xl:min-w-0">
            <section v-for="column in groupedColumns" :key="column.id" :aria-labelledby="`mission-column-${column.id}`" class="min-w-0">
              <div class="mb-3 px-1"><h3 :id="`mission-column-${column.id}`" class="flex items-center gap-2 font-cabinet-grotesk text-lg font-bold"><span class="h-2.5 w-2.5 shrink-0 rounded-full" :class="column.accent" aria-hidden="true" />{{ column.title }} <span class="text-sm font-medium text-gray-500">{{ column.entries.length }}</span></h3><p class="mt-1 text-xs text-gray-500">{{ column.description }}</p></div>
              <div v-if="column.id === 'READY'" class="mb-3 rounded-xl border border-indigo-200 bg-indigo-50 p-3 text-xs text-indigo-950">
                <p class="font-semibold">{{ readyCount }} / {{ shortlist.allCandidateIds.length }} accord(s) · {{ mission.source === 'ESN' ? 'Accord ESN non vérifié' : 'Client direct fictif' }}</p>
                <div class="mt-2 flex flex-wrap gap-2"><button type="button" :disabled="!readyCount || Boolean(shortlist.excludedCount) || mission.status === 'CLOSED'" class="min-h-9 flex-1 rounded-lg bg-white px-2 font-semibold text-indigo-800 ring-1 ring-indigo-300 hover:bg-indigo-100 disabled:cursor-not-allowed disabled:opacity-50" @click="openPreview">Prévisualiser</button><button type="button" disabled class="min-h-9 flex-1 cursor-not-allowed rounded-lg bg-gray-200 px-2 font-semibold text-gray-600" aria-describedby="send-blocked">Envoyer</button></div>
                <p id="send-blocked" class="mt-2 text-gray-700">Envoi désactivé : aucune vérification commerciale ni transmission réelle.</p>
                <details v-if="missingChecks.length" class="mt-2"><summary class="cursor-pointer font-semibold">{{ missingChecks.length }} prérequis à vérifier</summary><ul class="mt-1 list-disc space-y-1 pl-4"><li v-for="check in missingChecks" :key="check">{{ check }}</li></ul></details>
              </div>
              <div class="space-y-2">
                <article v-for="row in (expandedColumns[column.id] ? column.entries : column.entries.slice(0, visibleLimit))" :key="row.talent.id" :data-talent-id="row.talent.id" class="rounded-xl border border-gray-200 bg-white p-3 shadow-sm">
                  <div class="flex items-start gap-2"><div class="min-w-0 flex-1"><router-link v-if="canLinkProfile(row.talent)" :to="`/admin/talents/${row.talent.id}`" class="block truncate font-cabinet-grotesk text-base font-bold text-indigo-800 hover:underline focus-visible:outline-2 focus-visible:outline-indigo-600">{{ row.talent.firstName }} {{ row.talent.lastName }}</router-link><h4 v-else class="truncate font-cabinet-grotesk text-base font-bold">{{ row.talent.firstName }} {{ row.talent.lastName }}</h4><p class="truncate text-xs text-gray-600" :title="row.talent.architectTitle">{{ row.talent.architectTitle }}</p></div><span class="shrink-0 rounded-lg bg-indigo-50 px-2 py-1 text-xs font-bold text-indigo-800" :aria-label="`Score indicatif ${row.score} sur 100`">{{ row.score }}/100</span>
                    <div data-candidate-menu class="relative shrink-0"><button type="button" class="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-lg font-bold text-gray-600 hover:bg-gray-50 focus-visible:outline-2 focus-visible:outline-indigo-600" aria-haspopup="menu" :aria-expanded="menuId === row.talent.id" :aria-label="`Actions pour ${row.talent.firstName} ${row.talent.lastName}`" @click="toggleMenu(row.talent.id)">⋯</button>
                      <div v-if="menuId === row.talent.id" role="menu" class="absolute right-0 top-10 z-20 w-56 rounded-lg border border-gray-200 bg-white p-1 shadow-lg" @keydown="onMenuKeydown" @focusout="onMenuFocusout">
                        <button role="menuitem" type="button" class="block min-h-9 w-full rounded px-2 text-left text-xs hover:bg-indigo-50" @click="showScore(row, $event)">Détail du matching</button>
                        <button v-if="column.id === 'MATCHING' && !eligibility(row.talent) && mission.status !== 'CLOSED'" role="menuitem" type="button" class="block min-h-9 w-full rounded px-2 text-left text-xs font-semibold text-indigo-800 hover:bg-indigo-50" @click="toggleCandidate(row.talent)">Sélectionner pour la shortlist</button>
                        <button v-if="column.id !== 'MATCHING'" role="menuitem" type="button" class="block min-h-9 w-full rounded px-2 text-left text-xs hover:bg-indigo-50" @click="toggleCandidate(row.talent)">Retirer de la shortlist</button>
                        <button v-if="canRequestException(row.talent)" role="menuitem" type="button" class="block min-h-9 w-full rounded px-2 text-left text-xs text-amber-900 hover:bg-amber-50" @click="openDialog('EXCEPTION', row.talent.id, $event)">Motiver une exception premium</button>
                        <button v-if="shortlist.exceptions[row.talent.id]" role="menuitem" type="button" class="block min-h-9 w-full rounded px-2 text-left text-xs hover:bg-gray-50" @click="revokeException(row.talent.id)">Révoquer l’exception</button>
                        <button v-if="column.id === 'PENDING' && !eligibility(row.talent) && mission.status !== 'CLOSED'" role="menuitem" type="button" class="block min-h-9 w-full rounded px-2 text-left text-xs hover:bg-indigo-50" @click="openDialog('CONFIRMED', row.talent.id, $event)">{{ ['UNAVAILABLE', 'REVOKED'].includes(shortlist.consent[row.talent.id]?.status) ? 'Consigner un nouvel accord' : 'Consigner un accord manuel' }}</button>
                        <button v-if="column.id === 'PENDING' && shortlist.consent[row.talent.id]?.status === 'PENDING' && !eligibility(row.talent) && mission.status !== 'CLOSED'" role="menuitem" type="button" class="block min-h-9 w-full rounded px-2 text-left text-xs hover:bg-gray-50" @click="openDialog('UNAVAILABLE', row.talent.id, $event)">Noter l’indisponibilité</button>
                        <button v-if="column.id === 'READY'" role="menuitem" type="button" class="block min-h-9 w-full rounded px-2 text-left text-xs text-rose-800 hover:bg-rose-50" @click="openDialog('REVOKED', row.talent.id, $event)">Rectifier / révoquer l’accord</button>
                      </div>
                    </div>
                  </div>
                  <div class="mt-2 flex flex-wrap gap-1 text-[11px] font-semibold"><span class="rounded-full bg-indigo-50 px-2 py-0.5 text-indigo-800">{{ row.talent.source === 'WENOVAT' ? 'Wenovat' : 'Externe' }}</span><span class="rounded-full bg-gray-100 px-2 py-0.5 text-gray-700">{{ qualifications[row.talent.qualificationStatus] }}</span><span class="rounded-full px-2 py-0.5" :class="consentBadge(row.talent, column.id).color">{{ consentBadge(row.talent, column.id).label }}</span><span v-if="shortlist.exceptions[row.talent.id]" class="rounded-full bg-amber-100 px-2 py-0.5 text-amber-900">Exception admin</span></div>
                </article>
                <p v-if="!column.entries.length" class="rounded-xl border border-dashed border-gray-200 bg-white/60 p-4 text-sm text-gray-500">Aucun profil à cette étape.</p>
                <button v-if="column.entries.length > visibleLimit" type="button" class="min-h-10 w-full rounded-lg border border-gray-200 bg-white px-3 text-sm font-semibold text-indigo-700 hover:bg-indigo-50" :aria-expanded="Boolean(expandedColumns[column.id])" :aria-label="expandedColumns[column.id] ? `Réduire ${column.title} à six profils` : `Voir les ${column.entries.length - shownCount(column)} autres profils de ${column.title}`" @click="expandedColumns[column.id] ? collapseColumn(column.id) : showAllInColumn(column.id)">{{ expandedColumns[column.id] ? 'Réduire' : `⋯ Voir ${column.entries.length - shownCount(column)} autres` }}</button>
              </div>
            </section>
          </div></div>
        </template>
      </section>


      <p v-if="notice" role="status" aria-live="polite" class="rounded-lg border border-indigo-200 bg-indigo-50 p-4 text-sm text-indigo-900">{{ notice }}</p>
      <p v-if="error" role="alert" class="rounded-lg border border-rose-200 bg-rose-50 p-4 text-sm text-rose-900">{{ error }}</p>
      <section class="rounded-xl border border-gray-200 bg-white p-6 shadow-sm" aria-labelledby="history-title"><h2 id="history-title" class="font-cabinet-grotesk text-lg font-bold">Historique local des actions fictives</h2><ol v-if="shortlist.history.length" class="mt-4 space-y-2 text-sm"><li v-for="event in shortlist.history" :key="event.id" class="border-t border-gray-100 pt-2"><strong>{{ { EXCEPTION_GRANTED: 'Exception accordée', EXCEPTION_REVOKED: 'Exception révoquée', CANDIDATE_ADDED: 'Profil ajouté', CANDIDATE_REMOVED: 'Profil retiré', CONSENT_CONFIRMED: 'Accord manuel consigné', CONSENT_REVOKED: 'Accord révoqué', CANDIDATE_UNAVAILABLE: 'Indisponibilité consignée' }[event.type] }}</strong> · {{ new Date(event.date).toLocaleString('fr-FR') }} · {{ event.author }}<span v-if="event.channel"> · {{ { PHONE: 'Téléphone', VIDEO: 'Visioconférence', WRITTEN: 'Écrit', OTHER: 'Autre' }[event.channel] }}</span><p v-if="event.reason" class="mt-1 whitespace-pre-line break-words text-gray-600">Motif : {{ event.reason }}</p></li></ol><p v-else class="mt-2 text-sm text-gray-600">Aucune action enregistrée. Relancer le matching ne crée pas d’événement.</p></section>
    </template>

    <div v-if="dialogType" class="fixed inset-0 z-50 flex items-center justify-center bg-gray-950/60 p-4" @click.self="closeDialog" @keydown="onDialogKeydown"><form ref="dialogElement" role="dialog" aria-modal="true" aria-labelledby="decision-title" class="max-h-[90dvh] w-full max-w-lg overflow-y-auto rounded-xl bg-white p-6 shadow-xl" @submit.prevent="confirmDialog"><h2 id="decision-title" class="font-cabinet-grotesk text-xl font-bold">{{ dialogType === 'EXCEPTION' ? 'Exception de présentation premium' : dialogType === 'CONFIRMED' ? 'Consigner un accord manuel fictif' : dialogType === 'UNAVAILABLE' ? 'Consigner une indisponibilité' : 'Rectifier / révoquer l’accord' }}</h2><p class="mt-2 text-sm text-gray-600">{{ dialogType === 'EXCEPTION' ? 'Dérogation limitée à cette shortlist pour un profil en cours d’évaluation ; aucun accès au portail premium, contact ou changement de qualification.' : 'Action administrative locale et historisée. Aucun consentement réel n’est vérifié dans cette maquette.' }}</p><label v-if="dialogType === 'CONFIRMED'" for="consent-channel" class="mt-5 block text-sm font-semibold">Moyen de confirmation *</label><select v-if="dialogType === 'CONFIRMED'" id="consent-channel" v-model="channel" required class="mt-2 w-full rounded-lg border-gray-300 text-sm"><option value="">Sélectionner</option><option value="PHONE">Téléphone</option><option value="VIDEO">Visioconférence</option><option value="WRITTEN">Écrit</option><option value="OTHER">Autre</option></select><label for="decision-reason" class="mt-5 block text-sm font-semibold">Motif obligatoire *</label><textarea id="decision-reason" ref="firstInput" v-model="reason" required maxlength="500" rows="3" class="mt-2 w-full rounded-lg border-gray-300 text-sm focus:border-indigo-600 focus:ring-indigo-600" /><p v-if="error" role="alert" class="mt-2 text-sm text-rose-700">{{ error }}</p><div class="mt-5 flex flex-wrap justify-end gap-2"><button type="button" class="min-h-11 rounded-lg border border-gray-300 px-4" @click="closeDialog">Annuler</button><button type="submit" class="min-h-11 rounded-lg bg-indigo-700 px-4 font-semibold text-white hover:bg-indigo-800">Confirmer</button></div></form></div>

    <div v-if="scoreDetail" class="fixed inset-0 z-50 flex items-center justify-center bg-gray-950/60 p-4" @click.self="closeDialog" @keydown="onDialogKeydown"><div ref="dialogElement" role="dialog" aria-modal="true" aria-labelledby="score-title" class="w-full max-w-md rounded-xl bg-white p-6 shadow-xl"><h2 id="score-title" class="font-cabinet-grotesk text-xl font-bold">Matching indicatif · {{ scoreDetail.score }}/100</h2><p class="mt-2 text-sm text-gray-700">{{ scoreDetail.talent.firstName }} {{ scoreDetail.talent.lastName }} · {{ scoreDetail.talent.architectTitle }}</p><p class="mt-3 text-sm text-gray-600">{{ scoreDetail.explanation }}</p><dl class="mt-3 grid grid-cols-2 gap-2 text-xs text-gray-700"><div>Domaine : {{ scoreDetail.components.expertise }}/40</div><div>Technologies : {{ scoreDetail.components.technologies }}/30</div><div>Disponibilité : {{ scoreDetail.components.availability }}/20</div><div>Remote : {{ scoreDetail.components.remote }}/10</div></dl><p class="mt-3 text-xs text-gray-600">Disponibilité {{ availability[scoreDetail.talent.availability] || 'inconnue' }} · {{ remote[scoreDetail.talent.remotePreference] || 'Remote non renseigné' }} · Provenance : {{ originLabel(scoreDetail.talent) }}. Ce calcul fictif n’évalue ni compétence technique ni intérêt.</p><p v-if="mission?.tier === 'PREMIUM' && scoreDetail.talent.qualificationStatus !== 'QUALIFIED'" class="mt-2 text-xs font-semibold text-amber-900">{{ eligibility(scoreDetail.talent) || 'Présentation sous exception admin uniquement ; aucun accès portail premium.' }}</p><p v-if="shortlist?.allCandidateIds.includes(scoreDetail.talent.id)" class="mt-2 text-xs text-gray-600">{{ invitationNote(scoreDetail.talent) }}</p><button ref="firstInput" type="button" class="mt-5 min-h-10 rounded-lg bg-indigo-700 px-4 text-sm font-semibold text-white" @click="closeDialog">Fermer</button></div></div>

    <div v-if="preview" class="fixed inset-0 z-50 flex items-center justify-center bg-gray-950/60 p-4" @click.self="closeDialog" @keydown="onDialogKeydown"><div ref="dialogElement" role="dialog" aria-modal="true" aria-labelledby="preview-title" class="max-h-[90dvh] w-full max-w-xl overflow-y-auto rounded-xl bg-white p-6 shadow-xl"><p class="text-xs font-bold uppercase text-indigo-700">Aperçu fictif · non envoyé</p><h2 id="preview-title" class="mt-1 font-cabinet-grotesk text-xl font-bold">Shortlist pseudonymisée</h2><p class="mt-3 text-sm text-gray-600">{{ preview.length }} profil(s) confirmé(s) uniquement. Les profils en attente ou indisponibles sont exclus. Aucun identifiant, coordonnées, CV ou motif d’accord.</p><ol class="mt-5 space-y-3"><li v-for="profile in preview" :key="profile.label" class="rounded-lg border border-gray-200 p-4 text-sm"><h3 class="font-cabinet-grotesk text-lg font-bold">{{ profile.label }}</h3><p class="mt-1">Domaines : {{ profile.expertise.map((item) => expertise[item] || item).join(', ') || 'Non renseignés' }}</p><p class="mt-1">Technologies : {{ profile.technologies.join(', ') || 'Non renseignées' }}</p><p class="mt-1">Disponibilité : {{ availability[profile.availability] || 'Inconnue' }} · {{ qualifications[profile.qualificationStatus] }}</p><p v-if="profile.exception" class="mt-2 font-semibold text-amber-800">Exception admin de présentation · qualification Wenovat non accordée · aucun accès premium</p></li></ol><button ref="firstInput" type="button" class="mt-5 min-h-11 rounded-lg bg-indigo-700 px-4 font-semibold text-white hover:bg-indigo-800" @click="closeDialog">Fermer l’aperçu</button></div></div>
  </section>
</template>
