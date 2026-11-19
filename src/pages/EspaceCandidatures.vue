<script setup>
import { computed, onActivated, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { getMockSession } from '../services/authService.js'
import { getMockTalent } from '../services/talentService.js'
import { getAccessibleMission } from '../services/missionService.js'
import { getMockEngagements, respondToMockInvitation } from '../services/engagementService.js'

const route = useRoute()
const filter = ref('ALL')
const notice = ref('')
const error = ref('')
const activity = ref({ invitations: [], applications: [] })
const talent = ref(null)
const filters = [
  { value: 'ALL', label: 'Toutes' },
  { value: 'INVITATION', label: 'Invitations' },
  { value: 'APPLICATION', label: 'Candidatures' },
]
const statusLabels = {
  PENDING: 'Invitation reçue', INTERESTED: 'Intéressé', UNAVAILABLE: 'Pas disponible', QUESTION: 'Question enregistrée', CANCELLED: 'Invitation annulée',
  RECEIVED: 'Candidature envoyée', IN_PROGRESS: 'En cours d’examen', REJECTED: 'Non retenue', SHORTLISTED: 'Retenue en shortlist',
}
const columns = [
  { id: 'TO_RESPOND', title: 'À traiter', description: 'Invitations et candidatures envoyées', statuses: ['PENDING', 'RECEIVED'], accent: 'bg-indigo-500' },
  { id: 'IN_PROGRESS', title: 'En cours', description: 'Échanges et examen', statuses: ['INTERESTED', 'QUESTION', 'IN_PROGRESS'], accent: 'bg-sky-500' },
  { id: 'SHORTLISTED', title: 'Shortlist', description: 'Candidatures retenues', statuses: ['SHORTLISTED'], accent: 'bg-emerald-500' },
  { id: 'CLOSED', title: 'Clôturées', description: 'Indisponibles ou non retenues', statuses: ['UNAVAILABLE', 'REJECTED', 'CANCELLED'], accent: 'bg-gray-400' },
]
const entries = computed(() => [...activity.value.invitations, ...activity.value.applications]
  .filter((entry) => filter.value === 'ALL' || entry.type === filter.value)
  .sort((a, b) => (b.createdAt ?? '').localeCompare(a.createdAt ?? '') || a.id.localeCompare(b.id)))
const groupedColumns = computed(() => columns.map((column) => ({
  ...column,
  entries: entries.value.filter((entry) => column.statuses.includes(entry.status)),
})))

function refresh() {
  const session = getMockSession()
  talent.value = session?.role === 'FREELANCE' ? getMockTalent(session) : null
  activity.value = getMockEngagements(talent.value)
  notice.value = ''
  error.value = ''
}
watch(() => route.fullPath, refresh, { immediate: true })
onActivated(refresh)

function missionLink(entry) {
  return getAccessibleMission(entry.missionId, talent.value) ? `/espace/missions/${entry.missionId}` : null
}

function dateLabel(value) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value ?? '')) return 'Date fictive non renseignée'
  const date = new Date(`${value}T00:00:00Z`)
  if (Number.isNaN(date.getTime())) return 'Date fictive non renseignée'
  return new Intl.DateTimeFormat('fr-FR', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(date)
}

function respond(id, answer) {
  notice.value = ''
  error.value = ''
  try {
    activity.value = respondToMockInvitation(talent.value, id, answer)
    notice.value = answer === 'INTERESTED'
      ? 'Votre intérêt a été enregistré localement. Aucune candidature n’a été envoyée.'
      : 'Votre indisponibilité a été enregistrée localement.'
  } catch (reason) {
    error.value = reason instanceof Error ? reason.message : 'La réponse n’a pas pu être enregistrée.'
  }
}
</script>

