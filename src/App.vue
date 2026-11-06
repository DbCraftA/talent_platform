<template>
  <router-view />
</template>

<script>
import AOS from 'aos'
import { nextTick, watch } from 'vue'

export default {
  created() {
    this.stopAosRouteWatch = watch(() => this.$route.fullPath, async () => {
      await nextTick()
      AOS.refreshHard()
    })
  },
  mounted() {
    AOS.init({
      once: true,
      disable: () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
      duration: 700,
      easing: 'ease-out-cubic',
    })
  },
  beforeUnmount() {
    this.stopAosRouteWatch?.()
  }
}
</script>
