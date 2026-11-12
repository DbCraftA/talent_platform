<template>
  <div class="flex min-h-screen flex-col overflow-hidden bg-white text-[#11142e]">
    <Header />
    <main class="grow">
      <div class="bg-linear-to-b from-white via-indigo-50 to-white">
      <OfferHero :title-lines="['Infrastructure IA :', 'de l’expérimentation']" accent="à l’échelle" promise="Concevez une infrastructure IA adaptée à vos usages, performante, sécurisée et maîtrisée en coût." description="API de modèles, Cloud GPU ou infrastructure dédiée : Wenovat vous accompagne dans le choix, la conception et l’industrialisation de votre infrastructure IA, de vos premières expérimentations jusqu’à la montée en charge." :benefits="benefits" :image="gpuImage" :image-width="1452" :image-height="1004" image-alt="Une puce IA reliant modèles, données, sécurité, observabilité et gouvernance aux environnements AWS, Azure, Google Cloud et sur site." primary-label="Analyser mon scénario" primary-to="/ai-infrastructure/simulateur" secondary-label="Échanger avec un expert" secondary-to="/nous-contacter" @primary-click="trackEvent('nav_click', { destination: 'simulator', nav_location: 'estimator' })" @secondary-click="trackEvent('infra_consulting_cta_clicked', { cta_location: 'estimator_hero', destination: 'contact' })" />

      <section class="pb-8 pt-16 md:pt-20" aria-labelledby="constat-title">
        <div class="mx-auto max-w-6xl px-4 sm:px-6">
          <div class="mx-auto max-w-4xl text-center" data-aos="fade-up">
            <p class="mx-auto mb-5 w-fit rounded-full bg-[#f1efff] px-5 py-2 text-xs font-bold uppercase tracking-wider text-[#5638f5]">Le constat</p>
            <h2 id="constat-title" class="font-cabinet-grotesk text-3xl font-bold leading-tight md:text-4xl">Une architecture adaptée aux premiers usages peut <span class="text-[#5638f5]">atteindre ses limites</span> à mesure que la charge augmente</h2>
            <p class="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-[#68708e]">Quand les usages se multiplient et que la charge augmente, les limites de l’architecture initiale peuvent apparaître : quotas, performances, capacité et coûts d’exploitation.</p>
          </div>
          <div class="mx-auto mt-8 max-w-5xl rounded-2xl border border-[#2b2c3b]/15 bg-white p-4 shadow-[0_12px_36px_rgba(23,23,30,0.05)] sm:p-7" data-aos="fade-up"><WorkloadEvolutionChart /></div>
        </div>
      </section>

      <section class="pb-16 pt-8 md:pb-20" aria-labelledby="criteria-title">
        <div class="mx-auto max-w-6xl border-t border-[#eeeef6] px-4 pt-10 sm:px-6">
          <div class="mx-auto mb-8 max-w-3xl text-center" data-aos="fade-up">
            <p class="mb-3 text-xs font-bold uppercase tracking-wider text-[#5638f5]">Les critères de décision</p>
            <h2 id="criteria-title" class="font-cabinet-grotesk text-3xl font-bold leading-tight md:text-4xl">Quel scénario d’infrastructure pour vos usages IA ?</h2>
            <p class="mt-3 text-sm leading-relaxed text-[#68708e]">Comment répondre à vos usages actuels et futurs sans surdimensionner vos investissements ? Le bon scénario dépend du volume, des performances attendues, de la sensibilité des données, du coût d’exploitation et des compétences disponibles.</p>
          </div>
          <div class="grid gap-3 sm:grid-cols-2">
            <article v-for="(item, index) in difficultyCards" :key="item.title" class="flex gap-4 rounded-2xl bg-[#202127] p-5 text-white md:p-6" data-aos="fade-up" :data-aos-delay="(index % 2) * 100">
              <span class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/10 text-[#b2a7ff]" aria-hidden="true"><svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path :d="icons[item.icon]" /></svg></span>
              <div><h3 class="font-cabinet-grotesk text-lg font-bold">{{ item.title }}</h3><p class="mt-2 text-sm leading-relaxed text-[#c6c6d0]">{{ item.text }}</p></div>
            </article>
          </div>
        </div>
      </section>

      <OfferAssessment eyebrow="Explorer les possibles" title="Explorez les premières pistes pour votre infrastructure IA" :paragraphs="['Avant de vous lancer, notre simulateur vous permet d’explorer différents scénarios d’infrastructure et d’obtenir de premières pistes de réflexion sur le dimensionnement, les coûts et les options de déploiement.', 'Une première approche pour alimenter votre réflexion et identifier les questions à approfondir avant d’engager un cadrage plus détaillé.']" cta-label="Analyser mon scénario" cta-to="/ai-infrastructure/simulateur" steps-eyebrow="Pour aller plus loin" steps-title="Un cadrage approfondi en 5 étapes" :steps="simulatorHighlights" @cta-click="trackEvent('nav_click', { destination: 'simulator', nav_location: 'estimator' })" />
      </div>

      <OfferConsultingBand eyebrow="Aller plus loin avec Wenovat" title="Passer du pré-assessment à une décision engageable" description="Le simulateur vous donne de premières pistes de réflexion. Wenovat peut ensuite approfondir vos besoins, comparer les scénarios et définir une architecture adaptée à vos contraintes." cta-label="Échanger sur mon scénario" cta-to="/nous-contacter" :items="offerItems" :icons="icons" @cta-click="trackEvent('infra_consulting_cta_clicked', { cta_location: 'estimator_consulting', destination: 'contact' })" />

      <div class="bg-[linear-gradient(180deg,#f7f6ff_0%,#fff_48%,#f8faff_100%)]">
      <OfferJourney eyebrow="Nos trois offres pour vous accompagner" title="Une trajectoire d’adoption adaptée à votre contexte" description="De l’évaluation initiale à l’industrialisation, Wenovat vous accompagne avec des objectifs et des livrables concrets. Chaque offre peut être mobilisée selon la maturité de votre projet." :steps="journeySteps" />

      <section class="pb-16 pt-10 md:pb-20" aria-labelledby="use-cases-title">
        <div class="mx-auto max-w-6xl px-4 sm:px-6">
          <div data-aos="fade-up"><p class="mb-4 text-xs font-bold uppercase tracking-wider text-[#5638f5]">Cas d’usage</p>
          <h2 id="use-cases-title" class="font-cabinet-grotesk text-3xl font-bold leading-tight md:text-4xl">Des architectures adaptées à vos usages IA</h2><p class="mt-3 max-w-4xl text-sm leading-relaxed text-[#68708e]">Chaque workload présente des exigences différentes en matière de performance, de dimensionnement et d’exploitation. Nous adaptons l’architecture à vos besoins réels.</p></div>
          <div class="mt-10 grid gap-x-12 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-y-14">
            <article v-for="(item, index) in useCaseCards" :key="item.title" data-aos="fade-up" :data-aos-delay="(index % 3) * 100">
              <svg class="mb-4 h-7 w-7 text-[#5638f5]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path :d="icons[item.icon]" /></svg>
              <h3 class="font-cabinet-grotesk text-lg font-bold leading-tight">{{ item.title }}</h3>
              <p class="mt-2 max-w-xs text-sm leading-relaxed text-[#68708e]">{{ item.text }}</p>
            </article>
          </div>
        </div>
      </section>

      <OfferFinalCta :icon="icons.chip" title="Votre infrastructure IA est-elle prête à passer à l’échelle ?" description="Explorez les scénarios possibles pour vos usages IA, identifiez les premières pistes de réflexion et les points à approfondir avant d’engager votre infrastructure." primary-label="Analyser mon scénario" primary-to="/ai-infrastructure/simulateur" secondary-label="Échanger avec un expert" secondary-to="/nous-contacter" @primary-click="trackEvent('nav_click', { destination: 'simulator', nav_location: 'estimator' })" @secondary-click="trackEvent('infra_consulting_cta_clicked', { cta_location: 'estimator_final', destination: 'contact' })" />
      </div>
    </main>
    <Footer />
  </div>
</template>

<script setup>
import Header from '../partials/Header.vue'
import Footer from '../partials/Footer.vue'
import WorkloadEvolutionChart from '../partials/WorkloadEvolutionChart.vue'
import { trackEvent } from '../lib/analytics.js'
import gpuImage from '../images/gpu_with_labels.png'
import OfferHero from '../components/offers/OfferHero.vue'
import OfferAssessment from '../components/offers/OfferAssessment.vue'
import OfferConsultingBand from '../components/offers/OfferConsultingBand.vue'
import OfferJourney from '../components/offers/OfferJourney.vue'
import OfferFinalCta from '../components/offers/OfferFinalCta.vue'

const icons = {
  chart: 'M4 19V12m5 7V7m5 12v-4m5 4V4M2 21h20',
  bolt: 'm13 2-9 12h7l-1 8 10-12h-7V2Z',
  shield: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z',
  settings: 'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm0-13v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42',
  target: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Zm0 4a5 5 0 1 0 0 10 5 5 0 0 0 0-10Zm0 3a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z',
  database: 'M4 6c0-4 16-4 16 0s-16 4-16 0Zm0 0v12c0 4 16 4 16 0V6M4 12c0 4 16 4 16 0',
  chip: 'M6 6h12v12H6V6Zm3 3h6v6H9V9ZM9 2v4m6-4v4M9 18v4m6-4v4M2 9h4m-4 6h4m12-6h4m-4 6h4',
  pencil: 'm4 20 4.5-1 11-11-3.5-3.5-11 11L4 20Zm10-13 3.5 3.5',
  message: 'M4 4h16v12H8l-4 4V4Z',
  clock: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Zm0 4v5l4 2',
  code: 'm8 4-6 8 6 8m8-16 6 8-6 8',
  network: 'M5 12 12 5l7 7-7 7-7-7Zm7-7V2m7 10h3m-10 7v3M5 12H2',
}

const benefits = ['Plus de performance', 'Rationalisation des coûts', 'Sécurisation et gouvernance']
const difficultyCards = [
  { title: 'Budget & trajectoire de coût', icon: 'chart', text: 'Comparer les coûts en tenant compte du volume, du taux d’utilisation et des charges d’exploitation.' },
  { title: 'Niveau de service attendu', icon: 'bolt', text: 'Mettre en regard réactivité, débit, concurrence et disponibilité avec les ressources nécessaires.' },
  { title: 'Contrôle & localisation des données', icon: 'shield', text: 'Adapter les choix d’hébergement aux exigences de confidentialité, de conformité et de souveraineté.' },
  { title: 'Capacité à opérer la solution', icon: 'settings', text: 'Prévoir les compétences, la supervision et la maintenance nécessaires dans la durée.' },
]
const simulatorHighlights = [
  { title: 'Cadrage des besoins', icon: 'target', text: 'Cas d’usage, objectifs, volumes et contraintes.' },
  { title: 'Données & modèles', icon: 'database', text: 'Données disponibles, gouvernance et choix des modèles.' },
  { title: 'Architecture & infrastructure', icon: 'chip', text: 'Scénarios d’hébergement, dimensionnement et coûts.' },
  { title: 'Sécurité & observabilité', icon: 'shield', text: 'Conformité, accès, supervision et consommation.' },
  { title: 'Trajectoire d’industrialisation', icon: 'pencil', text: 'MLOps/LLMOps, automatisation et feuille de route.' },
]
const offerItems = [
  { title: 'Analyse des besoins', icon: 'target' }, { title: 'Choix du déploiement', icon: 'chip' },
  { title: 'Dimensionnement ciblé', icon: 'database' }, { title: 'Trajectoire des coûts', icon: 'chart' },
  { title: 'Risques & contraintes', icon: 'shield' }, { title: 'Architecture cible', icon: 'network' },
  { title: 'Plan de déploiement', icon: 'pencil' },
]
const journeySteps = [
  { title: 'Assess', duration: '2 à 3 semaines', subtitle: 'Évaluer et définir la trajectoire', cardClass: 'border-[#bfd8f1] bg-[#f8fbff]', accentClass: 'bg-[#e6f1ff] text-[#175b9a]', dotClass: 'bg-[#3482c5]', deliverables: ['Analyse des besoins et des cas d’usage', 'Étude des contraintes et scénarios d’architecture', 'Dimensionnement initial et évaluation des coûts', 'Recommandations et feuille de route'], output: 'Diagnostic, scénarios d’architecture et feuille de route.' },
  { title: 'Pilot', duration: '4 à 6 semaines', subtitle: 'Expérimenter et valider les choix', recommended: true, cardClass: 'border-[#5638f5] bg-[#faf9ff] shadow-[0_12px_32px_rgba(86,56,245,0.14)]', accentClass: 'bg-[#eeeaff] text-[#5638f5]', dotClass: 'bg-[#5638f5]', deliverables: ['Déploiement d’un environnement pilote', 'Intégration des modèles et des données', 'Sécurisation et contrôle des accès', 'Tests de performance et mesure des coûts'], output: 'Plateforme pilote, résultats de validation et plan de généralisation.' },
  { title: 'Scale', duration: '3 à 6 mois', subtitle: 'Industrialiser et passer à l’échelle', cardClass: 'border-[#bce5d9] bg-[#f7fcfa]', accentClass: 'bg-[#e1f6ed] text-[#087b68]', dotClass: 'bg-[#1b9e83]', deliverables: ['Déploiement de la plateforme en production', 'Automatisation et pratiques MLOps / LLMOps', 'Sécurité, gouvernance et observabilité', 'Optimisation des coûts et des performances'], output: 'Plateforme industrialisée, standards d’exploitation et documentation.' },
]
const useCaseCards = [
  { title: 'Conversation / chat', icon: 'message', text: 'Temps de réponse, concurrence et qualité de service.' },
  { title: 'RAG / recherche documentaire', icon: 'database', text: 'Gestion du contexte, embeddings, indexation et données.' },
  { title: 'Agents IA', icon: 'network', text: 'Orchestration, appels multiples aux modèles et variabilité des charges.' },
  { title: 'Traitements batch', icon: 'clock', text: 'Débit, fenêtre de traitement, utilisation et coûts.' },
  { title: 'Code / copilots', icon: 'code', text: 'Confidentialité du code, contexte et accès aux dépôts.' },
]
</script>
