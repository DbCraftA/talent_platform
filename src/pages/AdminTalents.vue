<script setup>
import { computed, onActivated, onMounted, ref, watch } from 'vue'
import { expertiseOptions } from '../mocks/talents.js'
import { listMockAdminTalents } from '../services/talentService.js'

const talents = ref(listMockAdminTalents())
onMounted(() => { talents.value = listMockAdminTalents() })
onActivated(() => { talents.value = listMockAdminTalents() })
const search = ref('')
const source = ref('')
const qualification = ref('')
const expertise = ref('')
const availability = ref('')
const sort = ref('name-asc')
const page = ref(1)
const pageSize = 5
const qualificationChoices = [
  { value: 'NOT_EVALUATED', label: 'Non évalué', style: 'bg-gray-100 text-gray-700' },
  { value: 'SELECTED_FOR_REVIEW', label: 'Sélectionné pour examen', style: 'bg-sky-100 text-sky-800' },
  { value: 'INTERVIEW_SCHEDULED', label: 'Entretien planifié', style: 'bg-amber-100 text-amber-900' },
  { value: 'QUALIFIED', label: 'Qualifié Wenovat', style: 'bg-emerald-100 text-emerald-800' },
  { value: 'NOT_QUALIFIED', label: 'Non qualifié', style: 'bg-rose-100 text-rose-800' },
]
const sourceChoices = [{ value: 'WENOVAT', label: 'Wenovat' }, { value: 'EXTERNAL', label: 'Externe' }]
const availabilityChoices = [
  { value: 'UNKNOWN', label: 'Non déclarée' },
  { value: 'IMMEDIATE', label: 'Immédiate' },
  { value: 'WITHIN_MONTH', label: 'Sous un mois' },
  { value: 'LATER', label: 'Plus tard' },
]
const expertiseLabels = Object.fromEntries(expertiseOptions.map(({ value, label }) => [value, label]))
const qualificationLabels = Object.fromEntries(qualificationChoices.map(({ value, label }) => [value, label]))
const qualificationStyles = Object.fromEntries(qualificationChoices.map(({ value, style }) => [value, style]))
const sourceLabels = Object.fromEntries(sourceChoices.map(({ value, label }) => [value, label]))
const availabilityLabels = Object.fromEntries(availabilityChoices.map(({ value, label }) => [value, label]))
const money = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 })
const hasFilters = computed(() => Boolean(search.value || source.value || qualification.value || expertise.value || availability.value))

const filteredTalents = computed(() => {
  const query = search.value.trim().toLocaleLowerCase('fr-FR')
  return talents.value.filter((talent) => {
    const searchable = [talent.firstName, talent.lastName, talent.architectTitle, talent.location, ...talent.expertise.map((item) => expertiseLabels[item])].join(' ').toLocaleLowerCase('fr-FR')
    return (!query || searchable.includes(query))
      && (!source.value || talent.source === source.value)
      && (!qualification.value || talent.qualificationStatus === qualification.value)
      && (!expertise.value || talent.expertise.includes(expertise.value))
      && (!availability.value || talent.availability === availability.value)
  }).sort((a, b) => {
    const byName = `${a.lastName} ${a.firstName}`.localeCompare(`${b.lastName} ${b.firstName}`, 'fr')
    if (sort.value === 'name-desc') return -byName || a.id.localeCompare(b.id)
    if (sort.value === 'rate-asc' || sort.value === 'rate-desc') {
      // Unspecified rates always follow specified rates.
      if (a.dailyRate == null || b.dailyRate == null) return (a.dailyRate == null) - (b.dailyRate == null) || byName
      return (sort.value === 'rate-asc' ? a.dailyRate - b.dailyRate : b.dailyRate - a.dailyRate) || byName
    }
    return byName || a.id.localeCompare(b.id)
  })
})
const pageCount = computed(() => Math.max(1, Math.ceil(filteredTalents.value.length / pageSize)))
const pagedTalents = computed(() => filteredTalents.value.slice((page.value - 1) * pageSize, page.value * pageSize))
const firstResult = computed(() => filteredTalents.value.length ? (page.value - 1) * pageSize + 1 : 0)
const lastResult = computed(() => Math.min(page.value * pageSize, filteredTalents.value.length))

watch([search, source, qualification, expertise, availability, sort], () => { page.value = 1 })
watch(pageCount, (count) => { if (page.value > count) page.value = count })

function resetFilters() {
  search.value = ''
  source.value = ''
  qualification.value = ''
  expertise.value = ''
  availability.value = ''
  page.value = 1
}
</script>

