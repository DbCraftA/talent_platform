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
          <div class="lg:w-[524px] lg:shrink-0 xl:w-[540px]">
            <div class="mb-8">
              <div class="inline-flex text-sm font-medium text-zinc-400 px-4 py-0.5 border border-transparent [background:linear-gradient(var(--color-zinc-800),var(--color-zinc-800))_padding-box,linear-gradient(120deg,var(--color-zinc-700),--theme(--color-zinc-700/0),var(--color-zinc-700))_border-box] rounded-full mb-4">Deux offres IA du collectif Wenovat</div>
              <h3 class="font-inter-tight text-3xl font-bold text-zinc-200 mb-4">Une infrastructure adaptée et un développement assisté par l’IA</h3>
              <p class="text-lg text-zinc-500">Wenovat vous accompagne dans le cadrage de votre infrastructure IA et dans l’adoption de l’IA tout au long du cycle de développement logiciel, selon vos usages et vos contraintes.</p>
            </div>
            <!-- Tabs buttons -->
            <div class="space-y-2">
              <button
                :class="tab !== '1' ? '' : '[background:linear-gradient(#2E2E32,#2E2E32)_padding-box,linear-gradient(120deg,var(--color-zinc-700),--theme(--color-zinc-700/0),var(--color-zinc-700))_border-box]'"
                class="w-full text-left flex items-center px-6 py-4 rounded-sm border border-transparent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-200"
                type="button"
                :aria-pressed="tab === '1'"
                @click="tab = '1'"
              >
                <img class="shrink-0 fill-zinc-400 mr-3" src="../images/cloud.png" width="24" height="24" alt="" aria-hidden="true">
                <div>
                  <div class="font-inter-tight text-lg font-semibold text-zinc-200 mb-1">Infrastructure IA</div>
                  <div class="text-zinc-400">Cadrez vos usages, l’architecture, le dimensionnement, les coûts et la sécurité de votre infrastructure IA.</div>
                </div>
              </button>
              <button
                :class="tab !== '2' ? '' : '[background:linear-gradient(#2E2E32,#2E2E32)_padding-box,linear-gradient(120deg,var(--color-zinc-700),--theme(--color-zinc-700/0),var(--color-zinc-700))_border-box]'"
                class="w-full text-left flex items-center px-6 py-4 rounded-sm border border-transparent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-200"
                type="button"
                :aria-pressed="tab === '2'"
                @click="tab = '2'"
              >
                <img class="shrink-0 fill-zinc-400 mr-3" src="../images/ia.png" width="24" height="24" alt="" aria-hidden="true">
                <div>
                  <div class="font-inter-tight text-lg font-semibold text-zinc-200 mb-1">Développement assisté par l’IA</div>
                  <div class="text-zinc-400">Intégrez l’IA dans votre cycle logiciel, des spécifications aux tests et à la mise en production, avec des validations humaines.</div>
                </div>
              </button>
            </div>
          </div>

          <!-- Tabs items -->
          <div class="relative min-w-0 lg:flex-1">
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
                  <div class="flex min-h-72 flex-col justify-center py-6 lg:min-h-[380px] lg:py-8">
                    <div class="mb-7 h-0.5 w-12 bg-indigo-400" aria-hidden="true"></div>
                    <h3 class="max-w-lg font-inter-tight text-3xl font-semibold leading-tight text-zinc-100 sm:text-4xl">Votre infrastructure suivra-t-elle vos ambitions IA ?</h3>
                    <p class="mt-5 max-w-md text-base leading-relaxed text-zinc-400">Explorez les choix d’architecture, de sécurité et de coûts à considérer selon vos usages.</p>
                    <router-link class="mt-7 inline-flex min-h-11 w-fit items-center gap-3 text-sm font-semibold text-indigo-300 transition-colors hover:text-indigo-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-300" to="/ai-infrastructure">
                      Découvrir l’approche <span aria-hidden="true">→</span>
                    </router-link>
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
                  <div class="flex min-h-72 flex-col justify-center py-6 lg:min-h-[380px] lg:py-8">
                    <div class="mb-7 h-0.5 w-12 bg-indigo-400" aria-hidden="true"></div>
                    <h3 class="max-w-lg font-inter-tight text-3xl font-semibold leading-tight text-zinc-100 sm:text-4xl">Et si l’IA profitait à toute votre équipe, pas seulement à quelques développeurs ?</h3>
                    <p class="mt-5 max-w-md text-base leading-relaxed text-zinc-400">Découvrez comment relier les pratiques, de la spécification à la production, tout en gardant les validations humaines.</p>
                    <router-link class="mt-7 inline-flex min-h-11 w-fit items-center gap-3 text-sm font-semibold text-indigo-300 transition-colors hover:text-indigo-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-300" to="/developpement-assiste-ia">
                      Découvrir l’approche <span aria-hidden="true">→</span>
                    </router-link>
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
            <p class="text-sm text-zinc-500">Une trajectoire pragmatique pour guider le déploiement de votre infrastructure IA.</p>
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
            <p class="text-sm text-zinc-500">Un accompagnement pour choisir une architecture adaptée à vos contraintes.</p>
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

              <h3 class="font-inter-tight font-semibold text-zinc-200">Sécurité et gouvernance</h3>
            </div>
            <p class="text-sm text-zinc-500">Prise en compte des accès, de la conformité et de la supervision dès le cadrage.</p>
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
              <h3 class="font-inter-tight font-semibold text-zinc-200">Évaluation des pratiques</h3>
            </div>
            <p class="text-sm text-zinc-500">Identification des pratiques de développement à accompagner selon votre contexte.</p>
          </div>
          <!-- Block #2 -->
          <div>
            <div class="flex items-center mb-1">
              <svg class="fill-zinc-400 mr-2" xmlns="http://www.w3.org/2000/svg" width="16" height="16">
                <path d="M15 9a1 1 0 0 1 0 2c-.441 0-1.243.92-1.89 1.716.319 1.005.529 1.284.89 1.284a1 1 0 0 1 0 2 2.524 2.524 0 0 1-2.339-1.545A3.841 3.841 0 0 1 9 16a1 1 0 0 1 0-2c.441 0 1.243-.92 1.89-1.716C10.57 11.279 10.361 11 10 11a1 1 0 0 1 0-2 2.524 2.524 0 0 1 2.339 1.545A3.841 3.841 0 0 1 15 9Zm-5-1H7.51l-.02.142C6.964 11.825 6.367 16 3 16a3 3 0 0 1-3-3 1 1 0 0 1 2 0 1 1 0 0 0 1 1c1.49 0 1.984-2.48 2.49-6H3a1 1 0 1 1 0-2h2.793c.52-3.1 1.4-6 4.207-6a3 3 0 0 1 3 3 1 1 0 0 1-2 0 1 1 0 0 0-1-1C8.808 2 8.257 3.579 7.825 6H10a1 1 0 0 1 0 2Z" />
              </svg>
              <h3 class="font-inter-tight font-semibold text-zinc-200">Spécifications</h3>
            </div>
            <p class="text-sm text-zinc-500">Formalisation d’exigences vérifiables pour partager le besoin avec l’équipe.</p>
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

              <h3 class="font-inter-tight font-semibold text-zinc-200">Architecture logicielle</h3>
            </div>
            <p class="text-sm text-zinc-500">Comparaison des choix techniques avant de lancer le développement.</p>
          </div>
          <!-- Block #4 -->
          <div>
            <div class="flex items-center mb-1">
              <svg class="fill-zinc-400 mr-2" xmlns="http://www.w3.org/2000/svg" width="16" height="16" aria-hidden="true">
                <path d="M6.9 1.5h2.2l.4 1.3c.3.1.6.3.9.5l1.2-.5 1.6 1.6-.5 1.2c.2.3.4.6.5.9l1.3.4v2.2l-1.3.4c-.1.3-.3.6-.5.9l.5 1.2-1.6 1.6-1.2-.5c-.3.2-.6.4-.9.5l-.4 1.3H6.9l-.4-1.3a3.9 3.9 0 0 1-.9-.5l-1.2.5-1.6-1.6.5-1.2a3.9 3.9 0 0 1-.5-.9L1.5 9.1V6.9l1.3-.4c.1-.3.3-.6.5-.9l-.5-1.2L4.4 2.8l1.2.5c.3-.2.6-.4.9-.5l.4-1.3ZM8 6a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z"/>
              </svg>
              <h3 class="font-inter-tight font-semibold text-zinc-200">Tests et revue</h3>
            </div>
            <p class="text-sm text-zinc-500">Contrôles et validations humaines des changements assistés par l’IA.</p>
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
            <p class="text-sm text-zinc-500">Un accompagnement pour intégrer l’IA aux méthodes et outils de vos équipes.</p>
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

              <h3 class="font-inter-tight font-semibold text-zinc-200">Cycle de livraison cohérent</h3>
            </div>
            <p class="text-sm text-zinc-500">Des pratiques reliées, des spécifications à la mise en production.</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
