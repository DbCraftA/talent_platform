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
                      <img class="inline-flex mb-2" src="../images/electromagnetic.png" width="72" height="72" alt="Company 08" />
                      <h2 class="text-lg font-bold text-gray-800">Grand compte dans l'énerige.</h2>
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
                          <span class="text-sm text-gray-600">Energie</span>
                        </li>
                      </ul>
                    </div>





                  </div>

                </div>
              </aside>

              <!-- Main content -->
              <div class="md:grow">

                <!-- Job description -->
                <div class="pb-8">
                  <div class="mb-4">
                    <router-link class="text-indigo-500 font-medium" to="/"><span class="tracking-normal">&lt;-</span> Retour</router-link>
                  </div>
                  <h1 class="text-4xl font-extrabold font-inter mb-10">Transformer la donnée en atout stratégique : modernisation d’un système énergétique vers le cloud</h1>
                  <!-- Exeprience description -->
                  <div class="space-y-8 mb-8">
                    <div>
                      <div class="text-gray-500 space-y-3">
                        <p>Lorsqu’un leader du secteur de l’énergie a décidé de moderniser son système d’information et de migrer vers le cloud, l’objectif était clair : bâtir un Data Lake robuste, évolutif et ouvert à de nouveaux usages autour de la donnée.</p>
                        <p>Le Data Lake devait relever plusieurs défis : intégrer des données massives et hétérogènes (notamment des timeseries), les normaliser et les stocker au format colonne, les enrichir grâce à des données de contexte et des algorithmes adaptés aux métiers.</p>
                          <p>  Mais il ne s’agissait pas seulement de collecter la donnée : il fallait aussi la rendre exploitable, via des API, des outils de Business Intelligence, et même des modèles de Data Science capables de détecter des valeurs aberrantes.</p>
                        <p>Notre architecte a pris en charge la conception et la mise en œuvre de cette plateforme sur AWS, en privilégiant une approche serverless pour garantir agilité, scalabilité et coûts maîtrisés.</p>
                        <p>Le projet a révélé plusieurs défis majeurs :</p>
                        <ul class="list-disc list-inside space-y-3 ml-5">
                          <li><strong>La qualité des données issues des capteurs:</strong> Les séries temporelles contenaient de nombreux outliers dus à des défaillances de mesure. Grâce à une combinaison de modèles statistiques et de techniques de machine learning, l’architecture a intégré un pipeline de détection et de correction permettant de fiabiliser les données avant leur exploitation.</li>
                          <li><strong>La performance des requêtes:</strong>  Les premières itérations ont montré une latence trop élevée dans certaines restitutions. Une optimisation complète de la chaîne de requêtes et du stockage en colonnes a été réalisée pour offrir des temps de réponse adaptés aux usages métiers.</li>
                        </ul>
                        <p>En plus de la collecte et du nettoyage, le Data Lake a permis :</p>
                        <ul class="list-disc list-inside space-y-3 ml-5">
                          <li><strong>L’enrichissement des données avec du contexte métier et des algorithmes dédiés</strong> </li>
                          <li><strong>La mise à disposition via des API performantes</strong> </li>
                          <li><strong>L’alimentation directe d’outils de Business Intelligence</strong> </li>
                          <li><strong>Ainsi que la préparation de modèles avancés pour la détection d’anomalies</strong> </li>
                        </ul>
                        <p>Au-delà du design technique, le role de notre architecte était avant tout d'accompagner les équipes pour instaurer les bonnes pratiques d’industrialisation et d’intégration continue, tout en restant proche des métiers pour proposer des solutions pragmatiques et alignées avec leurs besoins.</p>
                        <p>Ce projet a permis de doter l’entreprise d’une plateforme robuste, évolutive et tournée vers l’avenir, en faisant de la donnée un véritable levier d’innovation et de performance.</p>
                      </div>
                    </div>
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
  name: 'JobPost',
  components: {
    Header,
    JobItem,
    Footer,
  }
}
</script>