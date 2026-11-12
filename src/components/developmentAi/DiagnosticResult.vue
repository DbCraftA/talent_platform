<template>
  <section class="min-w-0 space-y-5 break-words" aria-label="Diagnostic de maturité">
    <section class="rounded-2xl border border-indigo-100 bg-white p-5 shadow-sm" aria-labelledby="dev-ai-score-title">
      <h3 id="dev-ai-score-title" class="font-cabinet-grotesk text-xl font-bold text-gray-900">Score de maturité</h3>
      <div class="mx-auto mt-5 max-w-sm text-center">
        <div v-if="diagnostic.score != null" class="relative mx-auto w-full max-w-[280px]">
          <svg class="block w-full" viewBox="0 0 200 112" role="img" :aria-label="`Score de maturité : ${diagnostic.score} sur 100`">
            <path d="M 12 100 A 88 88 0 0 1 188 100" fill="none" stroke="#e7eaf2" stroke-width="17" stroke-linecap="round" pathLength="100" />
            <path d="M 12 100 A 88 88 0 0 1 188 100" fill="none" stroke="#635bff" stroke-width="17" stroke-linecap="round" pathLength="100" :stroke-dasharray="`${diagnostic.score} 100`" />
          </svg>
          <p class="absolute inset-x-0 bottom-0 font-cabinet-grotesk text-5xl font-bold leading-none text-indigo-950" aria-hidden="true">{{ diagnostic.score }}<span class="text-2xl text-slate-500"> / 100</span></p>
        </div>
        <p v-else class="text-sm text-gray-500">Score non communiqué.</p>
        <p v-if="diagnostic.level" class="mt-3 font-semibold text-gray-900">{{ diagnostic.level }}</p>
      </div>

      <div v-if="diagnostic.main_recommendation" class="mt-6 rounded-xl bg-emerald-50 p-4">
        <h4 class="flex items-center gap-2 font-bold text-indigo-950"><span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-sm text-white" aria-hidden="true">✓</span> Recommandation principale</h4>
        <p class="mt-2 text-sm leading-relaxed text-slate-700">{{ diagnostic.main_recommendation }}</p>
      </div>

      <div class="mt-3 rounded-xl border border-slate-200 p-4" aria-labelledby="dev-ai-maturity-scale-title">
        <h4 id="dev-ai-maturity-scale-title" class="font-bold text-indigo-950">Échelle de maturité</h4>
        <ul class="mt-3 space-y-2 text-sm text-slate-700">
          <li v-for="entry in maturityScale" :key="entry.range" class="flex items-center gap-2">
            <span class="h-3 w-3 shrink-0 rounded-full" :class="entry.dot" aria-hidden="true"></span>
            <span class="w-16 shrink-0 font-bold text-gray-900">{{ entry.range }}</span>
            <span>{{ entry.label }}</span>
          </li>
        </ul>
      </div>
    </section>

    <section class="min-w-0" aria-labelledby="dev-ai-dimensions-title">
      <h3 id="dev-ai-dimensions-title" class="font-cabinet-grotesk text-xl font-bold text-gray-900">Détail du score par dimension</h3>
      <p class="mt-1 text-sm text-gray-600">Chaque dimension évalue un aspect clé de votre capacité à mettre en place un développement assisté par IA.</p>
      <div v-if="diagnostic.dimensions?.length" class="mt-4 space-y-3">
        <article v-for="(dimension, index) in diagnostic.dimensions" :key="index" class="min-w-0 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
          <div class="flex flex-wrap items-start justify-between gap-3">
            <div class="flex min-w-0 items-center gap-3">
              <span class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-lg font-bold text-indigo-600" aria-hidden="true">{{ dimensionIcon(dimension.id) }}</span>
              <div class="min-w-0">
                <h4 class="font-cabinet-grotesk text-lg font-bold text-indigo-950">{{ dimension.title || dimension.id }}</h4>
                <p v-if="dimension.score != null" class="font-cabinet-grotesk text-xl font-bold text-blue-600">{{ dimension.score }} <span class="text-sm text-slate-500">/ 100</span></p>
              </div>
            </div>
            <span v-if="dimension.status_label" class="rounded-xl px-2 py-1 text-xs font-semibold" :class="statusClass(dimension.status_tone)">{{ dimension.status_label }}</span>
          </div>
          <div v-if="dimension.score != null" class="mt-3 h-2 overflow-hidden rounded-full bg-slate-100" aria-hidden="true"><div class="h-full rounded-full bg-blue-500" :style="{ width: `${dimension.score}%` }"></div></div>
          <p v-if="dimension.description" class="mt-3 text-sm leading-relaxed text-gray-600">{{ dimension.description }}</p>
          <div v-if="Array.isArray(dimension.findings)" class="mt-4">
            <ul v-if="dimension.findings.length" class="space-y-2 text-sm leading-relaxed text-slate-700">
              <li v-for="(finding, findingIndex) in dimension.findings" :key="findingIndex" class="flex items-start gap-2">
                <span class="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white" :class="findingClass(finding.status_tone)" aria-hidden="true">{{ finding.status_tone === 'positive' ? '✓' : finding.status_tone === 'warning' ? '!' : '·' }}</span>
                <span>{{ finding.text }}</span>
              </li>
            </ul>
            <p v-else class="text-sm text-gray-500">Aucun constat transmis.</p>
          </div>
        </article>
      </div>
      <p v-else class="mt-4 rounded-2xl border border-gray-100 bg-white p-5 text-sm text-gray-500">Aucune dimension transmise.</p>
    </section>

    <div v-if="Array.isArray(diagnostic.strengths) || Array.isArray(diagnostic.improvements)" class="space-y-5">
      <section v-if="Array.isArray(diagnostic.strengths)" class="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm" aria-labelledby="dev-ai-diagnostic-strengths-title">
        <h3 id="dev-ai-diagnostic-strengths-title" class="font-cabinet-grotesk text-xl font-bold text-gray-900">Points forts</h3>
        <ul v-if="diagnostic.strengths.length" class="mt-4 space-y-4">
          <li v-for="(strength, index) in diagnostic.strengths" :key="index" class="border-l-2 border-indigo-400 pl-4">
            <h4 class="font-semibold text-gray-900">{{ strength.title }}</h4>
            <p v-if="strength.description" class="mt-1 text-sm text-gray-600">{{ strength.description }}</p>
          </li>
        </ul>
        <p v-else class="mt-3 text-sm text-gray-500">Aucun point fort transmis.</p>
      </section>
      <section v-if="Array.isArray(diagnostic.improvements)" class="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm" aria-labelledby="dev-ai-diagnostic-improvements-title">
        <h3 id="dev-ai-diagnostic-improvements-title" class="font-cabinet-grotesk text-xl font-bold text-gray-900">Points d'amélioration</h3>
        <ul v-if="diagnostic.improvements.length" class="mt-4 space-y-4">
          <li v-for="(improvement, index) in diagnostic.improvements" :key="index" class="border-l-2 border-violet-400 pl-4">
            <h4 class="font-semibold text-gray-900">{{ improvement.title }}</h4>
            <p v-if="improvement.description" class="mt-1 text-sm text-gray-600">{{ improvement.description }}</p>
          </li>
        </ul>
        <p v-else class="mt-3 text-sm text-gray-500">Aucun point d'amélioration transmis.</p>
      </section>
    </div>
  </section>
</template>

<script setup>
// Repère éditorial fixe ; les niveaux, badges et constats proviennent toujours de la réponse.
const maturityScale = [
  { range: '80–100', label: 'Prêt à scaler', dot: 'bg-emerald-500' },
  { range: '60–79', label: 'Prêt pour un pilote', dot: 'bg-blue-500' },
  { range: '40–59', label: 'À renforcer', dot: 'bg-amber-500' },
  { range: '< 40', label: 'Préparation nécessaire', dot: 'bg-rose-500' },
]

const icons = { organisation: '◎', processus: '▤', 'outils-environnement': '⚙', 'gouvernance-securite': '◇' }
function dimensionIcon(id) { return icons[id] || '◆' }
function statusClass(tone) {
  if (tone === 'positive') return 'bg-emerald-50 text-emerald-700'
  if (tone === 'warning') return 'bg-amber-50 text-amber-700'
  return 'bg-indigo-50 text-indigo-700'
}
function findingClass(tone) {
  if (tone === 'positive') return 'bg-emerald-600'
  if (tone === 'warning') return 'bg-amber-500'
  return 'bg-slate-400'
}

defineProps({
  diagnostic: { type: Object, required: true },
})
</script>
