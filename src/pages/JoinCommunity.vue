<script setup>
import Header from '../partials/Header.vue'
import HeroJoinCommunity from '../partials/HeroJoinCommunity.vue'
import JoinProcess from '../partials/JoinProcess.vue'
import CommunityValues from '../partials/CommunityValues.vue'
import JoinFaqs from '../partials/JoinFaqs.vue'
import JoinCta from '../partials/JoinCta.vue'
import Footer from '../partials/Footer.vue'
import Testimonials from "../partials/Testimonials.vue";
import Clients from "../partials/Clients.vue";
</script>

<template>
  <div class="flex min-h-screen flex-col overflow-hidden supports-[overflow:clip]:overflow-clip">
    <Header />

    <main class="relative grow">
      <HeroJoinCommunity />
      <JoinProcess />
      <Testimonials />
      <CommunityValues />
      <Clients />
      <JoinFaqs />
      <JoinCta />
    </main>

    <Footer />
  </div>
</template>
