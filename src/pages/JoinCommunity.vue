<script setup>
import Header from '../partials/Header.vue'
import HeroJoinCommunity from '../partials/HeroJoinCommunity.vue'
import JoinProcess from '../partials/JoinProcess.vue'
import CommunityValues from '../partials/CommunityValues.vue'
import JoinFaqs from '../partials/JoinFaqs.vue'
import JoinCta from '../partials/JoinCta.vue'
import Footer from '../partials/Footer.vue'
import Testimonials from '../partials/Testimonials.vue'
</script>

<template>
  <div class="flex min-h-screen flex-col overflow-hidden supports-[overflow:clip]:overflow-clip">
    <Header />

    <main class="relative grow bg-white">
      <HeroJoinCommunity />
      <JoinProcess />
      <Testimonials />
      <CommunityValues />
      <JoinFaqs />
      <JoinCta />
    </main>

    <Footer />
  </div>
</template>
