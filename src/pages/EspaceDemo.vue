<script setup>
import { onActivated, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { getMockSession } from '../services/authService.js'
import { getMockTalent } from '../services/talentService.js'
import { getAccessibleMissions } from '../services/missionService.js'
import { getMockEngagements } from '../services/engagementService.js'

const route = useRoute()
const session = getMockSession()
const talent = ref(null)
const missions = ref([])
const activity = ref({ invitations: [], applications: [] })
function refresh() {
  talent.value = getMockTalent(session)
  missions.value = getAccessibleMissions(talent.value)
  activity.value = getMockEngagements(talent.value)
}
onMounted(refresh)
onActivated(refresh)
watch(() => route.fullPath, refresh)
const qualificationLabels = {
  NOT_EVALUATED: 'Non évaluée',
  SELECTED_FOR_REVIEW: 'Sélectionné pour examen',
  INTERVIEW_SCHEDULED: 'Entretien planifié',
  QUALIFIED: 'Qualifié Wenovat',
  NOT_QUALIFIED: 'Non qualifié',
}
const availabilityLabels = { IMMEDIATE: 'Immédiate', WITHIN_MONTH: 'Sous un mois', LATER: 'Plus tard' }
</script>

<template>
  <div class="space-y-6 font-aspekta text-gray-900">
    <section class="rounded-2xl border border-indigo-100 bg-white px-5 py-8 shadow-sm sm:px-8 sm:py-10">
      <p class="text-xs font-bold uppercase tracking-wider text-indigo-700">Mon espace freelance</p>
      <h1 class="mt-3 font-cabinet-grotesk text-3xl font-bold tracking-tight sm:text-4xl">Bonjour{{ talent?.firstName ? ` ${talent.firstName}` : '' }}.</h1>
      <p class="mt-3 max-w-2xl text-gray-600">Votre profil, les missions accessibles et vos échanges, au même endroit.</p>
      <p v-if="route.query.onboarding === 'termine'" role="status" class="mt-5 rounded-lg bg-emerald-50 p-4 text-sm font-medium text-emerald-900">Profil de démonstration enregistré. La qualification Wenovat reste une décision administrateur distincte.</p>
      <div class="mt-7 flex flex-wrap gap-3">
        <router-link to="/espace/onboarding" class="inline-flex min-h-11 items-center rounded-lg bg-indigo-700 px-5 py-2 font-semibold text-white hover:bg-indigo-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">{{ talent?.onboardingStatus === 'COMPLETED' ? 'Modifier mon profil' : 'Compléter mon profil' }}</router-link>
        <router-link to="/espace/missions" class="inline-flex min-h-11 items-center rounded-lg border border-indigo-300 bg-white px-5 py-2 font-semibold text-indigo-800 hover:bg-indigo-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Voir les missions</router-link>
        <router-link v-if="activity.invitations.some(({ status }) => status === 'PENDING')" to="/espace/candidatures" class="inline-flex min-h-11 items-center rounded-lg border border-gray-300 bg-white px-5 py-2 font-semibold text-gray-800 hover:bg-gray-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Répondre aux invitations</router-link>
      </div>
    </section>

    <div class="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      <section class="rounded-2xl border border-indigo-100 bg-white p-6 shadow-sm" aria-labelledby="profile-state">
        <h2 id="profile-state" class="font-cabinet-grotesk text-lg font-bold">Mon profil</h2>
        <p class="mt-5 text-2xl font-bold" :class="talent?.onboardingStatus === 'COMPLETED' ? 'text-emerald-800' : 'text-amber-800'">{{ talent?.onboardingStatus === 'COMPLETED' ? 'Complet' : 'À compléter' }}</p>
        <p class="mt-3 text-sm text-gray-600">{{ talent?.onboardingStatus === 'COMPLETED' ? 'Vos informations de démonstration sont renseignées.' : 'Renseignez vos expériences et vos préférences à votre rythme.' }}</p>
      </section>
      <section class="rounded-2xl border border-indigo-100 bg-white p-6 shadow-sm" aria-labelledby="qualification-state">
        <h2 id="qualification-state" class="font-cabinet-grotesk text-lg font-bold">Qualification Wenovat</h2>
        <p class="mt-5 text-2xl font-bold text-indigo-800">{{ qualificationLabels[talent?.qualificationStatus] || 'Non évaluée' }}</p>
        <p class="mt-3 text-sm text-gray-600">La qualification est décidée uniquement par un administrateur ; elle ne dépend pas de la complétion du profil.</p>
      </section>
      <section class="rounded-2xl border border-indigo-100 bg-white p-6 shadow-sm" aria-labelledby="availability-state">
        <h2 id="availability-state" class="font-cabinet-grotesk text-lg font-bold">Disponibilité</h2>
        <p class="mt-5 text-2xl font-bold text-gray-900">{{ availabilityLabels[talent?.availability] || 'À renseigner' }}</p>
        <p class="mt-3 text-sm text-gray-600">Cette information est modifiable dans votre parcours de profil.</p>
      </section>
    </div>

    <div class="grid gap-5 md:grid-cols-3">
      <section class="flex flex-col rounded-2xl border border-indigo-100 bg-white p-6 shadow-sm" aria-labelledby="missions-count">
        <h2 id="missions-count" class="font-cabinet-grotesk text-lg font-bold">Missions accessibles</h2>
        <p class="mt-4 font-cabinet-grotesk text-4xl font-bold text-indigo-800">{{ missions.length }}</p>
        <p class="mt-2 flex-1 text-sm text-gray-600">Offres de démonstration consultables avec votre statut actuel.</p>
        <router-link to="/espace/missions" class="mt-5 self-start font-semibold text-indigo-700 underline underline-offset-4 hover:text-indigo-900">Parcourir les missions</router-link>
      </section>
      <section class="flex flex-col rounded-2xl border border-indigo-100 bg-white p-6 shadow-sm" aria-labelledby="invitations-count">
        <h2 id="invitations-count" class="font-cabinet-grotesk text-lg font-bold">Invitations à traiter</h2>
        <p class="mt-4 font-cabinet-grotesk text-4xl font-bold text-indigo-800">{{ activity.invitations.filter(({ status }) => status === 'PENDING').length }}</p>
        <p class="mt-2 flex-1 text-sm text-gray-600">{{ activity.invitations.some(({ status }) => status === 'PENDING') ? 'Une réponse de démonstration peut être enregistrée localement.' : 'Aucune invitation en attente.' }}</p>
        <router-link to="/espace/candidatures" class="mt-5 self-start font-semibold text-indigo-700 underline underline-offset-4 hover:text-indigo-900">Voir mes invitations</router-link>
      </section>
      <section class="flex flex-col rounded-2xl border border-indigo-100 bg-white p-6 shadow-sm" aria-labelledby="applications-count">
        <h2 id="applications-count" class="font-cabinet-grotesk text-lg font-bold">Mes candidatures</h2>
        <p class="mt-4 font-cabinet-grotesk text-4xl font-bold text-indigo-800">{{ activity.applications.length }}</p>
        <p class="mt-2 flex-1 text-sm text-gray-600">{{ activity.applications.length ? 'Suivez vos démarches simulées.' : 'Aucune candidature à afficher.' }}</p>
        <router-link to="/espace/candidatures" class="mt-5 self-start font-semibold text-indigo-700 underline underline-offset-4 hover:text-indigo-900">Voir mes candidatures</router-link>
      </section>
    </div>
  </div>
</template>
