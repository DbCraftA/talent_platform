<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()
</script>

<template>
  <section class="rounded-2xl border border-indigo-100 bg-white px-6 py-10 shadow-sm sm:px-10" aria-labelledby="placeholder-title">
    <p class="text-xs font-bold uppercase tracking-wider text-indigo-700">Prototype Wenovat</p>
    <h1 id="placeholder-title" class="mt-3 font-cabinet-grotesk text-3xl font-bold text-gray-900">{{ route.meta.title }}</h1>
    <p class="mt-4 max-w-2xl text-gray-700">Cette rubrique est en préparation. Aucune donnée métier, action ou qualification réelle n'est disponible dans cette démonstration.</p>
  </section>
</template>
