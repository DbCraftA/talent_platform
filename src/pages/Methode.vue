<script setup>
import Header from "./../partials/Header.vue";
import HeroMethode from "../partials/HeroMethode.vue";
import Timeline from "../partials/Timeline.vue";
import Footer from "./../partials/Footer.vue";
import MethodeAccompagnement1 from "./../partials/MethodeAccompagnement1.vue";
</script>

<template>
  <div
    class="flex min-h-screen flex-col overflow-hidden supports-[overflow:clip]:overflow-clip"
  >
    <!-- Site header -->
    <Header />

    <!-- Page content -->
    <main class="relative isolate grow bg-linear-to-b from-white via-indigo-50 to-white">
      <div class="pointer-events-none absolute inset-0 -z-10 hidden overflow-hidden md:block" aria-hidden="true">
        <img src="../images/hero-illustration.svg" class="mx-auto max-w-none" width="1440" height="749" alt="" />
      </div>
      <!-- Page sections -->
      <HeroMethode />
      <Timeline />
      <MethodeAccompagnement1 />
      <section class="px-4 pb-8 sm:px-6" aria-labelledby="methode-contact-title">
        <div class="mx-auto flex max-w-6xl flex-col items-start gap-5 rounded-3xl bg-slate-950 px-6 py-8 text-white md:flex-row md:items-center md:px-10" data-aos="fade-up">
          <div class="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-white/20 bg-white/10 text-indigo-200" aria-hidden="true">
            <svg class="h-9 w-9" viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="15" cy="17" r="12"/><circle cx="15" cy="17" r="7"/><circle cx="15" cy="17" r="2"/><path d="m15 17 12-12m-3 0h3v3"/></svg>
          </div>
          <div class="grow md:border-l md:border-white/40 md:pl-8">
            <h2 id="methode-contact-title" class="font-cabinet-grotesk text-2xl font-bold">Un projet, un besoin, une réflexion ?</h2>
            <p class="mt-1 text-sm text-white/90">Parlons de vos enjeux et trouvons ensemble l'accompagnement adapté à votre projet.</p>
          </div>
          <RouterLink to="/nous-contacter" class="btn inline-flex shrink-0 items-center gap-2 rounded-xl bg-white text-indigo-700 hover:bg-indigo-50">Échanger avec un expert <span aria-hidden="true">→</span></RouterLink>
        </div>
      </section>
    </main>

    <!-- Site footer -->
    <Footer />
  </div>
</template>
