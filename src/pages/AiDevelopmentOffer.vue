<template>
  <div class="flex min-h-screen flex-col overflow-hidden bg-white text-[#11142e]">
    <Header />
    <main class="grow">
      <div class="bg-linear-to-b from-white via-indigo-50 to-white">
        <OfferHero :title-lines="['Développement']" accent="assisté par l’IA" promise="De la spécification à la production, faites de l’IA un levier pour toute votre équipe." description="Wenovat vous aide à intégrer l’IA à chaque étape du cycle de développement, avec des méthodes partagées, des outils adaptés et des points de contrôle humains." :benefits="['Un cycle de livraison cohérent', 'Des équipes accompagnées', 'Une qualité maîtrisée']" :image="heroImage" :image-width="1447" :image-height="1087" image-alt="Cycle de développement assisté par IA, des spécifications au CI/CD, avec génération du code, tests et documentation." primary-label="Évaluer votre maturité" primary-to="/developpement-assiste-ia/simulateur" secondary-label="Échanger avec un expert" secondary-to="/nous-contacter" @primary-click="trackOffer('hero', 'simulator')" @secondary-click="trackOffer('hero', 'contact')" />

        <section class="pb-10 pt-12 md:pb-14 md:pt-14" aria-labelledby="dev-constat-title">
          <div class="mx-auto max-w-6xl px-4 sm:px-6">
            <div class="mx-auto max-w-4xl text-center" data-aos="fade-up">
              <p class="mx-auto mb-4 w-fit rounded-full bg-[#f1efff] px-5 py-2 text-xs font-bold uppercase tracking-wider text-[#5638f5]">Le constat</p>
              <h2 id="dev-constat-title" class="font-cabinet-grotesk text-3xl font-bold leading-tight md:text-4xl">Des gains individuels ne font pas encore <span class="text-[#5638f5]">une méthode collective</span></h2>
              <p class="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-[#68708e]">L’IA accélère certaines tâches, mais sans cadre commun ses apports restent dispersés. Le véritable enjeu est de relier les pratiques, de la formulation du besoin jusqu’à la mise en production.</p>
            </div>
            <div class="mx-auto mt-7 max-w-2xl" data-aos="fade-up" data-aos-delay="100">
              <article class="rounded-xl border border-[#e6e5ed] bg-white/75 px-5 py-4 text-center sm:px-8">
                <p class="text-xs font-bold uppercase tracking-wider text-[#68708e]">Sans approche structurée</p>
                <h3 class="mt-2 font-cabinet-grotesk text-xl font-bold">Des usages isolés</h3>
                <p class="mt-1 text-sm leading-relaxed text-[#68708e]">Des outils adoptés au fil de l’eau, des spécifications inégales et des résultats difficiles à partager ou à contrôler.</p>
              </article>
              <div class="flex flex-col items-center text-[#5638f5]" aria-hidden="true"><span class="h-4 w-px bg-[#bdb3ff]"></span><span class="flex h-7 w-7 items-center justify-center rounded-full bg-[#eeeaff]">↓</span><span class="h-4 w-px bg-[#bdb3ff]"></span></div>
              <article class="rounded-xl border border-[#bdb3ff] bg-[#f5f3ff] px-5 py-4 text-center sm:px-8">
                <p class="text-xs font-bold uppercase tracking-wider text-[#5638f5]">Avec une approche structurée</p>
                <h3 class="mt-2 font-cabinet-grotesk text-xl font-bold">Un cycle cohérent</h3>
                <p class="mt-1 text-sm leading-relaxed text-[#565d7c]">Des méthodes explicites, des outils intégrés aux workflows et des validations humaines à chaque étape sensible.</p>
              </article>
            </div>
          </div>
        </section>

        <section class="py-10 md:py-14" aria-labelledby="dev-cycle-title">
          <div class="mx-auto max-w-6xl px-4 sm:px-6">
            <div data-aos="fade-up"><p class="mb-4 text-xs font-bold uppercase tracking-wider text-[#5638f5]">Du besoin à la production</p><h2 id="dev-cycle-title" class="max-w-3xl font-cabinet-grotesk text-3xl font-bold leading-tight md:text-4xl">L’IA accompagne le cycle, l’humain garde le contrôle</h2><p class="mt-3 max-w-3xl text-sm leading-relaxed text-[#68708e]">Chaque activité peut bénéficier d’une assistance ciblée, sans déléguer les décisions, la revue ni la validation finale.</p></div>
            <ol class="mt-8 grid gap-0 lg:grid-cols-4 lg:gap-x-5 lg:gap-y-10">
              <li v-for="(item, index) in cycleSteps" :key="item.title" class="relative border-l border-[#c6bbff] pb-5 pl-11 last:border-l-0 last:pb-0 lg:col-start-[var(--cycle-column)] lg:row-start-[var(--cycle-row)] lg:border-l-0 lg:border-t lg:pb-0 lg:pl-0 lg:pt-5" :style="{ '--cycle-column': index < 4 ? index + 1 : 8 - index, '--cycle-row': index < 4 ? 1 : 2 }" data-aos="fade-up" :data-aos-delay="(index % 3) * 100">
                <span class="absolute -left-3 -top-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-[#5638f5] font-cabinet-grotesk text-[10px] font-bold text-white lg:-top-3 lg:left-0" aria-hidden="true">{{ index + 1 }}</span>
                <span class="sr-only">Étape {{ index + 1 }} : </span>
                <svg class="h-6 w-6 text-[#5638f5]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path :d="icons[item.icon]" /></svg>
                <h3 class="mt-3 font-cabinet-grotesk text-lg font-bold leading-tight">{{ item.title }}</h3>
                <p class="mt-1 text-sm leading-relaxed text-[#68708e]">{{ item.text }}</p>
                <span v-if="index === 3" class="absolute right-0 top-0 hidden h-[calc(100%+2.5rem)] w-5 rounded-r-2xl border-y border-r border-[#c6bbff] lg:block" aria-hidden="true"></span>
              </li>
            </ol>
            <p class="mt-5 text-sm leading-relaxed text-[#68708e]">L’IA assiste les activités à chaque étape ; les décisions, revues et validations restent sous contrôle humain.</p>
          </div>
        </section>

        <section class="py-10 md:py-14" aria-labelledby="dev-criteria-title">
          <div class="mx-auto grid max-w-6xl gap-7 border-t border-[#e8e8f1] px-4 pt-10 sm:px-6 lg:grid-cols-2 lg:gap-12">
            <div data-aos="fade-up"><p class="mb-4 text-xs font-bold uppercase tracking-wider text-[#5638f5]">Les critères de décision</p><h2 id="dev-criteria-title" class="font-cabinet-grotesk text-3xl font-bold leading-tight md:text-4xl">Comment adopter l’IA sans perdre la maîtrise du développement ?</h2><p class="mt-5 text-sm leading-relaxed text-[#68708e]">L’enjeu n’est pas de multiplier les outils, mais de choisir des pratiques adaptées à votre organisation, mesurables et compatibles avec vos exigences de qualité.</p></div>
            <ol data-aos="fade-up"><li v-for="(item, index) in criteria" :key="item.title" class="flex gap-5 border-b border-[#ddddea] py-5 first:pt-0"><span class="font-cabinet-grotesk text-sm font-bold text-[#5638f5]">0{{ index + 1 }}</span><div><h3 class="font-cabinet-grotesk text-lg font-bold">{{ item.title }}</h3><p class="mt-1 text-sm text-[#68708e]">{{ item.text }}</p></div></li></ol>
          </div>
        </section>

        <OfferAssessment eyebrow="Explorer les possibles" title="Évaluez la maturité de vos pratiques de développement assisté par IA" :paragraphs="['Notre simulateur vous aide à situer vos pratiques actuelles, identifier les points de vigilance et ouvrir des pistes d’adoption adaptées à votre contexte.', 'Une première lecture pour préparer un diagnostic plus approfondi avec vos équipes.']" cta-label="Évaluer votre maturité" cta-to="/developpement-assiste-ia/simulateur" steps-eyebrow="Pour aller plus loin" steps-title="Un cadrage en 5 étapes" :steps="assessmentSteps" compact @cta-click="trackOffer('assessment', 'simulator')" />
      </div>

      <OfferConsultingBand eyebrow="Aller plus loin avec Wenovat" title="Transformer un diagnostic en trajectoire d’adoption" description="À partir de votre contexte, nous construisons avec vos équipes un cadre concret pour intégrer l’IA aux méthodes, outils et exigences de votre développement logiciel." cta-label="Échanger sur mon projet" cta-to="/nous-contacter" :items="consultingItems" :icons="icons" variant="wide-last" @cta-click="trackOffer('consulting', 'contact')" />

      <div class="bg-[linear-gradient(180deg,#f7f6ff_0%,#fff_48%,#f8faff_100%)]">
        <OfferJourney eyebrow="Nos trois offres pour vous accompagner" title="Une trajectoire progressive : Assess, Pilot, Scale" description="Du diagnostic à l’industrialisation, chaque étape apporte des actions et des livrables adaptés à votre niveau de maturité." :steps="journeySteps" compact />

        <section class="pb-12 pt-8 md:pb-14 md:pt-10" aria-labelledby="dev-why-title">
          <div class="mx-auto grid max-w-6xl gap-8 border-t border-[#e6e6ee] px-4 pt-10 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:gap-12">
            <div data-aos="fade-up"><p class="mb-4 text-xs font-bold uppercase tracking-wider text-[#5638f5]">Pourquoi Wenovat</p><h2 id="dev-why-title" class="font-cabinet-grotesk text-3xl font-bold leading-tight md:text-4xl">Une adoption ancrée dans vos pratiques</h2></div>
            <div class="grid gap-x-10 gap-y-8 sm:grid-cols-2"><article v-for="(item, index) in reasons" :key="item.title" data-aos="fade-up" :data-aos-delay="(index % 2) * 100"><svg class="mb-3 h-7 w-7 text-[#5638f5]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path :d="icons[item.icon]" /></svg><h3 class="font-cabinet-grotesk text-lg font-bold">{{ item.title }}</h3><p class="mt-2 text-sm leading-relaxed text-[#68708e]">{{ item.text }}</p></article></div>
          </div>
        </section>

        <OfferFinalCta :icon="icons.code" title="Prêt à donner un cadre à votre développement assisté par IA ?" description="Évaluez votre maturité, identifiez les pratiques à renforcer et définissez une trajectoire adaptée à vos équipes." :benefits="['Diagnostic initial', 'Priorités partagées', 'Trajectoire concrète']" primary-label="Évaluer votre maturité" primary-to="/developpement-assiste-ia/simulateur" secondary-label="Échanger avec un expert" secondary-to="/nous-contacter" @primary-click="trackOffer('final', 'simulator')" @secondary-click="trackOffer('final', 'contact')" />
      </div>
    </main>
    <Footer />
  </div>
</template>

<script setup>
import Header from '../partials/Header.vue'
import Footer from '../partials/Footer.vue'
import OfferHero from '../components/offers/OfferHero.vue'
import OfferAssessment from '../components/offers/OfferAssessment.vue'
import OfferConsultingBand from '../components/offers/OfferConsultingBand.vue'
import OfferJourney from '../components/offers/OfferJourney.vue'
import OfferFinalCta from '../components/offers/OfferFinalCta.vue'
import heroImage from '../images/ordinateur_ia_dev.png'
import { trackEvent } from '../lib/analytics.js'

const trackOffer = (ctaLocation, destination) => trackEvent('dev_ai_offer_cta_clicked', { cta_location: ctaLocation, destination })

const icons = {
  target: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Zm0 4a5 5 0 1 0 0 10 5 5 0 0 0 0-10Z',
  document: 'M5 2h10l4 4v16H5V2Zm10 0v5h4M8 11h8M8 15h8M8 19h5',
  network: 'M5 12 12 5l7 7-7 7-7-7Zm7-7V2m7 10h3m-10 7v3M5 12H2',
  list: 'M8 6h13M8 12h13M8 18h13M3 6h1m-1 6h1m-1 6h1',
  code: 'm8 4-6 8 6 8m8-16 6 8-6 8',
  shield: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z',
  pencil: 'm4 20 4.5-1 11-11-3.5-3.5-11 11L4 20Zm10-13 3.5 3.5',
  settings: 'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm0-13v2m0 16v2M2 12h2m16 0h2',
  chart: 'M4 19V12m5 7V7m5 12v-4m5 4V4M2 21h20',
  check: 'M4 12l5 5L20 6',
}
const cycleSteps = [
  { title: 'Besoin métier', icon: 'target', text: 'Clarifier objectifs et contraintes.' },
  { title: 'Spécifications', icon: 'document', text: 'Formaliser des exigences vérifiables.' },
  { title: 'Architecture', icon: 'network', text: 'Comparer les choix techniques.' },
  { title: 'Epics & stories', icon: 'list', text: 'Découper et prioriser le travail.' },
  { title: 'Développement', icon: 'code', text: 'Assister la production de code.' },
  { title: 'Tests & review', icon: 'check', text: 'Vérifier et relire les changements.' },
  { title: 'Documentation', icon: 'document', text: 'Maintenir un savoir partagé.' },
  { title: 'CI/CD', icon: 'settings', text: 'Automatiser les contrôles et livraisons.' },
]
const criteria = [
  { title: 'Méthodes & workflows', text: 'Où l’assistance IA apporte-t-elle de la valeur dans le cycle existant ?' },
  { title: 'Outils & intégration', text: 'Quels outils s’intègrent à vos environnements et à vos données ?' },
  { title: 'Qualité & gouvernance', text: 'Comment contrôler les productions et protéger les actifs sensibles ?' },
  { title: 'Adoption & mesure', text: 'Comment accompagner les équipes et observer les effets réels ?' },
]
const assessmentSteps = [
  { title: 'État des lieux', text: 'Pratiques et usages actuels.' },
  { title: 'Méthodes & spécifications', text: 'Cadre de travail partagé.' },
  { title: 'Outils & architecture', text: 'Intégration à votre socle.' },
  { title: 'Qualité & gouvernance', text: 'Contrôles et responsabilités.' },
  { title: 'Trajectoire d’adoption', text: 'Priorités et prochaines étapes.' },
]
const consultingItems = [
  { title: 'Diagnostic de maturité', icon: 'target' }, { title: 'Cas d’usage prioritaires', icon: 'list' },
  { title: 'Choix des outils', icon: 'settings' }, { title: 'Workflows partagés', icon: 'network' },
  { title: 'Qualité & sécurité', icon: 'shield' }, { title: 'Indicateurs de suivi', icon: 'chart' },
  { title: 'Feuille de route d’adoption', icon: 'pencil' },
]
const journeySteps = [
  { title: 'Assess', duration: '1 à 2 semaines', subtitle: 'Comprendre et prioriser', cardClass: 'border-[#bfd8f1] bg-[#f8fbff]', accentClass: 'bg-[#e6f1ff] text-[#175b9a]', dotClass: 'bg-[#3482c5]', deliverables: ['Évaluer les pratiques et les outils existants', 'Identifier les cas d’usage prioritaires', 'Cartographier les risques et contraintes', 'Définir les premiers indicateurs'], output: 'Diagnostic de maturité et feuille de route initiale.' },
  { title: 'Pilot', duration: '4 à 6 semaines', subtitle: 'Expérimenter avec une équipe', recommended: true, cardClass: 'border-[#5638f5] bg-[#faf9ff] shadow-[0_12px_32px_rgba(86,56,245,0.14)]', accentClass: 'bg-[#eeeaff] text-[#5638f5]', dotClass: 'bg-[#5638f5]', deliverables: ['Choisir un périmètre pilote représentatif', 'Intégrer les outils aux workflows', 'Mettre en place revues et contrôles', 'Mesurer et ajuster les pratiques'], output: 'Pilote documenté, retours d’expérience et plan de déploiement.' },
  { title: 'Scale', duration: '2 à 3 mois', subtitle: 'Déployer durablement', cardClass: 'border-[#bce5d9] bg-[#f7fcfa]', accentClass: 'bg-[#e1f6ed] text-[#087b68]', dotClass: 'bg-[#1b9e83]', deliverables: ['Étendre les pratiques aux équipes', 'Former et accompagner les référents', 'Industrialiser les standards de qualité', 'Suivre les indicateurs et améliorer'], output: 'Standards partagés, gouvernance et trajectoire d’amélioration.' },
]
const reasons = [
  { title: 'Expertise bout en bout', icon: 'code', text: 'Relier le cadrage métier aux réalités de production.' },
  { title: 'Accompagnement des équipes', icon: 'target', text: 'Faire évoluer les pratiques avec les personnes qui les utilisent.' },
  { title: 'Industrialisation', icon: 'settings', text: 'Inscrire l’assistance dans des workflows durables.' },
  { title: 'Qualité & conformité', icon: 'shield', text: 'Préserver la revue humaine, la sécurité et la traçabilité.' },
]
</script>
