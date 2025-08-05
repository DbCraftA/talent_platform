<script setup>
import { ref } from 'vue'

const tab = ref('1')
</script>

<template>
  <section class="relative bg-linear-to-tr from-white to-indigo-100 ">
    <div class="py-12 md:py-20">
      <div class="max-w-6xl mx-auto px-4 sm:px-6">
        <div class="max-w-3xl mx-auto text-center pb-12">
          <h2 class="font-inter-tight text-3xl md:text-4xl font-bold text-zinc-900 mb-4">Pourquoi nous choisir ? </h2>
          <p class="text-lg text-zinc-500">AI reads and understands your designs, and with nothing more than a single line of feedback, perform complex actions autonomously.</p>
        </div>
        <div>
          <!-- Tabs buttons -->
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            <button
              :class="tab !== '1' ? 'bg-zinc-100 opacity-60 hover:opacity-100 transition' : '[background:linear-gradient(var(--color-white),var(--color-white))_padding-box,linear-gradient(120deg,var(--color-zinc-300),var(--color-zinc-100),var(--color-zinc-300))_border-box] shadow-xs rotate-1'"
              class="text-left px-4 py-5 border border-transparent rounded-sm"
              @click.prevent @click="tab = '1'"
            >
              <div class="flex items-center justify-between mb-1">
                <div class="font-inter-tight font-semibold text-zinc-900">Qualification par des freelances seniors</div>
                <svg :class="tab !== '1' ? 'hidden' : ''" class="fill-zinc-400 shrink-0 ml-2" xmlns="http://www.w3.org/2000/svg" width="10" height="10">
                  <path d="M8.667.186H2.675a.999.999 0 0 0 0 1.998h3.581L.971 7.469a.999.999 0 1 0 1.412 1.412l5.285-5.285v3.58a.999.999 0 1 0 1.998 0V1.186a.999.999 0 0 0-.999-.999Z" />
                </svg>
              </div>
              <div class="text-sm text-zinc-500">Vos besoins sont compris et traduits techniquement par des pairs du métier (data scientist, architecte Cloud…).</div>
            </button>
            <button
              :class="tab !== '2' ? 'bg-zinc-100 opacity-60 hover:opacity-100 transition' : '[background:linear-gradient(var(--color-white),var(--color-white))_padding-box,linear-gradient(120deg,var(--color-zinc-300),var(--color-zinc-100),var(--color-zinc-300))_border-box] shadow-xs rotate-1'"
              class="text-left px-4 py-5 border border-transparent rounded-sm"
              @click.prevent @click="tab = '2'"
            >
              <div class="flex items-center justify-between mb-1">
                <div class="font-inter-tight font-semibold text-zinc-900">Screening technique à 5 niveaux</div>
                <svg :class="tab !== '2' ? 'hidden' : ''" class="fill-zinc-400 shrink-0 ml-2" xmlns="http://www.w3.org/2000/svg" width="10" height="10">
                  <path d="M8.667.186H2.675a.999.999 0 0 0 0 1.998h3.581L.971 7.469a.999.999 0 1 0 1.412 1.412l5.285-5.285v3.58a.999.999 0 1 0 1.998 0V1.186a.999.999 0 0 0-.999-.999Z" />
                </svg>
              </div>
              <div class="text-sm text-zinc-500">Tests, entretiens, évaluations de projets réels et soft skills.</div>
            </button>
            <button
              :class="tab !== '3' ? 'bg-zinc-100 opacity-60 hover:opacity-100 transition' : '[background:linear-gradient(var(--color-white),var(--color-white))_padding-box,linear-gradient(120deg,var(--color-zinc-300),var(--color-zinc-100),var(--color-zinc-300))_border-box] shadow-xs rotate-1'"
              class="text-left px-4 py-5 border border-transparent rounded-sm"
              @click.prevent @click="tab = '3'"
            >
              <div class="flex items-center justify-between mb-1">
                <div class="font-inter-tight font-semibold text-zinc-900">Spécialisation IA & Cloud uniquement</div>
                <svg :class="tab !== '3' ? 'hidden' : ''" class="fill-zinc-400 shrink-0 ml-2" xmlns="http://www.w3.org/2000/svg" width="10" height="10">
                  <path d="M8.667.186H2.675a.999.999 0 0 0 0 1.998h3.581L.971 7.469a.999.999 0 1 0 1.412 1.412l5.285-5.285v3.58a.999.999 0 1 0 1.998 0V1.186a.999.999 0 0 0-.999-.999Z" />
                </svg>
              </div>
              <div class="text-sm text-zinc-500">Pas de généraliste : uniquement les expertises que vous cherchez.</div>
            </button>
            <button
              :class="tab !== '4' ? 'bg-zinc-100 opacity-60 hover:opacity-100 transition' : '[background:linear-gradient(var(--color-white),var(--color-white))_padding-box,linear-gradient(120deg,var(--color-zinc-300),var(--color-zinc-100),var(--color-zinc-300))_border-box] shadow-xs rotate-1'"
              class="text-left px-4 py-5 border border-transparent rounded-sm"
              @click.prevent @click="tab = '4'"
            >
              <div class="flex items-center justify-between mb-1">
                <div class="font-inter-tight font-semibold text-zinc-900">Process rapide, transparent et accompagné</div>
                <svg :class="tab !== '4' ? 'hidden' : ''" class="fill-zinc-400 shrink-0 ml-2" xmlns="http://www.w3.org/2000/svg" width="10" height="10">
                  <path d="M8.667.186H2.675a.999.999 0 0 0 0 1.998h3.581L.971 7.469a.999.999 0 1 0 1.412 1.412l5.285-5.285v3.58a.999.999 0 1 0 1.998 0V1.186a.999.999 0 0 0-.999-.999Z" />
                </svg>
              </div>
              <div class="text-sm text-zinc-500">100 % adapté aux environnements exigeants et agiles.</div>
            </button>
          </div>
          <!-- Tabs items -->
          <div class="relative lg:max-w-none [mask-image:linear-gradient(white_0%,white_calc(100%-40px),_transparent_calc(100%-1px))] -mx-6">
            <div class="relative flex flex-col pt-12 md:pt-20 mx-6">
              <!-- Item 1 -->
              <transition
                enter-active-class="transition ease-in-out duration-700 transform order-first"
                enter-from-class="opacity-0 -translate-y-4"
                enter-to-class="opacity-100 translate-y-0"
                leave-active-class="transition ease-in-out duration-300 transform absolute"
                leave-from-class="opacity-100 translate-y-0"
                leave-to-class="opacity-0 translate-y-4"
              >
                <div class="w-full text-center" v-show="tab === '1'">              
                  <div class="inline-flex relative align-top">
                    <img class="rounded-t-lg border border-transparent [background:linear-gradient(var(--color-white),var(--color-white))_padding-box,linear-gradient(120deg,var(--color-zinc-300),var(--color-zinc-100),var(--color-zinc-300))_border-box] box-content shadow-2xl" src="../images/vitaly-gariev.jpg" width="600" height="360" alt="Feature 01" />
                    <svg class="absolute -top-3 left-full -translate-x-[60%] -mr-20 max-md:w-[45%]" xmlns="http://www.w3.org/2000/svg" width="69" height="77">
                      <path class="fill-indigo-500" d="M19.987 69.903a16 16 0 0 1-4.12.88 10 10 0 0 1-4.6-.76 9.15 9.15 0 0 1-3.71-3l-.63-.93-.51-1a9.07 9.07 0 0 1-.76-2.31 16.42 16.42 0 0 1 1-8.18 46 46 0 0 1 3.11-6.78 58.58 58.58 0 0 1 8.65-11.79 60.66 60.66 0 0 1 11.18-9.44 45.88 45.88 0 0 1 9.67-4.87 28.1 28.1 0 0 1 11-1.65 25.07 25.07 0 0 1 9.68 2.59 18.08 18.08 0 0 1 4.34 2.92 12.86 12.86 0 0 1 3.16 4.55 13.64 13.64 0 0 1 1 5.31 20.71 20.71 0 0 1-.7 5 35.54 35.54 0 0 1-3.79 8.91 52.15 52.15 0 0 1-5.46 7.63 72.54 72.54 0 0 1-6.52 6.6 58.48 58.48 0 0 1-15.51 10.06 39.78 39.78 0 0 1-3.91 1.47c-.67.2-1.35.39-2 .56a10.66 10.66 0 0 1-2.74.25 7.59 7.59 0 0 1-2.73-.63 3.17 3.17 0 0 1-1.82-1.94c-.48-1.77.65-3.57 1.92-5 .15-.17.33-.38.46-.51l.37-.37c.25-.25.5-.5.75-.73.5-.49 1-.94 1.54-1.4 1-.91 2.11-1.76 3.2-2.59a66 66 0 0 1 6.81-4.53 44.56 44.56 0 0 1 9.75-4.32 22.28 22.28 0 0 1 5.53-.91 13.5 13.5 0 0 1 5.91 1.09 10.75 10.75 0 0 1 4.61 4.13l.74 1.32c.229.488.42.993.57 1.51.28.977.438 1.984.47 3a17.19 17.19 0 0 1-.73 5.58 21.73 21.73 0 0 1-2.16 5.06c-1.24 2-2.26 2.51-2.44 2.23-.18-.28.17-1.39.5-3.15a24.07 24.07 0 0 0 .33-7 13.91 13.91 0 0 0-.83-3.9 8.73 8.73 0 0 0-2.2-2.87 6.64 6.64 0 0 0-3-1.32 12.39 12.39 0 0 0-4 .05 31.68 31.68 0 0 0-8.84 3.07 59.18 59.18 0 0 0-8.36 5.16c-1.34 1-2.64 2-3.84 3.05-.3.27-.61.54-.88.81l-.54.52c-.11.1-.08.06-.12.11-.04.05 0 .15.12.16h.17l.42-.09.56-.14c.75-.2 1.51-.44 2.26-.71a47.25 47.25 0 0 0 8.79-4.41 65.55 65.55 0 0 0 14.92-13.36 41 41 0 0 0 6.16-10.25c1.47-3.62 2.17-7.66.82-10.69a8.43 8.43 0 0 0-3.29-3.74 19.61 19.61 0 0 0-2.45-1.33c-.45-.17-.89-.37-1.34-.54l-1.37-.43a23 23 0 0 0-11.5 0 38.32 38.32 0 0 0-12.15 5.44 58.11 58.11 0 0 0-10.35 8.85 53.09 53.09 0 0 0-8 11.06 32.11 32.11 0 0 0-2.51 6.2c-.57 2.09-.72 4.22.06 5.77a6.4 6.4 0 0 0 2.2 2.63 5.15 5.15 0 0 0 1.51.61 6.23 6.23 0 0 0 1.74.11 17.27 17.27 0 0 0 7.38-2.8c4.75-2.91 9-6.88 13.05-10.89a97.44 97.44 0 0 0 16-20.33 49.73 49.73 0 0 0 4.91-11.72l.37-1.49.27-1.54c.199-.989.32-1.992.36-3a9.11 9.11 0 0 0-1.23-5.27 6.61 6.61 0 0 0-3.08-2.43 13.93 13.93 0 0 0-4.31-.84 32 32 0 0 0-9.31 1.08 59.27 59.27 0 0 0-9.08 3.11 60.65 60.65 0 0 0-8.39 4.66c-2.37 1.57-4.58 3.3-6.83 5.12-2.09 1.69-3.79 3.15-5.22 4.38a77.994 77.994 0 0 1-3.64 2.95 14 14 0 0 1-4.68 2.64 10.65 10.65 0 0 1-1.73.49c-.72 0-.44-.89.68-2.61a54.19 54.19 0 0 1 5.93-7.22 86.61 86.61 0 0 1 14.37-12.19 60.24 60.24 0 0 1 4.18-2.53 45.5 45.5 0 0 1 4.49-2.2 55.38 55.38 0 0 1 9.54-3 37.12 37.12 0 0 1 10.52-.89 17.78 17.78 0 0 1 5.84 1.44 12.52 12.52 0 0 1 5.32 4.36 13.2 13.2 0 0 1 2.19 6.31 21.59 21.59 0 0 1-.28 5.76 45.26 45.26 0 0 1-2.91 9.94 68.73 68.73 0 0 1-7.37 13 104.64 104.64 0 0 1-9.37 11.25 134.3 134.3 0 0 1-10.58 9.94 61.69 61.69 0 0 1-6 4.45 32.1 32.1 0 0 1-6.92 3.51l-.04-.12Z" />
                    </svg>
                  </div>
                </div>
              </transition>
              <!-- Item 2 -->
              <transition
                enter-active-class="transition ease-in-out duration-700 transform order-first"
                enter-from-class="opacity-0 -translate-y-4"
                enter-to-class="opacity-100 translate-y-0"
                leave-active-class="transition ease-in-out duration-300 transform absolute"
                leave-from-class="opacity-100 translate-y-0"
                leave-to-class="opacity-0 translate-y-4"
              >
                <div class="w-full text-center" v-show="tab === '2'">   
                  <div class="inline-flex relative align-top">
                    <img class="rounded-t-lg border border-transparent [background:linear-gradient(var(--color-white),var(--color-white))_padding-box,linear-gradient(120deg,var(--color-zinc-300),var(--color-zinc-100),var(--color-zinc-300))_border-box] box-content shadow-2xl" src="../images/kanhaiya-sharma-T.jpg" width="600" height="360" alt="Feature 02" />
                    <svg class="absolute -top-3 left-full -translate-x-[60%] -mr-20 max-md:w-[45%]" xmlns="http://www.w3.org/2000/svg" width="69" height="77">
                      <path class="fill-indigo-500" d="M19.987 69.903a16 16 0 0 1-4.12.88 10 10 0 0 1-4.6-.76 9.15 9.15 0 0 1-3.71-3l-.63-.93-.51-1a9.07 9.07 0 0 1-.76-2.31 16.42 16.42 0 0 1 1-8.18 46 46 0 0 1 3.11-6.78 58.58 58.58 0 0 1 8.65-11.79 60.66 60.66 0 0 1 11.18-9.44 45.88 45.88 0 0 1 9.67-4.87 28.1 28.1 0 0 1 11-1.65 25.07 25.07 0 0 1 9.68 2.59 18.08 18.08 0 0 1 4.34 2.92 12.86 12.86 0 0 1 3.16 4.55 13.64 13.64 0 0 1 1 5.31 20.71 20.71 0 0 1-.7 5 35.54 35.54 0 0 1-3.79 8.91 52.15 52.15 0 0 1-5.46 7.63 72.54 72.54 0 0 1-6.52 6.6 58.48 58.48 0 0 1-15.51 10.06 39.78 39.78 0 0 1-3.91 1.47c-.67.2-1.35.39-2 .56a10.66 10.66 0 0 1-2.74.25 7.59 7.59 0 0 1-2.73-.63 3.17 3.17 0 0 1-1.82-1.94c-.48-1.77.65-3.57 1.92-5 .15-.17.33-.38.46-.51l.37-.37c.25-.25.5-.5.75-.73.5-.49 1-.94 1.54-1.4 1-.91 2.11-1.76 3.2-2.59a66 66 0 0 1 6.81-4.53 44.56 44.56 0 0 1 9.75-4.32 22.28 22.28 0 0 1 5.53-.91 13.5 13.5 0 0 1 5.91 1.09 10.75 10.75 0 0 1 4.61 4.13l.74 1.32c.229.488.42.993.57 1.51.28.977.438 1.984.47 3a17.19 17.19 0 0 1-.73 5.58 21.73 21.73 0 0 1-2.16 5.06c-1.24 2-2.26 2.51-2.44 2.23-.18-.28.17-1.39.5-3.15a24.07 24.07 0 0 0 .33-7 13.91 13.91 0 0 0-.83-3.9 8.73 8.73 0 0 0-2.2-2.87 6.64 6.64 0 0 0-3-1.32 12.39 12.39 0 0 0-4 .05 31.68 31.68 0 0 0-8.84 3.07 59.18 59.18 0 0 0-8.36 5.16c-1.34 1-2.64 2-3.84 3.05-.3.27-.61.54-.88.81l-.54.52c-.11.1-.08.06-.12.11-.04.05 0 .15.12.16h.17l.42-.09.56-.14c.75-.2 1.51-.44 2.26-.71a47.25 47.25 0 0 0 8.79-4.41 65.55 65.55 0 0 0 14.92-13.36 41 41 0 0 0 6.16-10.25c1.47-3.62 2.17-7.66.82-10.69a8.43 8.43 0 0 0-3.29-3.74 19.61 19.61 0 0 0-2.45-1.33c-.45-.17-.89-.37-1.34-.54l-1.37-.43a23 23 0 0 0-11.5 0 38.32 38.32 0 0 0-12.15 5.44 58.11 58.11 0 0 0-10.35 8.85 53.09 53.09 0 0 0-8 11.06 32.11 32.11 0 0 0-2.51 6.2c-.57 2.09-.72 4.22.06 5.77a6.4 6.4 0 0 0 2.2 2.63 5.15 5.15 0 0 0 1.51.61 6.23 6.23 0 0 0 1.74.11 17.27 17.27 0 0 0 7.38-2.8c4.75-2.91 9-6.88 13.05-10.89a97.44 97.44 0 0 0 16-20.33 49.73 49.73 0 0 0 4.91-11.72l.37-1.49.27-1.54c.199-.989.32-1.992.36-3a9.11 9.11 0 0 0-1.23-5.27 6.61 6.61 0 0 0-3.08-2.43 13.93 13.93 0 0 0-4.31-.84 32 32 0 0 0-9.31 1.08 59.27 59.27 0 0 0-9.08 3.11 60.65 60.65 0 0 0-8.39 4.66c-2.37 1.57-4.58 3.3-6.83 5.12-2.09 1.69-3.79 3.15-5.22 4.38a77.994 77.994 0 0 1-3.64 2.95 14 14 0 0 1-4.68 2.64 10.65 10.65 0 0 1-1.73.49c-.72 0-.44-.89.68-2.61a54.19 54.19 0 0 1 5.93-7.22 86.61 86.61 0 0 1 14.37-12.19 60.24 60.24 0 0 1 4.18-2.53 45.5 45.5 0 0 1 4.49-2.2 55.38 55.38 0 0 1 9.54-3 37.12 37.12 0 0 1 10.52-.89 17.78 17.78 0 0 1 5.84 1.44 12.52 12.52 0 0 1 5.32 4.36 13.2 13.2 0 0 1 2.19 6.31 21.59 21.59 0 0 1-.28 5.76 45.26 45.26 0 0 1-2.91 9.94 68.73 68.73 0 0 1-7.37 13 104.64 104.64 0 0 1-9.37 11.25 134.3 134.3 0 0 1-10.58 9.94 61.69 61.69 0 0 1-6 4.45 32.1 32.1 0 0 1-6.92 3.51l-.04-.12Z" />
                    </svg>
                  </div>
                </div>
              </transition>
              <!-- Item 3 -->
              <transition
                enter-active-class="transition ease-in-out duration-700 transform order-first"
                enter-from-class="opacity-0 -translate-y-4"
                enter-to-class="opacity-100 translate-y-0"
                leave-active-class="transition ease-in-out duration-300 transform absolute"
                leave-from-class="opacity-100 translate-y-0"
                leave-to-class="opacity-0 translate-y-4"
              >
                <div class="w-full text-center" v-show="tab === '3'">   
                  <div class="inline-flex relative align-top">
                    <img class="rounded-t-lg border border-transparent [background:linear-gradient(var(--color-white),var(--color-white))_padding-box,linear-gradient(120deg,var(--color-zinc-300),var(--color-zinc-100),var(--color-zinc-300))_border-box] box-content shadow-2xl" src="../images/igor-omilaev-.jpg" width="600" height="360" alt="Feature 03" />
                    <svg class="absolute -top-3 left-full -translate-x-[60%] -mr-20 max-md:w-[45%]" xmlns="http://www.w3.org/2000/svg" width="69" height="77">
                      <path class="fill-indigo-500" d="M19.987 69.903a16 16 0 0 1-4.12.88 10 10 0 0 1-4.6-.76 9.15 9.15 0 0 1-3.71-3l-.63-.93-.51-1a9.07 9.07 0 0 1-.76-2.31 16.42 16.42 0 0 1 1-8.18 46 46 0 0 1 3.11-6.78 58.58 58.58 0 0 1 8.65-11.79 60.66 60.66 0 0 1 11.18-9.44 45.88 45.88 0 0 1 9.67-4.87 28.1 28.1 0 0 1 11-1.65 25.07 25.07 0 0 1 9.68 2.59 18.08 18.08 0 0 1 4.34 2.92 12.86 12.86 0 0 1 3.16 4.55 13.64 13.64 0 0 1 1 5.31 20.71 20.71 0 0 1-.7 5 35.54 35.54 0 0 1-3.79 8.91 52.15 52.15 0 0 1-5.46 7.63 72.54 72.54 0 0 1-6.52 6.6 58.48 58.48 0 0 1-15.51 10.06 39.78 39.78 0 0 1-3.91 1.47c-.67.2-1.35.39-2 .56a10.66 10.66 0 0 1-2.74.25 7.59 7.59 0 0 1-2.73-.63 3.17 3.17 0 0 1-1.82-1.94c-.48-1.77.65-3.57 1.92-5 .15-.17.33-.38.46-.51l.37-.37c.25-.25.5-.5.75-.73.5-.49 1-.94 1.54-1.4 1-.91 2.11-1.76 3.2-2.59a66 66 0 0 1 6.81-4.53 44.56 44.56 0 0 1 9.75-4.32 22.28 22.28 0 0 1 5.53-.91 13.5 13.5 0 0 1 5.91 1.09 10.75 10.75 0 0 1 4.61 4.13l.74 1.32c.229.488.42.993.57 1.51.28.977.438 1.984.47 3a17.19 17.19 0 0 1-.73 5.58 21.73 21.73 0 0 1-2.16 5.06c-1.24 2-2.26 2.51-2.44 2.23-.18-.28.17-1.39.5-3.15a24.07 24.07 0 0 0 .33-7 13.91 13.91 0 0 0-.83-3.9 8.73 8.73 0 0 0-2.2-2.87 6.64 6.64 0 0 0-3-1.32 12.39 12.39 0 0 0-4 .05 31.68 31.68 0 0 0-8.84 3.07 59.18 59.18 0 0 0-8.36 5.16c-1.34 1-2.64 2-3.84 3.05-.3.27-.61.54-.88.81l-.54.52c-.11.1-.08.06-.12.11-.04.05 0 .15.12.16h.17l.42-.09.56-.14c.75-.2 1.51-.44 2.26-.71a47.25 47.25 0 0 0 8.79-4.41 65.55 65.55 0 0 0 14.92-13.36 41 41 0 0 0 6.16-10.25c1.47-3.62 2.17-7.66.82-10.69a8.43 8.43 0 0 0-3.29-3.74 19.61 19.61 0 0 0-2.45-1.33c-.45-.17-.89-.37-1.34-.54l-1.37-.43a23 23 0 0 0-11.5 0 38.32 38.32 0 0 0-12.15 5.44 58.11 58.11 0 0 0-10.35 8.85 53.09 53.09 0 0 0-8 11.06 32.11 32.11 0 0 0-2.51 6.2c-.57 2.09-.72 4.22.06 5.77a6.4 6.4 0 0 0 2.2 2.63 5.15 5.15 0 0 0 1.51.61 6.23 6.23 0 0 0 1.74.11 17.27 17.27 0 0 0 7.38-2.8c4.75-2.91 9-6.88 13.05-10.89a97.44 97.44 0 0 0 16-20.33 49.73 49.73 0 0 0 4.91-11.72l.37-1.49.27-1.54c.199-.989.32-1.992.36-3a9.11 9.11 0 0 0-1.23-5.27 6.61 6.61 0 0 0-3.08-2.43 13.93 13.93 0 0 0-4.31-.84 32 32 0 0 0-9.31 1.08 59.27 59.27 0 0 0-9.08 3.11 60.65 60.65 0 0 0-8.39 4.66c-2.37 1.57-4.58 3.3-6.83 5.12-2.09 1.69-3.79 3.15-5.22 4.38a77.994 77.994 0 0 1-3.64 2.95 14 14 0 0 1-4.68 2.64 10.65 10.65 0 0 1-1.73.49c-.72 0-.44-.89.68-2.61a54.19 54.19 0 0 1 5.93-7.22 86.61 86.61 0 0 1 14.37-12.19 60.24 60.24 0 0 1 4.18-2.53 45.5 45.5 0 0 1 4.49-2.2 55.38 55.38 0 0 1 9.54-3 37.12 37.12 0 0 1 10.52-.89 17.78 17.78 0 0 1 5.84 1.44 12.52 12.52 0 0 1 5.32 4.36 13.2 13.2 0 0 1 2.19 6.31 21.59 21.59 0 0 1-.28 5.76 45.26 45.26 0 0 1-2.91 9.94 68.73 68.73 0 0 1-7.37 13 104.64 104.64 0 0 1-9.37 11.25 134.3 134.3 0 0 1-10.58 9.94 61.69 61.69 0 0 1-6 4.45 32.1 32.1 0 0 1-6.92 3.51l-.04-.12Z" />
                    </svg>
                  </div>
                </div>
              </transition>
              <!-- Item 4 -->
              <transition
                enter-active-class="transition ease-in-out duration-700 transform order-first"
                enter-from-class="opacity-0 -translate-y-4"
                enter-to-class="opacity-100 translate-y-0"
                leave-active-class="transition ease-in-out duration-300 transform absolute"
                leave-from-class="opacity-100 translate-y-0"
                leave-to-class="opacity-0 translate-y-4"
              >
                <div class="w-full text-center" v-show="tab === '4'">                 
                  <div class="inline-flex relative align-top">
                    <img class="rounded-t-lg border border-transparent [background:linear-gradient(var(--color-white),var(--color-white))_padding-box,linear-gradient(120deg,var(--color-zinc-300),var(--color-zinc-100),var(--color-zinc-300))_border-box] box-content shadow-2xl" src="../images/service-05.jpg" width="600" height="360" alt="Feature 04" />
                    <svg class="absolute -top-3 left-full -translate-x-[60%] -mr-20 max-md:w-[45%]" xmlns="http://www.w3.org/2000/svg" width="69" height="77">
                      <path class="fill-indigo-500" d="M19.987 69.903a16 16 0 0 1-4.12.88 10 10 0 0 1-4.6-.76 9.15 9.15 0 0 1-3.71-3l-.63-.93-.51-1a9.07 9.07 0 0 1-.76-2.31 16.42 16.42 0 0 1 1-8.18 46 46 0 0 1 3.11-6.78 58.58 58.58 0 0 1 8.65-11.79 60.66 60.66 0 0 1 11.18-9.44 45.88 45.88 0 0 1 9.67-4.87 28.1 28.1 0 0 1 11-1.65 25.07 25.07 0 0 1 9.68 2.59 18.08 18.08 0 0 1 4.34 2.92 12.86 12.86 0 0 1 3.16 4.55 13.64 13.64 0 0 1 1 5.31 20.71 20.71 0 0 1-.7 5 35.54 35.54 0 0 1-3.79 8.91 52.15 52.15 0 0 1-5.46 7.63 72.54 72.54 0 0 1-6.52 6.6 58.48 58.48 0 0 1-15.51 10.06 39.78 39.78 0 0 1-3.91 1.47c-.67.2-1.35.39-2 .56a10.66 10.66 0 0 1-2.74.25 7.59 7.59 0 0 1-2.73-.63 3.17 3.17 0 0 1-1.82-1.94c-.48-1.77.65-3.57 1.92-5 .15-.17.33-.38.46-.51l.37-.37c.25-.25.5-.5.75-.73.5-.49 1-.94 1.54-1.4 1-.91 2.11-1.76 3.2-2.59a66 66 0 0 1 6.81-4.53 44.56 44.56 0 0 1 9.75-4.32 22.28 22.28 0 0 1 5.53-.91 13.5 13.5 0 0 1 5.91 1.09 10.75 10.75 0 0 1 4.61 4.13l.74 1.32c.229.488.42.993.57 1.51.28.977.438 1.984.47 3a17.19 17.19 0 0 1-.73 5.58 21.73 21.73 0 0 1-2.16 5.06c-1.24 2-2.26 2.51-2.44 2.23-.18-.28.17-1.39.5-3.15a24.07 24.07 0 0 0 .33-7 13.91 13.91 0 0 0-.83-3.9 8.73 8.73 0 0 0-2.2-2.87 6.64 6.64 0 0 0-3-1.32 12.39 12.39 0 0 0-4 .05 31.68 31.68 0 0 0-8.84 3.07 59.18 59.18 0 0 0-8.36 5.16c-1.34 1-2.64 2-3.84 3.05-.3.27-.61.54-.88.81l-.54.52c-.11.1-.08.06-.12.11-.04.05 0 .15.12.16h.17l.42-.09.56-.14c.75-.2 1.51-.44 2.26-.71a47.25 47.25 0 0 0 8.79-4.41 65.55 65.55 0 0 0 14.92-13.36 41 41 0 0 0 6.16-10.25c1.47-3.62 2.17-7.66.82-10.69a8.43 8.43 0 0 0-3.29-3.74 19.61 19.61 0 0 0-2.45-1.33c-.45-.17-.89-.37-1.34-.54l-1.37-.43a23 23 0 0 0-11.5 0 38.32 38.32 0 0 0-12.15 5.44 58.11 58.11 0 0 0-10.35 8.85 53.09 53.09 0 0 0-8 11.06 32.11 32.11 0 0 0-2.51 6.2c-.57 2.09-.72 4.22.06 5.77a6.4 6.4 0 0 0 2.2 2.63 5.15 5.15 0 0 0 1.51.61 6.23 6.23 0 0 0 1.74.11 17.27 17.27 0 0 0 7.38-2.8c4.75-2.91 9-6.88 13.05-10.89a97.44 97.44 0 0 0 16-20.33 49.73 49.73 0 0 0 4.91-11.72l.37-1.49.27-1.54c.199-.989.32-1.992.36-3a9.11 9.11 0 0 0-1.23-5.27 6.61 6.61 0 0 0-3.08-2.43 13.93 13.93 0 0 0-4.31-.84 32 32 0 0 0-9.31 1.08 59.27 59.27 0 0 0-9.08 3.11 60.65 60.65 0 0 0-8.39 4.66c-2.37 1.57-4.58 3.3-6.83 5.12-2.09 1.69-3.79 3.15-5.22 4.38a77.994 77.994 0 0 1-3.64 2.95 14 14 0 0 1-4.68 2.64 10.65 10.65 0 0 1-1.73.49c-.72 0-.44-.89.68-2.61a54.19 54.19 0 0 1 5.93-7.22 86.61 86.61 0 0 1 14.37-12.19 60.24 60.24 0 0 1 4.18-2.53 45.5 45.5 0 0 1 4.49-2.2 55.38 55.38 0 0 1 9.54-3 37.12 37.12 0 0 1 10.52-.89 17.78 17.78 0 0 1 5.84 1.44 12.52 12.52 0 0 1 5.32 4.36 13.2 13.2 0 0 1 2.19 6.31 21.59 21.59 0 0 1-.28 5.76 45.26 45.26 0 0 1-2.91 9.94 68.73 68.73 0 0 1-7.37 13 104.64 104.64 0 0 1-9.37 11.25 134.3 134.3 0 0 1-10.58 9.94 61.69 61.69 0 0 1-6 4.45 32.1 32.1 0 0 1-6.92 3.51l-.04-.12Z" />
                    </svg>
                  </div>
                </div>
              </transition>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
