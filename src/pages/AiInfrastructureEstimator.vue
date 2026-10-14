<template>
  <div class="flex min-h-screen flex-col overflow-hidden bg-white">
    <Header />
    <main class="grow">
      <section class="relative overflow-hidden bg-linear-to-b from-indigo-100 to-white">
        <div class="hidden md:block absolute left-1/2 -translate-x-1/2 pointer-events-none -z-10" aria-hidden="true">
          <img src="../images/hero-illustration.svg" class="max-w-none" width="1440" height="749" alt="Hero Illustration" />
        </div>
        <div class="max-w-6xl mx-auto px-4 sm:px-6">
          <div class="grid gap-10 pt-28 pb-14 md:pt-36 md:pb-20 lg:grid-cols-[minmax(0,1fr)_minmax(380px,0.9fr)] lg:items-center">
            <div class="max-w-4xl">
              <div class="mb-5 inline-flex rounded-full border border-indigo-200 bg-white/80 px-4 py-2 text-sm font-bold text-indigo-500 shadow-sm">AI Infrastructure Architecture Review</div>
              <h1 class="h2 font-cabinet-grotesk mb-6">De l’expérimentation à l’échelle</h1>
              <p class="max-w-3xl text-lg text-gray-500 mb-3">API, Cloud GPU ou infrastructure dédiée : Wenovat vous aide à comparer les options, cadrer les compromis et identifier le scénario le plus adapté à vos contraintes.</p>
              <p class="max-w-3xl text-base font-medium text-gray-600 mb-8">Architecture, dimensionnement, options d’hébergement et points à valider avant production.</p>
              <div class="flex flex-col gap-3 sm:flex-row sm:items-center">
                <router-link class="btn text-white bg-gray-900 hover:bg-gray-800 shadow-sm" to="/ai-infrastructure/simulateur">Analyser mon scénario</router-link>
                <span class="text-sm font-medium text-gray-500">Gratuit · Quelques minutes · Première estimation</span>
              </div>
            </div>
            <div class="relative hidden lg:block" aria-hidden="true">
              <div class="absolute inset-10 rounded-full bg-indigo-300/30 blur-3xl"></div>
              <img src="../images/gpu.png" class="relative ml-auto w-full max-w-[560px] drop-shadow-2xl" width="1600" height="1200" alt="" />
            </div>
          </div>
        </div>
      </section>

      <section class="bg-white pt-20 pb-12 md:pt-28 md:pb-16" aria-label="Évolution conceptuelle de la charge et du seuil de capacité">
        <div class="max-w-6xl mx-auto px-4 sm:px-6">
          <div class="mx-auto max-w-5xl px-0 sm:px-2 md:px-4">
            <WorkloadEvolutionChart />
          </div>
        </div>
      </section>

      <section class="bg-linear-to-b from-white to-indigo-50/70 pt-8 pb-16 md:pt-12 md:pb-24">
        <div class="max-w-6xl mx-auto px-4 sm:px-6">
          <div class="mx-auto max-w-3xl pb-14 text-center md:pb-16">
            <h2 class="h3 font-cabinet-grotesk mb-8">Une architecture adaptée aux premiers usages peut atteindre ses limites à mesure que la charge augmente</h2>
            <p class="mx-auto max-w-2xl text-lg leading-relaxed text-gray-500">Le bon scénario dépend du volume, des performances attendues, de la sensibilité des données, du niveau de contrôle recherché, du coût d’exploitation et des compétences disponibles en interne.</p>
          </div>
          <div class="grid gap-6 lg:grid-cols-2">
            <article v-for="item in difficultyCards" :key="item.title" class="relative flex min-h-[220px] flex-col justify-between overflow-hidden rounded-[24px] border border-zinc-700/80 bg-linear-to-b from-zinc-700 to-zinc-900 p-7 shadow-lg md:p-8">
              <div class="mb-8 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-white/5 text-lg text-white/80 ring-1 ring-white/10">{{ item.icon }}</div>
              <div>
                <h3 class="font-cabinet-grotesk text-xl font-semibold leading-snug tracking-tight text-white md:text-2xl">{{ item.title }}</h3>
                <p class="mt-5 max-w-xl text-base leading-relaxed text-zinc-300">{{ item.text }}</p>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section class="bg-linear-to-b from-indigo-50/70 to-white py-16 md:py-24">
        <div class="max-w-6xl mx-auto px-4 sm:px-6">
          <div class="grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-center">
            <div class="max-w-xl">
              <h2 class="h2 font-cabinet-grotesk mb-4">Un premier cadre de décision</h2>
              <p class="text-lg leading-relaxed text-gray-500 mb-8">Le pré-assessment transforme votre contexte et vos contraintes en hypothèses explicites : capacité nécessaire, options d’hébergement, compromis économiques et points à valider avant de décider.</p>
              <router-link class="btn-sm inline-flex text-white bg-gray-900 hover:bg-gray-800" to="/ai-infrastructure/simulateur">Analyser mon scénario</router-link>
            </div>
            <div class="relative">
              <div class="absolute left-4 top-4 bottom-4 hidden w-px bg-linear-to-b from-indigo-200 via-zinc-200 to-transparent sm:block" aria-hidden="true"></div>
              <div class="space-y-7">
                <article v-for="(item, index) in simulatorHighlights" :key="item.title" class="relative flex gap-5 sm:pl-12">
                  <div class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-zinc-900 text-sm font-bold text-white shadow-sm sm:absolute sm:left-0">{{ index + 1 }}</div>
                  <div>
                    <h3 class="font-cabinet-grotesk text-xl font-bold text-gray-900 mb-2">{{ item.title }}</h3>
                    <p class="text-base leading-relaxed text-gray-500">{{ item.text }}</p>
                  </div>
                </article>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="bg-linear-to-b from-zinc-900 via-zinc-900 to-indigo-950 py-12 md:py-20 text-white">
        <div class="max-w-6xl mx-auto px-4 sm:px-6">
          <div class="grid gap-8 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 class="h2 font-cabinet-grotesk mb-4">Passer du pré-assessment à une décision engageable</h2>
              <p class="text-zinc-400">Le simulateur fournit un premier cadre. Wenovat peut ensuite challenger les hypothèses, comparer les options et sécuriser la décision avant le passage en production.</p>
              <a class="btn-sm mt-6 inline-flex text-white bg-indigo-500 hover:bg-indigo-600" href="/nous-contacter">Échanger sur mon scénario</a>
            </div>
            <div class="grid gap-3 sm:grid-cols-2"><div v-for="item in offerItems" :key="item" class="rounded-2xl bg-white/10 p-4 text-sm font-bold">{{ item }}</div></div>
          </div>
        </div>
      </section>

      <section class="bg-linear-to-b from-indigo-50/70 to-white py-16 md:py-24">
        <div class="max-w-6xl mx-auto px-4 sm:px-6">
          <div class="mx-auto max-w-3xl text-center pb-12 md:pb-16">
            <h2 class="h2 font-cabinet-grotesk mb-4">Pour quels workloads ?</h2>
            <p class="text-lg leading-relaxed text-gray-500">Des situations d’usage différentes, mais une même nécessité : rendre explicites les hypothèses de charge, de performance et d’exploitation.</p>
          </div>
          <div class="mx-auto grid max-w-sm gap-10 sm:max-w-none sm:grid-cols-2 md:gap-x-12 md:gap-y-14 lg:grid-cols-5">
            <article v-for="item in useCaseCards" :key="item.t" class="text-center sm:text-left">
              <div class="mb-4 inline-flex h-9 w-9 items-center justify-center rounded-full bg-indigo-50 text-sm font-bold text-indigo-500">○</div>
              <h3 class="font-cabinet-grotesk text-lg font-bold leading-snug text-gray-900 mb-2">{{ item.t }}</h3>
              <p class="text-sm leading-relaxed text-gray-500">{{ item.d }}</p>
            </article>
          </div>
        </div>
      </section>

       <section class="bg-linear-to-b from-white to-white py-12 md:py-20"><div class="max-w-3xl mx-auto px-4 sm:px-6 text-center"><div class="mb-8 inline-flex h-20 w-20 items-center justify-center rounded-xl bg-white shadow-md"><span class="text-3xl">◈</span></div><h2 class="font-cabinet-grotesk text-3xl md:text-4xl font-bold text-zinc-900 mb-4">Vous préparez un workload pour la production ?</h2><p class="mb-6 text-lg text-gray-500">Obtenez un premier scénario d’architecture et identifiez les points à valider avant d’engager votre infrastructure.</p><router-link class="btn text-zinc-100 bg-zinc-900 hover:bg-zinc-800 shadow-sm" to="/ai-infrastructure/simulateur">Analyser mon scénario</router-link></div></section>
    </main>
    <Footer />
  </div>
