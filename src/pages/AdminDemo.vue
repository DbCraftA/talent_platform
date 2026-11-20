<script setup>
import { onActivated, onMounted, ref } from 'vue'
import { listMockAdminTalents } from '../services/talentService.js'
import { listMockAdminMissions } from '../services/adminMissionService.js'
import { getMockAdminShortlist } from '../services/adminShortlistService.js'
import { listMockOrganizations } from '../services/businessService.js'

const counts = ref({
  wenovatQualified: 0, externalQualified: 0, missions: 0, pendingReview: 0,
  approved: 0, shortlistReady: 0, profilesSent: 0, agreementPending: 0,
  talentsToQualify: 0, consentToFollowUp: 0,
})

function refresh() {
  const talents = listMockAdminTalents()
  const missions = listMockAdminMissions()
  const organizations = listMockOrganizations()
  let shortlistReady = 0
  let consentToFollowUp = 0

  for (const mission of missions) {
    if (mission.status === 'CLOSED') continue
    const shortlist = getMockAdminShortlist(mission.id)
    if (!shortlist) continue
    if (shortlist.candidateIds.some((id) => shortlist.consent[id]?.status === 'CONFIRMED')) shortlistReady++
    if (shortlist.allCandidateIds.some((id) => !shortlist.candidateIds.includes(id) || shortlist.consent[id]?.status !== 'CONFIRMED')) consentToFollowUp++
  }

  counts.value = {
    wenovatQualified: talents.filter(({ source, qualificationStatus }) => source === 'WENOVAT' && qualificationStatus === 'QUALIFIED').length,
    externalQualified: talents.filter(({ source, qualificationStatus }) => source === 'EXTERNAL' && qualificationStatus === 'QUALIFIED').length,
    missions: missions.length,
    pendingReview: missions.filter(({ status }) => status === 'PENDING_REVIEW').length,
    approved: missions.filter(({ status }) => status === 'APPROVED').length,
    shortlistReady,
    profilesSent: 0,
    agreementPending: organizations.filter(({ collaborationStatus, agreement }) => collaborationStatus === 'ACTIVE' && ['NONE', 'EXPIRED'].includes(agreement.status)).length,
    talentsToQualify: talents.filter(({ qualificationStatus }) => ['NOT_EVALUATED', 'SELECTED_FOR_REVIEW'].includes(qualificationStatus)).length,
    consentToFollowUp,
  }
}

onMounted(refresh)
onActivated(refresh)
</script>

