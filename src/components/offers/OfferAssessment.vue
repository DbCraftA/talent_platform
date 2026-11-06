<template>
  <section class="py-16 md:py-20" :class="{ '!py-10 md:!py-14': compact }" aria-labelledby="explore-title">
    <div class="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16">
      <div class="lg:border-r lg:border-[#e8e8f1] lg:pr-12" data-aos="fade-up">
        <p class="mb-4 text-xs font-bold uppercase tracking-wider text-[#5638f5]">{{ eyebrow }}</p>
        <h2 id="explore-title" class="font-cabinet-grotesk text-3xl font-bold leading-tight md:text-4xl">{{ title }}</h2>
        <p v-for="paragraph in paragraphs" :key="paragraph" class="mt-5 text-sm leading-relaxed text-[#68708e]">{{ paragraph }}</p>
        <router-link class="btn mt-8 min-h-11 gap-4 bg-[#5638f5] text-sm text-white hover:bg-[#4027d5]" :to="ctaTo" @click="$emit('cta-click')">{{ ctaLabel }} <span aria-hidden="true">→</span></router-link>
      </div>
      <div>
        <div data-aos="fade-up"><p class="mb-4 text-xs font-bold uppercase tracking-wider text-[#5638f5]">{{ stepsEyebrow }}</p>
        <h2 class="font-cabinet-grotesk text-2xl font-bold md:text-3xl">{{ stepsTitle }}</h2></div>
        <ol class="mt-7">
          <li v-for="(item, index) in steps" :key="item.title" class="relative grid grid-cols-[2rem_1.25rem_minmax(0,1fr)] gap-3 pb-6 last:pb-0 sm:gap-4" data-aos="fade-up" :data-aos-delay="index * 100">
            <span class="pt-0.5 font-cabinet-grotesk text-sm font-bold text-[#5638f5]">0{{ index + 1 }}</span>
            <span class="relative flex justify-center pt-0.5" aria-hidden="true"><span v-if="index < steps.length - 1" class="absolute bottom-[-1.5rem] top-3 w-px bg-gray-800"></span><span class="relative box-content h-2 w-2 rounded-full border-4 border-gray-950 bg-indigo-500"></span></span>
            <div><h3 class="font-cabinet-grotesk text-lg font-bold leading-tight">{{ item.title }}</h3><p class="mt-1 text-sm leading-relaxed text-[#68708e]">{{ item.text }}</p></div>
          </li>
        </ol>
      </div>
    </div>
  </section>
</template>

<script setup>
defineProps({
  eyebrow: String, title: String, paragraphs: Array, ctaLabel: String, ctaTo: String,
  stepsEyebrow: String, stepsTitle: String, steps: Array, compact: Boolean,
})
defineEmits(['cta-click'])
</script>
