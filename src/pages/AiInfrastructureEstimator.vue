<template>
  <div class="flex min-h-screen flex-col overflow-hidden">
    <Header />
    <main class="grow bg-white">
      <section class="relative overflow-hidden">
        <div class="absolute inset-0 bg-linear-to-bl from-indigo-100 to-white pointer-events-none -z-10" aria-hidden="true"></div>
        <div class="hidden md:block absolute left-1/2 -translate-x-1/2 pointer-events-none -z-10" aria-hidden="true">
          <img src="../images/hero-illustration.svg" class="max-w-none" width="1440" height="749" alt="Hero Illustration" />
        </div>
        <div class="max-w-6xl mx-auto px-4 sm:px-6">
          <div class="pt-28 pb-14 md:pt-36 md:pb-20">
            <div class="max-w-4xl">
              <div class="mb-5 inline-flex rounded-full border border-indigo-200 bg-white/80 px-4 py-2 text-sm font-bold text-indigo-500 shadow-sm">AI Infrastructure Estimator</div>
              <h1 class="h2 font-cabinet-grotesk mb-6">API, Cloud GPU ou On-Prem : quelle infrastructure pour votre workload IA ?</h1>
              <p class="max-w-3xl text-lg text-gray-500 mb-8">Un simulateur de pré-assessment pour cadrer vos décisions d’infrastructure d’inférence : coûts, performance, mémoire, sizing GPU et scénarios à approfondir.</p>
              <div class="flex flex-col gap-3 sm:flex-row sm:items-center">
                <router-link class="btn text-white bg-gray-900 hover:bg-gray-800 shadow-sm" to="/ai-infrastructure/simulateur">Tester le simulateur</router-link>
                <span class="text-sm font-medium text-gray-500">Gratuit · Quelques minutes · Estimation indicative</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="bg-linear-to-br from-white to-indigo-50/40 py-12 md:py-20">
        <div class="max-w-6xl mx-auto px-4 sm:px-6">
          <div class="max-w-3xl pb-10">
            <h2 class="h2 font-cabinet-grotesk mb-4">Pourquoi cette décision est difficile</h2>
            <p class="text-lg text-gray-500">Le coût réel dépend du volume, des tokens, des pics de charge, de la performance attendue, de la sensibilité des données, du contrôle recherché et de la capacité opérationnelle.</p>
          </div>
          <div class="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <article v-for="item in difficultyCards" :key="item.title" class="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
              <div class="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-lg">{{ item.icon }}</div>
              <h3 class="font-cabinet-grotesk text-xl font-bold text-gray-900 mb-2">{{ item.title }}</h3>
              <p class="text-sm text-gray-500">{{ item.text }}</p>
            </article>
          </div>
        </div>
      </section>

      <section class="py-12 md:py-20">
        <div class="max-w-6xl mx-auto px-4 sm:px-6">
          <div class="grid gap-8 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 class="h2 font-cabinet-grotesk mb-4">Un simulateur conçu comme un pré-assessment, pas comme une boîte noire</h2>
              <p class="text-lg text-gray-500 mb-6">Le simulateur part de votre use case, de votre modèle, de votre trafic et de vos contraintes pour produire des signaux de décision explicables. Il met en évidence les hypothèses, les seuils d’investigation et les benchmarks nécessaires avant une décision de production.</p>
              <router-link class="btn-sm inline-flex text-white bg-gray-900 hover:bg-gray-800" to="/ai-infrastructure/simulateur">Lancer une estimation</router-link>
            </div>
            <div class="grid gap-4 sm:grid-cols-2">
              <article v-for="item in simulatorHighlights" :key="item.title" class="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
                <h3 class="font-bold text-gray-900 mb-2">{{ item.title }}</h3>
                <p class="text-sm text-gray-500">{{ item.text }}</p>
              </article>
            </div>
          </div>
        </div>
      </section>

      <section class="bg-zinc-900 py-12 md:py-20 text-white">
        <div class="max-w-6xl mx-auto px-4 sm:px-6">
          <div class="grid gap-8 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 class="h2 font-cabinet-grotesk mb-4">AI Infrastructure Decision Assessment</h2>
              <p class="text-zinc-400">Le simulateur fournit un premier ordre de grandeur. Pour un workload réel, Wenovat approfondit le sizing, les economics, les contraintes de sécurité et l’architecture cible.</p>
              <a class="btn-sm mt-6 inline-flex text-white bg-indigo-500 hover:bg-indigo-600" href="/nous-contacter">Échanger avec un architecte</a>
            </div>
            <div class="grid gap-3 sm:grid-cols-2"><div v-for="item in offerItems" :key="item" class="rounded-2xl bg-white/10 p-4 text-sm font-bold">{{ item }}</div></div>
          </div>
        </div>
      </section>

      <section class="py-12 md:py-20">
        <div class="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 class="h2 font-cabinet-grotesk mb-8">Pour quels workloads ?</h2>
          <div class="grid gap-5 sm:grid-cols-2 lg:grid-cols-5"><article v-for="item in useCaseCards" :key="item.t" class="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm"><h3 class="font-bold text-gray-900 mb-2">{{ item.t }}</h3><p class="text-sm text-gray-500">{{ item.d }}</p></article></div>
        </div>
      </section>

      <section class="bg-linear-to-br from-white to-indigo-50/20 py-12 md:py-20"><div class="max-w-3xl mx-auto px-4 sm:px-6 text-center"><div class="mb-8 inline-flex h-20 w-20 items-center justify-center rounded-xl bg-white shadow-md"><span class="text-3xl">◈</span></div><h2 class="font-cabinet-grotesk text-3xl md:text-4xl font-bold text-zinc-900 mb-4">Vous avez un workload IA qui passe en production ?</h2><router-link class="btn text-zinc-100 bg-zinc-900 hover:bg-zinc-800 shadow-sm" to="/ai-infrastructure/simulateur">Tester le simulateur</router-link></div></section>
    </main>
    <Footer />
  </div>
