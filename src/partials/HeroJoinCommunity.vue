<template>
  <section class="relative overflow-hidden bg-linear-to-br from-indigo-100 via-white to-indigo-100">
    <!-- Illustration -->
    <div class="hidden md:block absolute left-1/2 -translate-x-1/2 pointer-events-none -z-10" aria-hidden="true">
      <img src="../images/hero-illustration.svg" class="max-w-none" width="1440" height="749" alt="Hero Illustration" />
    </div>

    <div class="max-w-6xl mx-auto px-4 sm:px-6">
      <div class="pt-28 pb-12 md:pt-36 md:pb-20">
        <div class="max-w-5xl text-center">
          <h1 class="h2 font-cabinet-grotesk mb-6" data-aos="fade-right" data-aos-delay="100">
            Rejoignez une communauté d’architectes
            <span class="relative inline-flex text-indigo-500">
              <svg class="absolute left-0 top-full -mt-4 max-w-full z-0" width="220" height="24" viewBox="0 0 220 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M134.66 13.107c-10.334-.37-20.721-.5-31.12-.291l-2.6.06c-4.116.04-8.193.602-12.3.749-14.502.43-29.029 1.196-43.514 2.465-6.414.63-12.808 1.629-19.04 2.866-7.93 1.579-16.113 3.71-23.367 5.003-2.211.374-3.397-1.832-2.31-4.906.5-1.467 1.838-3.456 3.418-4.813a16.047 16.047 0 0 1 6.107-3.365c16.88-4.266 33.763-6.67 51.009-7.389C71.25 3.187 81.81 1.6 92.309.966c11.53-.65 23.097-.938 34.66-.96 7.117-.054 14.25.254 21.36.318l16.194.803 4.62.39c3.85.32 7.693.618 11.53.813 8.346.883 16.673.802 25.144 2.159 1.864.276 3.714.338 5.566.873l.717.225c6.162 1.977 7.92 3.64 7.9 7.197l-.003.203c-.017.875.05 1.772-.112 2.593-.581 2.762-4.066 4.12-8.637 3.63-13.696-1.06-27.935-3.332-42.97-4.168-11.055-.83-22.314-1.459-33.596-1.603l-.022-.332Z" fill="#D1D5DB" fill-rule="evenodd" />
              </svg>
              <span class="relative z-10">Cloud, Data et IA</span>
            </span>
          </h1>

          <p class="text-lg text-gray-500 pt-5 max-w-4xl mx-auto">
            Chez Wenovat, vous rejoignez plus qu’un réseau de missions : une communauté d’experts qui échangent,
            challengent leurs pratiques et avancent sur des opportunités sélectionnées pour leur intérêt technique et leur impact.
          </p>

          <div class="flex justify-center pt-10 pb-12">
            <ul class="inline-flex flex-col flex-wrap justify-center gap-x-10 gap-y-4 text-[1rem] text-gray-500 sm:flex sm:flex-row sm:items-center">
              <li v-for="benefit in benefits" :key="benefit" class="flex items-center">
                <svg class="mr-3 shrink-0" xmlns="http://www.w3.org/2000/svg" width="20" height="20">
                  <circle class="fill-indigo-500" cx="10" cy="10" r="10" />
                  <path class="fill-indigo-200" d="m14.707 7.707-6.485 6.485-2.929-2.93L6.707 9.85l1.515 1.515 5.071-5.071 1.414 1.414Z" />
                </svg>
                <span>{{ benefit }}</span>
              </li>
            </ul>
          </div>

          <div class="max-w-xs mx-auto sm:max-w-none sm:inline-flex sm:justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <div>
              <router-link class="btn text-zinc-100 bg-zinc-900 hover:bg-zinc-800 w-full shadow-sm" to="/c-02-f">Rejoindre la communauté</router-link>
            </div>
            <div>
              <button class="btn text-zinc-600 bg-white hover:text-zinc-900 w-full shadow-sm" @click="scrollTo('join-process')">Découvrir le processus</button>
            </div>
          </div>
        </div>

        <div class="mx-auto max-w-2xl pt-16 md:pt-20">
          <div class="relative">
            <div class="pointer-events-none absolute bottom-0 left-1/2 -z-10 -translate-x-1/2 translate-y-1/3" aria-hidden="true">
              <img src="../images/blurred-shape-02.svg" width="760" height="668" alt="Section illustration" />
            </div>
            <img src="../images/worldmap.png" width="672" height="330" alt="World map" />
            <img class="absolute rounded-full max-sm:scale-75!" style="top: 22%; left: 52%" src="../images/world-user-04.jpg" width="32" height="32" alt="User 01" data-aos="fade-up" />
            <img class="absolute rounded-full max-sm:scale-75!" style="top: 50%; left: 58%" src="../images/world-user-02.jpg" width="48" height="48" alt="User 02" data-aos="fade-up" data-aos-delay="400" />
            <img class="absolute rounded-full max-sm:scale-75!" style="top: 8.5%; left: 70.5%" src="../images/world-user-03.jpg" width="56" height="56" alt="User 03" data-aos="fade-up" data-aos-delay="100" />
            <img class="absolute rounded-full max-sm:scale-75!" style="top: 34%; left: 76.5%" src="../images/world-user-08.jpg" width="72" height="72" alt="User 04" data-aos="fade-up" data-aos-delay="700" />
            <img class="absolute rounded-full max-sm:scale-75!" style="top: 29.5%; left: 8.5%" src="../images/world-user-06.jpg" width="48" height="48" alt="User 05" data-aos="fade-up" data-aos-delay="500" />
            <img class="absolute rounded-full max-sm:scale-75!" style="top: 56%; left: 19%" src="../images/world-user-05.jpg" width="56" height="56" alt="User 06" data-aos="fade-up" data-aos-delay="200" />
            <img class="absolute rounded-full max-sm:scale-75!" style="top: 20%; left: 24.5%" src="../images/world-user-01.jpg" width="64" height="64" alt="User 07" data-aos="fade-up" data-aos-delay="600" />
            <img class="absolute rounded-full max-sm:scale-75!" style="top: 39%; left: 43%" src="../images/world-user-07.jpg" width="40" height="40" alt="User 08" data-aos="fade-up" data-aos-delay="300" />
          </div>
        </div>

        <div class="mx-auto max-w-3xl pt-12 md:pt-16">
          <div class="text-center">
            <img class="mb-3 inline-flex rounded-full" src="../images/me.jpeg" width="80" height="80" alt="Large testimonial" />
            <p class="font-nacelle animate-[gradient_6s_linear_infinite] bg-[linear-gradient(to_right,var(--color-gray-200),var(--color-indigo-200),var(--color-gray-50),var(--color-indigo-300),var(--color-gray-200))] bg-[length:200%_auto] bg-clip-text pb-3 text-xl font-semibold text-gray-500">
              Nous voulons créer un cadre où les architectes peuvent rester indépendants, tout en bénéficiant d’un collectif exigeant : des échanges utiles, des missions qualifiées et une vraie attention portée à la valeur créée.
            </p>
            <div class="text-sm font-medium text-gray-400">
              <span>Soufiane Benzaouia</span>
              <span class="text-gray-700"> - </span>
              <span class="text-gray-400">Architecte Data et Cloud</span>
            </div>
          </div>
        </div>
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
