<template>
  <section class="bg-[#17171e] py-12 text-white md:py-16" aria-labelledby="consulting-title">
    <div class="mx-auto grid max-w-6xl gap-9 px-4 sm:px-6 lg:grid-cols-2 lg:items-center lg:gap-14">
      <div data-aos="fade-up"><p class="mb-5 text-xs font-bold uppercase tracking-wider text-[#a798ff]">{{ eyebrow }}</p><h2 id="consulting-title" class="font-cabinet-grotesk text-3xl font-bold leading-tight md:text-4xl">{{ title }}</h2><p class="mt-4 max-w-lg text-sm leading-relaxed text-[#c3c3cf]">{{ description }}</p><router-link class="btn mt-6 min-h-11 gap-4 bg-[#5638f5] text-sm text-white hover:bg-[#4027d5]" :to="ctaTo" @click="$emit('cta-click')">{{ ctaLabel }} <span aria-hidden="true">→</span></router-link></div>
      <ul class="grid auto-rows-fr gap-2 sm:grid-cols-2"><li v-for="(item, index) in items" :key="item.title" class="flex min-h-14 items-center gap-3 rounded-lg bg-[#292932] px-4 py-3 text-sm font-semibold leading-snug" :class="{ 'sm:col-span-2': variant === 'wide-last' && index === items.length - 1 }" data-aos="fade-up" :data-aos-delay="(index % 2) * 100"><svg class="h-4 w-4 shrink-0 text-[#a798ff]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path :d="icons[item.icon]" /></svg>{{ item.title }}</li></ul>
    </div>
  </section>
</template>

<script setup>
defineProps({ eyebrow: String, title: String, description: String, ctaLabel: String, ctaTo: String, items: Array, icons: Object, variant: String })
defineEmits(['cta-click'])
</script>