</template>

<script setup>
import Header from '../partials/Header.vue'
import Footer from '../partials/Footer.vue'
import WorkloadEvolutionChart from '../partials/WorkloadEvolutionChart.vue'

const difficultyCards = [
  { title: 'Budget & trajectoire de coût', icon: '€', text: 'Comparer le coût apparent ne suffit pas : volume, taux d’utilisation et exploitation peuvent fortement faire évoluer l’équation.' },
  { title: 'Niveau de service attendu', icon: '↯', text: 'Réactivité, débit, concurrence et disponibilité doivent être mis en regard du coût et de la capacité réelle.' },
  { title: 'Contrôle & localisation des données', icon: '◈', text: 'La sensibilité des données et les contraintes d’hébergement influencent le niveau de contrôle nécessaire.' },
  { title: 'Capacité à opérer la solution', icon: '⚙', text: 'Une architecture performante n’est pertinente que si elle peut être exploitée, supervisée et maintenue dans la durée.' },
]
const simulatorHighlights = [
  { title: 'Comprendre votre contexte', text: 'Usage, volume, modèle, trafic et contraintes.' },
  { title: 'Estimer les besoins', text: 'Capacité, mémoire et ordre de grandeur de l’infrastructure.' },
  { title: 'Comparer les scénarios', text: 'Identifier les options d’hébergement à approfondir.' },
  { title: 'Préparer la décision', text: 'Mettre en évidence les hypothèses, risques et validations nécessaires.' },
]
const offerItems = ['Analyse du besoin','Arbitrage API / Cloud GPU / On-Prem','Dimensionnement détaillé','Coûts & trajectoire','Risques & contraintes','Architecture cible','Plan de mise en œuvre']
const useCaseCards = [{t:'Conversation / chat',d:'Cadrez réactivité, concurrence et qualité de service pour les usages interactifs.'},{t:'RAG / recherche documentaire',d:'Prenez en compte contexte, embeddings, indexation et contraintes liées aux données.'},{t:'Agentique',d:'Anticipez les appels multiples, la variabilité par tâche et les contraintes d’exécution.'},{t:'Batch',d:'Arbitrez débit, fenêtre de traitement, utilisation de la capacité et coût.'},{t:'Code / copilots développeurs',d:'Cadrez contexte, confidentialité du code, accès aux repositories et retrieval.'}]
</script>
