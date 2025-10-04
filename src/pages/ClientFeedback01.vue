<template>
  <div class="flex flex-col min-h-screen overflow-hidden supports-[overflow:clip]:overflow-clip">

    <!-- Bg -->
    <div class="absolute inset-0 bg-linear-to-b from-indigo-100 to-white pointer-events-none -z-10" aria-hidden="true"></div>

    <!-- Illustration -->
    <div class="hidden md:block absolute left-1/2 -translate-x-1/2 pointer-events-none -z-10" aria-hidden="true">
      <img src="../images/hero-illustration.svg" class="max-w-none" width="1440" height="749" alt="Hero Illustration" />
    </div>

    <!-- Site header -->
    <Header />

    <!-- Page content -->
    <main class="grow">

      <!-- Page content -->
      <section>
        <div class="max-w-6xl mx-auto px-4 sm:px-6">
          <div class="pt-28 pb-8 md:pt-36 md:pb-16">

            <div class="md:flex md:justify-between">

              <!-- Sidebar -->
              <aside class="mb-8 md:mb-0 md:w-64 lg:w-72 md:ml-12 lg:ml-20 md:shrink-0 md:order-1">
                <div class="sticky top-8">

                  <div class="relative bg-gray-50 rounded-xl border border-gray-200 p-5">

                    <div class="text-center mb-6">
                      <img class="inline-flex mb-2" src="../images/bank.png" width="72" height="72" alt="Company 08" />
                      <h2 class="text-lg font-bold text-gray-800">Grand compte bancaire</h2>
                    </div>

                    <div class="flex justify-center md:justify-start mb-5">
                      <ul class="inline-flex flex-col space-y-2">
                        <li class="flex items-center">
                          <svg class="shrink-0 fill-gray-400 mr-3" width="14" height="14" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9.707 4.293a1 1 0 0 0-1.414 1.414L10.586 8H2V2h3a1 1 0 1 0 0-2H2a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h8.586l-2.293 2.293a1 1 0 1 0 1.414 1.414l4-4a1 1 0 0 0 0-1.414l-4-4Z" />
                          </svg>
                          <span class="text-sm text-gray-600">24 August, 2024</span>
                        </li>
                        <li class="flex items-center">
                          <svg class="shrink-0 fill-gray-400 mr-3" width="14" height="16" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="7" cy="7" r="2" />
                            <path d="M6.3 15.7c-.1-.1-4.2-3.7-4.2-3.8C.7 10.7 0 8.9 0 7c0-3.9 3.1-7 7-7s7 3.1 7 7c0 1.9-.7 3.7-2.1 5-.1.1-4.1 3.7-4.2 3.8-.4.3-1 .3-1.4-.1Zm-2.7-5 3.4 3 3.4-3c1-1 1.6-2.2 1.6-3.6 0-2.8-2.2-5-5-5S2 4.2 2 7c0 1.4.6 2.7 1.6 3.7 0-.1 0-.1 0 0Z" />
                          </svg>
                          <span class="text-sm text-gray-600">Paris</span>
                        </li>
                        <li class="flex items-center">
                          <img class="inline-flex fill-gray-400 mr-3" src="../images/cogwheel.png" width="20" height="20" alt="Company 08" />
                          <span class="text-sm text-gray-600">Banque & Finance</span>
                        </li>
                      </ul>
                    </div>

                  </div>

                </div>
              </aside>

              <!-- Main content -->
              <div class="md:grow">

                <!-- Job description / Case study -->
                <div class="pb-8">
                  <div class="mb-4">
                    <router-link class="text-indigo-500 font-medium" to="/"><span class="tracking-normal">&lt;-</span> Retour</router-link>
                  </div>

                  <h1 class="text-4xl font-extrabold font-inter mb-6">Transformer l’intelligence artificielle en valeur métier : intégration maîtrisée des LLM dans le SI bancaire</h1>

                  <!-- Intro -->
                  <div class="space-y-6 mb-8 text-gray-700">
                    <p>Nous avons accompagné un grand acteur majeur du secteur bancaire pour mener une étude stratégique sur l'usage et l'intégration des LLM dans son système d'information. Cette analyse visait à déterminer la pertinence, les risques et les modalités d'adoption de ces technologies avancées dans un environnement hautement réglementé.</p>

                    <p><strong>Notre accompagnement a mis en lumière plusieurs défis majeurs :</strong></p>
                    <ul class="list-disc list-inside space-y-3 ml-5 text-gray-600">
                      <li><strong>Complexité technologique :</strong> Les modèles nécessitant plus d'un milliard de paramètres produisent des résultats difficiles à expliquer et à tracer, aspect particulièrement sensible dans le secteur financier.</li>
                      <li><strong>Contextualisation coûteuse :</strong> L'adaptation des modèles aux besoins spécifiques du domaine bancaire s'est révélée plus complexe et onéreuse que prévu.</li>
                      <li><strong>Marché instable :</strong> L'évolution rapide des offres de LLM a compliqué la prise de décision à long terme dans un secteur exigeant une forte stabilité.</li>
                      <li><strong>Enjeux de cybersécurité :</strong> De nouveaux risques ont émergé, nécessitant des mesures de protection renforcées pour les données sensibles des clients.</li>
                      <li><strong>Contraintes réglementaires :</strong> La conformité avec la réglementation européenne et les exigences spécifiques au secteur bancaire a ajouté une couche de complexité.</li>
                      <li><strong>Coûts élevés :</strong> L'impact financier et environnemental (empreinte carbone) s'est avéré significatif et devait s'intégrer dans les objectifs RSE de l'établissement.</li>
                    </ul>
                  </div>

                  <!-- Démarche -->
                  <div class="space-y-6 mb-8">
                    <h2 class="text-2xl font-bold">I - Notre démarche</h2>
                    <p class="text-gray-700">Face à ces défis, nous avons structuré notre démarche autour de trois axes :</p>

                    <h3 class="mt-4 font-semibold">1. Mise en place d'un socle LLM d'entreprise</h3>
                    <ul class="list-disc list-inside space-y-3 ml-5 text-gray-600">
                      <li>Rationalisation des usages pour éviter la multiplication d'initiatives dispersées</li>
                      <li>Implémentation de garde-fous techniques et organisationnels adaptés aux exigences bancaires</li>
                      <li>Mutualisation des composants d'architecture pour optimiser les coûts</li>
                    </ul>

                    <h3 class="mt-4 font-semibold">2. Stratégie pragmatique d'expérimentation</h3>
                    <ul class="list-disc list-inside space-y-3 ml-5 text-gray-600">
                      <li>Utilisation de l'offre AWS offerte par l'entité informatique du groupe pour les cas d'usage métier prioritaires</li>
                      <li>Exploitation d'un environnement sécurisé de test pour évaluer d'autres fournisseurs sans surinvestir</li>
                      <li>Priorisation par la valeur, la faisabilité et la conformité réglementaire</li>
                    </ul>

                    <h3 class="mt-4 font-semibold">3. Montée en compétence ciblée</h3>
                    <ul class="list-disc list-inside space-y-3 ml-5 text-gray-600">
                      <li>Concentration des efforts sur le prompt engineering, compétence transverse à tous les usages</li>
                      <li>Développement progressif d'une expertise interne sur les technologies LLM avec focus sur la sécurité des données</li>
                    </ul>
                  </div>

                  <!-- Résultats -->
                  <div class="space-y-6 mb-8">
                    <h2 class="text-2xl font-bold">II - Résultats du démonstrateur</h2>
                    <p class="text-gray-700">Le démonstrateur a confirmé :</p>
                    <ul class="list-disc list-inside space-y-3 ml-5 text-gray-600">
                      <li>La pertinence des cas d'usage identifiés dans le contexte bancaire</li>
                      <li>L'intérêt d'un socle LLM mutualisé et sécurisé</li>
                      <li>Les avantages de capitalisation sur les socles de contextualisation et d'exposition</li>
                    </ul>

                    <p class="text-gray-700">Les bénéfices observés incluent :</p>
                    <ul class="list-disc list-inside space-y-3 ml-5 text-gray-600">
                      <li>Réutilisation des composants pour plusieurs projets</li>
                      <li>Mise en place de mécanismes de contrôle des usages et des coûts</li>
                      <li>Réduction de la complexité technique pour les équipes métier tout en maintenant un haut niveau de sécurité</li>
                    </ul>
                  </div>

                  <!-- Enseignements -->
                  <div class="space-y-6 mb-8">
                    <h2 class="text-2xl font-bold">III - Enseignements clés</h2>
                    <ul class="list-disc list-inside space-y-2 ml-5 text-gray-600">
                      <li><strong>Importance de la gouvernance :</strong> L'encadrement des initiatives LLM s'est révélé essentiel pour garantir la conformité réglementaire et optimiser les ressources.</li>
                      <li><strong>Approche progressive :</strong> La montée en charge par étapes a permis de limiter les risques tout en développant l'expertise interne.</li>
                      <li><strong>Centralisation vs flexibilité :</strong> L'équilibre entre un socle commun strict et l'agilité nécessaire aux métiers a été un facteur clé de succès.</li>
                      <li><strong>ROI à piloter finement :</strong> Les coûts élevés ont nécessité une vigilance constante sur la valeur générée et la conformité aux contraintes budgétaires.</li>
                    </ul>
                  </div>

                  <!-- Recommandations -->
                  <div class="space-y-6 mb-8">
                    <h2 class="text-2xl font-bold">IV - Recommandations pour la suite</h2>
                    <p class="text-gray-700">Pour la suite de notre démarche, nous avons recommandé les éléments suivants :</p>
                    <ul class="list-disc list-inside space-y-2 ml-5 text-gray-600">
                      <li>Industrialiser rapidement les socles pour une utilisation en production, avec une attention particulière aux exigences de sécurité bancaires</li>
                      <li>Maintenir un contrôle rigoureux sur les nouveaux usages en attendant une maturité homogène</li>
                      <li>Définir une organisation cible pour la gestion du cycle de vie des socles LLM, intégrant les fonctions de conformité et de risque</li>
                      <li>Mettre en place une structure transitoire assurant la continuité des projets en cours</li>
                      <li>Poursuivre l'acculturation des équipes aux enjeux et opportunités des LLM dans le contexte spécifique du secteur bancaire</li>
                    </ul>

                    <p class="text-gray-700">Ce retour d'expérience souligne l'importance d'une approche structurée, progressive et alignée avec la stratégie d'entreprise pour intégrer efficacement les LLM dans un système d'information critique du secteur financier.</p>
                  </div>

                </div>

              </div>

            </div>

          </div>
        </div>
      </section>

    </main>

    <!-- Site footer -->
    <Footer />

  </div>
</template>

<script>
import { ref } from 'vue'

import Header from '../partials/Header.vue'
import Footer from '../partials/Footer.vue'

export default {
  name: 'CaseStudyLLM',
  components: {
    Header,
    Footer,
  }
}
</script>