<template>
  <div class="space-y-7 font-aspekta text-gray-900">
    <header>
      <p class="text-xs font-bold uppercase tracking-wider text-indigo-700">Suivi de démonstration</p>
      <h1 class="mt-2 font-cabinet-grotesk text-3xl font-bold tracking-tight sm:text-4xl">Mes candidatures et invitations</h1>
      <p class="mt-3 max-w-2xl text-gray-600">Suivez vos démarches par étape. Missions et dates fictives ; aucune réponse n’est envoyée à une entreprise.</p>
    </header>

    <nav class="flex gap-7 overflow-x-auto border-b border-gray-200" aria-label="Filtrer les candidatures et invitations">
      <button v-for="choice in filters" :key="choice.value" type="button" class="shrink-0 border-b-2 px-1 py-3 text-sm font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" :class="filter === choice.value ? 'border-indigo-600 text-indigo-700' : 'border-transparent text-gray-600 hover:border-indigo-200 hover:text-indigo-800'" :aria-pressed="filter === choice.value" @click="filter = choice.value">{{ choice.label }}</button>
    </nav>

    <p v-if="notice" role="status" aria-live="polite" class="rounded-xl bg-emerald-50 p-4 text-sm font-medium text-emerald-900">{{ notice }}</p>
    <p v-if="error" role="alert" class="rounded-xl bg-red-50 p-4 text-sm font-medium text-red-800">{{ error }}</p>

    <section aria-label="Tableau de suivi des candidatures et invitations">
      <p v-if="entries.length" role="status" class="mb-4 text-sm text-gray-600">{{ entries.length }} {{ entries.length === 1 ? 'élément fictif' : 'éléments fictifs' }} · Faites défiler les colonnes horizontalement sur petit écran.</p>
      <div v-if="entries.length" class="-mx-4 overflow-x-auto px-4 pb-4 sm:-mx-8 sm:px-8">
        <div class="grid min-w-[70rem] grid-cols-4 items-start gap-4 xl:min-w-0">
          <section v-for="column in groupedColumns" :key="column.id" :aria-labelledby="`column-${column.id}`" class="min-w-0">
            <div class="mb-3 flex items-center justify-between gap-2 px-1">
              <h2 :id="`column-${column.id}`" class="flex items-center gap-2 font-cabinet-grotesk text-lg font-bold"><span class="h-2.5 w-2.5 rounded-full" :class="column.accent" aria-hidden="true" />{{ column.title }} <span class="text-sm font-medium text-gray-500">{{ column.entries.length }}</span></h2>
            </div>
            <p class="mb-4 px-1 text-xs text-gray-500">{{ column.description }}</p>
            <div class="space-y-3">
              <article v-for="entry in column.entries" :key="entry.id" class="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
                <p class="text-xs font-semibold text-indigo-700">{{ entry.type === 'INVITATION' ? 'Invitation Wenovat' : 'Candidature spontanée' }} · exemple fictif</p>
                <h3 class="mt-2 font-cabinet-grotesk text-lg font-bold leading-snug">{{ missionLink(entry) ? entry.mission.title : 'Mission non consultable' }}</h3>
                <p class="mt-1 text-sm text-gray-600">{{ entry.createdAt ? (entry.type === 'INVITATION' ? 'Reçue (date fictive)' : 'Envoyée (date fictive)') : 'Date' }} : {{ dateLabel(entry.createdAt) }}</p>
                <p v-if="missionLink(entry)" class="mt-3 text-sm leading-relaxed text-gray-600">{{ entry.mission.summary }}</p>
                <p v-else class="mt-3 text-sm text-gray-600">Cette mission n’est plus consultable avec votre accès actuel.</p>
                <p v-if="entry.status === 'QUESTION' && entry.question" class="mt-3 rounded-lg bg-indigo-50 p-3 text-sm text-indigo-900">Question enregistrée localement : {{ entry.question }}</p>
                <div class="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-gray-100 pt-4">
                  <span class="rounded-full px-2.5 py-1 text-xs font-semibold" :class="entry.status === 'PENDING' || entry.status === 'IN_PROGRESS' ? 'bg-amber-100 text-amber-900' : ['UNAVAILABLE', 'REJECTED', 'CANCELLED'].includes(entry.status) ? 'bg-gray-100 text-gray-700' : 'bg-indigo-50 text-indigo-800'">{{ statusLabels[entry.status] ?? 'Statut non renseigné' }}</span>
                  <router-link v-if="missionLink(entry) && entry.status !== 'CANCELLED'" :to="missionLink(entry)" class="inline-flex min-h-9 items-center text-sm font-semibold text-indigo-700 underline underline-offset-4 hover:text-indigo-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Voir la mission</router-link>
                </div>
                <div v-if="entry.type === 'INVITATION' && entry.status === 'PENDING'" class="mt-4 grid gap-2">
                  <button type="button" class="min-h-10 w-full rounded-lg bg-indigo-700 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" @click="respond(entry.id, 'INTERESTED')">Je suis intéressé</button>
                  <button type="button" class="min-h-10 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" @click="respond(entry.id, 'UNAVAILABLE')">Pas disponible</button>
                </div>
                <p v-if="entry.status === 'CANCELLED'" class="mt-3 text-xs text-gray-600">Invitation locale annulée par l’administration démo ; aucune réponse possible.</p>
                <p v-if="entry.type === 'APPLICATION'" class="mt-3 text-xs text-gray-500">Statut non modifiable par le freelance.</p>
              </article>
              <p v-if="!column.entries.length" class="rounded-xl border border-dashed border-gray-200 bg-white/60 p-5 text-sm text-gray-500">Aucun élément à cette étape.</p>
            </div>
          </section>
        </div>
      </div>
      <div v-else class="rounded-2xl border border-indigo-100 bg-white px-6 py-10 text-center shadow-sm">
        <h2 class="font-cabinet-grotesk text-xl font-bold">{{ filter === 'INVITATION' ? 'Aucune invitation à afficher' : filter === 'APPLICATION' ? 'Aucune candidature à afficher' : 'Aucune candidature ni invitation' }}</h2>
        <p class="mt-2 text-sm text-gray-600">{{ filter === 'INVITATION' ? 'Les invitations accessibles apparaîtront ici.' : 'Les candidatures aux missions accessibles apparaîtront ici.' }}</p>
        <router-link v-if="filter !== 'INVITATION'" to="/espace/missions" class="mt-5 inline-flex min-h-10 items-center rounded-lg bg-indigo-700 px-4 py-2 font-semibold text-white hover:bg-indigo-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Explorer les missions</router-link>
      </div>
    </section>
  </div>
</template>
