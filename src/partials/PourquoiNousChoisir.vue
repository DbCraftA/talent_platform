<script setup>
import { ref } from 'vue'

const tab = ref('1')
</script>

<template>
  <section class="relative bg-linear-to-tl from-indigo-100 to-white">
    <div class="py-12 md:py-20 border-t  [border-image:linear-gradient(to_right,transparent,--theme(--color-slate-400/.25),transparent)1]">
      <div class="max-w-6xl mx-auto px-4 sm:px-6">
        <div class="max-w-3xl mx-auto text-center pb-12">
          <h2 class="font-inter-tight text-3xl md:text-4xl font-bold text-zinc-900 mb-4">Un rôle essentiel, une sélection exigeante</h2>
          <p class="text-lg text-zinc-500">Si l’architecte est le garant de la vision et de la pérennité d’un système, encore faut-il trouver le bon profil.
            C’est pourquoi nous avons conçu un processus unique de sélection, alliant expertise technique, mise en situation réelle et reconnaissance par les pairs.</p>
        </div>
        <div class="flex justify-center pb-4 md:pb-12">

          <div class="text-center">
            <router-link class="btn inline-flex items-center text-black  border-1 border-indigo-500 bg-white hover:bg-gray-200 group" to="/methode">
              Découvrir notre méthode
              <span class="tracking-normal text-blue-500 group-hover:translate-x-0.5 transition-transform duration-150 ease-in-out ml-2">
              <svg class="fill-indigo-500" xmlns="http://www.w3.org/2000/svg" width="16" height="8">
                <path d="m10.865.013.747.148c.243.065.481.143.716.235.495.18.97.42 1.415.716.265.192.571.343.858.55.096.064.192.135.288.209l.196.154.192.178c.09.08.175.168.254.262.189.21.33.466.414.747.076.275.073.568-.008.84-.09.27-.236.513-.427.708-.096.1-.198.191-.306.274l-.152.117-.116.074c-.369.252-.75.482-1.14.69-.577.315-1.153.585-1.701.932-.408.262-.803.549-1.182.86-.083.064-.16.136-.247.193a.918.918 0 0 1-.113.072.644.644 0 0 1-.118.016.708.708 0 0 1-.191.01.559.559 0 0 1-.246-.088l-.072-.054a1.481 1.481 0 0 1-.141-.107c-.128-.122-.1-.377.05-.726.036-.08.079-.156.128-.226l.316-.401c.164-.188.336-.372.514-.543.178-.17.356-.342.546-.493.19-.152.394-.265.59-.39.53-.329 1.05-.626 1.552-.93-.159.018-.32.034-.48.04-.511.036-1.026.044-1.546.048a43.432 43.432 0 0 1-2.31-.058l-.005-.02a78.728 78.728 0 0 0-2.292-.148c-.279-.016-.558.01-.837-.006L4.543 3.81l-.977-.046a19.357 19.357 0 0 1-.49-.029 12.6 12.6 0 0 0-1.303.013l-.828.055-.406.021H.335l-.18.008c-.145 0-.208-.15-.102-.356.16-.268.422-.46.723-.531.57-.117 1.144-.205 1.72-.264.287-.026.576-.048.865-.053.29-.004.578.01.865.042.69.065 1.408-.015 2.113-.015.776.003 1.549.02 2.324.04l1.428.039 1.087.039c.359.012.716.02 1.075.013.442-.008.879-.065 1.318-.112a3.672 3.672 0 0 0-.186-.166 9.045 9.045 0 0 0-1.06-.762 9.82 9.82 0 0 0-1.034-.537 5.9 5.9 0 0 1-1.284-.854c-.12-.115-.053-.199.12-.26a1.55 1.55 0 0 1 .738-.083Z" />
              </svg>
            </span>
            </router-link>
          </div>
        </div>

        <div>
          <!-- Tabs buttons -->
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            <button
              :class="tab !== '1' ? 'bg-zinc-100 opacity-60 hover:opacity-100 transition' : '[background:linear-gradient(var(--color-white),var(--color-white))_padding-box,linear-gradient(120deg,var(--color-zinc-300),var(--color-zinc-100),var(--color-zinc-300))_border-box] shadow-xs rotate-1'"
              class="text-left px-4 py-5 border border-transparent rounded-sm"
              @click.prevent @click="tab = '1'"
            >
              <div class="flex items-center justify-between mb-1">
                <div class="font-inter-tight font-semibold text-zinc-900">Scan proactif des talents</div>
                <svg :class="tab !== '1' ? 'hidden' : ''" class="fill-zinc-400 shrink-0 ml-2" xmlns="http://www.w3.org/2000/svg" width="10" height="10">
                  <path d="M8.667.186H2.675a.999.999 0 0 0 0 1.998h3.581L.971 7.469a.999.999 0 1 0 1.412 1.412l5.285-5.285v3.58a.999.999 0 1 0 1.998 0V1.186a.999.999 0 0 0-.999-.999Z" />
                </svg>
              </div>
              <div class="text-sm text-zinc-500">Nous identifions les meilleurs profils via l’analyse de contributions open-source, conférences techniques et publications spécialisées.</div>
            </button>
            <button
              :class="tab !== '2' ? 'bg-zinc-100 opacity-60 hover:opacity-100 transition' : '[background:linear-gradient(var(--color-white),var(--color-white))_padding-box,linear-gradient(120deg,var(--color-zinc-300),var(--color-zinc-100),var(--color-zinc-300))_border-box] shadow-xs rotate-1'"
              class="text-left px-4 py-5 border border-transparent rounded-sm"
              @click.prevent @click="tab = '2'"
            >
              <div class="flex items-center justify-between mb-1">
                <div class="font-inter-tight font-semibold text-zinc-900">Évaluation multidimensionnelle</div>
                <svg :class="tab !== '2' ? 'hidden' : ''" class="fill-zinc-400 shrink-0 ml-2" xmlns="http://www.w3.org/2000/svg" width="10" height="10">
                  <path d="M8.667.186H2.675a.999.999 0 0 0 0 1.998h3.581L.971 7.469a.999.999 0 1 0 1.412 1.412l5.285-5.285v3.58a.999.999 0 1 0 1.998 0V1.186a.999.999 0 0 0-.999-.999Z" />
                </svg>
              </div>
              <div class="text-sm text-zinc-500">Nos candidats passent par des défis techniques, évaluations croisées et simulations de projets réels pour valider expertise et soft skills.</div>
            </button>
            <button
              :class="tab !== '3' ? 'bg-zinc-100 opacity-60 hover:opacity-100 transition' : '[background:linear-gradient(var(--color-white),var(--color-white))_padding-box,linear-gradient(120deg,var(--color-zinc-300),var(--color-zinc-100),var(--color-zinc-300))_border-box] shadow-xs rotate-1'"
              class="text-left px-4 py-5 border border-transparent rounded-sm"
              @click.prevent @click="tab = '3'"
            >
              <div class="flex items-center justify-between mb-1">
                <div class="font-inter-tight font-semibold text-zinc-900">Communauté auto-régulée</div>
                <svg :class="tab !== '3' ? 'hidden' : ''" class="fill-zinc-400 shrink-0 ml-2" xmlns="http://www.w3.org/2000/svg" width="10" height="10">
                  <path d="M8.667.186H2.675a.999.999 0 0 0 0 1.998h3.581L.971 7.469a.999.999 0 1 0 1.412 1.412l5.285-5.285v3.58a.999.999 0 1 0 1.998 0V1.186a.999.999 0 0 0-.999-.999Z" />
                </svg>
              </div>
              <div class="text-sm text-zinc-500">Un système d’évaluation par les pairs garantit un niveau d’exigence constant et une reconnaissance mutuelle entre experts.</div>
            </button>
            <button
              :class="tab !== '4' ? 'bg-zinc-100 opacity-60 hover:opacity-100 transition' : '[background:linear-gradient(var(--color-white),var(--color-white))_padding-box,linear-gradient(120deg,var(--color-zinc-300),var(--color-zinc-100),var(--color-zinc-300))_border-box] shadow-xs rotate-1'"
              class="text-left px-4 py-5 border border-transparent rounded-sm"
              @click.prevent @click="tab = '4'"
            >
              <div class="flex items-center justify-between mb-1">
                <div class="font-inter-tight font-semibold text-zinc-900">Sélection orientée innovation</div>
                <svg :class="tab !== '4' ? 'hidden' : ''" class="fill-zinc-400 shrink-0 ml-2" xmlns="http://www.w3.org/2000/svg" width="10" height="10">
                  <path d="M8.667.186H2.675a.999.999 0 0 0 0 1.998h3.581L.971 7.469a.999.999 0 1 0 1.412 1.412l5.285-5.285v3.58a.999.999 0 1 0 1.998 0V1.186a.999.999 0 0 0-.999-.999Z" />
                </svg>
              </div>
              <div class="text-sm text-zinc-500">Au-delà des compétences d’exécution, nous cherchons des architectes capables de penser différemment et de résoudre des problèmes complexes.</div>
            </button>
          </div>
          <!-- Tabs items -->
          <div class="relative lg:max-w-none [mask-image:linear-gradient(white_0%,white_calc(100%-40px),_transparent_calc(100%-1px))] -mx-6">
            <div class="relative flex flex-col pt-12 md:pt-20 mx-6">
              <!-- Item 1 -->
              <transition
                enter-active-class="transition ease-in-out duration-700 transform order-first"
                enter-from-class="opacity-0 -translate-y-4"
                enter-to-class="opacity-100 translate-y-0"
                leave-active-class="transition ease-in-out duration-300 transform absolute"
                leave-from-class="opacity-100 translate-y-0"
                leave-to-class="opacity-0 translate-y-4"
              >
                <div class="w-full text-center" v-show="tab === '1'">              
                  <div class="inline-flex relative align-top">
                    <img class="rounded-t-lg border border-transparent [background:linear-gradient(var(--color-white),var(--color-white))_padding-box,linear-gradient(120deg,var(--color-zinc-300),var(--color-zinc-100),var(--color-zinc-300))_border-box] box-content shadow-2xl" src="../images/unsplash-vitaly-gariev-1nVQJc4YLKM.jpg" width="600" height="360" alt="Feature 04" />
                  </div>
                </div>
              </transition>
              <!-- Item 2 -->
              <transition
                enter-active-class="transition ease-in-out duration-700 transform order-first"
                enter-from-class="opacity-0 -translate-y-4"
                enter-to-class="opacity-100 translate-y-0"
                leave-active-class="transition ease-in-out duration-300 transform absolute"
                leave-from-class="opacity-100 translate-y-0"
                leave-to-class="opacity-0 translate-y-4"
              >
                <div class="w-full text-center" v-show="tab === '2'">   
                  <div class="inline-flex relative align-top">
                    <img class="rounded-t-lg border border-transparent [background:linear-gradient(var(--color-white),var(--color-white))_padding-box,linear-gradient(120deg,var(--color-zinc-300),var(--color-zinc-100),var(--color-zinc-300))_border-box] box-content shadow-2xl" src="../images/unsplash-dylan-gillis.jpg" width="600" height="360" alt="Feature 02" />
                  </div>
                </div>
              </transition>
              <!-- Item 3 -->
              <transition
                enter-active-class="transition ease-in-out duration-700 transform order-first"
                enter-from-class="opacity-0 -translate-y-4"
                enter-to-class="opacity-100 translate-y-0"
                leave-active-class="transition ease-in-out duration-300 transform absolute"
                leave-from-class="opacity-100 translate-y-0"
                leave-to-class="opacity-0 translate-y-4"
              >
                <div class="w-full text-center" v-show="tab === '3'">   
                  <div class="inline-flex relative align-top">
                    <img class="rounded-t-lg border border-transparent [background:linear-gradient(var(--color-white),var(--color-white))_padding-box,linear-gradient(120deg,var(--color-zinc-300),var(--color-zinc-100),var(--color-zinc-300))_border-box] box-content shadow-2xl" src="../images/unsplash-austin-distel.jpg" width="600" height="360" alt="Feature 03" />
                  </div>
                </div>
              </transition>
              <!-- Item 4 -->
              <transition
                enter-active-class="transition ease-in-out duration-700 transform order-first"
                enter-from-class="opacity-0 -translate-y-4"
                enter-to-class="opacity-100 translate-y-0"
                leave-active-class="transition ease-in-out duration-300 transform absolute"
                leave-from-class="opacity-100 translate-y-0"
                leave-to-class="opacity-0 translate-y-4"
              >
                <div class="w-full text-center" v-show="tab === '4'">                 
                  <div class="inline-flex relative align-top">
                    <img class="rounded-t-lg border border-transparent [background:linear-gradient(var(--color-white),var(--color-white))_padding-box,linear-gradient(120deg,var(--color-zinc-300),var(--color-zinc-100),var(--color-zinc-300))_border-box] box-content shadow-2xl" src="../images/unsplash-linkedin-sales-solutions.jpg" width="600" height="360" alt="Feature 01" />
                  </div>
                </div>
              </transition>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