</template>

<script setup>
import Header from '../partials/Header.vue'
import Footer from '../partials/Footer.vue'

const difficultyCards = [
  { title: 'Coût', icon: '€', text: 'Tokens, heures GPU, taux d’utilisation et exploitation changent rapidement les economics.' },
  { title: 'Performance', icon: '↯', text: 'TTFT, throughput, batching et concurrence doivent être validés sous charge réelle.' },
  { title: 'Souveraineté', icon: '◈', text: 'La sensibilité des données influence le niveau de contrôle attendu.' },
  { title: 'Complexité opérationnelle', icon: '⚙', text: 'Runtime, HA, monitoring et exploitation GPU pèsent dans la décision.' },
]
const simulatorHighlights = [
  { title: 'Profil du workload', text: 'Use case, classe de modèle, trafic, tokens et pics de charge.' },
  { title: 'Sizing préliminaire', text: 'Mémoire, KV cache, débit, GPU candidates et capacité HA.' },
  { title: 'Comparaison économique', text: 'API, Cloud GPU et On-Prem avec coût mensuel et €/1M tokens.' },
  { title: 'Décision explicable', text: 'Signaux, hypothèses, confiance et benchmarks à valider ensuite.' },
]
const offerItems = ['Workload assessment','API vs Managed vs Cloud GPU vs On-Prem','Sizing préliminaire','TCO','Risques et contraintes','Architecture cible','Roadmap']
const useCaseCards = [{t:'RAG & assistants internes',d:'Analysez les coûts et la pression mémoire liés aux longs contextes.'},{t:'Agents IA',d:'Prenez en compte les appels multiples et la variance par tâche.'},{t:'Copilots métier',d:'Cadrez latence, concurrence et expérience utilisateur.'},{t:'Batch AI',d:'Optimisez throughput, utilisation GPU et economics.'},{t:'Vision / multimodal',d:'Identifiez les hypothèses à benchmarker en priorité.'}]
</script>
