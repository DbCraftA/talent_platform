<script setup>
import { computed, onActivated, onMounted, onUnmounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { getMockSession } from '../services/authService.js'
import { getMockTalent } from '../services/talentService.js'
import { getAccessibleMissions } from '../services/missionService.js'
import { expertiseOptions } from '../mocks/talents.js'

const missions = ref([])
const route = useRoute()
const search = ref('')
const expertise = ref('')
const remote = ref('')
const availability = ref('')
const sort = ref('recent')
const sortOpen = ref(false)
const sortMenu = ref(null)
const sortChoices = [
  { value: 'recent', label: 'Plus récentes' },
  { value: 'start', label: 'Démarrage proche' },
  { value: 'title', label: 'Titre A-Z' },
]
const sortLabel = computed(() => sortChoices.find(({ value }) => value === sort.value)?.label)
const expertiseLabels = Object.fromEntries(expertiseOptions.map(({ value, label }) => [value, label]))
const remoteLabels = { ON_SITE: 'Sur site', HYBRID: 'Hybride', REMOTE: 'À distance' }
const availabilityLabels = { IMMEDIATE: 'Immédiat', WITHIN_MONTH: 'Sous un mois', LATER: 'Plus tard' }
const dateLabel = (value) => new Intl.DateTimeFormat('fr-FR', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(new Date(`${value}T00:00:00Z`))

function refresh() {
  missions.value = getAccessibleMissions(getMockTalent(getMockSession()))
}
function closeSortOnOutsideClick(event) {
  if (!sortMenu.value?.contains(event.target)) sortOpen.value = false
}
onMounted(() => {
  refresh()
  document.addEventListener('pointerdown', closeSortOnOutsideClick)
})
onUnmounted(() => document.removeEventListener('pointerdown', closeSortOnOutsideClick))
onActivated(refresh)
watch(() => route.fullPath, () => {
  sortOpen.value = false
  if (route.path === '/espace/missions') refresh()
})

const expertiseChoices = computed(() => expertiseOptions.filter(({ value }) => missions.value.some((mission) => mission.expertise === value)))
const remoteChoices = computed(() => Object.entries(remoteLabels).filter(([value]) => missions.value.some((mission) => mission.remote === value)))
const availabilityChoices = computed(() => Object.entries(availabilityLabels).filter(([value]) => missions.value.some((mission) => mission.availability === value)))
const filteredMissions = computed(() => {
  const query = search.value.trim().toLocaleLowerCase('fr-FR')
  return missions.value.filter((mission) => {
    const searchable = [mission.title, expertiseLabels[mission.expertise], ...mission.technologies, mission.location].join(' ').toLocaleLowerCase('fr-FR')
    return (!query || searchable.includes(query))
      && (!expertise.value || mission.expertise === expertise.value)
      && (!remote.value || mission.remote === remote.value)
      && (!availability.value || mission.availability === availability.value)
  }).sort((a, b) => {
    if (sort.value === 'start') return a.startDate.localeCompare(b.startDate) || a.title.localeCompare(b.title, 'fr')
    if (sort.value === 'title') return a.title.localeCompare(b.title, 'fr')
    return b.publishedAt.localeCompare(a.publishedAt) || a.title.localeCompare(b.title, 'fr')
  })
})
const hasFilters = computed(() => Boolean(search.value || expertise.value || remote.value || availability.value))
watch(missions, () => {
  if (expertise.value && !expertiseChoices.value.some(({ value }) => value === expertise.value)) expertise.value = ''
  if (remote.value && !remoteChoices.value.some(([value]) => value === remote.value)) remote.value = ''
  if (availability.value && !availabilityChoices.value.some(([value]) => value === availability.value)) availability.value = ''
})

function resetFilters() {
  search.value = ''
  expertise.value = ''
  remote.value = ''
  availability.value = ''
  sort.value = 'recent'
}

function toggleFilter(group, value) {
  const filters = { expertise, remote, availability }
  filters[group].value = filters[group].value === value ? '' : value
}
</script>

<template>
  <div class="space-y-9 font-aspekta text-gray-900">
    <header class=" pb-1">
      <p class="text-xs font-bold uppercase tracking-wider text-indigo-700">Catalogue de démonstration</p>
      <h1 class="mt-2 font-cabinet-grotesk text-3xl font-bold tracking-tight sm:text-4xl">Explorer les missions</h1>
    </header>

    <div class="grid items-start gap-6 lg:grid-cols-[15rem_minmax(0,1fr)] xl:grid-cols-[17rem_minmax(0,1fr)]">
      <aside class="min-w-0" aria-label="Filtres des missions">
        <div class="mb-4 rounded-xl bg-indigo-50 px-5 py-5 text-sm text-indigo-950">
          <p class="font-semibold">Des missions adaptées à votre profil</p>
          <p class="mt-1 text-indigo-800">Seuls les exemples accessibles à votre compte apparaissent dans ce catalogue.</p>
        </div>
        <div class="rounded-xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6">
          <div class="flex items-center justify-between gap-2">
            <button v-if="hasFilters" type="button" class="text-sm font-semibold text-indigo-700 hover:text-indigo-900 focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" @click="resetFilters">Effacer</button>
          </div>
          <div class="mt-1 grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
            <fieldset>
              <legend class="font-semibold">Expertises</legend>
              <div class="mt-1 ">
                <label v-for="choice in expertiseChoices" :key="choice.value" class="flex min-h-9 cursor-pointer items-center gap-2 rounded-md text-sm text-gray-700 hover:text-indigo-800">
                  <input type="checkbox" class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600" :checked="expertise === choice.value" @change="toggleFilter('expertise', choice.value)" />
                  <span>{{ choice.label }}</span>
                </label>
              </div>
            </fieldset>
            <fieldset>
              <legend class="font-semibold">Télétravail</legend>
              <div class="mt-1 ">
                <label v-for="[value, label] in remoteChoices" :key="value" class="flex min-h-9 cursor-pointer items-center gap-2 rounded-md text-sm text-gray-700 hover:text-indigo-800">
                  <input type="checkbox" class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600" :checked="remote === value" @change="toggleFilter('remote', value)" />
                  <span>{{ label }}</span>
                </label>
              </div>
            </fieldset>
            <fieldset>
              <legend class="font-semibold">Démarrage</legend>
              <div class="mt-1">
                <label v-for="[value, label] in availabilityChoices" :key="value" class="flex min-h-9 cursor-pointer items-center gap-2.5 rounded-md text-sm text-gray-700 hover:text-indigo-800">
                  <input type="checkbox" class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600" :checked="availability === value" @change="toggleFilter('availability', value)" />
                  <span>{{ label }}</span>
                </label>
              </div>
            </fieldset>
          </div>
        </div>
      </aside>

      <section class="min-w-0" aria-label="Résultats des missions">
        <label for="mission-search" class="sr-only">Rechercher une mission</label>
        <div class="relative">
          <svg class="pointer-events-none absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="11" cy="11" r="7" /><path d="m16 16 5 5" /></svg>
          <input id="mission-search" v-model="search" type="search" placeholder="Rechercher un titre, une technologie, une ville…" class="w-full rounded-xl border-gray-200 bg-white py-3 pr-4 pl-12 shadow-sm focus:border-indigo-600 focus:ring-indigo-600" />
        </div>
        <div class="my-5 flex flex-wrap items-center justify-between gap-3 text-sm">
          <p role="status" class="italic text-gray-500">{{ filteredMissions.length }} {{ filteredMissions.length === 1 ? 'mission accessible' : 'missions accessibles' }}</p>
          <div ref="sortMenu" class="relative flex items-center gap-1.5" @keydown.esc="sortOpen = false">
            <span class="text-gray-600">Trier par</span>
            <button type="button" class="inline-flex items-center gap-1 font-semibold text-indigo-700 hover:text-indigo-900 focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" :aria-expanded="sortOpen" aria-controls="mission-sort-options" aria-haspopup="true" @click="sortOpen = !sortOpen">
              {{ sortLabel }}
              <svg class="h-4 w-4 text-gray-500" :class="sortOpen ? 'rotate-180' : ''" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="m3 6 5 5 5-5" /></svg>
            </button>
            <div v-if="sortOpen" id="mission-sort-options" class="absolute top-full right-0 z-20 mt-2 min-w-44 rounded-lg border border-gray-100 bg-white p-1.5 shadow-lg">
              <button v-for="choice in sortChoices" :key="choice.value" type="button" class="block w-full rounded-md px-3 py-2 text-left text-sm hover:bg-indigo-50 hover:text-indigo-800 focus-visible:outline-2 focus-visible:outline-indigo-600" :class="sort === choice.value ? 'font-semibold text-indigo-700' : 'text-gray-700'" :aria-current="sort === choice.value ? 'true' : undefined" @click="sort = choice.value; sortOpen = false">{{ choice.label }}</button>
            </div>
          </div>
        </div>

        <div v-if="filteredMissions.length" class="space-y-2.5">
          <article v-for="mission in filteredMissions" :key="mission.id" class="rounded-xl border border-gray-100 bg-white px-4 py-4 shadow-sm transition-colors hover:border-indigo-200 sm:px-5">
            <div class="flex min-w-0 items-start gap-3 sm:gap-4">
              <div class="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-indigo-100 font-cabinet-grotesk text-base font-bold text-indigo-700" aria-hidden="true">{{ expertiseLabels[mission.expertise]?.charAt(0) }}</div>
              <div class="min-w-0 flex-1">
                <div class="flex flex-wrap items-center justify-between gap-x-4 gap-y-1">
                  <h2 class="min-w-0 font-cabinet-grotesk text-lg font-bold leading-snug"><router-link :to="`/espace/missions/${mission.id}`" class="text-gray-900 hover:text-indigo-800 focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">{{ mission.title }}</router-link></h2>
                  <div class="flex shrink-0 items-center gap-2.5">
                    <span class="text-xs italic text-gray-500">Exemple</span>
                    <span class="rounded-full px-2.5 py-1 text-xs font-semibold" :class="mission.access === 'PREMIUM' ? 'bg-amber-100 text-amber-900' : 'bg-indigo-50 text-indigo-800'">{{ mission.access === 'PREMIUM' ? 'Premium' : 'Standard' }}</span>
                  </div>
                </div>
                <p class="mt-0.5 text-sm text-gray-600">{{ expertiseLabels[mission.expertise] }} · {{ mission.location }} · {{ remoteLabels[mission.remote] }}</p>
                <p class="mt-2 text-sm text-gray-600">{{ mission.summary }}</p>
                <div class="mt-2.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-gray-600">
                  <span v-for="technology in mission.technologies" :key="technology" class="rounded-md bg-gray-100 px-2 py-0.5 font-medium text-gray-700">{{ technology }}</span>
                </div>
                <p class="mt-2.5 text-xs text-gray-600">Démarrage {{ dateLabel(mission.startDate) }} <span aria-hidden="true">·</span> {{ mission.duration }} <span aria-hidden="true">·</span> TJM {{ mission.dailyRate != null ? `${mission.dailyRate} € / jour` : 'non communiqué' }}</p>
              </div>
            </div>
          </article>
        </div>
        <div v-else class="rounded-2xl border border-indigo-100 bg-white px-6 py-10 text-center shadow-sm">
          <h2 class="font-cabinet-grotesk text-xl font-bold">{{ missions.length ? 'Aucun résultat pour ces critères' : 'Aucune mission accessible pour le moment' }}</h2>
          <p class="mt-2 text-sm text-gray-600">{{ missions.length ? 'Modifiez votre recherche ou vos filtres pour explorer les autres exemples accessibles.' : 'Les exemples disponibles pour votre compte apparaîtront ici.' }}</p>
          <button v-if="missions.length && hasFilters" type="button" class="mt-5 rounded-lg bg-indigo-700 px-4 py-2 font-semibold text-white hover:bg-indigo-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" @click="resetFilters">Réinitialiser les filtres</button>
        </div>
      </section>
    </div>
  </div>
</template>
