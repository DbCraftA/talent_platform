<script setup>
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { clearMockSession } from '../services/authService.js'

const props = defineProps({
  title: { type: String, required: true },
  items: { type: Array, required: true },
  sidebarId: { type: String, required: true },
})

const route = useRoute()
const mobileOpen = ref(false)
const collapsed = ref(false)
const desktopViewport = ref(false)
const isCurrent = (to) => route.path === to || (to !== '/espace' && to !== '/admin' && route.path.startsWith(`${to}/`))
const currentItem = computed(() => props.items.find(({ to }) => isCurrent(to)))
const currentTitle = computed(() => route.meta.title || currentItem.value?.label || props.title)
const iconPaths = {
  dashboard: ['M3 3h7v7H3z', 'M14 3h7v7h-7z', 'M3 14h7v7H3z', 'M14 14h7v7h-7z'],
  profile: ['M20 21a8 8 0 0 0-16 0', 'M12 13a5 5 0 1 0 0-10 5 5 0 0 0 0 10z'],
  missions: ['M3 7h18v13H3z', 'M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2', 'M3 12a20 20 0 0 0 18 0'],
  applications: ['M9 4H6a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-3', 'M9 3h6v3H9z', 'M8 11h8', 'M8 15h6'],
  community: ['M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2', 'M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z', 'M22 21v-2a4 4 0 0 0-3-3.87', 'M16 3.13a4 4 0 0 1 0 7.75'],
  talents: ['M3 20v-2a5 5 0 0 1 5-5h8a5 5 0 0 1 5 5v2', 'M12 10a4 4 0 1 0 0-8 4 4 0 0 0 0 8z'],
  companies: ['M4 21V5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v16', 'M2 21h20', 'M8 7h2', 'M14 7h2', 'M8 11h2', 'M14 11h2', 'M10 21v-5h4v5'],
  revenue: ['M3 3v18h18', 'm7 15 4-4 4 3 6-7', 'M17 7h4v4'],
}

watch(() => route.fullPath, () => { mobileOpen.value = false })

function onKeydown(event) {
  if (event.key === 'Escape') mobileOpen.value = false
}

let mediaQuery
function onViewportChange(event) {
  desktopViewport.value = event.matches
  if (event.matches) mobileOpen.value = false
}

onMounted(() => {
  mediaQuery = window.matchMedia('(min-width: 64rem)')
  onViewportChange(mediaQuery)
  mediaQuery.addEventListener('change', onViewportChange)
  window.addEventListener('keydown', onKeydown)
})
onUnmounted(() => {
  mediaQuery?.removeEventListener('change', onViewportChange)
  window.removeEventListener('keydown', onKeydown)
})
</script>

