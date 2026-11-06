<script setup>
import Counter from './Counter.vue'

const stats = [
  { number: 95, suffix: '%', text: 'Des missions lancées trouvent un profil adapté en moins de 10 jours.' },
  { number: 150, suffix: '+', text: 'Architectes et experts techniques déjà qualifiés dans notre réseau.' },
  { number: 3, suffix: 'x', text: 'Un time-to-market réduit par rapport à une approche classique.' },
  { number: 100, suffix: '%', text: 'des talents évalués passent par un screening rigoureux.' },
]
</script>

<template>
  <div class="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 md:-mb-16">
    <div class="grid gap-y-6 rounded-3xl border border-[#eceaf6] bg-white px-6 py-7 shadow-[0_20px_55px_rgba(28,23,83,0.1)] sm:grid-cols-2 sm:gap-y-8 md:grid-cols-4 md:px-4 md:py-9">
      <div v-for="(stat, index) in stats" :key="stat.text" class="text-center sm:px-5 sm:odd:border-r sm:odd:border-[#e6e5ed] md:border-r md:border-[#e6e5ed] md:last:border-r-0" data-aos="fade-up" :data-aos-delay="index * 75">
        <p class="font-cabinet-grotesk text-3xl font-bold tabular-nums text-[#5638f5] sm:text-4xl"><Counter :number="stat.number" />{{ stat.suffix }}</p>
        <p class="mx-auto mt-2 max-w-52 text-sm leading-relaxed text-[#565d7c]">{{ stat.text }}</p>
      </div>
    </div>
  </div>
</template>
