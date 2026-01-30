<script setup>
import Header from "./../partials/Header.vue";
import HeroMentionLegal from "../partials/HeroMentionLegal.vue";
import Footer from "./../partials/Footer.vue";
import Mentions from '../partials/Mentions.vue'
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
      <Mentions/>
    </main>

    <!-- Site footer -->
    <Footer />
  </div>
</template>
