<script setup>
import { computed, onActivated, ref } from 'vue'
import { getMockSession } from '../services/authService.js'
import { listMockAdminMissions, publishMockMission, validateMockMission } from '../services/adminMissionService.js'

const missions = ref(listMockAdminMissions())
const search = ref('')
const status = ref('')
const source = ref('')
const tier = ref('')
const notice = ref('')
const error = ref('')
const pending = ref(null)
const statusChoices = [
  { value: 'PENDING_REVIEW', label: 'À valider', style: 'bg-amber-100 text-amber-900' },
  { value: 'APPROVED', label: 'Validée, non publiée', style: 'bg-sky-100 text-sky-800' },
  { value: 'PUBLISHED', label: 'Publiée', style: 'bg-emerald-100 text-emerald-800' },
  { value: 'MATCHING', label: 'Mise en relation', style: 'bg-indigo-100 text-indigo-800' },
  { value: 'CLOSED', label: 'Clôturée', style: 'bg-gray-100 text-gray-700' },
]
const sourceChoices = [{ value: 'ESN', label: 'ESN' }, { value: 'DIRECT_CLIENT', label: 'Client direct' }]
const tierChoices = [{ value: 'STANDARD', label: 'Standard' }, { value: 'PREMIUM', label: 'Premium' }]
const statusLabels = Object.fromEntries(statusChoices.map(({ value, label }) => [value, label]))
const statusStyles = Object.fromEntries(statusChoices.map(({ value, style }) => [value, style]))
const sourceLabels = Object.fromEntries(sourceChoices.map(({ value, label }) => [value, label]))
const tierLabels = Object.fromEntries(tierChoices.map(({ value, label }) => [value, label]))
const visibilityLabels = { CATALOG: 'Catalogue', INVITE_ONLY: 'Sur invitation' }
const hasFilters = computed(() => Boolean(search.value || status.value || source.value || tier.value))
const filteredMissions = computed(() => {
  const query = search.value.trim().toLocaleLowerCase('fr-FR')
  return missions.value.filter((mission) => {
    const searchable = [mission.title, mission.organization, mission.owner, mission.id].join(' ').toLocaleLowerCase('fr-FR')
    return (!query || searchable.includes(query))
      && (!status.value || mission.status === status.value)
      && (!source.value || mission.source === source.value)
      && (!tier.value || mission.tier === tier.value)
  }).sort((a, b) => b.receivedAt.localeCompare(a.receivedAt) || a.id.localeCompare(b.id))
})
const dateLabel = (value) => new Intl.DateTimeFormat('fr-FR', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' }).format(new Date(`${value}T00:00:00Z`))

onActivated(() => { missions.value = listMockAdminMissions() })

function resetFilters() {
  search.value = ''
  status.value = ''
  source.value = ''
  tier.value = ''
}

function confirmAction() {
  if (!pending.value) return
  const { id, action } = pending.value
  pending.value = null
  notice.value = ''
  error.value = ''
  try {
    const result = action === 'validate' ? validateMockMission(id, getMockSession()) : publishMockMission(id, getMockSession())
    missions.value = listMockAdminMissions()
    notice.value = action === 'validate'
      ? `Mission « ${result.mission.title} » validée. Elle n’est pas publiée ni visible dans le catalogue.`
      : `Mission « ${result.mission.title} » publiée dans cette maquette (${visibilityLabels[result.mission.visibility]}). Aucun envoi externe.`
    if (!result.persisted) notice.value += ' Modification conservée uniquement pendant cette visite.'
  } catch (reason) {
    error.value = reason instanceof Error ? reason.message : 'Action impossible.'
    missions.value = listMockAdminMissions()
  }
}
</script>

<template>
  <section class="space-y-6 font-aspekta text-gray-900" aria-labelledby="missions-title">
    <header>
      <p class="text-xs font-bold uppercase tracking-wider text-indigo-700">Données fictives · mode démo</p>
      <h1 id="missions-title" class="mt-2 font-cabinet-grotesk text-3xl font-bold tracking-tight sm:text-4xl">Besoins reçus</h1>
      <p class="mt-2 text-sm text-gray-600">Suivi interne des missions fictives. Valider un besoin ne le publie pas.</p>
    </header>

    <div class="rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:p-5">
      <div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        <label class="block sm:col-span-2">
          <span class="mb-1 block text-sm font-semibold text-gray-700">Rechercher</span>
          <input v-model="search" type="search" placeholder="Titre, organisation, responsable…" class="w-full rounded-lg border-gray-300 text-sm focus:border-indigo-600 focus:ring-indigo-600" />
        </label>
        <label class="block">
          <span class="mb-1 block text-sm font-semibold text-gray-700">Statut</span>
          <select v-model="status" class="w-full rounded-lg border-gray-300 text-sm focus:border-indigo-600 focus:ring-indigo-600">
            <option value="">Tous</option>
            <option v-for="choice in statusChoices" :key="choice.value" :value="choice.value">{{ choice.label }}</option>
          </select>
        </label>
        <label class="block">
          <span class="mb-1 block text-sm font-semibold text-gray-700">Source du besoin</span>
          <select v-model="source" class="w-full rounded-lg border-gray-300 text-sm focus:border-indigo-600 focus:ring-indigo-600">
            <option value="">Toutes</option>
            <option v-for="choice in sourceChoices" :key="choice.value" :value="choice.value">{{ choice.label }}</option>
          </select>
        </label>
        <label class="block">
          <span class="mb-1 block text-sm font-semibold text-gray-700">Niveau</span>
          <select v-model="tier" class="w-full rounded-lg border-gray-300 text-sm focus:border-indigo-600 focus:ring-indigo-600">
            <option value="">Tous</option>
            <option v-for="choice in tierChoices" :key="choice.value" :value="choice.value">{{ choice.label }}</option>
          </select>
        </label>
      </div>
      <div class="mt-4 flex items-center justify-between border-t border-gray-100 pt-3 text-sm text-gray-600">
        <span>Filtres cumulables · tri par réception récente</span>
        <button v-if="hasFilters" type="button" class="min-h-10 rounded-lg px-2 font-semibold text-indigo-700 hover:bg-indigo-50 focus-visible:outline-2 focus-visible:outline-indigo-600" @click="resetFilters">Effacer les filtres</button>
      </div>
    </div>

    <p v-if="notice" role="status" aria-live="polite" class="rounded-lg border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-900">{{ notice }}</p>
    <p v-if="error" role="alert" class="rounded-lg border border-rose-200 bg-rose-50 p-4 text-sm text-rose-900">{{ error }}</p>

    <div class="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      <header class="flex flex-wrap items-baseline gap-2 px-5 py-4">
        <h2 class="font-cabinet-grotesk text-lg font-bold">Missions</h2>
        <span role="status" class="text-sm text-gray-600">{{ filteredMissions.length }} sur {{ missions.length }} exemples fictifs</span>
      </header>
      <div class="overflow-x-auto">
        <table class="w-full min-w-[1100px] text-left text-sm">
          <thead class="border-y border-gray-200 bg-gray-50 text-xs font-semibold uppercase tracking-wide text-gray-600">
            <tr>
              <th scope="col" class="px-5 py-3">Mission</th>
              <th scope="col" class="px-3 py-3">Client / source</th>
              <th scope="col" class="px-3 py-3">Responsable</th>
              <th scope="col" class="px-3 py-3">Reçue le</th>
              <th scope="col" class="px-3 py-3">Statut</th>
              <th scope="col" class="px-3 py-3">Niveau</th>
              <th scope="col" class="px-3 py-3">Visibilité prévue</th>
              <th scope="col" class="px-5 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100">
            <tr v-for="mission in filteredMissions" :key="mission.id" class="hover:bg-indigo-50/40">
              <td class="px-5 py-4"><router-link :to="`/admin/missions/${mission.id}`" class="font-semibold text-gray-900 hover:text-indigo-700 focus-visible:outline-2 focus-visible:outline-indigo-600">{{ mission.title }}</router-link><span class="mt-1 block text-xs text-gray-500">Exemple · {{ mission.id }}</span></td>
              <td class="px-3 py-4 text-gray-700">{{ mission.organization }}<span class="block text-xs text-gray-500">{{ sourceLabels[mission.source] }}</span></td>
              <td class="px-3 py-4 text-gray-700">{{ mission.owner }}</td>
              <td class="whitespace-nowrap px-3 py-4 text-gray-700">{{ dateLabel(mission.receivedAt) }}</td>
              <td class="px-3 py-4"><span class="inline-flex rounded-full px-2.5 py-1 text-xs font-semibold" :class="statusStyles[mission.status]">{{ statusLabels[mission.status] }}</span></td>
              <td class="px-3 py-4"><span class="inline-flex rounded-full px-2.5 py-1 text-xs font-semibold" :class="mission.tier === 'PREMIUM' ? 'bg-amber-100 text-amber-900' : 'bg-indigo-50 text-indigo-800'">{{ tierLabels[mission.tier] }}</span></td>
              <td class="px-3 py-4 text-gray-700">{{ visibilityLabels[mission.visibility] }}</td>
              <td class="px-5 py-4"><div class="flex items-center justify-end gap-3 whitespace-nowrap"><router-link :to="`/admin/missions/${mission.id}`" class="font-semibold text-indigo-700 hover:text-indigo-900 focus-visible:outline-2 focus-visible:outline-indigo-600" :aria-label="`Voir ${mission.title}`">Voir</router-link><button v-if="mission.status === 'PENDING_REVIEW'" type="button" class="rounded-lg border border-indigo-200 px-3 py-2 font-semibold text-indigo-700 hover:bg-indigo-50 focus-visible:outline-2 focus-visible:outline-indigo-600" :aria-label="`Valider ${mission.title}`" @click="pending = { id: mission.id, title: mission.title, action: 'validate' }">Valider</button><button v-if="mission.status === 'APPROVED'" type="button" class="rounded-lg bg-indigo-700 px-3 py-2 font-semibold text-white hover:bg-indigo-800 focus-visible:outline-2 focus-visible:outline-indigo-600" :aria-label="`Publier ${mission.title}`" @click="pending = { id: mission.id, title: mission.title, action: 'publish', visibility: mission.visibility }">Publier</button></div></td>
            </tr>
            <tr v-if="!filteredMissions.length"><td colspan="8" class="px-5 py-10 text-center text-gray-600">Aucun besoin fictif ne correspond à ces critères. Modifiez les filtres ou effacez-les.</td></tr>
          </tbody>
        </table>
      </div>
    </div>

    <div v-if="pending" class="fixed inset-0 z-50 flex items-center justify-center bg-gray-950/60 p-4" @keydown.esc="pending = null">
      <div role="dialog" aria-modal="true" aria-labelledby="mission-confirm-title" class="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
        <h2 id="mission-confirm-title" class="font-cabinet-grotesk text-xl font-bold">{{ pending.action === 'validate' ? 'Valider ce besoin ?' : 'Publier cette mission ?' }}</h2>
        <p class="mt-3 text-sm text-gray-700">« {{ pending.title }} » · {{ pending.action === 'validate' ? 'Le statut passera à « Validée, non publiée ». Elle ne sera pas accessible aux freelances.' : `La visibilité prévue est « ${visibilityLabels[pending.visibility]} ». La publication reste interne à la maquette : aucun email ou envoi externe.` }}</p>
        <div class="mt-6 flex flex-wrap justify-end gap-3"><button type="button" class="min-h-11 rounded-lg border border-gray-300 px-4 font-semibold text-gray-800 hover:bg-gray-50" @click="pending = null">Annuler</button><button type="button" class="min-h-11 rounded-lg bg-indigo-700 px-4 font-semibold text-white hover:bg-indigo-800" @click="confirmAction">{{ pending.action === 'validate' ? 'Confirmer la validation' : 'Confirmer la publication' }}</button></div>
      </div>
    </div>
  </section>
</template>
