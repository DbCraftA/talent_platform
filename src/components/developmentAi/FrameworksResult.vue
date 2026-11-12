<template>
  <section class="min-w-0 space-y-5 break-words" aria-labelledby="dev-ai-frameworks-title">
    <header>
      <h3 id="dev-ai-frameworks-title" class="font-cabinet-grotesk text-xl font-bold text-gray-900">Frameworks recommandés</h3>
      <p class="mt-2 text-sm text-gray-500">Explorez les propositions transmises pour votre projet et consultez leurs sources officielles lorsqu'elles sont connues.</p>
    </header>

    <template v-if="frameworks.length">
      <div class="frameworks-container min-w-0">
        <div class="framework-grid grid min-w-0 gap-3">
        <article v-for="(framework, index) in frameworks" :key="index" class="flex min-w-0 flex-col rounded-2xl border bg-white p-4 shadow-sm" :class="framework.status_label && framework.status_tone === 'recommended' ? 'border-indigo-300 ring-1 ring-indigo-100' : 'border-gray-100'">
          <div class="flex min-w-0 items-start gap-3">
            <img v-if="resolveDevelopmentAiFramework(framework)?.logo" :src="logos[resolveDevelopmentAiFramework(framework).logo]" alt="" class="h-12 w-12 shrink-0 rounded-xl" />
            <div v-else class="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gray-100 font-cabinet-grotesk text-lg font-bold text-gray-600" aria-hidden="true">{{ monogram(framework.name) }}</div>
            <div class="min-w-0">
              <h4 class="font-cabinet-grotesk text-lg font-bold leading-tight text-gray-900">{{ framework.name }}</h4>
              <span v-if="framework.status_label" class="mt-2 inline-block rounded-full border px-2 py-0.5 text-xs font-semibold" :class="framework.status_tone === 'recommended' ? 'border-indigo-200 bg-indigo-50 text-indigo-700' : 'border-gray-200 bg-gray-50 text-gray-700'">{{ framework.status_label }}</span>
            </div>
          </div>
          <p v-if="framework.description" class="mt-4 text-sm leading-relaxed text-gray-600">{{ framework.description }}</p>
          <div class="mt-4 grow text-sm text-gray-600">
            <p class="font-semibold text-gray-900">Points forts</p>
            <ul v-if="framework.strengths?.length" class="mt-2 list-disc space-y-1 pl-5"><li v-for="(strength, strengthIndex) in framework.strengths" :key="strengthIndex">{{ strength }}</li></ul>
            <p v-else class="mt-2 text-gray-500">{{ framework.strengths ? 'Aucun point fort transmis.' : 'Non communiqué' }}</p>
          </div>
          <div class="mt-5 border-t border-gray-100 pt-4">
            <div class="flex flex-wrap items-baseline justify-between gap-1 text-sm"><span class="text-gray-600">Pertinence</span><span class="font-bold text-gray-900">{{ framework.relevance_score != null ? `${framework.relevance_score} / 100` : 'Pertinence non communiquée' }}</span></div>
            <div v-if="framework.relevance_score != null" class="mt-2 h-2 overflow-hidden rounded-full bg-indigo-100" aria-hidden="true"><div class="h-full rounded-full bg-indigo-500" :style="{ width: `${framework.relevance_score}%` }"></div></div>
          </div>
          <a v-if="resolveDevelopmentAiFramework(framework)?.url" :href="resolveDevelopmentAiFramework(framework).url" target="_blank" rel="noopener noreferrer" class="mt-5 inline-flex w-fit items-center rounded-lg text-sm font-bold text-indigo-600 underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-indigo-500" :aria-label="`Voir le détail de ${framework.name} (nouvel onglet)`">
            Voir le détail <span class="ml-2" aria-hidden="true">&rarr;</span>
          </a>
        </article>
        </div>
      </div>

      <section class="min-w-0 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm" aria-labelledby="dev-ai-frameworks-comparison-title">
        <div class="px-5 pt-5">
          <h3 id="dev-ai-frameworks-comparison-title" class="font-cabinet-grotesk text-2xl font-bold text-gray-900">Comparatif rapide</h3>
          <p class="mt-1 text-sm text-gray-500">Faites défiler le tableau horizontalement pour voir toutes les colonnes.</p>
        </div>
        <div class="mt-5 w-full max-w-full overflow-x-auto" tabindex="0" role="region" aria-label="Tableau comparatif des frameworks">
          <table class="w-full min-w-[900px] border-collapse text-left text-sm">
            <thead class="bg-indigo-50 text-gray-900">
              <tr><th scope="col" class="px-5 py-4 font-semibold">Framework</th><th scope="col" class="px-5 py-4 font-semibold">Positionnement</th><th scope="col" class="px-5 py-4 font-semibold">Points forts</th><th scope="col" class="px-5 py-4 font-semibold">Cas d'usage idéal</th><th scope="col" class="px-5 py-4 font-semibold">Niveau de mise en place</th></tr>
            </thead>
            <tbody class="divide-y divide-gray-100">
              <tr v-for="(framework, index) in frameworks" :key="index">
                <th scope="row" class="min-w-[145px] px-5 py-4 align-top font-semibold text-gray-900">{{ framework.name }}</th>
                <td class="min-w-[180px] px-5 py-4 align-top text-gray-600">{{ comparisonValue(framework.positioning) }}</td>
                <td class="min-w-[200px] px-5 py-4 align-top text-gray-600">{{ comparisonValue(framework.strengths) }}</td>
                <td class="min-w-[190px] px-5 py-4 align-top text-gray-600">{{ comparisonValue(framework.ideal_use_case) }}</td>
                <td class="min-w-[170px] px-5 py-4 align-top text-gray-600">{{ comparisonValue(framework.setup_level) }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </template>
    <p v-else class="rounded-2xl border border-gray-100 bg-white p-5 text-sm text-gray-500">Aucun framework transmis.</p>
  </section>
</template>

<script setup>
import { resolveDevelopmentAiFramework } from '../../config/developmentAiFrameworks.js'
import bmadLogo from '../../images/frameworks/bmad.svg'
import specKitLogo from '../../images/frameworks/spec-kit.svg'
import crewaiLogo from '../../images/frameworks/crewai.svg'
import microsoftAgentFrameworkLogo from '../../images/frameworks/microsoft-agent-framework.svg'

const logos = { bmad: bmadLogo, 'spec-kit': specKitLogo, crewai: crewaiLogo, 'microsoft-agent-framework': microsoftAgentFrameworkLogo }

defineProps({ frameworks: { type: Array, required: true } })

function comparisonValue(value) {
  if (Array.isArray(value)) return value.length ? value.join(', ') : 'Aucun point fort transmis'
  return value == null || value === '' ? 'Non communiqué' : value
}

function monogram(name) {
  return name?.trim().split(/\s+/).slice(0, 2).map(part => part[0]).join('').toUpperCase() || '?'
}
</script>

<style scoped>
.frameworks-container { container-type: inline-size; }
.framework-grid { grid-template-columns: minmax(0, 1fr); }
@container (min-width: 520px) {
  .framework-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}
</style>
