<script setup>
const steps = [
  { label: 'Canaux ciblés', title: 'Sourcing proactif', icon: 'M3 11a8 8 0 1 0 16 0 8 8 0 0 0-16 0Zm6 0 2 2 4-4M19 19l3 3', text: 'Nous identifions les talents via contributions open-source, LinkedIn Recruiter, conférences techniques, écoles et programmes de cooptation — y compris les talents “passifs”.' },
  { label: 'Filtre d’excellence', title: 'Validation initiale', icon: 'M5 3h11l3 3v15H5V3Zm11 0v4h3M8 11h8M8 15h8M8 19h5', text: 'Vérification du CV/portfolio, certifications & références, plus un screening court adapté.' },
  { label: 'Évaluation en conditions réelles', title: 'Mise en situation', icon: 'M3 5h18v12H3V5Zm6 16h6m-3-4v4M7 10l2 2-2 2m5 0h4', text: 'Évaluation des candidats sur des cas inspirés de vraies problématiques clients, afin de juger à la fois la démarche, la rigueur technique et la capacité à proposer des solutions pragmatiques.' },
  { label: 'Intégration & impact', title: 'Onboarding opérationnel', icon: 'M12 3v18M3 12h18M5 5l14 14M19 5 5 19', text: 'Formation aux standards clients et aux outils collaboratifs, transfert de méthodologies et accompagnement personnalisé pour garantir une montée en puissance rapide et durable.' },
]

const commitments = [
  { icon: 'M12 21s-9-4-9-10V5l9-3 9 3v6c0 6-9 10-9 10ZM8 11l3 3 5-5', text: "Des experts parfaitement alignés avec vos besoins techniques et votre culture d'entreprise." },
  { icon: 'M3 12h4l3 3 5-6 3 3h3M12 3v3m0 12v3', text: 'Une intégration rapide et efficace dans vos équipes et projets.' },
  { icon: 'M3 20V12m6 8V7m6 13v-5m6 5V4M2 21h20', text: 'Une performance constante et mesurable tout au long de la mission.' },
  { icon: 'M4 7h15m-4-4 4 4-4 4M20 17H5m4-4-4 4 4 4', text: "Une flexibilité pour s'adapter à l'évolution de vos besoins." },
]
</script>

<template>
  <section id="section1" class="scroll-mt-16 pb-20 pt-20 text-slate-950 md:pb-28 md:pt-36" aria-labelledby="selection-title">
    <div class="mx-auto max-w-6xl px-4 sm:px-6">
      <div class="mx-auto max-w-3xl text-center" data-aos="fade-up">
        <p class="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-[#5638f5]">Notre processus de sélection</p>
        <h2 id="selection-title" class="font-cabinet-grotesk text-3xl font-bold leading-tight md:text-4xl">Un parcours exigeant pour des experts de haut niveau</h2>
        <p class="mt-5 text-base leading-relaxed text-[#565d7c]">Chaque expert que nous proposons passe par un processus de sélection rigoureux combinant tests techniques, validation des références et mise en situation. Objectif : garantir une expertise de haut niveau et une parfaite adéquation avec vos besoins.</p>
      </div>

      <div class="mx-auto mt-12 max-w-3xl">
        <ol class="relative space-y-1" aria-label="Étapes de sélection">
          <li v-for="(step, index) in steps" :key="step.title" class="relative grid grid-cols-[2rem_1.5rem_minmax(0,1fr)] gap-3 pb-10 last:pb-0 sm:grid-cols-[2.5rem_2rem_minmax(0,1fr)] sm:gap-5" data-aos="fade-up" :data-aos-delay="index * 100">
            <span class="pt-0.5 font-cabinet-grotesk text-sm font-bold text-indigo-600">0{{ index + 1 }}</span>
            <span class="relative flex justify-center pt-1" aria-hidden="true"><span v-if="index < steps.length - 1" class="absolute bottom-[-2.5rem] top-4 w-px bg-indigo-200"></span><span class="relative box-content h-2 w-2 rounded-full border-4 border-slate-950 bg-indigo-500"></span></span>
            <div class="min-w-0 border-b border-indigo-100 pb-8 last:border-0">
              <p class="text-sm font-semibold text-indigo-600">{{ step.label }}</p>
              <h3 class="mt-1 font-cabinet-grotesk text-xl font-bold">{{ step.title }}</h3>
              <p class="mt-2 leading-relaxed text-slate-900">{{ step.text }}</p>
            </div>
          </li>
        </ol>
      </div>

      <div class="mt-20 rounded-3xl bg-slate-950 px-6 py-10 text-white sm:px-10 md:mt-24 md:py-12">
        <div class="max-w-2xl" data-aos="fade-up">
          <p class="text-xs font-bold uppercase tracking-wider text-indigo-200">Notre engagement</p>
          <h2 class="mt-3 font-cabinet-grotesk text-3xl font-bold md:text-4xl">Engagement Qualité</h2>
          <p class="mt-3 text-indigo-100">Un processus de sélection rigoureux qui nous permet de vous garantir :</p>
        </div>
        <div class="mt-8 grid gap-3 sm:grid-cols-2">
          <div v-for="(item, index) in commitments" :key="item.text" class="flex items-start gap-4 rounded-2xl border border-white/15 bg-white/8 p-5 sm:p-6" data-aos="fade-up" :data-aos-delay="index * 100">
            <span class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/10 text-indigo-200" aria-hidden="true"><svg class="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path :d="item.icon" /></svg></span>
            <p class="self-center text-sm leading-relaxed text-white sm:text-base">{{ item.text }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
