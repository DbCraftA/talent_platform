<template>
  <section class="relative overflow-hidden">

    <!-- Bg -->
    <div class="absolute inset-0 bg-linear-to-b from-indigo-100 to-white pointer-events-none -z-10" aria-hidden="true"></div>


    <div class="max-w-6xl mx-auto px-4 sm:px-6">
      <div class="pt-28 pb-8 md:pt-36 ">

        <!-- HeroMethode content -->
        <div class="max-w-5xl  text-center">

          <!-- Copy -->
          <h1 class="h1 font-cabinet-grotesk mb-6" data-aos="fade-right" data-aos-delay="100">Mentions légales
          </h1>
          <p class="text-lg pt-10 text-gray-500">Notre histoire commence sur le terrain, là où les systèmes critiques ne laissent aucune place à l’approximation. Pendant des années, nous avons exercé comme architectes au sein de grands comptes, confrontés à des projets complexes, des enjeux de performance, de sécurité et de transformation digitale.</p>


        </div>




      </div>
    </div>
  </section>
</template>

<script>
import StatsMethode from "./StatsMethode.vue";

export default  {
  name: 'Hero',
  components: {Stats: StatsMethode}
}

</script>