<script setup>
import { ref } from 'vue'

const tab = ref('1')
</script>

<template>
  <section class="relative bg-zinc-800 after:absolute after:top-0 after:right-0 after:h-full after:w-96 after:pointer-events-none after:bg-linear-to-l after:from-zinc-800 max-lg:after:hidden">
    <div class="py-12 md:py-20">

      <!-- Carousel -->
      <div class="max-w-xl lg:max-w-6xl mx-auto px-4 sm:px-6">
        <div class="lg:flex space-y-12 lg:space-y-0 lg:space-x-12 xl:space-x-24">

          <!-- Content -->
          <div class="lg:max-w-none lg:min-w-[524px]">
            <div class="mb-8">
              <div class="inline-flex text-sm font-medium text-zinc-400 px-4 py-0.5 border border-transparent [background:linear-gradient(var(--color-zinc-800),var(--color-zinc-800))_padding-box,linear-gradient(120deg,var(--color-zinc-700),--theme(--color-zinc-700/0),var(--color-zinc-700))_border-box] rounded-full mb-4">Nos packs Cloud & IA</div>
              <h3 class="font-inter-tight text-3xl font-bold text-zinc-200 mb-4">Choisissez le pack qui accélère votre transformation Cloud & IA</h3>
              <p class="text-lg text-zinc-500">Nos packs combinent expertise d’architectes et méthodologies éprouvées pour sécuriser vos projets.
                Deux formules claires et actionnables, pensées pour vous donner de la visibilité sur les coûts, la roadmap et les résultats.</p>
            </div>
            <!-- Tabs buttons -->
            <div class="mb-8 md:mb-0 space-y-2">
              <button
                :class="tab !== '1' ? '' : '[background:linear-gradient(#2E2E32,#2E2E32)_padding-box,linear-gradient(120deg,var(--color-zinc-700),--theme(--color-zinc-700/0),var(--color-zinc-700))_border-box]'"
                class="text-left flex items-center px-6 py-4 rounded-sm border border-transparent"
                @click.prevent="tab = '1'"
              >


                <img class="shrink-0 fill-zinc-400 mr-3"  src="../images/cloud.png" width="24" height="24" alt="Icon 03">


                <div>
                  <div class="font-inter-tight text-lg font-semibold text-zinc-200 mb-1">Pack Cloud Foundation</div>
                  <div class="text-zinc-500">Un audit de votre infrastructure et une architecture cible avec roadmap claire. Un expert cloud vous accompagne pour structurer et sécuriser la mise en œuvre, avec un prix prévisible et des résultats garantis.</div>
                </div>
              </button>
              <button
                :class="tab !== '2' ? '' : '[background:linear-gradient(#2E2E32,#2E2E32)_padding-box,linear-gradient(120deg,var(--color-zinc-700),--theme(--color-zinc-700/0),var(--color-zinc-700))_border-box]'"
                class="text-left flex items-center px-6 py-4 rounded-sm border border-transparent"
                @click.prevent="tab = '2'"
              >
                <img class="shrink-0 fill-zinc-400 mr-3" src="../images/ia.png" width="24" height="24" alt="Icon 02">

                <div>
                  <div class="font-inter-tight text-lg font-semibold text-zinc-200 mb-1">Pack Data & IA Accelerator</div>
                  <div class="text-zinc-500">Évaluez vos cas d’usage IA, testez un POC rapide et déployez une architecture Data & MLOps adaptée. Vous accélérez vos projets IA et maîtrisez le passage du POC à la production.</div>
                </div>
              </button>
            </div>
          </div>

          <!-- Tabs items -->
          <div class="relative lg:max-w-none">
            <div class="relative flex flex-col">
              <!-- Item 1 -->
              <transition
                enter-active-class="transition ease-in-out duration-700 transform order-first"
                enter-from-class="opacity-0 translate-x-8"
                enter-to-class="opacity-100 translate-x-0"
                leave-active-class="transition ease-in-out duration-300 transform absolute"
                leave-from-class="opacity-100 translate-x-0"
                leave-to-class="opacity-0 -translate-x-8"
              >              
                <div class="w-full" v-show="tab === '1'">
                  <div>
                    <img class="lg:max-w-none mx-auto rounded-lg shadow-2xl" src="../images/cloud-ia.png" width="830" height="300" alt="Carousel 03" />

                  </div>
                </div>
              </transition>
              <!-- Item 2 -->
              <transition
                enter-active-class="transition ease-in-out duration-700 transform order-first"
                enter-from-class="opacity-0 translate-x-8"
                enter-to-class="opacity-100 translate-x-0"
                leave-active-class="transition ease-in-out duration-300 transform absolute"
                leave-from-class="opacity-100 translate-x-0"
                leave-to-class="opacity-0 -translate-x-8"
              >              
                <div class="w-full" v-show="tab === '2'">
                  <div>
                    <img class="lg:max-w-none mx-auto rounded-lg shadow-2xl" src="../images/boliviainteligente.jpg" width="900" height="620" alt="Carousel 01" />
                  </div>
                </div>
              </transition>
            </div>
          </div>

        </div>
      </div>

      <!-- Features blocks item 1 -->
      <div class="max-w-6xl mx-auto px-4 sm:px-6 mt-24 lg:mt-32" v-show="tab === '1'">
        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-16">
          <!-- Block #1 -->
          <div>
            <div class="flex items-center mb-1">
              <svg class="fill-zinc-400 mr-2" xmlns="http://www.w3.org/2000/svg" width="16" height="16">
                <path d="M7 14c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7ZM7 2C4.243 2 2 4.243 2 7s2.243 5 5 5 5-2.243 5-5-2.243-5-5-5Zm8.707 12.293a.999.999 0 1 1-1.414 1.414L11.9 13.314a8.019 8.019 0 0 0 1.414-1.414l2.393 2.393Z" />
              </svg>
              <h3 class="font-inter-tight font-semibold text-zinc-200">Audit initial</h3>
            </div>
            <p class="text-sm text-zinc-500">Analyse de votre infrastructure existante pour identifier forces, faiblesses et opportunités.</p>
          </div>
          <!-- Block #2 -->
          <div>
            <div class="flex items-center mb-1">
              <svg class="fill-zinc-400 mr-2" xmlns="http://www.w3.org/2000/svg" width="16" height="16" aria-hidden="true">
                <!-- Cible (anneaux) -->
                <path fill-rule="evenodd" d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0Zm0 3.5a4.5 4.5 0 1 1 0 9 4.5 4.5 0 0 1 0-9Zm0 2a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5Z"/>
                <!-- Flèche (direction) -->
                <path d="M10.85 5.15 14 2v3.5c0 .28-.22.5-.5.5H10l.85-.85Zm-.92.92-2.9 2.9c-.2.2-.46.31-.74.31H5.5a.5.5 0 0 1 0-1h.79l2.9-2.9a.75.75 0 0 1 1.06 0Z"/>
              </svg>
              <h3 class="font-inter-tight font-semibold text-zinc-200">Architecture cible</h3>
            </div>
            <p class="text-sm text-zinc-500">Conception d’un schéma clair et robuste aligné avec vos besoins métiers.</p>
          </div>
          <!-- Block #3 -->
          <div>
            <div class="flex items-center mb-1">
              <svg class="fill-zinc-400 mr-2" xmlns="http://www.w3.org/2000/svg" width="16" height="16" aria-hidden="true">
                <!-- Socle / jalon -->
                <path d="M2 13.5c0-.83.67-1.5 1.5-1.5h9c.83 0 1.5.67 1.5 1.5V15H2v-1.5Z"/>
                <!-- Mât -->
                <path d="M4 2c.55 0 1 .45 1 1v9H4V3c0-.55.45-1 1-1Z"/>
                <!-- Drapeau -->
                <path d="M5 3h5.6c.3 0 .4.37.16.53L9.3 5l1.46 1.47c.24.16.14.53-.16.53H5V3Z"/>
                <!-- Deux petits jalons (progression) -->
                <path d="M10.5 10.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM8 9.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"/>
              </svg>
              <h3 class="font-inter-tight font-semibold text-zinc-200">Roadmap stratégique</h3>
            </div>
            <p class="text-sm text-zinc-500">Une trajectoire pragmatique et jalonnée pour guider votre migration Cloud.</p>
          </div>
          <!-- Block #4 -->
          <div>
            <div class="flex items-center mb-1">
              <svg class="fill-zinc-400 mr-2" xmlns="http://www.w3.org/2000/svg" width="16" height="16" aria-hidden="true">
                <path d="M2 14a1 1 0 0 1-1-1V3a1 1 0 1 1 2 0v9h11a1 1 0 1 1 0 2H2Z"/>
                <path d="M6.5 11a.5.5 0 0 1-.5-.5V7.41l-1.3 1.3a1 1 0 0 1-1.4-1.42l3-3a1 1 0 0 1 1.4 0l3 3a1 1 0 0 1-1.4 1.42L9 7.41V10.5a.5.5 0 0 1-.5.5h-2Z"/>
              </svg>
              <h3 class="font-inter-tight font-semibold text-zinc-200">Business case & ROI</h3>
            </div>
            <p class="text-sm text-zinc-500">Projection des coûts et gains pour sécuriser vos décisions d’investissement.</p>
          </div>
          <!-- Block #5 -->
          <div>
            <div class="flex items-center mb-1">
              <svg class="fill-zinc-400 mr-2" xmlns="http://www.w3.org/2000/svg" width="16" height="16" aria-hidden="true">
                <!-- Tête -->
                <circle cx="8" cy="5" r="3"/>
                <!-- Corps -->
                <path d="M2 14c0-2.5 3-4 6-4s6 1.5 6 4v1H2v-1Z"/>
                <!-- Badge étoile -->
                <path d="M12.5 3.5a.5.5 0 0 1 .92 0l.2.6.6.2a.5.5 0 0 1 0 .92l-.6.2-.2.6a.5.5 0 0 1-.92 0l-.2-.6-.6-.2a.5.5 0 0 1 0-.92l.6-.2.2-.6Z"/>
              </svg>

              <h3 class="font-inter-tight font-semibold text-zinc-200">Expert dédié </h3>
            </div>
            <p class="text-sm text-zinc-500">Mise à disposition d’un architecte cloud pour piloter la mise en œuvre.</p>
          </div>
          <!-- Block #6 -->
          <div>
            <div class="flex items-center mb-1">
              <svg class="fill-zinc-400 mr-2" xmlns="http://www.w3.org/2000/svg" width="16" height="16" aria-hidden="true">
                <!-- Cercle / médaille -->
                <circle cx="8" cy="8" r="7"/>
                <!-- Check -->
                <path d="M11.03 5.97a.75.75 0 0 1 0 1.06L7.75 10.3a.75.75 0 0 1-1.06 0L5 8.62a.75.75 0 0 1 1.06-1.06l1.16 1.16 2.75-2.75a.75.75 0 0 1 1.06 0Z" fill="white"/>
              </svg>

              <h3 class="font-inter-tight font-semibold text-zinc-200">Résultats garantis</h3>
            </div>
            <p class="text-sm text-zinc-500">Un cadre complet, prix prévisible et résultats mesurables dès la phase projet.</p>
          </div>
        </div>
      </div>
      <!-- Features blocks item 2 -->
      <div class="max-w-6xl mx-auto px-4 sm:px-6 mt-24 lg:mt-32" v-show="tab === '2'">
        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-16">
          <!-- Block #1 -->
          <div>
            <div class="flex items-center mb-1">
              <svg class="fill-zinc-400 mr-2" xmlns="http://www.w3.org/2000/svg" width="16" height="16">
                <path d="M7 14c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7ZM7 2C4.243 2 2 4.243 2 7s2.243 5 5 5 5-2.243 5-5-2.243-5-5-5Zm8.707 12.293a.999.999 0 1 1-1.414 1.414L11.9 13.314a8.019 8.019 0 0 0 1.414-1.414l2.393 2.393Z" />
              </svg>
              <h3 class="font-inter-tight font-semibold text-zinc-200">Évaluation des usages</h3>
            </div>
            <p class="text-sm text-zinc-500">Identification des cas d’application IA les plus pertinents pour votre contexte.</p>
          </div>
          <!-- Block #2 -->
          <div>
            <div class="flex items-center mb-1">
              <svg class="fill-zinc-400 mr-2" xmlns="http://www.w3.org/2000/svg" width="16" height="16">
                <path d="M15 9a1 1 0 0 1 0 2c-.441 0-1.243.92-1.89 1.716.319 1.005.529 1.284.89 1.284a1 1 0 0 1 0 2 2.524 2.524 0 0 1-2.339-1.545A3.841 3.841 0 0 1 9 16a1 1 0 0 1 0-2c.441 0 1.243-.92 1.89-1.716C10.57 11.279 10.361 11 10 11a1 1 0 0 1 0-2 2.524 2.524 0 0 1 2.339 1.545A3.841 3.841 0 0 1 15 9Zm-5-1H7.51l-.02.142C6.964 11.825 6.367 16 3 16a3 3 0 0 1-3-3 1 1 0 0 1 2 0 1 1 0 0 0 1 1c1.49 0 1.984-2.48 2.49-6H3a1 1 0 1 1 0-2h2.793c.52-3.1 1.4-6 4.207-6a3 3 0 0 1 3 3 1 1 0 0 1-2 0 1 1 0 0 0-1-1C8.808 2 8.257 3.579 7.825 6H10a1 1 0 0 1 0 2Z" />
              </svg>
              <h3 class="font-inter-tight font-semibold text-zinc-200">POC</h3>
            </div>
            <p class="text-sm text-zinc-500">Mise en place d’un prototype fonctionnel pour valider la faisabilité et l’impact.</p>
          </div>
          <!-- Block #3 -->
          <div>
            <div class="flex items-center mb-1">
              <svg class="fill-zinc-400 mr-2" xmlns="http://www.w3.org/2000/svg" width="16" height="16" aria-hidden="true">
                <!-- Points -->
                <circle cx="3" cy="8" r="2"/>
                <circle cx="13" cy="4" r="2"/>
                <circle cx="13" cy="12" r="2"/>
                <!-- Liens -->
                <path d="M4.5 7 11 4.5M4.5 9 11 11.5" stroke="currentColor" stroke-width="1.2" fill="none"/>
              </svg>

              <h3 class="font-inter-tight font-semibold text-zinc-200">Architecture Data & IA</h3>
            </div>
            <p class="text-sm text-zinc-500">Conception d’une base solide pour exploiter et gouverner vos données.</p>
          </div>
          <!-- Block #4 -->
          <div>
            <div class="flex items-center mb-1">
              <svg class="fill-zinc-400 mr-2" xmlns="http://www.w3.org/2000/svg" width="16" height="16" aria-hidden="true">
                <path d="M6.9 1.5h2.2l.4 1.3c.3.1.6.3.9.5l1.2-.5 1.6 1.6-.5 1.2c.2.3.4.6.5.9l1.3.4v2.2l-1.3.4c-.1.3-.3.6-.5.9l.5 1.2-1.6 1.6-1.2-.5c-.3.2-.6.4-.9.5l-.4 1.3H6.9l-.4-1.3a3.9 3.9 0 0 1-.9-.5l-1.2.5-1.6-1.6.5-1.2a3.9 3.9 0 0 1-.5-.9L1.5 9.1V6.9l1.3-.4c.1-.3.3-.6.5-.9l-.5-1.2L4.4 2.8l1.2.5c.3-.2.6-.4.9-.5l.4-1.3ZM8 6a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z"/>
              </svg>
              <h3 class="font-inter-tight font-semibold text-zinc-200">MLOps & industrialisation</h3>
            </div>
            <p class="text-sm text-zinc-500">Mise en production fluide des modèles grâce à des pipelines robustes.</p>
          </div>
          <!-- Block #5 -->
          <div>
            <div class="flex items-center mb-1">
              <svg class="fill-zinc-400 mr-2" xmlns="http://www.w3.org/2000/svg" width="16" height="16" aria-hidden="true">
                <!-- Tête -->
                <circle cx="8" cy="5" r="3"/>
                <!-- Corps -->
                <path d="M2 14c0-2.5 3-4 6-4s6 1.5 6 4v1H2v-1Z"/>
                <!-- Badge étoile -->
                <path d="M12.5 3.5a.5.5 0 0 1 .92 0l.2.6.6.2a.5.5 0 0 1 0 .92l-.6.2-.2.6a.5.5 0 0 1-.92 0l-.2-.6-.6-.2a.5.5 0 0 1 0-.92l.6-.2.2-.6Z"/>
              </svg>
              <h3 class="font-inter-tight font-semibold text-zinc-200">Accompagnement expert</h3>
            </div>
            <p class="text-sm text-zinc-500">Des spécialistes IA et Data pour guider vos équipes à chaque étape.</p>
          </div>
          <!-- Block #6 -->
          <div>
            <div class="flex items-center mb-1">
              <svg class="fill-zinc-400 mr-2" xmlns="http://www.w3.org/2000/svg" width="16" height="16" aria-hidden="true">
                <!-- Axe -->
                <path d="M2 14V2h2v10h10v2H2Z"/>
                <!-- Flèche vers le haut -->
                <path d="M6 10V6h4V4l4 4-4 4V10H6Z"/>
              </svg>

              <h3 class="font-inter-tight font-semibold text-zinc-200">Accélération mesurable</h3>
            </div>
            <p class="text-sm text-zinc-500">Un passage du POC à la production maîtrisé, avec valeur business rapide.</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
