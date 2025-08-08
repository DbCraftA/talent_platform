<script setup>
import Header from "./../partials/Header.vue";
import HeroAbout from "../partials/HeroAbout.vue";
import Timeline from "../partials/Timeline.vue";
import Benefits from "../partials/Benefits.vue";
import Clients from "../partials/Clients.vue";
import Cta from "../partials/Cta.vue";
import Footer from "./../partials/Footer.vue";
</script>

<template>
  <div
    class="flex min-h-screen flex-col overflow-hidden supports-[overflow:clip]:overflow-clip"
  >
    <!-- Site header -->
    <Header />

    <!-- Page content -->
    <main class="relative grow">


      <!-- Page sections -->
      <HeroAbout />
      <Timeline />
      <Benefits />
      <Cta />
    </main>

    <!-- Site footer -->
    <Footer />
  </div>
</template>