<template>
  <div class="flex min-h-dvh bg-gray-50 font-aspekta text-gray-900">
    <button
      v-if="mobileOpen && !desktopViewport"
      type="button"
      class="fixed inset-0 z-40 bg-gray-950/50 lg:hidden"
      aria-label="Fermer le menu"
      @click="mobileOpen = false"
    />
    <aside
      :id="sidebarId"
      class="fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-gray-200 bg-white shadow-xl transition-[transform,width] duration-200 lg:sticky lg:top-0 lg:z-0 lg:h-dvh lg:shrink-0 lg:translate-x-0 lg:shadow-none"
      :class="[mobileOpen ? 'translate-x-0' : '-translate-x-full', collapsed ? 'lg:w-20' : 'lg:w-72']"
      :inert="!mobileOpen && !desktopViewport ? '' : null"
      :aria-hidden="!mobileOpen && !desktopViewport ? 'true' : undefined"
    >
      <div class="flex h-20 shrink-0 items-center justify-between gap-2 px-5" :class="collapsed ? 'lg:px-3' : ''">
        <router-link to="/" class="inline-flex items-center rounded-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" aria-label="Wenovat - accueil" @click="mobileOpen = false">
          <img src="../images/logo.png" width="120" height="60" alt="Wenovat" :class="collapsed ? 'lg:w-12' : ''" />
        </router-link>
        <button type="button" class="rounded-lg p-2 text-gray-600 hover:bg-indigo-50 focus-visible:outline-2 focus-visible:outline-indigo-600 lg:hidden" aria-label="Fermer le menu" @click="mobileOpen = false">
          <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M5 5l14 14M19 5 5 19" /></svg>
        </button>
      </div>
      <div class="min-h-0 flex-1 overflow-y-auto px-3 pt-7 pb-6">
        <p class="px-3 text-xs font-semibold uppercase tracking-wider text-gray-500" :class="collapsed ? 'lg:sr-only' : ''">{{ title }}</p>
        <nav class="mt-4" :aria-label="`Navigation ${title.toLowerCase()}`">
          <ul class="space-y-1">
            <li v-for="item in items" :key="item.to">
              <router-link
                :to="item.to"
                class="flex min-h-11 items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-indigo-50 hover:text-indigo-800 focus-visible:outline-2 focus-visible:outline-indigo-600"
                :class="[collapsed ? 'lg:justify-center' : '', isCurrent(item.to) ? 'bg-indigo-50 font-semibold text-indigo-800' : '']"
                :aria-current="isCurrent(item.to) ? 'page' : undefined"
                :title="collapsed ? item.label : undefined"
                @click="mobileOpen = false"
              >
                <svg class="h-5 w-5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                  <path v-for="path in iconPaths[item.icon]" :key="path" :d="path" />
                </svg>
                <span :class="collapsed ? 'lg:sr-only' : ''">{{ item.label }}</span>
              </router-link>
            </li>
          </ul>
        </nav>
      </div>
      <div class="border-t border-gray-200 p-3">
        <router-link to="/" class="flex min-h-11 items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-indigo-50 hover:text-indigo-800 focus-visible:outline-2 focus-visible:outline-indigo-600" :class="collapsed ? 'lg:justify-center' : ''" :title="collapsed ? 'Site Wenovat' : undefined" @click="mobileOpen = false">
          <svg class="h-5 w-5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M13 5h6v6M19 5l-9 9" /><path d="M19 13v5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h5" /></svg>
          <span :class="collapsed ? 'lg:sr-only' : ''">Site Wenovat</span>
        </router-link>
        <button
          type="button"
          class="mt-1 hidden min-h-11 w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm font-medium text-gray-700 hover:bg-indigo-50 hover:text-indigo-800 focus-visible:outline-2 focus-visible:outline-indigo-600 lg:flex"
          :class="collapsed ? 'lg:justify-center' : ''"
          :aria-expanded="!collapsed"
          :aria-controls="sidebarId"
          :aria-label="collapsed ? 'Déplier le menu' : 'Replier le menu'"
          @click="collapsed = !collapsed"
        >
          <svg class="h-5 w-5 shrink-0" :class="collapsed ? 'rotate-180' : ''" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 4H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h4M9 4v16M9 4h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H9m8-8h-5m0 0 2-2m-2 2 2 2" /></svg>
          <span :class="collapsed ? 'sr-only' : ''">Replier le menu</span>
        </button>
      </div>
    </aside>

    <div class="flex min-w-0 flex-1 flex-col">
      <header class="sticky top-0 z-30 bg-gray-50 px-4 sm:px-8">
        <div class="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-4 border-b border-gray-200">
          <div class="flex min-w-0 items-center gap-3">
            <button
              type="button"
              class="shrink-0 rounded-lg p-2 text-gray-700 hover:bg-indigo-50 focus-visible:outline-2 focus-visible:outline-indigo-600 lg:hidden"
              :aria-controls="sidebarId"
              :aria-expanded="mobileOpen"
              :aria-label="mobileOpen ? 'Fermer le menu' : 'Ouvrir le menu'"
              @click="mobileOpen = !mobileOpen"
            >
              <svg class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M4 6h16M4 12h16M4 18h16" /></svg>
            </button>
            <p class="truncate font-cabinet-grotesk text-lg font-bold">{{ currentTitle }}</p>
          </div>
          <div class="flex shrink-0 items-center gap-3">
            <span class="rounded-full bg-indigo-100 px-2 py-1 text-[0.65rem] font-bold text-indigo-800 sm:px-3 sm:text-xs">Démo</span>
            <router-link to="/connexion" class="inline-flex min-h-10 items-center rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs font-semibold text-gray-800 transition-colors hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:text-sm" @click="clearMockSession">Déconnexion</router-link>
          </div>
        </div>
      </header>
      <main id="contenu-portail" class="w-full flex-1 px-4 py-8 sm:px-8">
        <div class="mx-auto w-full max-w-7xl">
          <slot />
        </div>
      </main>
    </div>
  </div>
</template>
