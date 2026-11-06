<script setup>
import Header from '../partials/Header.vue'
import Hero01 from '../partials/Hero01.vue'
import OffersHighlights from '../partials/OffersHighlights.vue'
import Testimonials from '../partials/Testimonials.vue'
import BlogList from '../partials/BlogList.vue'
import Faqs from '../partials/Faqs.vue'
import Footer from '../partials/Footer.vue'
import architectImage from '../images/vitaly-gariev-unsplash.jpg'

const benefits = [
  { icon: 'vision', title: 'Vision & cohérence', description: 'Un architecte vous aide à décider ce qui compte vraiment, à sécuriser vos investissements et à transformer vos ambitions en solutions concrètes.' },
  { icon: 'layers', title: 'Maîtrise de la complexité', description: 'En anticipant les risques et en encadrant les décisions clés, il limite la complexité et évite les surcoûts futurs.' },
  { icon: 'rocket', title: 'Accélération de l’innovation', description: 'Avec une architecture claire et robuste, les équipes livrent plus vite, testent de nouvelles idées et réduisent leurs time-to-market.' },
]
const collective = [
  'Des expertises complémentaires (Cloud, Data, IA, ...)',
  'L’intelligence collective et le partage terrain',
  'Une sélection exigeante et un haut niveau d’expertise',
]
const steps = [
  { title: 'Expression du besoin', text: 'Comprendre le contexte et les objectifs.' },
  { title: 'Analyse & cadrage', text: 'Identifier les enjeux et les expertises nécessaires.' },
  { title: 'Proposition sur mesure', text: 'Définir le dispositif d’accompagnement.' },
  { title: 'Exécution & suivi', text: 'Mettre en œuvre, mesurer et transférer les compétences.' },
]
</script>

