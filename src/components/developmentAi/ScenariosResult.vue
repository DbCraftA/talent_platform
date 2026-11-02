<template>
  <section class="min-w-0 space-y-5 break-words" aria-labelledby="dev-ai-scenarios-title">
    <header>
      <h3 id="dev-ai-scenarios-title" class="font-cabinet-grotesk text-xl font-bold text-gray-900">Scénarios d’adoption proposés</h3>
      <p class="mt-2 text-sm text-gray-500">Découvrez les actions, les livrables et les différences entre les scénarios transmis pour votre projet.</p>
    </header>

    <template v-if="scenarios.length">
      <div class="space-y-3">
        <article v-for="(scenario, index) in scenarios" :key="index" class="min-w-0 rounded-2xl border bg-white p-5 shadow-sm" :class="isRecommended(scenario) ? 'border-indigo-300 ring-1 ring-indigo-100' : 'border-gray-100'">
          <div class="flex flex-wrap items-start justify-between gap-3">
            <div class="flex min-w-0 items-start gap-3">
              <span class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-lg font-bold" :class="isRecommended(scenario) ? 'bg-indigo-100 text-indigo-700' : 'bg-gray-100 text-gray-700'" aria-hidden="true">{{ index + 1 }}</span>
              <div class="min-w-0">
                <h4 class="font-cabinet-grotesk text-xl font-bold text-gray-900">{{ scenario.name }}</h4>
                <span v-if="scenario.recommendation_status" class="mt-1 inline-block rounded-full bg-indigo-50 px-2 py-0.5 text-xs font-semibold text-indigo-700">{{ scenario.recommendation_status }}</span>
              </div>
            </div>
            <span v-if="scenario.duration != null && scenario.duration !== ''" class="rounded-lg bg-indigo-50 px-3 py-1.5 text-xs font-semibold text-indigo-700">{{ scenario.duration }}</span>
          </div>

          <p v-if="scenario.description || scenario.details?.description" class="mt-4 text-sm leading-relaxed text-gray-600">{{ scenario.description || scenario.details.description }}</p>
          <div class="mt-5 grid gap-5 sm:grid-cols-2">
            <div>
              <h5 class="text-sm font-bold text-gray-900">Plan d’actions</h5>
              <ul v-if="scenario.actions?.length" class="mt-3 space-y-2 text-sm text-gray-600">
                <li v-for="(action, actionIndex) in scenario.actions" :key="actionIndex" class="flex gap-2"><span class="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-indigo-500 text-xs font-bold text-white" aria-hidden="true">✓</span><span>{{ action }}</span></li>
              </ul>
              <p v-else class="mt-2 text-sm text-gray-500">{{ scenario.actions ? 'Aucune action transmise.' : 'Non communiqué' }}</p>
            </div>
            <div class="border-t border-gray-100 pt-4 sm:border-l sm:border-t-0 sm:pl-5 sm:pt-0">
              <h5 class="text-sm font-bold text-gray-900">Livrables clés</h5>
              <ul v-if="scenario.deliverables?.length" class="mt-3 space-y-2 text-sm text-gray-600">
                <li v-for="(deliverable, deliverableIndex) in scenario.deliverables" :key="deliverableIndex" class="flex gap-2"><span class="shrink-0 font-bold text-indigo-500" aria-hidden="true">▤</span><span>{{ deliverable }}</span></li>
              </ul>
              <p v-else class="mt-2 text-sm text-gray-500">{{ scenario.deliverables ? 'Aucun livrable transmis.' : 'Non communiqué' }}</p>
            </div>
          </div>
          <div v-if="scenario.details?.reason || scenario.details?.steps?.length || scenario.details?.risks?.length" class="mt-5 space-y-3 border-t border-gray-100 pt-4 text-sm text-gray-600">
            <p v-if="scenario.details.reason"><span class="font-semibold text-gray-900">Pourquoi ce scénario :</span> {{ scenario.details.reason }}</p>
            <div v-if="scenario.details.steps?.length"><h5 class="font-semibold text-gray-900">Étapes complémentaires</h5><ol class="mt-2 list-decimal space-y-1 pl-5"><li v-for="(step, stepIndex) in scenario.details.steps" :key="stepIndex">{{ step }}</li></ol></div>
            <div v-if="scenario.details.risks?.length"><h5 class="font-semibold text-gray-900">Points de vigilance</h5><ul class="mt-2 list-disc space-y-1 pl-5"><li v-for="(risk, riskIndex) in scenario.details.risks" :key="riskIndex">{{ risk }}</li></ul></div>
          </div>
        </article>
      </div>

      <section class="min-w-0 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm" aria-labelledby="dev-ai-scenarios-comparison-title">
        <div class="px-5 pt-5">
          <h3 id="dev-ai-scenarios-comparison-title" class="font-cabinet-grotesk text-xl font-bold text-gray-900">Comparatif des scénarios</h3>
          <p class="mt-1 text-sm text-gray-500">Vue d’ensemble pour comparer les scénarios transmis. Faites défiler le tableau horizontalement pour voir toutes les colonnes.</p>
        </div>
        <div class="mt-5 w-full max-w-full overflow-x-auto" tabindex="0" role="region" aria-label="Tableau comparatif des scénarios">
          <table class="w-full min-w-[720px] border-collapse text-left text-sm">
            <thead class="bg-indigo-50 text-gray-900">
              <tr><th scope="col" class="sticky left-0 z-10 min-w-[145px] bg-indigo-50 px-4 py-3 font-semibold">Critère</th><th v-for="(scenario, index) in scenarios" :key="index" scope="col" class="min-w-[190px] px-4 py-3 font-semibold">{{ scenario.name }}</th></tr>
            </thead>
            <tbody class="divide-y divide-gray-100">
              <tr v-for="row in comparisonRows" :key="row.key">
                <th scope="row" class="sticky left-0 z-10 bg-white px-4 py-3 font-semibold text-gray-900">{{ row.label }}</th>
                <td v-for="(scenario, index) in scenarios" :key="index" class="px-4 py-3 align-top text-gray-600">{{ comparisonValue(scenario, row.key) }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </template>
    <p v-else class="rounded-2xl border border-gray-100 bg-white p-5 text-sm text-gray-500">Aucun scénario transmis.</p>

    <section class="rounded-2xl bg-zinc-900 p-5 text-white" aria-labelledby="dev-ai-scenarios-advisory-title">
      <h3 id="dev-ai-scenarios-advisory-title" class="font-cabinet-grotesk text-2xl font-bold">Besoin d’aide pour décider ?</h3>
      <p class="mt-3 text-sm text-zinc-300">Ce pré-assessment propose des pistes d’adoption du développement assisté par IA. Le bon scénario dépend encore de vos équipes, de vos pratiques et de vos contraintes de sécurité.</p>
      <p class="mt-3 text-sm text-zinc-300">Wenovat peut vous aider à comparer ces pistes et à définir une démarche adaptée à votre projet.</p>
      <div class="mt-4 text-sm font-bold text-zinc-100">Nous pouvons notamment vous aider à :</div>
      <ul class="mt-3 space-y-2 text-sm text-zinc-300">
        <li class="flex gap-2"><span class="text-indigo-300" aria-hidden="true">-</span><span>prioriser les cas d’usage à forte valeur pour vos équipes</span></li>
        <li class="flex gap-2"><span class="text-indigo-300" aria-hidden="true">-</span><span>choisir un framework et cadrer un projet pilote</span></li>
        <li class="flex gap-2"><span class="text-indigo-300" aria-hidden="true">-</span><span>mesurer les gains en qualité et en temps de développement</span></li>
        <li class="flex gap-2"><span class="text-indigo-300" aria-hidden="true">-</span><span>définir les standards, les tests et la gouvernance avant un déploiement</span></li>
      </ul>
      <p class="mt-4 text-xs text-zinc-400">Scénario préconisé : {{ recommendedScenario?.name || 'à confirmer' }}</p>
      <router-link class="btn-sm mt-5 inline-flex bg-indigo-500 text-white hover:bg-indigo-600" to="/nous-contacter" @click="trackEvent('dev_ai_consulting_cta_clicked', { simulator_id: 'development_ai', cta_location: 'results_advisory', destination: 'contact' })">Demander l’avis de Wenovat</router-link>
    </section>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { trackEvent } from '../../lib/analytics.js'

const props = defineProps({ scenarios: { type: Array, required: true } })

const comparisonRows = [
  { key: 'duration', label: 'Durée estimée' },
  { key: 'scope', label: 'Périmètre' },
  { key: 'objective', label: 'Objectif principal' },
  { key: 'teams', label: 'Équipes concernées' },
  { key: 'investment', label: 'Investissement' },
  { key: 'outcome', label: 'Résultat attendu' },
]

const recommendedScenario = computed(() => props.scenarios.find(isRecommended))

function isRecommended(scenario) {
  return scenario.recommendation_status?.trim().toLocaleLowerCase('fr') === 'recommandé'
}

function comparisonValue(scenario, key) {
  const value = scenario.comparison?.[key]
  return value == null || value === '' ? 'Non communiqué' : value
}
</script>
