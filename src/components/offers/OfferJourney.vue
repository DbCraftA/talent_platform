<template>
  <section class="pb-10 pt-16 md:pt-20" :class="{ '!pt-10 md:!pt-14': compact }" aria-labelledby="journey-title">
    <div class="mx-auto max-w-6xl px-4 sm:px-6">
      <div data-aos="fade-up"><p class="mb-4 text-xs font-bold uppercase tracking-wider text-[#5638f5]">{{ eyebrow }}</p>
      <h2 id="journey-title" class="font-cabinet-grotesk text-3xl font-bold leading-tight md:text-4xl">{{ title }}</h2>
      <p class="mt-3 max-w-4xl text-sm leading-relaxed text-[#68708e]">{{ description }}</p></div>
      <div class="mt-8 grid gap-4 lg:grid-cols-3">
        <article v-for="(step, index) in steps" :key="step.title" class="relative flex flex-col rounded-2xl border-2 p-5" :class="step.cardClass" data-aos="fade-up" :data-aos-delay="index * 100">
          <span v-if="step.recommended" class="mb-4 self-start rounded-full bg-[#5638f5] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white">Recommandé</span>
          <span v-else class="mb-4 h-[23px]" aria-hidden="true"></span>
          <div class="flex items-center justify-between"><span class="flex h-10 w-10 items-center justify-center rounded-full font-cabinet-grotesk text-xl font-bold" :class="step.accentClass">{{ index + 1 }}</span><span class="rounded-md px-3 py-1 text-xs font-bold" :class="step.accentClass">{{ step.duration }}</span></div>
          <h3 class="mt-6 font-cabinet-grotesk text-2xl font-bold">{{ step.title }}</h3><p class="mt-1 min-h-10 text-sm text-[#68708e]">{{ step.subtitle }}</p>
          <ul class="mt-5 flex-1 space-y-3 border-t border-[#eeeef6] pt-5"><li v-for="deliverable in step.deliverables" :key="deliverable" class="flex items-start gap-2 text-sm leading-snug"><span class="mt-1 h-2.5 w-2.5 shrink-0 rounded-full" :class="step.dotClass" aria-hidden="true"></span>{{ deliverable }}</li></ul>
          <div class="mt-6 rounded-xl p-3" :class="step.accentClass"><p class="text-xs font-bold">Livrables</p><p class="mt-1 text-xs leading-relaxed text-[#434763]">{{ step.output }}</p></div>
        </article>
      </div>
      <p class="mt-4 text-xs text-[#68708e]">Durées indicatives à ajuster selon le périmètre et la complexité du projet.</p>
    </div>
  </section>
</template>

<script setup>
defineProps({ eyebrow: String, title: String, description: String, steps: Array, compact: Boolean })
</script>
