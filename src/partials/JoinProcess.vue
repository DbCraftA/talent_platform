<template>
  <section id="join-process" class="bg-white">
    <div class="mx-auto max-w-6xl border-t border-indigo-100 px-4 py-16 sm:px-6 md:py-20">
      <div class="mx-auto max-w-3xl pb-10 text-center md:pb-12">
        <p class="text-xs font-bold uppercase tracking-wider text-indigo-600">Comment nous rejoindre</p>
        <h2 class="mt-2 font-cabinet-grotesk text-3xl leading-tight font-bold text-slate-950 md:text-4xl">
          Un processus simple, transparent et humain
        </h2>
        <p class="mt-4 text-base leading-relaxed text-slate-900">
          L’objectif n’est pas d’empiler des profils, mais de construire une communauté de confiance avec des architectes qui partagent le même niveau d’exigence.
        </p>
      </div>

      <ol class="grid gap-8 md:grid-cols-3 md:gap-6" data-aos-id-join-process>
        <li v-for="(step, index) in steps" :key="step.title" class="relative flex flex-col rounded-2xl border border-indigo-100 bg-indigo-50/50 p-6 shadow-sm after:absolute after:top-full after:left-1/2 after:h-8 after:w-px after:bg-indigo-300 last:after:hidden md:after:top-1/2 md:after:left-full md:after:h-px md:after:w-6" data-aos="fade-up" :data-aos-delay="index * 200" data-aos-anchor="[data-aos-id-join-process]">
          <span class="relative mb-5 flex h-11 w-11 items-center justify-center rounded-full bg-indigo-600 font-cabinet-grotesk text-lg font-bold text-white">{{ index + 1 }}</span>
          <p class="text-xs font-bold uppercase tracking-wider text-indigo-600">{{ step.eyebrow }}</p>
          <h3 class="mt-2 font-cabinet-grotesk text-xl font-bold text-slate-950">{{ step.title }}</h3>
          <p class="mt-3 text-sm leading-relaxed text-slate-900">{{ step.description }}</p>
        </li>
      </ol>
    </div>
  </section>
</template>

<script setup>
const steps = [
  {
    eyebrow: 'Découverte',
    title: 'Premier échange',
    description: 'Nous échangeons sur votre parcours, vos domaines d’expertise, vos aspirations et le type de projets sur lesquels vous souhaitez intervenir.',
  },
  {
    eyebrow: 'Exigence collective',
    title: 'Validation par les pairs',
    description: 'Votre expérience est challengée par des architectes du même domaine, à travers des discussions concrètes et des retours terrain.',
  },
  {
    eyebrow: 'Communauté',
    title: 'Intégration au collectif',
    description: 'Une fois sélectionné, vous rejoignez un collectif qui partage veille, opportunités, méthodes et retours d’expérience.',
  }
]
</script>
