<script setup>
import { ref } from "vue";

const category = ref(1);

const articles = [
  {
    title: "Allier innovation et conformité : adoption maîtrisée du cloud par un grand compte bancaire",
    excerpt:
      "Une stratégie cloud pensée pour concilier innovation, sécurité, conformité réglementaire et maîtrise des coûts dans un environnement bancaire exigeant.",
    category: 3,
    label: "Cloud",
    author: "Secteur",
    role: "Banque & Finance",
    to: "/clientfeedback-02",
    image: new URL("../images/vitaly-gariev-Oexx7cEMKFA-unsplash.jpg", import.meta.url).href,
  },
  {
    title: "Transformer l’intelligence artificielle en valeur métier : intégration maîtrisée des LLM dans le SI bancaire",
    excerpt:
      "Un cadrage stratégique pour industrialiser les usages IA, sécuriser les données sensibles et transformer les expérimentations LLM en valeur métier.",
    category: 2,
    label: "IA",
    author: "Secteur",
    role: "Banque & Finance",
    to: "/clientfeedback-01",
    image: new URL("../images/igor-omilaev-.jpg", import.meta.url).href,
  },
  {
    title: "Transformer la donnée en atout stratégique : modernisation d’un système énergétique vers le cloud",
    excerpt:
      "Une modernisation data et cloud pour bâtir une plateforme robuste, exploitable et tournée vers de nouveaux usages métier.",
    category: 3,
    label: "Cloud",
    author: "Secteur",
    role: "Energie",
    to: "/clientfeedback-03",
    image: new URL("../images/carlos-muza-hpjSkU2UYSU-unsplash.jpg", import.meta.url).href,
  },
];

const filters = [
  { label: "Tous", value: 1, icon: "M7 3a1 1 0 0 1 1-1h7a1 1 0 1 1 0 2H8a1 1 0 0 1-1-1ZM0 8a1 1 0 0 1 1-1h14a1 1 0 1 1 0 2H1a1 1 0 0 1-1-1Zm1 4a1 1 0 1 0 0 2h7a1 1 0 1 0 0-2H1Z" },
  { label: "IA", value: 2, icon: "M1 2a1 1 0 0 1 1-1h12a1 1 0 1 1 0 2H9v11a1 1 0 1 1-2 0V3H2a1 1 0 0 1-1-1Zm1.762 5.212.96.36a.429.429 0 0 1 0 .802l-.96.36-.36.96a.428.428 0 0 1-.803 0l-.36-.96-.961-.36a.429.429 0 0 1 0-.802l.96-.36.36-.96c.126-.336.678-.336.803 0l.36.96Zm12.89 3.753-1.2-.45-.45-1.201c-.157-.419-.847-.419-1.004 0l-.45 1.2-1.2.45a.536.536 0 0 0 0 1.004l1.2.45.45 1.2a.535.535 0 0 0 1.004 0l.45-1.2 1.2-.45a.536.536 0 0 0 0-1.003ZM5 13a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z" },
  { label: "Cloud", value: 3, icon: "M1 8.914S5.225 4.55 7.629 2.659c1.607-1.264 2.554-1.388 3.137-.807 1.063 1.06-.422 3.026-2.446 5.716-2.023 2.69-3.487 4.234-2.379 5.28 1.095 1.033 3.357-1.278 4.2-2.22.844-.941 2.768-3.03 3.71-2.151.836.778-.404 2.657-.842 3.497-.439.84-.978 1.707-.337 2.286.906.82 2.328-.908 2.328-.908" },
  { label: "Data", value: 4, icon: "M8 2a1 1 0 1 0 0 2 1 1 0 0 0 0-2Zm3 1a3.001 3.001 0 0 1-2 2.83v8.087a6.008 6.008 0 0 0 4.742-4.17l-.295.147a1 1 0 1 1-.894-1.788l2-1A1 1 0 0 1 16 8 8 8 0 1 1 0 8a1 1 0 0 1 1.447-.894l2 1a1 1 0 0 1-.894 1.788l-.295-.147A6.008 6.008 0 0 0 7 13.917V5.829A3.001 3.001 0 1 1 11 3Z" },
  { label: "Architecture", value: 5, icon: "M10.207.293a1 1 0 0 1 0 1.414L8.414 3.5l1.793 1.793a1 1 0 0 1-1.414 1.414l-2.5-2.5a1 1 0 0 1 0-1.414l2.5-2.5a1 1 0 0 1 1.414 0ZM0 4a4 4 0 0 1 4-4h.55a1 1 0 0 1 .707 1.707l-.024.025a1 1 0 0 1-.93.268H4a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V8.45a1 1 0 1 1 2 0V12a4 4 0 0 1-4 4H4a4 4 0 0 1-4-4V4ZM13.207.293a1 1 0 1 0-1.414 1.414L13.586 3.5l-1.793 1.793a1 1 0 0 0 1.414 1.414l2.5-2.5a1 1 0 0 0 0-1.414l-2.5-2.5Z" },
];
</script>