<template>
  <section class="space-y-6 font-aspekta text-gray-900" aria-labelledby="talents-title">
    <header class="flex flex-wrap items-end justify-between gap-5">
      <div>
        <p class="text-xs font-bold uppercase tracking-wider text-indigo-700">Données fictives — mode démo</p>
        <h1 id="talents-title" class="mt-2 font-cabinet-grotesk text-3xl font-bold tracking-tight sm:text-4xl">Liste des talents</h1>
        <p class="mt-2 text-sm text-gray-600">{{ talents.length }} profils fictifs, sans qualification réelle. Un talent externe sourcé n’est pas un membre inscrit.</p>
      </div>
      <router-link to="/admin/talents/nouveau" class="inline-flex min-h-11 items-center rounded-lg bg-indigo-700 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">+ Ajouter un talent</router-link>
    </header>

    <div class="rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:p-5">
      <div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-6">
        <label class="block sm:col-span-2 xl:col-span-2">
          <span class="mb-1 block text-sm font-semibold text-gray-700">Rechercher</span>
          <input v-model="search" type="search" placeholder="Nom, titre, expertise, ville…" class="w-full rounded-lg border-gray-300 text-sm focus:border-indigo-600 focus:ring-indigo-600" />
        </label>
        <label class="block">
          <span class="mb-1 block text-sm font-semibold text-gray-700">Origine</span>
          <select v-model="source" class="w-full rounded-lg border-gray-300 text-sm focus:border-indigo-600 focus:ring-indigo-600">
            <option value="">Toutes</option>
            <option v-for="choice in sourceChoices" :key="choice.value" :value="choice.value">{{ choice.label }}</option>
          </select>
        </label>
        <label class="block">
          <span class="mb-1 block text-sm font-semibold text-gray-700">Qualification</span>
          <select v-model="qualification" class="w-full rounded-lg border-gray-300 text-sm focus:border-indigo-600 focus:ring-indigo-600">
            <option value="">Toutes</option>
            <option v-for="choice in qualificationChoices" :key="choice.value" :value="choice.value">{{ choice.label }}</option>
          </select>
        </label>
        <label class="block">
          <span class="mb-1 block text-sm font-semibold text-gray-700">Expertise</span>
          <select v-model="expertise" class="w-full rounded-lg border-gray-300 text-sm focus:border-indigo-600 focus:ring-indigo-600">
            <option value="">Toutes</option>
            <option v-for="choice in expertiseOptions" :key="choice.value" :value="choice.value">{{ choice.label }}</option>
          </select>
        </label>
        <label class="block">
          <span class="mb-1 block text-sm font-semibold text-gray-700">Disponibilité</span>
          <select v-model="availability" class="w-full rounded-lg border-gray-300 text-sm focus:border-indigo-600 focus:ring-indigo-600">
            <option value="">Toutes</option>
            <option v-for="choice in availabilityChoices" :key="choice.value" :value="choice.value">{{ choice.label }}</option>
          </select>
        </label>
      </div>
      <div class="mt-4 flex flex-wrap items-end justify-between gap-4 border-t border-gray-100 pt-4">
        <button v-if="hasFilters" type="button" class="min-h-10 rounded-lg px-2 text-sm font-semibold text-indigo-700 hover:bg-indigo-50 focus-visible:outline-2 focus-visible:outline-indigo-600" @click="resetFilters">Effacer les filtres</button>
        <span v-else class="text-sm text-gray-500">Filtres cumulables</span>
        <label class="flex items-center gap-2 text-sm font-semibold text-gray-700">
          Trier par
          <select v-model="sort" class="rounded-lg border-gray-300 text-sm focus:border-indigo-600 focus:ring-indigo-600">
            <option value="name-asc">Nom A-Z</option>
            <option value="name-desc">Nom Z-A</option>
            <option value="rate-asc">TJM croissant</option>
            <option value="rate-desc">TJM décroissant</option>
          </select>
        </label>
      </div>
    </div>

    <div class="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      <header class="flex flex-wrap items-baseline gap-2 px-5 py-4">
        <h2 class="font-cabinet-grotesk text-lg font-bold">Architectes</h2>
        <span class="text-sm text-gray-600" role="status">{{ filteredTalents.length }} sur {{ talents.length }} profils fictifs</span>
      </header>
      <div class="overflow-x-auto">
        <table class="w-full min-w-[1060px] text-left text-sm">
          <thead class="border-y border-gray-200 bg-gray-50 text-xs font-semibold uppercase tracking-wide text-gray-600">
            <tr>
              <th scope="col" class="px-5 py-3">Architecte</th>
              <th scope="col" class="px-3 py-3">Expertises</th>
              <th scope="col" class="px-3 py-3">Origine</th>
              <th scope="col" class="px-3 py-3">Qualification</th>
              <th scope="col" class="px-3 py-3">Disponibilité</th>
              <th scope="col" class="px-3 py-3">Localisation</th>
              <th scope="col" class="px-3 py-3 text-right">TJM</th>
              <th scope="col" class="px-5 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100">
            <tr v-for="talent in pagedTalents" :key="talent.id" class="hover:bg-indigo-50/40">
              <td class="px-5 py-4">
                <router-link :to="`/admin/talents/${talent.id}`" class="font-semibold text-gray-900 hover:text-indigo-700 focus-visible:outline-2 focus-visible:outline-indigo-600">{{ talent.firstName }} {{ talent.lastName }}</router-link>
                <span class="mt-1 block text-xs text-gray-600">{{ talent.architectTitle }}<span v-if="talent.profileStatus"> · Profil sourcé (non membre){{ talent.contactStatus === 'CONTACTED' ? ' · Contacté' : '' }}</span></span>
              </td>
              <td class="px-3 py-4 text-gray-700">{{ talent.expertise.map((item) => expertiseLabels[item]).join(', ') }}</td>
              <td class="px-3 py-4"><span class="rounded-full px-2.5 py-1 text-xs font-semibold" :class="talent.source === 'EXTERNAL' ? 'bg-violet-100 text-violet-800' : 'bg-indigo-100 text-indigo-800'">{{ sourceLabels[talent.source] }}</span></td>
              <td class="px-3 py-4"><span class="inline-flex rounded-full px-2.5 py-1 text-xs font-semibold" :class="qualificationStyles[talent.qualificationStatus]">{{ qualificationLabels[talent.qualificationStatus] }}</span></td>
              <td class="px-3 py-4 text-gray-700">{{ availabilityLabels[talent.availability] }}</td>
              <td class="px-3 py-4 text-gray-700">{{ talent.location }}</td>
              <td class="px-3 py-4 text-right tabular-nums text-gray-700">{{ talent.dailyRate == null ? 'Non renseigné' : `${money.format(talent.dailyRate)} / jour` }}</td>
              <td class="px-5 py-4 text-right"><router-link :to="`/admin/talents/${talent.id}`" class="font-semibold text-indigo-700 hover:text-indigo-900 focus-visible:outline-2 focus-visible:outline-indigo-600" :aria-label="`Consulter ${talent.firstName} ${talent.lastName}`">Consulter</router-link></td>
            </tr>
            <tr v-if="!pagedTalents.length"><td colspan="8" class="px-5 py-10 text-center text-gray-600">Aucun exemple ne correspond à ces critères. Modifiez les filtres ou effacez-les.</td></tr>
          </tbody>
        </table>
      </div>
    </div>

    <nav class="flex flex-wrap items-center justify-between gap-4" aria-label="Pagination des talents">
      <p class="text-sm text-gray-600">{{ firstResult }}–{{ lastResult }} sur {{ filteredTalents.length }} résultats</p>
      <div class="flex flex-wrap items-center gap-1">
        <button type="button" class="min-h-10 rounded-lg border border-gray-200 bg-white px-3 text-sm font-medium text-indigo-700 hover:bg-indigo-50 disabled:cursor-not-allowed disabled:text-gray-400 disabled:hover:bg-white" :disabled="page === 1" @click="page--">Précédent</button>
        <button v-for="number in pageCount" :key="number" type="button" class="min-h-10 min-w-10 rounded-lg border px-2 text-sm font-semibold focus-visible:outline-2 focus-visible:outline-indigo-600" :class="page === number ? 'border-indigo-700 bg-indigo-700 text-white' : 'border-gray-200 bg-white text-indigo-700 hover:bg-indigo-50'" :aria-label="`Page ${number}`" :aria-current="page === number ? 'page' : undefined" @click="page = number">{{ number }}</button>
        <button type="button" class="min-h-10 rounded-lg border border-gray-200 bg-white px-3 text-sm font-medium text-indigo-700 hover:bg-indigo-50 disabled:cursor-not-allowed disabled:text-gray-400 disabled:hover:bg-white" :disabled="page === pageCount" @click="page++">Suivant</button>
      </div>
    </nav>
  </section>
</template>