<template>
  <div class="flex min-h-screen flex-col overflow-hidden">
    <Header />
    <main class="grow">
      <div class="bg-linear-to-b from-white via-indigo-50 to-white">
        <Hero01 />
        <OffersHighlights />

      <section>
        <div class="mx-auto grid max-w-6xl gap-8 border-t border-indigo-100 px-4 py-16 sm:px-6 md:grid-cols-[1.1fr_.9fr_1fr] md:items-center md:gap-7 md:py-20">
          <div data-aos="fade-up">
            <p class="text-xs font-bold uppercase tracking-wider text-indigo-600">Notre conviction</p>
            <h2 class="mt-1 font-cabinet-grotesk text-3xl leading-tight font-bold text-slate-950">L’architecture, c’est l’art de distinguer l’essentiel du superflu.</h2>
            <p class="mt-3 text-sm leading-relaxed text-slate-900">La technologie ne constitue pas une fin en soi. Le rôle de l’architecte est de faire les bons choix, au bon moment, pour construire des solutions cohérentes avec vos objectifs métiers.</p>
            <blockquote class="mt-5 rounded-2xl bg-indigo-50 p-4 text-sm text-slate-950"><span class="text-2xl font-bold text-indigo-600" aria-hidden="true">“</span> La partie la plus difficile dans la création d’un système est de décider précisément ce qu’il faut créer.<cite class="mt-2 block text-xs font-bold not-italic">Fred Brooks</cite></blockquote>
          </div>
          <ul class="space-y-4 border-l border-indigo-200 pl-5">
            <li v-for="(benefit, index) in benefits" :key="benefit.title" class="flex gap-3 border-b border-indigo-50 pb-4 last:border-0 last:pb-0" data-aos="fade-up" :data-aos-delay="index * 100">
              <span class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-indigo-50 text-indigo-600" aria-hidden="true">
                <svg v-if="benefit.icon === 'vision'" class="h-6 w-6" viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 16s5-8 14-8 14 8 14 8-5 8-14 8S2 16 2 16Z"/><circle cx="16" cy="16" r="4"/></svg>
                <svg v-else-if="benefit.icon === 'layers'" class="h-6 w-6" viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="m16 3 13 7-13 7L3 10l13-7ZM3 16l13 7 13-7M3 22l13 7 13-7"/></svg>
                <svg v-else class="h-6 w-6" viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="M12 21c-4-1-6 2-7 7 5-1 8-3 7-7ZM12 20c3-9 8-14 17-17-1 9-6 14-15 17l-2 5-4-4 4-1Z"/><circle cx="21" cy="11" r="2"/></svg>
              </span>
              <div><h3 class="font-cabinet-grotesk text-sm font-bold text-slate-950">{{ benefit.title }}</h3><p class="text-xs leading-relaxed text-slate-900">{{ benefit.description }}</p></div>
            </li>
          </ul>
          <img class="h-full max-h-[330px] w-full rounded-2xl object-cover shadow-md" :src="architectImage" alt="Un architecte et une collègue échangent autour d’un ordinateur" data-aos="fade-up" data-aos-delay="150" />
        </div>
      </section>

      <section>
        <div class="mx-auto grid max-w-6xl gap-10 border-t border-indigo-100 px-4 py-16 sm:px-6 md:grid-cols-2 md:items-start md:gap-16 md:py-20">
          <div class="md:border-r md:border-indigo-200 md:pr-12" data-aos="fade-up">
            <p class="text-xs font-bold uppercase tracking-wider text-indigo-600">La force du collectif</p>
            <h2 class="mt-1 font-cabinet-grotesk text-3xl leading-tight font-bold text-slate-950">Une communauté d’experts au service de vos projets</h2>
            <p class="mt-3 text-sm text-slate-900">Un collectif d’architectes expérimentés qui croise les regards, partage les retours d’expérience et mobilise les bonnes expertises au bon moment.</p>
            <ul class="mt-4 space-y-2 text-sm text-slate-900"><li v-for="point in collective" :key="point" class="flex items-start gap-2"><span class="text-indigo-600" aria-hidden="true">●</span>{{ point }}</li></ul>
            <router-link class="btn mt-6 inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700" to="/rejoindre-la-communaute">Rejoindre la communauté <span aria-hidden="true">→</span></router-link>
          </div>
          <div>
            <div data-aos="fade-up">
              <p class="text-xs font-bold uppercase tracking-wider text-indigo-600">Notre méthode</p>
              <h2 class="mt-1 font-cabinet-grotesk text-3xl leading-tight font-bold text-slate-950">Une démarche simple et structurée</h2>
            </div>
            <ol class="mt-7">
              <li v-for="(step, index) in steps" :key="step.title" class="relative grid grid-cols-[2rem_1.25rem_minmax(0,1fr)] gap-3 pb-6 last:pb-0 sm:gap-4" data-aos="fade-up" :data-aos-delay="index * 100">
                <span class="pt-0.5 font-cabinet-grotesk text-sm font-bold text-[#5638f5]">0{{ index + 1 }}</span>
                <span class="relative flex justify-center pt-0.5" aria-hidden="true"><span v-if="index < steps.length - 1" class="absolute bottom-[-1.5rem] top-3 w-px bg-gray-800"></span><span class="relative box-content h-2 w-2 rounded-full border-4 border-gray-950 bg-indigo-500"></span></span>
                <div><h3 class="font-cabinet-grotesk text-lg font-bold leading-tight">{{ step.title }}</h3><p class="mt-1 text-sm leading-relaxed text-[#68708e]">{{ step.text }}</p></div>
              </li>
            </ol>
          </div>
        </div>
      </section>
      </div>

      <Testimonials />
      <BlogList />

      <Faqs />

      <section class="bg-white px-4 pt-12 pb-5 sm:px-6 md:pt-16">
        <div class="mx-auto flex max-w-6xl flex-col items-start gap-5 rounded-3xl bg-slate-950 px-6 py-8 text-white md:flex-row md:items-center md:px-10" data-aos="fade-up">
          <div class="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-white/20 bg-white/10 text-indigo-200" aria-hidden="true">
            <svg class="h-9 w-9" viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="16" cy="10" r="4"/><circle cx="6" cy="14" r="3"/><circle cx="26" cy="14" r="3"/><path d="M8 27v-3a8 8 0 0 1 16 0v3H8Zm-6 0v-3a5 5 0 0 1 5-5m23 8v-3a5 5 0 0 0-5-5"/></svg>
          </div>
          <div class="grow md:border-l md:border-white/40 md:pl-8"><h2 class="font-cabinet-grotesk text-2xl font-bold">Vous êtes architecte Cloud, Data ou IA ?</h2><p class="mt-1 text-sm text-white/85">Rejoignez un collectif d’experts qui partagent leurs retours terrain, confrontent leurs idées et contribuent à des projets technologiques ambitieux.</p></div>
          <router-link class="btn inline-flex shrink-0 items-center gap-2 rounded-xl bg-white text-indigo-700 hover:bg-indigo-50" to="/rejoindre-la-communaute">Découvrir la communauté <span aria-hidden="true">→</span></router-link>
        </div>
      </section>
      <section class="bg-white px-4 pb-8 sm:px-6">
        <div class="mx-auto flex max-w-6xl flex-col items-start gap-5 rounded-3xl bg-linear-to-r from-indigo-800 via-indigo-700 to-indigo-950 px-6 py-8 text-white md:flex-row md:items-center md:px-10" data-aos="fade-up">
          <div class="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-white/30 bg-white/10 text-white" aria-hidden="true">
            <svg class="h-9 w-9" viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="15" cy="17" r="12"/><circle cx="15" cy="17" r="7"/><circle cx="15" cy="17" r="2"/><path d="m15 17 12-12m-3 0h3v3"/></svg>
          </div>
          <div class="grow md:border-l md:border-white/40 md:pl-8"><h2 class="font-cabinet-grotesk text-2xl font-bold">Un projet, un enjeu, une réflexion ?</h2><p class="mt-1 text-sm text-white/90">Wenovat vous aide à avancer avec clarté grâce à une communauté d’architectes expérimentés.</p></div>
          <router-link class="btn inline-flex shrink-0 items-center gap-2 rounded-xl bg-white text-indigo-700 hover:bg-indigo-50" to="/nous-contacter">Échanger avec un expert <span aria-hidden="true">→</span></router-link>
        </div>
      </section>
    </main>
    <Footer />
  </div>
</template>
