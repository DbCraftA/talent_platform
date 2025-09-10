<script setup>
import Header from "./../partials/Header.vue";
import HeroAbout from "../partials/HeroAbout.vue";
import CitationAbout from "../partials/CitationAbout.vue";
import Footer from "./../partials/Footer.vue";
import TargetAbout from "../partials/TargetAbout.vue";
import NotreMission from "../partials/NotreMission.vue";
import CtaAbout from "../partials/CtaAbout.vue";
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
      <CitationAbout/>
      <TargetAbout/>
      <NotreMission />
      <CtaAbout />
    </main>

    <!-- Site footer -->
    <Footer />
  </div>
</template>
