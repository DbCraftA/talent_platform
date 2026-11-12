<script setup>
const highlights = [
  { icon: 'community', title: 'Une communauté de', detail: '150+ architectes et experts' },
  { icon: 'layers', title: 'Des expertises complémentaires', detail: 'Cloud, Data, IA et DevOps' },
  { icon: 'shield', title: 'Une sélection exigeante', detail: 'et une expertise terrain' },
  { icon: 'bolt', title: 'Des projets concrets,', detail: 'au service du business' },
]
</script>

<template>
  <section class="relative overflow-hidden">
    <div class="pointer-events-none absolute inset-0 hidden md:block" aria-hidden="true">
      <img src="../images/hero-illustration.svg" class="mx-auto max-w-none" width="1440" height="749" alt="" />
    </div>
    <div class="relative mx-auto max-w-6xl px-4 pt-28 pb-8 sm:px-6 md:pt-32 md:pb-10">
      <div class="grid items-center gap-8 lg:grid-cols-[1.12fr_0.88fr] lg:gap-4">
        <div class="relative z-10 text-center lg:text-left">
          <h1 class="h2 font-cabinet-grotesk mb-6" data-aos="fade-right" data-aos-delay="100">
            Le collectif d’architectes Cloud, Data et IA au service de
            <span class="relative inline-flex text-indigo-500">
              <svg class="absolute right-5 top-full -mt-4 max-w-full -z-10" width="100" height="24" viewBox="0 0 220 18" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M134.66 13.107c-10.334-.37-20.721-.5-31.12-.291l-2.6.06c-4.116.04-8.193.602-12.3.749-14.502.43-29.029 1.196-43.514 2.465-6.414.63-12.808 1.629-19.04 2.866-7.93 1.579-16.113 3.71-23.367 5.003-2.211.374-3.397-1.832-2.31-4.906.5-1.467 1.838-3.456 3.418-4.813a16.047 16.047 0 0 1 6.107-3.365c16.88-4.266 33.763-6.67 51.009-7.389C71.25 3.187 81.81 1.6 92.309.966c11.53-.65 23.097-.938 34.66-.96 7.117-.054 14.25.254 21.36.318l16.194.803 4.62.39c3.85.32 7.693.618 11.53.813 8.346.883 16.673.802 25.144 2.159 1.864.276 3.714.338 5.566.873l.717.225c6.162 1.977 7.92 3.64 7.9 7.197l-.003.203c-.017.875.05 1.772-.112 2.593-.581 2.762-4.066 4.12-8.637 3.63-13.696-1.06-27.935-3.332-42.97-4.168-11.055-.83-22.314-1.459-33.596-1.603l-.022-.332Z" fill="#D1D5DB" fill-rule="evenodd" />
              </svg>
              vos ambitions.
            </span>
          </h1>
          <p class="mx-auto mt-5 max-w-xl text-base leading-relaxed text-slate-900 lg:mx-0 lg:text-lg">
            Wenovat réunit des architectes expérimentés et des experts Cloud, Data et IA pour transformer vos enjeux technologiques en décisions éclairées et en projets concrets, du cadrage à l’industrialisation.
          </p>
          <div class="mt-7 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">
            <a class="btn inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700" href="#offres">Découvrir nos offres <span aria-hidden="true">→</span></a>
            <router-link class="btn inline-flex items-center justify-center rounded-xl border border-indigo-600 bg-white/80 text-indigo-700 hover:bg-indigo-50" to="/nous-contacter">Échanger sur un projet</router-link>
          </div>
        </div>

        <div class="hidden lg:flex lg:justify-center lg:justify-end" data-aos="zoom-y-out">
          <div class="text-center scale-75 sm:scale-90 lg:scale-100 origin-center">
            <div class="inline-flex relative rounded-full before:absolute before:inset-0 before:-z-10 before:scale-[.85] before:bg-linear-to-b before:from-blue-200 before:to-sky-700/50 before:blur-3xl before:animate-[pulse_4s_cubic-bezier(.4,0,.6,1)_infinite] after:absolute after:inset-0 after:rounded-[inherit] after:[background:radial-gradient(closest-side,var(--color-blue-500),transparent)]">
              <img class="bg-gray-100/80 rounded-full" src="../images/planet.png" width="400" height="400" alt="Globe illustrant le collectif Wenovat" />
              <div class="pointer-events-none" aria-hidden="true">
                <img class="absolute z-10 -top-20 -right-64 max-w-none" src="../images/planet-overlay.svg" width="789" height="755" alt="" />
                <div>
                  <img class="absolute z-10 top-16 left-10 opacity-80 transition-opacity rounded-full max-sm:scale-75! duration-500 animate-[float_4s_ease-in-out_infinite_both]" src="../images/world-user-04.jpg" width="45" height="45" alt="" data-aos="fade-up" />
                  <img class="absolute rounded-full z-10 top-25 left-56 opacity-80 transition-opacity duration-500 animate-[float_4s_ease-in-out_infinite_1s_both]" src="../images/world-user-03.jpg" width="50" height="50" alt="" />
                  <img class="absolute rounded-full z-10 bottom-26 -left-5 opacity-90 transition-opacity duration-500 animate-[float_4s_ease-in-out_infinite_2s_both]" src="../images/world-user-07.jpg" width="50" height="50" alt="" />
                  <img class="absolute rounded-full z-10 top-36 left-20 opacity-80 transition-opacity duration-500 animate-[float_4s_ease-in-out_infinite_3s_both]" src="../images/world-user-05.jpg" width="50" height="50" alt="" />
                  <img class="absolute rounded-full z-10 bottom-32 left-64 opacity-80 transition-opacity duration-500 animate-[float_4s_ease-in-out_infinite_3s_both]" src="../images/world-user-08.jpg" width="50" height="50" alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-8 grid gap-5 border-b border-indigo-100 pb-8 sm:grid-cols-2 lg:mt-10 lg:grid-cols-4">
        <div v-for="item in highlights" :key="item.title" class="flex items-center gap-3 border-indigo-200 lg:border-r lg:pr-4 last:border-0">
          <span class="flex h-11 w-11 shrink-0 items-center justify-center text-indigo-600" aria-hidden="true">
            <svg v-if="item.icon === 'community'" class="h-8 w-8" viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="2"><circle cx="16" cy="10" r="4"/><circle cx="6" cy="14" r="3"/><circle cx="26" cy="14" r="3"/><path d="M8 26v-3a8 8 0 0 1 16 0v3H8Zm-6 0v-3a5 5 0 0 1 5-5m23 8v-3a5 5 0 0 0-5-5"/></svg>
            <svg v-else-if="item.icon === 'layers'" class="h-8 w-8" viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="m16 3 13 7-13 7L3 10l13-7ZM3 16l13 7 13-7M3 22l13 7 13-7"/></svg>
            <svg v-else-if="item.icon === 'shield'" class="h-8 w-8" viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="m16 2 11 4v9c0 7-5 12-11 15C10 27 5 22 5 15V6l11-4Z"/></svg>
            <svg v-else class="h-8 w-8" viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="M18 2 6 18h9l-1 12 12-17h-9l1-11Z"/></svg>
          </span>
          <p class="text-sm leading-snug text-slate-950"><strong class="block font-bold">{{ item.title }}</strong>{{ item.detail }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
