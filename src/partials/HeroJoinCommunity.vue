<template>
  <section class="relative overflow-hidden bg-linear-to-b from-white via-indigo-50 to-white">
    <div class="pointer-events-none absolute inset-0 hidden md:block" aria-hidden="true">
      <img src="../images/hero-illustration.svg" class="mx-auto max-w-none" width="1440" height="749" alt="" />
    </div>

    <div class="relative mx-auto max-w-6xl px-4 pt-28 pb-16 sm:px-6 md:pt-32 md:pb-20">
      <div class="grid items-center gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-6">
        <div class="text-center lg:text-left">
          <h1 class="h2 font-cabinet-grotesk text-slate-950" data-aos="fade-right" data-aos-delay="100">
            Rejoignez une communauté d’architectes
            <span class="relative inline-flex text-indigo-500">
              <svg class="absolute left-0 top-full -mt-4 max-w-full z-0" width="220" height="24" viewBox="0 0 220 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M134.66 13.107c-10.334-.37-20.721-.5-31.12-.291l-2.6.06c-4.116.04-8.193.602-12.3.749-14.502.43-29.029 1.196-43.514 2.465-6.414.63-12.808 1.629-19.04 2.866-7.93 1.579-16.113 3.71-23.367 5.003-2.211.374-3.397-1.832-2.31-4.906.5-1.467 1.838-3.456 3.418-4.813a16.047 16.047 0 0 1 6.107-3.365c16.88-4.266 33.763-6.67 51.009-7.389C71.25 3.187 81.81 1.6 92.309.966c11.53-.65 23.097-.938 34.66-.96 7.117-.054 14.25.254 21.36.318l16.194.803 4.62.39c3.85.32 7.693.618 11.53.813 8.346.883 16.673.802 25.144 2.159 1.864.276 3.714.338 5.566.873l.717.225c6.162 1.977 7.92 3.64 7.9 7.197l-.003.203c-.017.875.05 1.772-.112 2.593-.581 2.762-4.066 4.12-8.637 3.63-13.696-1.06-27.935-3.332-42.97-4.168-11.055-.83-22.314-1.459-33.596-1.603l-.022-.332Z" fill="#D1D5DB" fill-rule="evenodd" />
              </svg>
              <span class="relative z-10">Cloud, Data et IA</span>
            </span>
          </h1>

          <p class="mx-auto mt-6 max-w-xl text-base leading-relaxed text-slate-900 lg:mx-0 lg:text-lg">
            Chez Wenovat, vous rejoignez plus qu’un réseau de missions : une communauté d’experts qui échangent,
            challengent leurs pratiques et avancent sur des opportunités sélectionnées pour leur intérêt technique et leur impact.
          </p>

          <div class="mt-7 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">
            <router-link class="btn inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700" to="/nous-contacter">Rejoindre la communauté <span aria-hidden="true">→</span></router-link>
            <button type="button" class="btn inline-flex items-center justify-center rounded-xl border border-indigo-600 bg-white/80 text-indigo-700 hover:bg-indigo-50" @click="scrollTo('join-process')">Découvrir le processus</button>
          </div>
        </div>

        <div class="relative mx-auto w-full max-w-[672px]">
          <img class="block h-auto w-full" src="../images/worldmap.png" width="672" height="330" alt="Carte du monde illustrant une communauté d’architectes répartis à travers le monde" />
          <div class="pointer-events-none" aria-hidden="true">
            <img class="absolute rounded-full max-sm:scale-75!" style="top: 22%; left: 52%" src="../images/world-user-04.jpg" width="32" height="32" alt="" data-aos="fade-up" />
            <img class="absolute rounded-full max-sm:scale-75!" style="top: 50%; left: 58%" src="../images/world-user-02.jpg" width="48" height="48" alt="" data-aos="fade-up" data-aos-delay="400" />
            <img class="absolute rounded-full max-sm:scale-75!" style="top: 8.5%; left: 70.5%" src="../images/world-user-03.jpg" width="56" height="56" alt="" data-aos="fade-up" data-aos-delay="100" />
            <img class="absolute rounded-full max-sm:scale-75!" style="top: 34%; left: 76.5%" src="../images/world-user-08.jpg" width="72" height="72" alt="" data-aos="fade-up" data-aos-delay="700" />
            <img class="absolute rounded-full max-sm:scale-75!" style="top: 29.5%; left: 8.5%" src="../images/world-user-06.jpg" width="48" height="48" alt="" data-aos="fade-up" data-aos-delay="500" />
            <img class="absolute rounded-full max-sm:scale-75!" style="top: 56%; left: 19%" src="../images/world-user-05.jpg" width="56" height="56" alt="" data-aos="fade-up" data-aos-delay="200" />
            <img class="absolute rounded-full max-sm:scale-75!" style="top: 20%; left: 24.5%" src="../images/world-user-01.jpg" width="64" height="64" alt="" data-aos="fade-up" data-aos-delay="600" />
            <img class="absolute rounded-full max-sm:scale-75!" style="top: 39%; left: 43%" src="../images/world-user-07.jpg" width="40" height="40" alt="" data-aos="fade-up" data-aos-delay="300" />
          </div>
        </div>
      </div>

      <ul class="mt-12 grid gap-4 border-y border-indigo-100 py-6 sm:grid-cols-2 lg:grid-cols-4" aria-label="Les bénéfices de la communauté">
        <li v-for="benefit in benefits" :key="benefit" class="flex items-center gap-3 text-sm font-medium text-slate-950 lg:border-r lg:border-indigo-200 lg:pr-4 last:border-0">
          <span class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-indigo-50 text-indigo-600" aria-hidden="true">
            <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m5 12 5 5L20 7" /></svg>
          </span>
          {{ benefit }}
        </li>
      </ul>

      <div class="mx-auto mt-12 max-w-4xl rounded-3xl bg-indigo-50 px-6 py-8 sm:px-10 md:mt-16 md:py-10">
        <blockquote>
          <span class="block font-cabinet-grotesk text-6xl leading-none text-indigo-600" aria-hidden="true">“</span>
          <p class="font-cabinet-grotesk text-xl leading-relaxed font-semibold text-slate-950 md:text-2xl">
            Nous voulons créer un cadre où les architectes peuvent rester indépendants, tout en bénéficiant d’un collectif exigeant : des échanges utiles, des missions qualifiées et une vraie attention portée à la valeur créée.
          </p>
          <footer class="mt-6 flex items-center gap-3">
            <img class="h-14 w-14 rounded-full object-cover" src="../images/me.jpeg" width="80" height="80" alt="Soufiane Benzaouia" />
            <div class="text-sm text-slate-900">
              <cite class="block font-bold not-italic text-slate-950">Soufiane Benzaouia</cite>
              <span>Architecte Data et Cloud</span>
            </div>
          </footer>
        </blockquote>
      </div>
    </div>
  </section>
</template>

<script setup>
const benefits = [
  'Opportunités qualifiées et stimulantes',
  'Missions alignées avec votre niveau d’expertise',
  'Flexibilité et autonomie',
  'Échanges, veille et entraide entre pairs',
]

function scrollTo(id) {
  const el = document.getElementById(id)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' })
  }
}
</script>