<template>
  <div class="space-y-8 font-aspekta text-gray-900">
    <header class="rounded-2xl border border-indigo-100 bg-white px-5 py-8 shadow-sm sm:px-8 sm:py-10">
      <p class="text-xs font-bold uppercase tracking-wider text-indigo-700">Données fictives · mode démo</p>
      <h1 class="mt-3 font-cabinet-grotesk text-3xl font-bold tracking-tight sm:text-4xl">Vue d'ensemble</h1>
      <p class="mt-3 max-w-3xl text-sm text-gray-600">Synthèse des exemples et des modifications locales de ce navigateur. Aucun accès administrateur réel, accord vérifié ni profil transmis à une entreprise.</p>
    </header>

    <section aria-labelledby="overview-title">
      <h2 id="overview-title" class="font-cabinet-grotesk text-2xl font-bold">En un coup d'œil</h2>
      <div class="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <article class="flex flex-col rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <h3 class="text-sm font-semibold text-gray-700">Talents Wenovat qualifiés</h3>
          <p class="mt-3 font-cabinet-grotesk text-4xl font-bold tabular-nums text-indigo-800">{{ counts.wenovatQualified }}</p>
          <p class="mt-2 flex-1 text-sm text-gray-600">Profils du répertoire Wenovat qualifiés dans la maquette.</p>
          <router-link to="/admin/talents" class="mt-4 self-start font-semibold text-indigo-700 underline underline-offset-4 hover:text-indigo-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Voir les talents</router-link>
        </article>
        <article class="flex flex-col rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <h3 class="text-sm font-semibold text-gray-700">Talents externes qualifiés</h3>
          <p class="mt-3 font-cabinet-grotesk text-4xl font-bold tabular-nums text-indigo-800">{{ counts.externalQualified }}</p>
          <p class="mt-2 flex-1 text-sm text-gray-600">Profils sourcés, distincts des membres Wenovat.</p>
          <router-link to="/admin/talents" class="mt-4 self-start font-semibold text-indigo-700 underline underline-offset-4 hover:text-indigo-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Voir les talents</router-link>
        </article>
        <article class="flex flex-col rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <h3 class="text-sm font-semibold text-gray-700">Missions au total</h3>
          <p class="mt-3 font-cabinet-grotesk text-4xl font-bold tabular-nums text-indigo-800">{{ counts.missions }}</p>
          <p class="mt-2 flex-1 text-sm text-gray-600">Tous les statuts, y compris les missions clôturées.</p>
          <router-link to="/admin/missions" class="mt-4 self-start font-semibold text-indigo-700 underline underline-offset-4 hover:text-indigo-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Voir les missions</router-link>
        </article>
        <article class="flex flex-col rounded-2xl border border-emerald-200 bg-emerald-50 p-5 shadow-sm">
          <h3 class="text-sm font-semibold text-emerald-950">Missions avec shortlist préparée</h3>
          <p class="mt-3 font-cabinet-grotesk text-4xl font-bold tabular-nums text-emerald-900">{{ counts.shortlistReady }}</p>
          <p class="mt-2 flex-1 text-sm text-emerald-950">Au moins un profil éligible avec accord confirmé ; préparation, non envoyée.</p>
          <router-link to="/admin/missions" class="mt-4 self-start font-semibold text-emerald-900 underline underline-offset-4 hover:text-emerald-950 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-800">Voir les missions</router-link>
        </article>
        <article class="flex flex-col rounded-2xl border border-gray-200 bg-gray-50 p-5 shadow-sm">
          <h3 class="text-sm font-semibold text-gray-700">Missions avec profils envoyés</h3>
          <p class="mt-3 font-cabinet-grotesk text-4xl font-bold tabular-nums text-gray-700">{{ counts.profilesSent }}</p>
          <p class="mt-2 flex-1 text-sm text-gray-600">Envoi désactivé dans la maquette. Aucune transmission réelle.</p>
        </article>
        <article class="flex flex-col rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <h3 class="text-sm font-semibold text-gray-700">Entreprises en attente d'accord</h3>
          <p class="mt-3 font-cabinet-grotesk text-4xl font-bold tabular-nums text-indigo-800">{{ counts.agreementPending }}</p>
          <p class="mt-2 flex-1 text-sm text-gray-600">En collaboration, sans accord actif déclaré ; les accords ne sont pas vérifiés.</p>
          <router-link to="/admin/entreprises" class="mt-4 self-start font-semibold text-indigo-700 underline underline-offset-4 hover:text-indigo-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Voir les entreprises</router-link>
        </article>
      </div>
    </section>

    <section aria-labelledby="priorities-title">
      <h2 id="priorities-title" class="font-cabinet-grotesk text-2xl font-bold">À traiter</h2>
      <p class="mt-2 text-sm text-gray-600">Priorités calculées sur les données fictives. Les liens ouvrent les listes sans appliquer de filtre.</p>
      <div class="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <article class="flex flex-col rounded-2xl border border-amber-200 bg-amber-50 p-5 shadow-sm">
          <h3 class="text-sm font-semibold text-amber-950">Missions à valider</h3>
          <p class="mt-3 font-cabinet-grotesk text-4xl font-bold tabular-nums text-amber-900">{{ counts.pendingReview }}</p>
          <p class="mt-2 flex-1 text-sm text-amber-950">Besoins reçus en attente de validation.</p>
          <router-link to="/admin/missions" class="mt-4 self-start font-semibold text-amber-900 underline underline-offset-4 hover:text-amber-950 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-800">Examiner les missions</router-link>
        </article>
        <article class="flex flex-col rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <h3 class="text-sm font-semibold text-gray-700">Missions validées à publier</h3>
          <p class="mt-3 font-cabinet-grotesk text-4xl font-bold tabular-nums text-indigo-800">{{ counts.approved }}</p>
          <p class="mt-2 flex-1 text-sm text-gray-600">Validées, mais pas encore publiées.</p>
          <router-link to="/admin/missions" class="mt-4 self-start font-semibold text-indigo-700 underline underline-offset-4 hover:text-indigo-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Voir les missions</router-link>
        </article>
        <article class="flex flex-col rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <h3 class="text-sm font-semibold text-gray-700">Talents à qualifier</h3>
          <p class="mt-3 font-cabinet-grotesk text-4xl font-bold tabular-nums text-indigo-800">{{ counts.talentsToQualify }}</p>
          <p class="mt-2 flex-1 text-sm text-gray-600">Non évalués ou sélectionnés pour examen ; entretiens planifiés exclus.</p>
          <router-link to="/admin/talents" class="mt-4 self-start font-semibold text-indigo-700 underline underline-offset-4 hover:text-indigo-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Examiner les talents</router-link>
        </article>
        <article class="flex flex-col rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <h3 class="text-sm font-semibold text-gray-700">Missions avec accord candidat à confirmer</h3>
          <p class="mt-3 font-cabinet-grotesk text-4xl font-bold tabular-nums text-indigo-800">{{ counts.consentToFollowUp }}</p>
          <p class="mt-2 flex-1 text-sm text-gray-600">Au moins un profil sélectionné sans accord confirmé, indisponible ou devenu inéligible.</p>
          <router-link to="/admin/missions" class="mt-4 self-start font-semibold text-indigo-700 underline underline-offset-4 hover:text-indigo-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Suivre les missions</router-link>
        </article>
      </div>
    </section>
  </div>
</template>
