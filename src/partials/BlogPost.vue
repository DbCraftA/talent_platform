<script setup>
import Header from "./Header.vue";
import PageIllustration from "./../partials/PageIllustration.vue";
import BlogSingle from "../partials/BlogSingle.vue";
import Cta from "./Cta.vue";
import Footer from "./Footer.vue";
</script>

<template>
  <div
    class="flex min-h-screen flex-col overflow-hidden supports-[overflow:clip]:overflow-clip"
  >
    <!-- Site header -->
    <Header />

    <!-- Page content -->
    <main class="relative grow">
      <!-- Page illustration -->
      <PageIllustration multiple />

      <!-- Page sections -->
      <BlogSingle />
      <Cta />
    </main>

    <!-- Site footer -->
    <Footer />
  </div>
</template>
