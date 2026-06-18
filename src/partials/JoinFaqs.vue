<template>
  <section class="bg-linear-to-b from-indigo-100 to-white">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 border-t [border-image:linear-gradient(to_right,transparent,--theme(--color-slate-400/.25),transparent)1]">
      <div class="py-12 md:py-20 border-b border-gray-100">
        <div class="pb-12 md:pb-20 text-center">
          <h2 class="h2 font-cabinet-grotesk">Questions fréquentes</h2>
        </div>

        <div class="md:flex md:space-x-12 space-y-8 md:space-y-0">
          <div class="w-full md:w-1/2 space-y-8">
            <div v-for="item in leftQuestions" :key="item.question" class="space-y-2">
              <h4 class="text-xl font-cabinet-grotesk font-bold">{{ item.question }}</h4>
              <p class="text-gray-500">{{ item.answer }}</p>
            </div>
          </div>
          <div class="w-full md:w-1/2 space-y-8">
            <div v-for="item in rightQuestions" :key="item.question" class="space-y-2">
              <h4 class="text-xl font-cabinet-grotesk font-bold">{{ item.question }}</h4>
              <p class="text-gray-500">{{ item.answer }}</p>
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
