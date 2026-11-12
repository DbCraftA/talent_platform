<script setup>
const steps = [
  { title: 'Diagnostic', icon: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Zm0 4v5l3 2', text: 'Écouter vos objectifs business, cartographier l’existant technique et les compétences internes pour comprendre vos enjeux.' },
  { title: 'Analyse & cadrage', icon: 'M5 3h11l3 3v15H5V3Zm11 0v4h3M8 11h8M8 15h8M8 19h5', text: 'Identifier expertises, contraintes et priorités ; définir les résultats attendus et les indicateurs de succès.' },
  { title: 'Proposition sur mesure', icon: 'M12 3v6m0 0-6 5m6-5 6 5M3 17l3-3 3 3m6 0 3-3 3 3', text: 'Choisir ensemble l’approche adaptée à votre maturité et valider les options, profils, objectifs et modalités d’intervention.' },
  { title: 'Exécution & suivi', icon: 'M3 20V12m6 8V7m6 13v-5m6 5V4M2 21h20', text: 'Intégrer les experts, piloter les avancées, mesurer la performance et transférer les compétences pour pérenniser les acquis.' },
]
</script>

<template>
  <section id="section2" class="scroll-mt-16 py-15 text-[#11142e] " aria-labelledby="accompaniment-title">
    <div class="mx-auto max-w-6xl px-4 sm:px-6">
      <div class="mx-auto max-w-3xl text-center" data-aos="fade-up">
        <p class="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-[#5638f5]">À vos côtés, à chaque étape</p>
        <h2 id="accompaniment-title" class="font-cabinet-grotesk text-3xl font-bold leading-tight md:text-4xl">Notre méthode d'accompagnement</h2>
        <p class="mt-5 leading-relaxed text-[#565d7c]">Chaque client a des besoins uniques. Selon le contexte, nous intervenons soit en accompagnement stratégique pour cadrer et orienter le projet, soit en mise à disposition rapide des meilleurs profils experts. Notre méthode garantit agilité et pertinence à chaque étape.</p>
      </div>

      <ol class="mx-auto mt-12 max-w-2xl" aria-label="Étapes d'accompagnement">
        <li v-for="(step, index) in steps" :key="step.title">
          <article class="rounded-xl border px-5 py-5 text-center sm:px-8" :class="index % 2 === 0 ? 'border-[#e6e5ed] bg-white/75' : 'border-[#bdb3ff] bg-[#f5f3ff]'" data-aos="fade-up" :data-aos-delay="(index % 2) * 100">
            <p class="text-xs font-bold uppercase tracking-wider" :class="index % 2 === 0 ? 'text-[#68708e]' : 'text-[#5638f5]'">Étape 0{{ index + 1 }}</p>
            <svg class="mx-auto mt-3 h-7 w-7 text-[#5638f5]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path :d="step.icon" /></svg>
            <h3 class="mt-2 font-cabinet-grotesk text-xl font-bold">{{ step.title }}</h3>
            <p class="mx-auto mt-1 max-w-md text-sm leading-relaxed text-[#68708e]">{{ step.text }}</p>
            <div v-if="index === 2" class="mt-4 flex flex-wrap justify-center gap-2 text-xs font-bold text-[#5638f5]" aria-label="Deux voies d'accompagnement">
              <span class="rounded-lg bg-[#f1efff] px-3 py-2">Conseil & cadrage</span>
              <span class="rounded-lg bg-[#f1efff] px-3 py-2">Experts & exécution</span>
            </div>
          </article>
          <div v-if="index < steps.length - 1" class="flex flex-col items-center text-[#5638f5]" aria-hidden="true"><span class="h-4 w-px bg-[#bdb3ff]"></span><span class="flex h-7 w-7 items-center justify-center rounded-full bg-[#eeeaff]">↓</span><span class="h-4 w-px bg-[#bdb3ff]"></span></div>
        </li>
      </ol>
      <p class="mx-auto mt-9 max-w-3xl text-center text-sm leading-relaxed text-[#565d7c]" data-aos="fade-up">Nous allions innovation, pragmatisme, agilité, transparence et excellence pour des résultats concrets et de qualité à chaque étape.</p>
    </div>
  </section>
</template>
