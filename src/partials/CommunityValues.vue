<template>
  <section class="relative bg-linear-to-b from-white to-indigo-100">
    <div class="mx-auto max-w-6xl px-4 sm:px-6">
      <div class="border-t py-12 md:py-20 [border-image:linear-gradient(to_right,transparent,--theme(--color-slate-400/.25),transparent)1]">
        <div class="mx-auto max-w-3xl pb-12 text-center md:pb-16">
          <div class="inline-flex items-center gap-3 pb-3 before:h-px before:w-8 before:bg-linear-to-r before:from-transparent before:to-indigo-200/50 after:h-px after:w-8 after:bg-linear-to-l after:from-transparent after:to-indigo-200/50">
            <span class="inline-flex bg-linear-to-r from-indigo-500 to-indigo-200 bg-clip-text text-indigo-500">L’esprit Wenovat</span>
          </div>
          <h2 class="font-nacelle animate-[gradient_6s_linear_infinite] bg-[linear-gradient(to_right,var(--color-gray-200),var(--color-indigo-200),var(--color-gray-50),var(--color-indigo-300),var(--color-gray-200))] bg-[length:200%_auto] bg-clip-text pb-4 text-3xl font-semibold md:text-4xl">
            Un réseau sélectif pour experts indépendants
          </h2>
          <p class="text-xl text-gray-500/65">
            Garder votre indépendance, tout en rejoignant un collectif de confiance qui valorise la compétence, le partage et l’impact.
          </p>
        </div>

        <div class="mx-auto grid max-w-sm gap-12 sm:max-w-none sm:grid-cols-2 md:gap-x-14 md:gap-y-16 lg:grid-cols-3">
          <article v-for="value in values" :key="value.title">
            <svg class="mb-3 fill-indigo-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24">
              <path d="M19.406 3.844 6.083 20.497.586 15 2 13.586l3.917 3.917L17.844 2.595l1.562 1.25Z" />
              <path fill-opacity=".48" d="M19 8h5v2h-5V8Zm-4 5h9v2h-9v-2Zm9 5H11v2h13v-2Z" />
            </svg>
            <h3 class="font-nacelle mb-1 text-[1rem] font-semibold">
              {{ value.title }}
            </h3>
            <p class="text-gray-500/75">
              {{ value.description }}
            </p>
          </article>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const values = [
  { title: 'Exigence technique', description: 'Un niveau d’attente élevé sur la qualité des décisions, la rigueur et la capacité à prendre du recul.' },
  { title: 'Partage entre pairs', description: 'Des échanges entre architectes pour confronter les approches et progresser collectivement.' },
  { title: 'Veille Cloud, Data et IA', description: 'Une communauté attentive aux usages, aux architectures émergentes et aux pratiques réellement applicables.' },
  { title: 'Opportunités qualifiées', description: 'Des missions sélectionnées pour leur cohérence avec votre expertise, votre disponibilité et vos ambitions.' },
  { title: 'Liberté d’indépendant', description: 'Vous gardez votre autonomie tout en bénéficiant d’un cadre de confiance et d’un réseau exigeant.' },
  { title: 'Impact client', description: 'Des projets où l’architecture sert une valeur concrète, lisible et durable pour les entreprises accompagnées.' },
]
</script>
