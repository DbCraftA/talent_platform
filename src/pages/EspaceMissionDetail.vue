<script setup>
import { onActivated, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { getMockSession } from '../services/authService.js'
import { getMockTalent } from '../services/talentService.js'
import { applyToMockMission, getAccessibleMission } from '../services/missionService.js'
import { getMockEngagements } from '../services/engagementService.js'
import { expertiseOptions } from '../mocks/talents.js'

const route = useRoute()
const mission = ref(null)
const applied = ref(false)
const notice = ref('')
const error = ref('')
const expertiseLabels = Object.fromEntries(expertiseOptions.map(({ value, label }) => [value, label]))
const remoteLabels = { ON_SITE: 'Sur site', HYBRID: 'Hybride', REMOTE: 'À distance' }
const availabilityLabels = { IMMEDIATE: 'Immédiate', WITHIN_MONTH: 'Sous un mois', LATER: 'Plus tard' }
const dateLabel = (value) => new Intl.DateTimeFormat('fr-FR', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(new Date(`${value}T00:00:00Z`))

function refresh() {
  notice.value = ''
  error.value = ''
  const session = getMockSession()
  const talent = session?.role === 'FREELANCE' ? getMockTalent(session) : null
  mission.value = talent ? getAccessibleMission(route.params.id, talent) : null
  applied.value = mission.value ? getMockEngagements(talent).applications.some(({ mission: item }) => item.id === mission.value.id) : false
}

function apply() {
  notice.value = ''
  error.value = ''
  const session = getMockSession()
  const talent = session?.role === 'FREELANCE' ? getMockTalent(session) : null
  try {
    applyToMockMission(route.params.id, talent)
    refresh()
    notice.value = 'Candidature reçue dans cette démonstration. Aucun CV n’a été envoyé.'
  } catch (reason) {
    refresh()
    error.value = reason instanceof Error ? reason.message : 'La candidature n’a pas pu être enregistrée.'
  }
}

watch(() => route.params.id, refresh, { immediate: true })
onActivated(refresh)
</script>

<template>
  <div class="font-aspekta text-gray-900">
    <router-link to="/espace/missions" class="inline-flex min-h-10 items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 text-sm font-semibold text-gray-800 shadow-sm hover:border-indigo-200 hover:text-indigo-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"><span aria-hidden="true">←</span> Retour aux missions</router-link>
    <div v-if="mission" class="mt-7 grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_18rem] lg:gap-10 xl:gap-14">
      <article class="min-w-0 max-w-3xl">
        <p class="text-sm italic text-gray-500">Publication fictive le {{ dateLabel(mission.publishedAt) }}</p>
        <p class="mt-4 text-xs font-bold uppercase tracking-wider text-indigo-700">Mission fictive · {{ expertiseLabels[mission.expertise] }}</p>
        <h1 class="mt-2 font-cabinet-grotesk text-3xl font-bold leading-tight tracking-tight sm:text-4xl">{{ mission.title }}</h1>
        <div class="mt-4 flex flex-wrap gap-2 text-xs font-semibold">
          <span class="rounded-full px-3 py-1" :class="mission.access === 'PREMIUM' ? 'bg-amber-100 text-amber-900' : 'bg-indigo-50 text-indigo-800'">{{ mission.access === 'PREMIUM' ? 'Premium' : 'Standard' }}</span>
          <span v-if="mission.visibility === 'INVITE_ONLY'" class="rounded-full bg-gray-100 px-3 py-1 text-gray-700">Sur invitation</span>
          <span class="rounded-full bg-gray-100 px-3 py-1 text-gray-700">{{ remoteLabels[mission.remote] }}</span>
        </div>
        <p class="mt-7 text-base leading-7 text-gray-700">{{ mission.summary }}</p>

        <section class="mt-12" aria-labelledby="mission-context">
          <h2 id="mission-context" class="font-cabinet-grotesk text-xl font-bold">Contexte anonymisé</h2>
          <p class="mt-4 leading-7 text-gray-700">{{ mission.context }}</p>
        </section>
        <section class="mt-12" aria-labelledby="mission-objectives">
          <h2 id="mission-objectives" class="font-cabinet-grotesk text-xl font-bold">Objectifs de la mission</h2>
          <ul class="mt-4 list-disc space-y-3 pl-5 leading-7 text-gray-700 marker:text-indigo-600">
            <li v-for="objective in mission.objectives" :key="objective">{{ objective }}</li>
          </ul>
        </section>
        <section class="mt-12" aria-labelledby="mission-skills">
          <h2 id="mission-skills" class="font-cabinet-grotesk text-xl font-bold">Compétences attendues</h2>
          <ul class="mt-4 list-disc space-y-3 pl-5 leading-7 text-gray-700 marker:text-indigo-600">
            <li v-for="skill in mission.expectedSkills" :key="skill">{{ skill }}</li>
          </ul>
          <div class="mt-6 flex flex-wrap gap-2" aria-label="Technologies associées"><span v-for="technology in mission.technologies" :key="technology" class="rounded-full border border-indigo-100 bg-white px-3 py-1 text-sm font-medium text-indigo-800">{{ technology }}</span></div>
        </section>
        <div class="mt-12">
          <p v-if="applied" class="font-semibold text-emerald-900">Candidature reçue</p>
          <button v-else type="button" class="inline-flex min-h-11 items-center justify-center rounded-lg bg-indigo-700 px-5 py-2 font-semibold text-white hover:bg-indigo-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" @click="apply">Candidater à cette mission →</button>
          <p class="mt-3 text-sm text-gray-600">Candidature simulée : aucun CV n'est envoyé et votre profil n'est pas automatiquement présenté à l'ESN.</p>
        </div>
        <p class="mt-12 text-sm italic text-gray-600">Cette fiche présente un exemple fictif, pas une mission réelle.</p>
      </article>

      <aside class="rounded-xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6 lg:sticky lg:top-20" aria-label="Informations et candidature">
        <h2 class="font-cabinet-grotesk text-xl font-bold">En bref</h2>
        <dl class="mt-5 divide-y divide-gray-100 text-sm">
          <div class="py-3 first:pt-0"><dt class="text-gray-600">Localisation</dt><dd class="mt-1 font-semibold">{{ mission.location }}</dd></div>
          <div class="py-3"><dt class="text-gray-600">Télétravail</dt><dd class="mt-1 font-semibold">{{ remoteLabels[mission.remote] }}</dd></div>
          <div class="py-3"><dt class="text-gray-600">Disponibilité souhaitée</dt><dd class="mt-1 font-semibold">{{ availabilityLabels[mission.availability] }}</dd></div>
          <div class="py-3"><dt class="text-gray-600">Démarrage envisagé</dt><dd class="mt-1 font-semibold">{{ dateLabel(mission.startDate) }}</dd></div>
          <div class="py-3"><dt class="text-gray-600">Durée indicative</dt><dd class="mt-1 font-semibold">{{ mission.duration }}</dd></div>
          <div class="py-3"><dt class="text-gray-600">TJM indicatif</dt><dd class="mt-1 font-semibold">{{ mission.dailyRate != null ? `${mission.dailyRate} € / jour` : 'Non communiqué' }}</dd></div>
        </dl>
        <p v-if="error" role="alert" class="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-800">{{ error }}</p>
        <p v-if="notice" role="status" aria-live="polite" class="mt-4 rounded-lg bg-emerald-50 p-3 text-sm font-medium text-emerald-900">{{ notice }}</p>
        <p v-if="applied" role="status" class="mt-5 rounded-lg bg-emerald-50 p-3 font-semibold text-emerald-900">Candidature reçue</p>
        <button v-else type="button" class="mt-5 w-full rounded-lg bg-indigo-700 px-5 py-3 font-semibold text-white hover:bg-indigo-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" @click="apply">Je suis intéressé</button>
        <p class="mt-4 text-sm leading-relaxed text-gray-600">Votre intérêt est enregistré uniquement dans ce prototype. Cela ne constitue pas une présentation automatique à l’ESN ; aucun CV n’est envoyé à une entreprise.</p>
        <router-link to="/espace/candidatures" class="mt-4 inline-block text-sm font-semibold text-indigo-700 underline underline-offset-4 hover:text-indigo-900">Suivre mes candidatures</router-link>
      </aside>
    </div>
    <section v-else class="mt-6 rounded-2xl border border-indigo-100 bg-white p-6 shadow-sm sm:p-10">
      <h1 class="font-cabinet-grotesk text-3xl font-bold">Mission indisponible</h1>
      <p class="mt-4 text-gray-600">Cette fiche n'est pas accessible.</p>
      <p v-if="error" role="alert" class="mt-4 text-sm text-red-800">{{ error }}</p>
    </section>
  </div>
</template>
