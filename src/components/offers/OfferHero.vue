<template>
  <section class="overflow-hidden">
    <div class="mx-auto max-w-6xl px-4 sm:px-6">
      <div class="grid items-center gap-8 pb-12 pt-28 md:pt-32 lg:min-h-[560px] lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-4 lg:pb-16">
        <div class="relative z-10 max-w-[590px]" data-aos="fade-right">
          <h1 class="h2 font-cabinet-grotesk text-slate-950">
            <template v-for="(line, index) in titleLines" :key="index">{{ line }}<br /></template><span class="relative inline-flex text-indigo-500">
              <svg class="absolute right-5 top-full -mt-4 max-w-full -z-10" width="100" height="24" viewBox="0 0 220 18" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M134.66 13.107c-10.334-.37-20.721-.5-31.12-.291l-2.6.06c-4.116.04-8.193.602-12.3.749-14.502.43-29.029 1.196-43.514 2.465-6.414.63-12.808 1.629-19.04 2.866-7.93 1.579-16.113 3.71-23.367 5.003-2.211.374-3.397-1.832-2.31-4.906.5-1.467 1.838-3.456 3.418-4.813a16.047 16.047 0 0 1 6.107-3.365c16.88-4.266 33.763-6.67 51.009-7.389C71.25 3.187 81.81 1.6 92.309.966c11.53-.65 23.097-.938 34.66-.96 7.117-.054 14.25.254 21.36.318l16.194.803 4.62.39c3.85.32 7.693.618 11.53.813 8.346.883 16.673.802 25.144 2.159 1.864.276 3.714.338 5.566.873l.717.225c6.162 1.977 7.92 3.64 7.9 7.197l-.003.203c-.017.875.05 1.772-.112 2.593-.581 2.762-4.066 4.12-8.637 3.63-13.696-1.06-27.935-3.332-42.97-4.168-11.055-.83-22.314-1.459-33.596-1.603l-.022-.332Z" fill="#D1D5DB" fill-rule="evenodd" />
              </svg>
              {{ accent }}
            </span>
          </h1>
          <p class="mt-6 max-w-[540px] font-cabinet-grotesk text-lg font-bold leading-snug">{{ promise }}</p>
          <p class="mt-4 max-w-[530px] text-sm leading-relaxed text-[#565d7c]">{{ description }}</p>
          <ul class="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-xs font-bold text-[#202240]" aria-label="Bénéfices de notre accompagnement">
            <li v-for="benefit in benefits" :key="benefit" class="flex items-center gap-1.5"><svg class="h-4 w-4 shrink-0 text-[#5638f5]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="m13 2-3 9h6l-5 11 1-9H6l7-11Z" stroke-linecap="round" stroke-linejoin="round" /></svg>{{ benefit }}</li>
          </ul>
          <div class="mt-7 flex flex-col gap-3 sm:flex-row">
            <router-link class="btn inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700" :to="primaryTo" @click="$emit('primary-click')">{{ primaryLabel }} <span aria-hidden="true">→</span></router-link>
            <router-link class="btn inline-flex items-center justify-center rounded-xl border border-indigo-600 bg-white/80 text-indigo-700 hover:bg-indigo-50" :to="secondaryTo" @click="$emit('secondary-click')">{{ secondaryLabel }}</router-link>
          </div>
        </div>
        <div class="relative mx-auto w-full max-w-[680px] lg:scale-[1.12] lg:translate-x-4" data-aos="fade-left" data-aos-delay="100">
          <img :src="image" class="block h-auto w-full object-contain" :width="imageWidth" :height="imageHeight" :alt="imageAlt" />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
defineProps({
  titleLines: Array, accent: String, promise: String, description: String,
  benefits: Array, image: String, imageAlt: String, imageWidth: Number, imageHeight: Number,
  primaryLabel: String, primaryTo: String, secondaryLabel: String, secondaryTo: String,
})
defineEmits(['primary-click', 'secondary-click'])
</script>
