<script setup>
import Header from "./../partials/Header.vue";
import PageIllustration from "./../partials/PageIllustration.vue";
import BlogArticles from "../partials/BlogArticles.vue";
import Cta from "../partials/Cta.vue";
import Footer from "./../partials/Footer.vue";
</script>

<template>
  <div
    class="flex min-h-screen flex-col overflow-hidden bg-linear-to-b from-indigo-100 via-white to-indigo-50/40 supports-[overflow:clip]:overflow-clip"
  >
    <!-- Site header -->
    <Header />

    <!-- Page content -->
    <main class="relative grow">
      <!-- Page illustration -->
      <PageIllustration multiple />

      <!-- Page sections -->
      <BlogArticles />
      <Cta />
    </main>

    <!-- Site footer -->
    <Footer />
  </div>
</template>
