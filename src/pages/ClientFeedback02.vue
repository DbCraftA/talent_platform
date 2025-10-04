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
                      <img class="inline-flex mb-2" src="../images/bank.png" width="72" height="72" alt="Grand compte bancaire" />
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
                          <img class="inline-flex fill-gray-400 mr-3" src="../images/cogwheel.png" width="20" height="20" alt="Banque & Finance" />
                          <span class="text-sm text-gray-600">Banque & Finance</span>
                        </li>
                      </ul>
                    </div>

                  </div>

                </div>
              </aside>

              <!-- Main content -->
              <div class="md:grow">

                <!-- Case study -->
                <div class="pb-8">
                  <div class="mb-4">
                    <router-link class="text-indigo-500 font-medium" to="/"><span class="tracking-normal">&lt;-</span> Retour</router-link>
                  </div>

                  <h1 class="text-4xl font-extrabold font-inter mb-6">Allier innovation et conformité : adoption maîtrisée du cloud par un grand compte bancaire</h1>

                  <div class="space-y-8 mb-8 text-gray-700">
                    <p>Nous avons accompagné un acteur majeur du secteur bancaire dans l'élaboration et la mise en œuvre de sa stratégie d'adoption du cloud. Cette démarche s'inscrivait dans un contexte de transformation numérique où le marché bascule progressivement vers des solutions cloud, tout en devant respecter les contraintes spécifiques au secteur financier.</p>

                    <p>La particularité de ce projet résidait dans la nécessité de concilier les opportunités d'innovation offertes par le cloud avec les impératifs de sécurité et de conformité réglementaire propres aux établissements bancaires. Le client souhaitait notamment préserver sa réputation et la confiance de ses clients en sécurisant particulièrement les données sensibles.</p>
                  </div>

                  <div class="space-y-6 mb-8">
                    <h2 class="text-2xl font-bold">I - Notre démarche</h2>

                    <p class="font-semibold">1. Définition d'une approche "Best Fit" hybride</p>
                    <p>Notre première étape a consisté à définir un cadre stratégique clair pour distinguer :</p>
                    <ul class="list-disc list-inside space-y-3 ml-5 text-gray-600">
                      <li>Les systèmes et données devant rester hébergés en OnPremise, notamment ceux dont la compromission pourrait avoir un impact sur la réputation de l'établissement</li>
                      <li>Les éléments du SI à faible valeur ajoutée pouvant migrer vers des solutions SaaS</li>
                      <li>Les cas d'usage spécifiques justifiant une utilisation opportuniste du cloud public</li>
                    </ul>

                    <p>Cette approche s'est nourrie de plusieurs sources :</p>
                    <ul class="list-disc list-inside space-y-3 ml-5 text-gray-600">
                      <li>L'apprentissage issu d'un démonstrateur cloud préalablement réalisé</li>
                      <li>L'alignement avec la stratégie groupe existante</li>
                      <li>Un état de l'art issu des analyses Gartner, ajusté au contexte spécifique de l'établissement</li>
                      <li>Un cadre de référence architecture établi en interne</li>
                    </ul>

                    <p class="font-semibold mt-4">2. Mise en place d'une gouvernance FinOps rigoureuse</p>
                    <p>Face au constat que la majorité des échecs de migration cloud sont liés à une mauvaise maîtrise des coûts, nous avons mis en place un dispositif FinOps structuré comprenant :</p>
                    <ul class="list-disc list-inside space-y-3 ml-5 text-gray-600">
                      <li>Un processus d'évaluation systématique des cas d'usage ("tamis FinOps")</li>
                      <li>Des mécanismes de supervision continue des coûts</li>
                      <li>Un modèle de gouvernance permettant d'ajuster la stratégie d'hébergement si nécessaire</li>
                      <li>Des procédures de décommissionnement des systèmes OnPremise après migration</li>
                    </ul>

                    <p class="font-semibold mt-4">3. Sécurisation de l'infrastructure cloud</p>
                    <p>Pour garantir la maîtrise des environnements cloud, nous avons mis en œuvre :</p>
                    <ul class="list-disc list-inside space-y-3 ml-5 text-gray-600">
                      <li>L'utilisation systématique des Landing Zones (zones réseaux Cloud sécurisées) offertes par l'entité informatique du groupe</li>
                      <li>Des mécanismes de contrôle d'accès et de chiffrement des données</li>
                      <li>Une supervision des flux entre les environnements cloud et OnPremise</li>
                      <li>Des procédures de réversibilité pour les services critiques</li>
                    </ul>
                  </div>

                  <div class="space-y-6 mb-8">
                    <h2 class="text-2xl font-bold">II - Résultats obtenus</h2>

                    <p><em>Gains d'agilité et d'innovation</em></p>
                    <p>L'adoption maîtrisée du cloud a permis à l'établissement de :</p>
                    <ul class="list-disc list-inside space-y-3 ml-5 text-gray-600">
                      <li>Expérimenter plus rapidement de nouvelles fonctionnalités IT et métier</li>
                      <li>Réduire significativement les délais de mise sur le marché de certains services</li>
                      <li>Bénéficier d'innovations technologiques sans investissement massif en R&D interne</li>
                      <li>Améliorer la résilience globale du SI face aux incidents</li>
                    </ul>

                    <p class="mt-4"><em>Optimisation des coûts</em></p>
                    <p>Notre approche FinOps a généré des bénéfices concrets :</p>
                    <ul class="list-disc list-inside space-y-3 ml-5 text-gray-600">
                      <li>Réduction des coûts d'exploitation pour les applications à faible valeur ajoutée</li>
                      <li>Transformation de coûts fixes (datacenters) en coûts variables mieux ajustés à l'usage réel</li>
                      <li>Identification précoce des dérives budgétaires potentielles</li>
                      <li>Optimisations architecturales continues générant des économies supplémentaires</li>
                    </ul>

                    <p class="mt-4"><em>Montée en compétence des équipes</em></p>
                    <p>Un effet secondaire positif a été l'évolution des compétences internes :</p>
                    <ul class="list-disc list-inside space-y-3 ml-5 text-gray-600">
                      <li>Acquisition progressive d'expertise cloud au sein des équipes techniques</li>
                      <li>Développement d'une capacité d'arbitrage plus fine entre solutions OnPremise et cloud</li>
                      <li>Évolution des pratiques DevOps et SRE</li>
                      <li>Meilleure compréhension des leviers d'optimisation des coûts cloud</li>
                    </ul>
                  </div>

                  <div class="space-y-6 mb-8">
                    <h2 class="text-2xl font-bold">III - Enseignements clés</h2>

                    <p class="font-semibold">1. L'importance d'une stratégie claire et différenciée</p>
                    <p>La réussite du projet a largement reposé sur une stratégie d'hébergement clairement définie, distinguant :</p>
                    <ul class="list-disc list-inside space-y-3 ml-5 text-gray-600">
                      <li>Les systèmes critiques nécessitant un hébergement OnPremise pour des raisons de souveraineté et de sécurité</li>
                      <li>Les systèmes périphériques pouvant bénéficier de l'agilité du cloud</li>
                      <li>Les cas d'usage temporaires ou spécifiques justifiant un recours ponctuel au cloud</li>
                    </ul>

                    <p class="font-semibold mt-3">2. La gouvernance FinOps comme facteur clé de succès</p>
                    <p>Nous avons constaté que le pilotage financier rigoureux était la clé d'une adoption cloud réussie :</p>
                    <ul class="list-disc list-inside space-y-3 ml-5 text-gray-600">
                      <li>La maîtrise des coûts doit être intégrée dès la conception des solutions</li>
                      <li>La supervision continue permet d'identifier rapidement les optimisations possibles</li>
                      <li>La capacité à remettre en question les choix initiaux d'hébergement est essentielle</li>
                    </ul>

                    <p class="font-semibold mt-3">3. L'équilibre entre innovation et maîtrise des risques</p>
                    <p>Dans le secteur bancaire, l'adoption du cloud exige un équilibre délicat :</p>
                    <ul class="list-disc list-inside space-y-3 ml-5 text-gray-600">
                      <li>Tirer parti des innovations sans compromettre la sécurité des données</li>
                      <li>Accélérer le time-to-market tout en respectant les contraintes réglementaires</li>
                      <li>Optimiser les coûts sans dégrader la qualité de service et la résilience</li>
                    </ul>
                  </div>

                  <div class="space-y-6 mb-8">
                    <h2 class="text-2xl font-bold">IV - Recommandations</h2>
                    <p>Sur la base de cette expérience, nous avons recommandé :</p>
                    <ul class="list-disc list-inside space-y-3 ml-5 text-gray-600">
                      <li>Poursuivre l'optimisation continue des architectures cloud pour réduire davantage les coûts tout en élargissant le champ d'action</li>
                      <li>Systématiser l'évaluation des nouvelles applications selon le principe du "Best Fit" pour déterminer l'hébergement optimal</li>
                      <li>Renforcer la formation des équipes aux pratiques FinOps et aux architectures cloud modernes</li>
                      <li>Améliorer les outils de supervision pour une visibilité en temps réel sur les coûts et l'utilisation des ressources</li>
                      <li>Établir des processus de revue périodique des choix d'hébergement pour s'adapter à l'évolution des offres cloud et des besoins métiers</li>
                      <li>Développer des solutions de repli pour les applications critiques afin de réduire la durée des incidents majeurs</li>
                      <li>Encourager le partage d'expérience entre les équipes pour capitaliser sur les apprentissages</li>
                    </ul>

                    <p class="mt-4">Cette stratégie hybride et progressive a permis à l'établissement de tirer parti des bénéfices du cloud tout en préservant ses impératifs de sécurité et de maîtrise des coûts, créant ainsi une fondation solide pour sa transformation numérique à long terme.</p>
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
import JobItem from '../partials/JobItem.vue'
import Footer from '../partials/Footer.vue'

export default {
  name: 'CaseStudyCloudBank',
  components: {
    Header,
    JobItem,
    Footer,
  }
}
</script>
