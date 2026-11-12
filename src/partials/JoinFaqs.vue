<template>
  <section class="bg-white">
    <div class="mx-auto max-w-6xl border-t border-indigo-100 px-4 sm:px-6">
      <div class="py-16 md:py-20">
        <div class="pb-10 text-center md:pb-12">
          <p class="text-xs font-bold uppercase tracking-wider text-indigo-600">Pour aller plus loin</p>
          <h2 class="mt-2 font-cabinet-grotesk text-3xl leading-tight font-bold text-slate-950 md:text-4xl">Questions fréquentes</h2>
        </div>

        <div class="grid gap-5 md:grid-cols-2">
          <div class="grid gap-5">
            <div v-for="item in leftQuestions" :key="item.question" class="rounded-2xl border border-indigo-100 bg-indigo-50/40 p-6">
              <h3 class="font-cabinet-grotesk text-lg font-bold text-slate-950">{{ item.question }}</h3>
              <p class="mt-2 text-sm leading-relaxed text-slate-900">{{ item.answer }}</p>
            </div>
          </div>
          <div class="grid gap-5">
            <div v-for="item in rightQuestions" :key="item.question" class="rounded-2xl border border-indigo-100 bg-indigo-50/40 p-6">
              <h3 class="font-cabinet-grotesk text-lg font-bold text-slate-950">{{ item.question }}</h3>
              <p class="mt-2 text-sm leading-relaxed text-slate-900">{{ item.answer }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const leftQuestions = [
  {
    question: 'Faut-il être freelance pour rejoindre Wenovat ?',
    answer: 'La communauté s’adresse principalement aux experts indépendants ou ouverts à des interventions ciblées. L’essentiel reste votre niveau d’expertise, votre posture et votre envie de contribuer à des projets à impact.',
  },
  {
    question: 'Quels profils recherchez-vous ?',
    answer: 'Nous recherchons des architectes et experts seniors sur les sujets Cloud, Data, IA, DevOps, architecture solution, sécurité et plateformes techniques.',
  },
  {
    question: 'Comment se passe la sélection ?',
    answer: 'Elle repose sur un premier échange, une revue de votre expérience et une validation par des pairs capables de comprendre vos arbitrages et votre approche terrain.',
  },
]

const rightQuestions = [
  {
    question: 'Est-ce que Wenovat impose des missions ?',
    answer: 'Non. Nous vous sollicitons sur des opportunités cohérentes avec votre expertise, votre disponibilité et vos envies. Vous gardez votre autonomie de décision.',
  },
  {
    question: 'Comment sont qualifiées les opportunités ?',
    answer: 'Les besoins sont cadrés en amont pour vérifier le contexte, les objectifs, le niveau d’expertise attendu et la valeur réelle de l’intervention.',
  },
  {
    question: 'La communauté est-elle uniquement orientée missions ?',
    answer: 'Non. Les opportunités sont importantes, mais Wenovat repose aussi sur l’échange entre pairs, la veille, les retours terrain et la progression collective autour des sujets Cloud, Data et IA.',
  },
]
</script>
