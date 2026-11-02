<template>
  <section class="min-w-0 space-y-5 break-words" aria-label="Parcours et bilan du développement assisté par IA">
    <section class="min-w-0 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm" aria-labelledby="dev-ai-steps-title">
      <h3 id="dev-ai-steps-title" class="font-cabinet-grotesk text-xl font-bold text-indigo-950">Parcours de développement recommandé</h3>
      <p class="mt-1 text-sm text-gray-600">Les étapes prioritaires pour votre contexte, avec un ou plusieurs frameworks possibles.</p>

      <ol v-if="journey.steps.length" class="relative mt-5 before:absolute before:bottom-6 before:left-4 before:top-5 before:w-px before:bg-indigo-200" aria-label="Étapes du parcours dans l'ordre proposé">
        <li v-for="(step, index) in journey.steps" :key="index" class="relative flex min-w-0 gap-4 pb-6 last:pb-0">
          <span class="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-indigo-500 bg-white text-xs font-bold text-indigo-600" aria-hidden="true">{{ index + 1 }}</span>
          <div class="min-w-0 flex-1 pt-0.5">
            <h4 class="font-semibold text-indigo-950">{{ step.title }}</h4>
            <p v-if="step.description" class="mt-1 text-sm leading-relaxed text-slate-700">{{ step.description }}</p>
            <p v-if="step.tip" class="mt-2 text-sm leading-relaxed text-violet-800">{{ step.tip }}</p>
            <p v-if="step.status_label" class="mt-2 inline-flex items-center gap-2 rounded-full px-2.5 py-1 text-xs font-semibold" :class="statusClass(step.status_tone)">
              <span class="flex h-4 w-4 items-center justify-center rounded-full text-xs font-bold text-white" :class="statusIconClass(step.status_tone)" aria-hidden="true">{{ statusIcon(step.status_tone) }}</span>
              {{ step.status_label }}
            </p>
          </div>
        </li>
      </ol>
      <p v-else class="mt-4 text-sm text-gray-500">Aucune étape transmise.</p>

      <div class="mt-5 flex flex-wrap gap-x-5 gap-y-2 border-t border-gray-100 pt-4 text-xs text-slate-600" aria-label="Légende des statuts du parcours">
        <span class="inline-flex items-center gap-2"><span class="flex h-4 w-4 items-center justify-center rounded-full bg-emerald-600 font-bold text-white" aria-hidden="true">✓</span> Prêt : étape en place</span>
        <span class="inline-flex items-center gap-2"><span class="flex h-4 w-4 items-center justify-center rounded-full bg-amber-500 font-bold text-white" aria-hidden="true">!</span> À renforcer : étape à consolider</span>
        <span v-if="journey.steps.some((step) => step.status_label && step.status_tone !== 'positive' && step.status_tone !== 'warning')" class="inline-flex items-center gap-2"><span class="flex h-4 w-4 items-center justify-center rounded-full bg-slate-400 font-bold text-white" aria-hidden="true">·</span> Autre statut communiqué</span>
      </div>
    </section>

    <section class="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm" aria-labelledby="dev-ai-journey-strengths-title">
      <h3 id="dev-ai-journey-strengths-title" class="font-cabinet-grotesk text-xl font-bold text-indigo-950">Principaux points forts</h3>
      <p class="mt-1 text-sm text-gray-600">Les atouts qui facilitent l’adoption d’un développement assisté par IA dans votre contexte.</p>
      <ul v-if="journey.strengths.length" class="mt-4 divide-y divide-white overflow-hidden rounded-xl bg-emerald-50/60">
        <li v-for="(strength, index) in journey.strengths" :key="index" class="flex min-w-0 gap-3 px-4 py-3">
          <span class="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-xs font-bold text-white" aria-hidden="true">✓</span>
          <div class="min-w-0"><h4 class="text-sm font-semibold text-indigo-950">{{ strength.title }}</h4><p v-if="strength.description" class="mt-1 text-sm leading-relaxed text-slate-700">{{ strength.description }}</p></div>
        </li>
      </ul>
      <p v-else class="mt-4 text-sm text-gray-500">Aucun point fort transmis.</p>
    </section>

    <section class="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm" aria-labelledby="dev-ai-journey-improvements-title">
      <h3 id="dev-ai-journey-improvements-title" class="font-cabinet-grotesk text-xl font-bold text-indigo-950">Axes d’amélioration</h3>
      <p class="mt-1 text-sm text-gray-600">Les points à travailler pour maximiser la valeur du développement assisté par IA.</p>
      <ul v-if="journey.improvements.length" class="mt-4 divide-y divide-white overflow-hidden rounded-xl bg-amber-50/60">
        <li v-for="(improvement, index) in journey.improvements" :key="index" class="flex min-w-0 gap-3 px-4 py-3">
          <span class="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-amber-500 text-xs font-bold text-white" aria-hidden="true">!</span>
          <div class="min-w-0"><h4 class="text-sm font-semibold text-indigo-950">{{ improvement.title }}</h4><p v-if="improvement.description" class="mt-1 text-sm leading-relaxed text-slate-700">{{ improvement.description }}</p></div>
        </li>
      </ul>
      <p v-else class="mt-4 text-sm text-gray-500">Aucun axe d’amélioration transmis.</p>
    </section>
  </section>
</template>

<script setup>
defineProps({ journey: { type: Object, required: true } })

function statusClass(tone) {
  if (tone === 'positive') return 'bg-emerald-50 text-emerald-800'
  if (tone === 'warning') return 'bg-amber-50 text-amber-800'
  return 'bg-slate-100 text-slate-700'
}
function statusIconClass(tone) {
  if (tone === 'positive') return 'bg-emerald-600'
  if (tone === 'warning') return 'bg-amber-500'
  return 'bg-slate-400'
}
function statusIcon(tone) {
  if (tone === 'positive') return '✓'
  if (tone === 'warning') return '!'
  return '·'
}
</script>
