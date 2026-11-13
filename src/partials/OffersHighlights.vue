<script setup>
import infrastructureImage from '../images/igor-omilaev-.jpg'
import developmentImage from '../images/hero-mac.png'
import strategyIcon from '../images/strategy.png'
import architectIcon from '../images/architecte.png'
import cloudIcon from '../images/cloud.png'

const offers = [
  { title: 'Infrastructure IA', description: 'Choisir, dimensionner et industrialiser une infrastructure adaptée à vos usages, vos performances et vos contraintes de coûts.', image: infrastructureImage, alt: 'Infrastructure de serveurs', icon: 'layers', link: '/ai-infrastructure', simulatorLink: '/ai-infrastructure/simulateur' },
  { title: 'Développement assisté par l’IA', description: 'Structurer et industrialiser l’utilisation de l’IA dans le cycle de développement logiciel, des spécifications à la production.', image: developmentImage, alt: 'Ordinateur utilisé pour le développement assisté par IA', icon: 'code', link: '/developpement-assiste-ia', simulatorLink: '/developpement-assiste-ia/simulateur' },
]
const services = [
  { title: 'Assessment & Stratégie', description: 'Cadrage, diagnostic et feuille de route.', icon: strategyIcon },
  { title: 'Mise à disposition d’architectes', description: 'Renfort d’expertise ciblé et flexible.', icon: architectIcon },
  { title: 'Packs Cloud & IA', description: 'Des dispositifs prêts à l’emploi pour accélérer vos projets.', icon: cloudIcon },
]
</script>

<template>
  <section id="offres" class="py-16 md:py-20">
    <div class="mx-auto max-w-6xl px-4 sm:px-6">
      <div class="grid gap-4 md:grid-cols-2 md:items-end md:gap-10" data-aos="fade-up">
        <div>
          <p class="text-xs font-bold uppercase tracking-wider text-indigo-600">Nos offres</p>
          <h2 class="mt-1 font-cabinet-grotesk text-3xl leading-tight font-bold text-slate-950 md:text-4xl">Des accompagnements concrets pour vos projets Cloud, Data et IA</h2>
        </div>
        <p class="text-base text-slate-900">Des offres conçues pour apporter rapidement de la valeur, du cadrage stratégique jusqu’à l’exécution opérationnelle.</p>
      </div>

      <div class="mt-8 grid gap-4 lg:grid-cols-[1fr_1fr_.88fr]">
        <article v-for="(offer, index) in offers" :key="offer.title" class="relative flex min-h-[350px] flex-col overflow-hidden rounded-2xl border border-indigo-100 bg-white shadow-md" data-aos="fade-up" :data-aos-delay="index * 100">
          <div class="flex h-48 items-center justify-center overflow-hidden" :class="offer.icon === 'code' ? 'bg-indigo-50' : ''">
            <img :class="offer.icon === 'code' ? 'h-full w-full object-contain' : 'h-full w-full object-cover'" :src="offer.image" :alt="offer.alt" />
          </div>
          <div class="relative -mt-3 flex flex-1 flex-col rounded-2xl bg-white px-6 pb-5 pt-5">
            <span class="absolute -top-5 left-5 flex h-11 w-11 items-center justify-center rounded-xl border-4 border-white bg-indigo-600 text-white shadow-md" aria-hidden="true">
              <svg v-if="offer.icon === 'layers'" class="h-6 w-6" viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="m16 3 13 7-13 7L3 10l13-7ZM3 16l13 7 13-7M3 22l13 7 13-7"/></svg>
              <svg v-else class="h-6 w-6" viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="m11 9-7 7 7 7m10-14 7 7-7 7M18 6l-4 20"/></svg>
            </span>
            <h3 class="mt-1 pl-11 font-cabinet-grotesk text-xl font-bold text-slate-950">{{ offer.title }}</h3>
            <p class="mt-3 text-sm leading-relaxed text-slate-900">{{ offer.description }}</p>
            <div class="mt-auto flex flex-wrap gap-2 pt-5">
              <router-link class="inline-flex min-h-10 flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-xl bg-indigo-600 px-3 py-2 text-sm font-bold text-white transition-colors hover:bg-indigo-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" :to="offer.link">Découvrir l’offre <span aria-hidden="true">→</span></router-link>
              <router-link class="inline-flex min-h-10 flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-xl border border-indigo-600 bg-white px-3 py-2 text-sm font-bold text-indigo-700 transition-colors hover:bg-indigo-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" :to="offer.simulatorLink">Tester le simulateur <span aria-hidden="true">→</span></router-link>
            </div>
          </div>
        </article>

        <div class="flex flex-col rounded-2xl bg-indigo-50 p-4 md:p-5" data-aos="fade-up" data-aos-delay="200">
          <h3 class="mb-4 font-cabinet-grotesk text-xl leading-tight font-bold text-slate-950">Et aussi, des accompagnements sur mesure</h3>
          <div class="space-y-2 lg:my-auto">
            <div v-for="service in services" :key="service.title" class="flex items-center gap-3 rounded-xl bg-white/80 p-3">
              <span class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-indigo-50" aria-hidden="true"><img class="h-6 w-6 object-contain" :src="service.icon" alt="" /></span>
              <div><h4 class="font-cabinet-grotesk text-sm font-bold text-slate-950">{{ service.title }}</h4><p class="text-xs leading-snug text-slate-900">{{ service.description }}</p></div>
            </div>
          </div>
          <router-link class="btn  mt-4 sm:mt-1 inline-flex w-full items-center justify-center rounded-xl border border-indigo-600 bg-white/80 text-indigo-700 hover:bg-indigo-50" to="/methode">Découvrir notre méthode</router-link>
        </div>
      </div>
    </div>
  </section>
</template>