<template>
  <section class="relative overflow-hidden bg-transparent">
    <div class="mx-auto max-w-6xl px-4 sm:px-6">
      <div class="pt-28 pb-12 md:pt-36 md:pb-20">
        <!-- Section header -->
        <div class="pb-12 text-center">
          <h1 class="h2 font-cabinet-grotesk mb-6" data-aos="fade-right" data-aos-delay="100">Le <span class="relative inline-flex text-indigo-500">
                <svg class="absolute left-0 top-full -mt-4 max-w-full -z-10" width="220" height="24" viewBox="0 0 220 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M134.66 13.107c-10.334-.37-20.721-.5-31.12-.291l-2.6.06c-4.116.04-8.193.602-12.3.749-14.502.43-29.029 1.196-43.514 2.465-6.414.63-12.808 1.629-19.04 2.866-7.93 1.579-16.113 3.71-23.367 5.003-2.211.374-3.397-1.832-2.31-4.906.5-1.467 1.838-3.456 3.418-4.813a16.047 16.047 0 0 1 6.107-3.365c16.88-4.266 33.763-6.67 51.009-7.389C71.25 3.187 81.81 1.6 92.309.966c11.53-.65 23.097-.938 34.66-.96 7.117-.054 14.25.254 21.36.318l16.194.803 4.62.39c3.85.32 7.693.618 11.53.813 8.346.883 16.673.802 25.144 2.159 1.864.276 3.714.338 5.566.873l.717.225c6.162 1.977 7.92 3.64 7.9 7.197l-.003.203c-.017.875.05 1.772-.112 2.593-.581 2.762-4.066 4.12-8.637 3.63-13.696-1.06-27.935-3.332-42.97-4.168-11.055-.83-22.314-1.459-33.596-1.603l-.022-.332Z" fill="#D1D5DB" fill-rule="evenodd" />
                </svg>
                 Blog
              </span> Wenovat
          </h1>
          <div class="mx-auto max-w-3xl">
            <p class="text-xl text-gray-500">
              Analyses, retours d’expérience et bonnes pratiques pour avancer avec clarté sur vos sujets Cloud, Data et IA.
            </p>
          </div>
        </div>

        <div>
          <div class="flex justify-center pb-12 max-md:hidden md:pb-20">
            <div class="relative inline-flex flex-wrap justify-center rounded-[1.25rem] bg-white/70 p-1 shadow-sm ring-1 ring-indigo-100 backdrop-blur">
              <button
                v-for="filter in filters"
                :key="filter.value"
                class="flex h-8 flex-1 items-center gap-2.5 whitespace-nowrap rounded-full px-3 text-sm font-medium transition-colors focus-visible:outline-hidden focus-visible:ring-3 focus-visible:ring-indigo-200"
                :class="
                  category === filter.value
                    ? 'relative bg-linear-to-b from-gray-900 via-gray-800/80 to-gray-900 text-white before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-transparent before:[background:linear-gradient(to_bottom,--theme(--color-indigo-500/0),--theme(--color-indigo-500/.5))_border-box] before:[mask-composite:exclude_!important] before:[mask:linear-gradient(white_0_0)_padding-box,_linear-gradient(white_0_0)]'
                    : 'text-gray-600 opacity-65 transition-opacity hover:opacity-90'
                "
                :aria-pressed="category === filter.value"
                @click="category = filter.value"
              >
                <svg
                  class="fill-current"
                  :class="category === filter.value ? 'text-indigo-500' : 'text-gray-400'"
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                >
                  <path :d="filter.icon" />
                </svg>
                <span>{{ filter.label }}</span>
              </button>
            </div>
          </div>

          <div class="mx-auto grid max-w-sm items-start gap-8 sm:max-w-none sm:grid-cols-2 lg:grid-cols-3">
            <article
              v-for="article in articles"
              :key="article.title"
              class="flex h-full flex-col transition-opacity"
              :class="![1, article.category].includes(category) && 'pointer-events-none opacity-15'"
              :inert="![1, article.category].includes(category)"
            >
              <router-link :to="article.to" class="group/card flex h-full flex-col">
                <header>
                  <div class="group relative mb-6 block overflow-hidden rounded-2xl border border-gray-800/80 before:absolute before:inset-0 before:-z-10 before:bg-linear-to-br before:from-gray-900 before:via-indigo-500/50 before:to-indigo-500 before:opacity-50">
                    <img
                      class="aspect-101/64 w-full object-cover transition ease-out group-hover:scale-[1.02]"
                      :class="[1, article.category].includes(category) ? 'opacity-100 grayscale-0' : 'opacity-40 grayscale'"
                      :src="article.image"
                      width="347"
                      height="220"
                      :alt="article.title"
                    />
                  </div>
                  <div class="mb-3">
                    <ul class="flex flex-wrap gap-2">
                      <li>
                        <span class="btn-sm relative rounded-full bg-white/70 px-2.5 py-0.5 text-xs font-normal shadow-sm ring-1 ring-indigo-100">
                          <span class="bg-linear-to-r from-indigo-500 to-indigo-700 bg-clip-text text-transparent">{{ article.label }}</span>
                        </span>
                      </li>
                    </ul>
                  </div>
                  <h3 class="font-nacelle mb-2 text-lg font-semibold transition-colors group-hover/card:text-indigo-500">
                    {{ article.title }}
                  </h3>
                  <p class="mb-4 text-sm leading-6 text-gray-500">
                    {{ article.excerpt }}
                  </p>
                </header>
                <footer class="mt-auto flex items-center gap-3">
                  <div class="text-sm font-medium">
                    <span>{{ article.author }}</span>
                    <span class="text-gray-700"> - </span>
                    <span class="text-indigo-500">{{ article.role }}</span>
                  </div>
                </footer>
              </router-link>
            </article>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
