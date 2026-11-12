<template>
  <nav aria-label="Navigation des résultats">
    <p class="sr-only" aria-live="polite">Résultat {{ activeIndex + 1 }} sur {{ slides.length }} : {{ slides[activeIndex]?.title }}</p>
    <div class="relative">
      <div class="absolute left-0 top-1/2 -mt-px h-0.5 w-full bg-gray-200" aria-hidden="true"></div>
      <ol class="relative flex w-full justify-between">
        <li v-for="(slide, index) in slides" :key="slide.key">
          <button
            class="flex h-7 w-7 items-center justify-center rounded-full text-xs font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
            :class="activeIndex === index ? 'bg-indigo-500 text-white' : 'bg-white text-gray-500 shadow-sm'"
            type="button"
            :aria-label="`${index + 1} sur ${slides.length} : ${slide.title}`"
            :aria-current="activeIndex === index ? 'step' : undefined"
            @click="$emit('select', index)"
          >{{ index + 1 }}</button>
        </li>
      </ol>
    </div>
  </nav>
</template>

<script setup>
defineProps({
  slides: { type: Array, required: true },
  activeIndex: { type: Number, required: true },
})
defineEmits(['select'])
</script>
