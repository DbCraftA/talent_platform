<template>
  <section class="pb-12" aria-labelledby="final-cta-title">
    <div class="mx-auto max-w-6xl px-4 sm:px-6"><div class="rounded-2xl bg-[#17171e] px-5 py-10 text-center text-white sm:px-10 md:py-12" data-aos="fade-up">
      <span class="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-white/10 text-[#c4baff]" aria-hidden="true"><svg class="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path :d="icon" /></svg></span>
      <h2 id="final-cta-title" class="mx-auto mt-5 max-w-xl font-cabinet-grotesk text-3xl font-bold leading-tight md:text-4xl">{{ title }}</h2><p class="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-[#dad4f5]">{{ description }}</p>
      <ul v-if="benefits?.length" class="mx-auto mt-5 flex max-w-3xl flex-wrap justify-center gap-x-5 gap-y-2 text-xs font-bold"><li v-for="benefit in benefits" :key="benefit" class="flex items-center gap-2"><span aria-hidden="true">✓</span>{{ benefit }}</li></ul>
      <div class="mt-6 flex flex-wrap justify-center gap-3"><router-link class="btn min-h-11 gap-4 bg-[#5638f5] text-sm text-white hover:bg-[#6b52ff]" :to="primaryTo" @click="$emit('primary-click')">{{ primaryLabel }} <span aria-hidden="true">→</span></router-link><router-link class="btn min-h-11 gap-4 border border-white/50 text-sm text-white hover:bg-white/10" :to="secondaryTo" @click="$emit('secondary-click')">{{ secondaryLabel }} <span aria-hidden="true">→</span></router-link></div>
    </div></div>
  </section>
</template>

<script setup>
defineProps({ icon: String, title: String, description: String, benefits: Array, primaryLabel: String, primaryTo: String, secondaryLabel: String, secondaryTo: String })
defineEmits(['primary-click', 'secondary-click'])
</script>
